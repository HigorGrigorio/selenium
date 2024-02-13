/**
 * @file Metadata.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-05
 *
 * @changelog
 *  - 2024-02-05 - Higor Grigorio
 *    - Create Metadata.ts.
 */

import {Metadata as MetadataContract} from "@/Contracts/Annotations";
import {Any, Stringable} from "@/Contracts/Core";
import {MetadataTypes} from "@/Annotations/Constants";

export class Metadata
    implements MetadataContract,
        Stringable {

    public constructor(
        public key: String | Number | Symbol,
        public value: Any
    ) {
    }

    toString(): String {
        if (this.key === MetadataTypes.Named) {
            return `@Named("${String(this.value).toString()}")`;
        } else {
            return `@Tagged("${this.key.toString()}","${String(this.value).toString()}")`;
        }
    }
}
