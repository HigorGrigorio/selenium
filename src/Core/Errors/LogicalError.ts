/**
 * @file LogicalError.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-03
 *
 * @changelog
 *  - 2024-02-03 - Higor Grigorio
 *    - Create LogicalError.ts.
 */

export class LogicalError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'LogicalError';
    }
}
