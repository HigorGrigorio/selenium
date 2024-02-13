/**
 * @file Serializable.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-03
 *
 * @changelog
 *  - 2024-02-03 - Higor Grigorio
 *    - Create Serializable.ts.
 */

export interface Serializable {
    serialize(): String;

    deserialize(data: String): void;
}
