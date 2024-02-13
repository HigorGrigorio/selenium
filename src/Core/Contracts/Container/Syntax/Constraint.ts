/**
 * @file Constraint.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-09
 *
 * @changelog
 *  - 2024-02-09 - Higor Grigorio
 *    - Create Constraint.ts.
 */
import {Nullable, Optional} from "@/Contracts/Core";
import {Metadata} from "@/Contracts/Annotations";
import {Request} from "@/Contracts/Container/Request";

export interface Constraint<T = unknown> {
    metadata?: Optional<Metadata<T>>;

    (request: Nullable<Request<T>>): Boolean;
}
