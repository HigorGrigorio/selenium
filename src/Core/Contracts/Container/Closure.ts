/**
 * @file Closure.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-03
 *
 * @changelog
 *  - 2024-02-03 - Higor Grigorio
 *    - Create Closure.ts.
 */

import {Container} from "@/Contracts/Container";
import {Any} from "@/Contracts/Core";

export interface Closure<T> {
    (container: Container, ...args: Any[]): T;
}
