/**
 * @file Factory.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-01
 *
 * @changelog
 *  - 2024-02-01 - Higor Grigorio
 *    - Create Factory.ts.
 */

import {Any} from "./Any";

export interface Factory<T> {
    make(...args: Any[]): T;
}
