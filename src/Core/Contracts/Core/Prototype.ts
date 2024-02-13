/**
 * @file Prototype.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-04
 *
 * @changelog
 *  - 2024-02-04 - Higor Grigorio
 *    - Create Prototype.ts.
 */

export type Prototype<T> = {
    [Property in keyof T]:
    T[Property] extends NewableFunction ?
        T[Property] :
        T[Property] | undefined
} & { constructor: NewableFunction }
