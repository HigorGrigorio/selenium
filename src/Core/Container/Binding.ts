/**
 * @file Binding.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-01
 *
 * @changelog
 *  - 2024-02-01 - Higor Grigorio
 *    - Create Binding.ts.
 */

import {Binding as BindingContract, Identifier, Constraint} from "@/Contracts/Container";
import {Factory, Nullable} from "@/Contracts/Core";
import {BindingScope, BindingTypes} from "@/Container/Constants";

export class Binding<T> implements BindingContract<T> {
    public concrete: Identifier<T>;
    public factory: Nullable<Factory<T>> = null;
    public scope: BindingScope
    public type: BindingTypes;
    public cached: Nullable<T> = null;
    public closure: Nullable<Function> = null;
    public constraint: Nullable<Constraint<T>> = null;

    constructor(
        public identifier: Identifier<T>,
    ) {
    }
}
