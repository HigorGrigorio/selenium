/**
 * @file BindingWhenSyntax.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-09
 *
 * @changelog
 *  - 2024-02-09 - Higor Grigorio
 *    - Create BindingWhenSyntax.ts.
 */

import {Constraint} from "./Constraint";

export interface BindingWhenSyntax<T> {
    when(constraint: Constraint<T>): void;
}
