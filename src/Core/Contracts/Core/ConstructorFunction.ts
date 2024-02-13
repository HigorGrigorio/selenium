/**
 * @file ConstructorFunction.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-04
 *
 * @changelog
 *  - 2024-02-04 - Higor Grigorio
 *    - Create ConstructorFunction.ts.
 */

import {Prototype} from "@/Contracts/Core/index";

export interface ConstructorFunction<T = Record<string, unknown>> {
    new(...args: any[]): T;

    prototype: Prototype<T>;
}
