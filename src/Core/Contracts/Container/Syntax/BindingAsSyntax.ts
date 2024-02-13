/**
 * @file BindingToSyntax.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-02
 *
 * @changelog
 *  - 2024-02-02 - Higor Grigorio
 *    - Create BindingToSyntax.ts.
 */

import {Factory, Newable} from "@/Contracts/Core";
import {Closure} from "@/Contracts/Container/Closure";
import {DynamicValue} from "@/Contracts/Container/DynamicValue";
import {BindingInSyntax, BindingWhenSyntax} from "@/Contracts/Container/Syntax";

type BindingInWhenSyntax<T> = BindingInSyntax<T> & BindingWhenSyntax<T>;

export interface BindingAsSyntax<T> {
    as(abstract: Newable<T>): BindingInWhenSyntax<T>;

    asSelf(): BindingInWhenSyntax<T>;

    asFactory(factory: Factory<T>): BindingWhenSyntax<T>;

    asValue(value: T): BindingWhenSyntax<T>;

    asClosure(closure: Closure<T>): BindingWhenSyntax<T>;

    asDynamicValue(value: DynamicValue<T>): BindingWhenSyntax<T>;
}
