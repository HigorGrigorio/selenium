/**
 * @file BaseTaggedDecorator.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-09
 *
 * @changelog
 *  - 2024-02-09 - Higor Grigorio
 *    - Create BaseTaggedDecorator.ts.
 */
import {Identifier} from "@/Contracts/Container";
import {MissingParameterError} from "@/Errors";
import {MetadataUtils} from "@/Annotations/Utils/MetadataUtils";
import {Metadata} from "@/Annotations/Metadata";
import {MetadataTypes} from "@/Annotations/Constants";

export function BaseTaggedDecorator(tag: String | Symbol | Number) {
    return function (key: Identifier) {
        return function (target: any, propertyKey?: string, index?: number) {
            if (key === undefined) {
                const targetName = typeof target === 'function' ? target.name : target.constructor.name;
                throw new MissingParameterError(`Missing parameter for ${targetName}.${propertyKey} at index ${index}`);
            }

            return MetadataUtils
                .createTaggedDecorator(
                    new Metadata(tag, key)
                )(
                    target,
                    propertyKey,
                    index
                )
        }
    }

}
