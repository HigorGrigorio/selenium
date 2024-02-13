/**
 * @file DynamicValue.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-10
 *
 * @changelog
 *  - 2024-02-10 - Higor Grigorio
 *    - Create DynamicValue.ts.
 */

import {Context} from "@/Contracts/Container";

export type DynamicValue<T> = (context: Context) => T | Promise<T>;
