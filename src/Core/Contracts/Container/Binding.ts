/**
 * @file IBinding.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-02
 *
 * @changelog
 *  - 2024-02-02 - Higor Grigorio
 *    - Create IBinding.ts.
 */

import {Identifier} from "@/Contracts/Container/Identifier";
import {Factory, Nullable} from "@/Contracts/Core";
import {BindingScope, BindingTypes} from "@/Container/Constants";
import {Constraint} from "@/Contracts/Container/Syntax/Constraint";

export interface Binding<T = unknown> {
    identifier: Identifier<T>;
    concrete: Nullable<Identifier<T>>;
    factory: Nullable<Factory<T>>;
    cached: Nullable<T>;
    type: BindingTypes;
    scope: BindingScope;
    closure: Nullable<Function>;
    constraint: Nullable<Constraint<T>>;
}
