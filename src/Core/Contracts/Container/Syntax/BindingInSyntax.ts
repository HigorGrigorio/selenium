/**
 * @file BindingInSyntax.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-11
 *
 * @changelog
 *  - 2024-02-11 - Higor Grigorio
 *    - Create BindingInSyntax.ts.
 */

import {BindingWhenSyntax} from "@/Contracts/Container/Syntax/BindingWhenSyntax";

export interface BindingInSyntax<T> {
    inSingletonScope(): BindingWhenSyntax<T>;

    inRequestScope(): BindingWhenSyntax<T>;

    inTransientScope(): BindingWhenSyntax<T>;
}
