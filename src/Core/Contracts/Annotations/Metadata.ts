/**
 * @file Metadata.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-04
 *
 * @changelog
 *  - 2024-02-04 - Higor Grigorio
 *    - Create Metadata.ts.
 */

export interface Metadata<T = unknown> {
    key:  String | Number | Symbol;
    value: T;
}
