/**
 * @file Context.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-10
 *
 * @changelog
 *  - 2024-02-10 - Higor Grigorio
 *    - Create Context.ts.
 */

import {Request} from "@/Contracts/Container";

export interface Context {
    request: Request;
}
