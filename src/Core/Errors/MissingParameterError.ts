/**
 * @file MissingParameterError.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-04
 *
 * @changelog
 *  - 2024-02-04 - Higor Grigorio
 *    - Create MissingParameterError.ts.
 */

import {CoreError} from "@/Errors";

export class MissingParameterError extends CoreError {
    constructor(message: string) {
        super(message);
    }
}
