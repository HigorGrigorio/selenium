/**
 * @file Container.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-01
 *
 * @changelog
 *  - 2024-02-01 - Higor Grigorio
 *    - Create Container.ts.
 */

import 'reflect-metadata';

import {BindingAsSyntax, Container as ContainerContract, Identifier} from "@/Contracts/Container";
import {Any, Newable, Nullable} from "@/Contracts/Core";
import {BindingAsBuilder} from "@/Container/Syntax/BindingAsBuilder";
import {BindingScope, BindingTypes} from "@/Container/Constants";
import {Binding} from "@/Container/Binding";
import {LogicalError} from "@/Errors";
import {Utils} from "@/Utils";
import {MetadataTypes} from "@/Annotations/Constants";
import {Metadata} from "@/Annotations/Metadata";

export class Container
    implements ContainerContract {

    protected static _instance: Nullable<ContainerContract> = null;
    protected bindings: Map<Identifier, Binding<unknown>>
    protected aliases: Map<Identifier, Identifier>;
    protected with: Array<Array<Any>>;
    protected resolves: Map<Identifier, Any>;
    protected buildStack: Array<Identifier>;
    protected defaultScope: Nullable<BindingScope> = null;

    protected constructor() {
        this.bindings = new Map<Identifier, Binding<unknown>>(new Map());
        this.aliases = new Map<Identifier, Identifier>(new Map());
        this.with = [];
        this.resolves = new Map<Identifier, Any>();
        this.buildStack = [];
    }

    public getDefaultScope(): Nullable<BindingScope> {
        return this.defaultScope;
    }

    public setDefaultScope(scope: BindingScope): void {
        this.defaultScope = scope;
    }

    public static getInstance(): ContainerContract {
        if (this._instance === null) {
            this._instance = new Container();
        }
        return this._instance;
    }

    public alias<U>(alias: String | Symbol, abstract: Identifier<U>): void {
        if (abstract === alias) {
            throw new LogicalError('Alias and abstract cannot be the same');
        }

        this.aliases.set(alias, abstract);
    }

    protected getAlias<T>(abstract: Identifier<T>): Identifier<T> {
        return this.aliases.has(abstract)
            ? this.getAlias<T>(this.aliases.get(abstract) as Identifier<T>)
            : abstract
    }

    public bind<T>(abstract: Identifier<T>): BindingAsSyntax<T> {
        let binding;
        let builder;

        // check if the abstract has an identifier
        if (Utils.isObject(abstract) && Reflect.hasOwnMetadata(MetadataTypes.Identifier, abstract)) {
            // default binding to the identifier
            const identifier = Reflect.getMetadata(MetadataTypes.Identifier, abstract);
            binding = new Binding<T>(identifier);

            // create a new binding with the default identifier and set the abstract as the concrete.
            // this will allow the container to resolve the abstract by the default identifier.
            builder = new BindingAsBuilder<T>(binding).as(abstract);

            // set the abstract as the identifier
            abstract = identifier;
        } else {
            binding = new Binding<T>(abstract);
            builder = new BindingAsBuilder<T>(binding);
        }

        binding.scope = this.defaultScope ?? BindingScope.Transient;

        this.bindings.set(abstract, binding as Binding<unknown>);
        return builder;
    }

    public has(abstract: Identifier): Boolean {
        return this.bindings.has(abstract);
    }

    protected isBuildable<T>(abstract: Identifier<T>): Boolean {
        return this.getAlias(abstract) === abstract || (
            this.has(abstract) && this.bindings.get(abstract)!.scope === BindingScope.Transient
        );
    }

    protected getLastParameterOverride<T>(): Any[] {
        return this.with.length > 0
            ? this.with[this.with.length - 1]
            : [];
    }

    protected build<T>(concrete: Identifier<T>): T {

        // the concrete type is actually a Closure, we will just execute it and
        // hand back the results of the functions, which allows functions to be
        // used as resolvers for more fine-tuned resolution of these objects.
        if (Utils.isClosure(concrete)) {
            return concrete(this, ...this.getLastParameterOverride());
        }

        this.buildStack.push(concrete);

        const constructor = Utils.isNewable(concrete)
            ? concrete : null;

        if (constructor === null) {
            this.buildStack.pop();

            throw new LogicalError(`Cannot build ${concrete} because it is not a class`);
        }

        const dependencies = this.resolveArguments(constructor, ...this.getLastParameterOverride());

        const object = new constructor(...dependencies);

        this.buildStack.pop();

        return object;
    }

    protected createByMetadata(metadata: Metadata) {
        switch (metadata.key) {
            case MetadataTypes.Inject:
                return this.resolve(metadata.value, []);
            default:
                return null;
        }
    }

    protected resolveMetaArguments(metadata: Metadata[]): Any {
        let object = null;

        for (const meta of metadata) {
            object = this.createByMetadata(meta);
            if (object !== null) {
                break;
            }
        }

        return object;
    }

    protected resolveArguments<T>(abstract: Newable<T>, ...args: Any[]): Any[] {
        const argTypes = Reflect.getMetadata(MetadataTypes.ParamTypes, abstract) ?? [];
        const metaArgs = Reflect.getMetadata(MetadataTypes.Tagged, abstract) ?? [];
        const parsedArgs = []

        for (let i = 0; i < argTypes.length; i++) {
            // priority to the metadata injection
            if (i in metaArgs) {
                parsedArgs.push(this.resolveMetaArguments(metaArgs[i]));
                continue;
            }

            parsedArgs.push(this.resolve(argTypes[i], []));
        }

        return parsedArgs;
    }

    protected getBinding<T>(abstract: Identifier<T>): Nullable<Binding<T>> {
        return this.bindings.has(abstract) ? this.bindings.get(abstract) as Binding<T> : null;
    }

    protected buildFromType<T>(binding: Binding<T>): T {
        switch (binding.type) {
            case BindingTypes.Value:
            case BindingTypes.Factory:
                const {factory} = binding;
                Utils.throwIfNull(factory, `Factory is null`);

                return factory!.make();
            case BindingTypes.Instance:
                return this.isBuildable(binding.concrete) ?
                    this.build<T>(binding.concrete) :
                    this.make<T>(binding.concrete);
            case BindingTypes.Closure:
                const {closure} = binding;
                Utils.throwIfNull(closure, `Closure is null`);

                return closure!(this, ...this.getLastParameterOverride());
            default:
                throw new LogicalError(`Invalid binding type [${binding.type}]`);
        }
    }

    protected resolveBinding<T>(binding: Binding<T>): T {
        if (binding.scope === BindingScope.Singleton) {
            if (binding.cached !== null) {
                return binding.cached;
            }
            return binding.cached = this.buildFromType(binding);
        }
        return this.buildFromType(binding);
    }

    public resolve<T>(abstract: Identifier<T>, ...args: any[]): T {
        const alias = this.getAlias<T>(abstract);
        const binding = this.getBinding(alias);

        if (binding === null) {
            throw new LogicalError(`Unresolvable dependency resolving [${abstract}]`);
        }

        this.with.push(args);

        const object = this.resolveBinding(binding);
        const concrete = binding.concrete;

        this.resolves.set(concrete, object);

        this.with.pop();

        return object;
    }

    public make<T>(abstract: Identifier<T>): T {
        return this.resolve<T>(abstract, [])
    }
}
