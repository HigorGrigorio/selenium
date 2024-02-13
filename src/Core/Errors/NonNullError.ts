/**
 * @file NonNullError.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-03
 *
 * @changelog
 *  - 2024-02-03 - Higor Grigorio
 *    - Create NonNullError.ts.
 */

import {CoreError} from "@/Errors";

export class NonNullError extends CoreError {
    constructor(name: string, message: string = `The value of ${name} cannot be null`) {
        super(message.replace('{name}', name));
        this.name = 'NonNullError';
    }
}
