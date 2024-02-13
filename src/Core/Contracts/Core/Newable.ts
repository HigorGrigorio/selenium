/**
 * @file Newable.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-01
 *
 * @changelog
 *  - 2024-02-01 - Higor Grigorio
 *    - Create Newable.ts.
 */

import {Any} from "./Any";

export interface Newable<T> {
    new(...args: Any[]): T;
}
