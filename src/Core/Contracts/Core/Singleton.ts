/**
 * @file Singleton.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-03
 *
 * @changelog
 *  - 2024-02-03 - Higor Grigorio
 *    - Create Singleton.ts.
 */

export interface Singleton<T> {
    getInstance(): T;
}
