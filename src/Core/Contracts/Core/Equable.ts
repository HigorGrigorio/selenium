/**
 * @file Equable.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-05
 *
 * @changelog
 *  - 2024-02-05 - Higor Grigorio
 *    - Create Equable.ts.
 */

export interface Equable<T> {
    equals(other: T): boolean;
}
