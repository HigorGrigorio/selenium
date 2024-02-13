/**
 * @file CoreError.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-03
 *
 * @changelog
 *  - 2024-02-03 - Higor Grigorio
 *    - Create CoreError.ts.
 */

export class CoreError extends Error {
    constructor(message: string = 'An error occurred') {
        super(message);
        this.name = 'CoreError';
    }
}
