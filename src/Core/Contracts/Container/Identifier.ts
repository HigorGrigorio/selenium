/**
 * @file Identifier.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-03
 *
 * @changelog
 *  - 2024-02-03 - Higor Grigorio
 *    - Create Identifier.ts.
 */

import {Abstract, Newable} from "@/Contracts/Core";
import {Closure} from "@/Contracts/Container";

export type Identifier<T = unknown> = String | Symbol | Newable<T> | Abstract<T> | Closure<T>;
