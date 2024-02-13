/**
 * @file BindingBuilder.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-03
 *
 * @changelog
 *  - 2024-02-03 - Higor Grigorio
 *    - Create BindingBuilder.ts.
 */

import {Binding, BindingAsSyntax, Closure, Identifier} from "@/Contracts/Container";
import {Factory} from "@/Contracts/Core";
import {BindingScope, BindingTypes} from "@/Container/Constants";
import {ValueFactory} from "@/Container/Factories/ValueFactory";
import {BindingWhenSyntax} from "@/Contracts/Container/Syntax/BindingWhenSyntax";
import {BindingWhenBuilder} from "@/Container/Syntax/BindingWhenBuilder";

export class BindingAsBuilder<T>
    implements BindingAsSyntax<T> {
    constructor(
        private readonly binding: Binding<T>
    ) {
    }

    public as(implementation: Identifier<T>): BindingAsSyntax<T> {
        this.binding.concrete = implementation;
        this.binding.type = BindingTypes.Instance;

        return this.asTransient();
    }

    public asFactory(factory: Factory<T>): BindingAsSyntax<T> {
        this.binding.type = BindingTypes.Factory;
        this.binding.factory = factory;
        return new BindingAsBuilder<T>(this.binding);
    }

    public asValue(value: T): BindingAsSyntax<T> {
        this.binding.type = BindingTypes.Value;
        this.binding.factory = new ValueFactory(value);
        return new BindingAsBuilder<T>(this.binding);
    }

    public asSelf(): BindingAsSyntax<T> {
        // check if it has binding by default identifier
        if (this.binding.concrete) {
            return this;
        }

        return this.as(this.binding.identifier);
    }

    public asDynamicValue(): BindingWhenSyntax<T> {
        this.binding.type = BindingTypes.DynamicValue;
        return new BindingWhenBuilder<T>(this.binding);
    }

    public asClosure(closure: Closure<T>): BindingAsSyntax<T> {
        this.binding.type = BindingTypes.Closure;
        this.binding.closure = closure;
        return new BindingAsBuilder<T>(this.binding);
    }

    protected isSingletonScope(): boolean {
        return this.binding.scope === BindingScope.Singleton;
    }

    public asSingleton(): BindingAsSyntax<T> {
        if (this.isSingletonScope()) {
            return this;
        }

        this.binding.scope = BindingScope.Singleton;
        return new BindingAsBuilder<T>(this.binding);
    }

    public asTransient(): BindingAsSyntax<T> {
        this.binding.scope = BindingScope.Transient;
        return new BindingAsBuilder<T>(this.binding);
    }
}
