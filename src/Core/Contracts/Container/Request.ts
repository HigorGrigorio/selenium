/**
 * @file Request.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-09
 *
 * @changelog
 *  - 2024-02-09 - Higor Grigorio
 *    - Create Request.ts.
 */

import {UniqueSymbol} from "@/Symbol";
import {Binding, Identifier, RequestScope} from "@/Contracts/Container";
import {Target} from "@/Contracts/Container/Target";
import {Container} from "@/Container/Container";

export interface Request<T = unknown> {
    id: UniqueSymbol
    abstract: Identifier<T>;
    parent: Request<T> | null;
    bindings: Binding<T>[];
    scope: RequestScope
    target: Target;
    container: Container;
}
