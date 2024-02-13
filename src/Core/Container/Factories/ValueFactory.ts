/**
 * @file ValueFactory.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-05
 *
 * @changelog
 *  - 2024-02-05 - Higor Grigorio
 *    - Create ValueFactory.ts.
 */
import {Factory} from "@/Contracts/Core";

export class ValueFactory<T>
    implements Factory<T> {
    constructor(
        private value: T
    ) {
    }

    make(): T {
        return this.value;
    }
}
