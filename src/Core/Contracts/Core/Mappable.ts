/**
 * @file Mappable.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-03
 *
 * @changelog
 *  - 2024-02-03 - Higor Grigorio
 *    - Create Mappable.ts.
 */

export interface Mappable<K, V> {
    toMap(): Map<K, V>;
}
