/**
 * @file MetadataUtils.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-04
 *
 * @changelog
 *  - 2024-02-04 - Higor Grigorio
 *    - Create MetadataUtils.ts.
 */
import 'reflect-metadata';
import {Optional, Prototype, Stringable} from "@/Contracts/Core";
import {Metadata} from "@/Contracts/Annotations";
import {Arr, Utils} from "@/Utils";
import {ConstructorFunction} from "@/Contracts/Core/ConstructorFunction";
import {LogicalError} from "@/Errors";
import {MetadataTypes} from "@/Annotations/Constants";

export class MetadataUtils {

    protected static ensureNoMetadataKeyDuplicates(metadata: Metadata | Array<Metadata>): Array<Metadata> {
        if (Array.isArray(metadata)) {
            if (Arr.isDuplicated(metadata.map(m => m.key))) {
                throw new Error('Duplicated metadata was found. Please, ensure that you are not using the same metadata key more than once.');
            }
        } else {
            metadata = [metadata];
        }
        return metadata;
    }

    protected static tagParameterOrProperty(
        metadataKey: string,
        target: Prototype<unknown>,
        key: string | symbol,
        metadata: Metadata | Array<Metadata>
    ) {
        const metadatas = this.ensureNoMetadataKeyDuplicates(metadata);
        let paramsOrPropertiesMetadata: Record<string | symbol, Optional<Array<Metadata>>> = {};

        if (Reflect.hasOwnMetadata(metadataKey, target)) {
            paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, target);
        }

        let paramOrPropertyMetadata: Array<Metadata> = paramsOrPropertiesMetadata[key as string] ?? [];

        if (paramOrPropertyMetadata.length > 0) {
            for (const meta of metadatas) {
                if (metadatas.some(m => m.key === meta.key)) {
                    throw new LogicalError(`Duplicated metadata key "${meta.key}" was found. Please, ensure that you are not using the same metadata key more than once.`);
                }
            }
        }

        // set metadata
        paramOrPropertyMetadata.push(...metadatas);
        paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
        Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, target);
    }

    protected static throwIfMethodParameter(parameterName: Optional<Stringable>) {
        if (parameterName !== undefined) {
            throw new LogicalError('It is not possible to tag method parameters. Please, use the tagParameter decorator instead.');
        }
    }

    public static tagParameter(
        annotationTarget: ConstructorFunction | Prototype<unknown>,
        parameterName: Optional<Stringable>,
        parameterIndex: number,
        metadata: Metadata | Array<Metadata>
    ) {
        this.throwIfMethodParameter(parameterName);
        this.tagParameterOrProperty(MetadataTypes.Tagged, annotationTarget, parameterIndex.toString(), metadata);
    }

    public static tagProperty(
        annotationTarget: Prototype<unknown>,
        propertyName: string | symbol,
        metadata: Metadata | Array<Metadata>
    ) {
        if (!Utils.isAbstract(annotationTarget)) { // if is constructor
            throw new LogicalError('Cannot tag properties of a constructor. Please, use the tagParameter decorator instead.');
        }

        this.tagParameterOrProperty(MetadataTypes.TaggedProperty, annotationTarget, propertyName, metadata);
    }

    public static createTaggedDecorator(
        metadata: Metadata | Array<Metadata>,
    ) {
        return <T>(
            target: ConstructorFunction<T> | Prototype<T>,
            targetKey?: Stringable,
            indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<T>,
        ) => {
            if (typeof indexOrPropertyDescriptor === 'number') {
                MetadataUtils.tagParameter(target, targetKey, indexOrPropertyDescriptor, metadata);
            } else {
                MetadataUtils.tagProperty(target, targetKey as string | symbol, metadata);
            }
        };
    }
}
