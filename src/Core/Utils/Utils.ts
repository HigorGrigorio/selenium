/**
 * @file Utils.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-03
 *
 * @changelog
 *  - 2024-02-03 - Higor Grigorio
 *    - Create Utils.ts.
 */

import {NonNullError} from "@/Errors";
import {Abstract, Newable, Nullable} from "@/Contracts/Core";
import {Closure} from "@/Contracts/Container";

export class Utils {
    public static throwIfNull<T>(value: T, name: Nullable<string> = null): value is NonNullable<T> {
        if (value === null || value === undefined) {
            throw new NonNullError(name ?? 'parameter');
        }

        return true;
    }

    public static isNewable<T>(value: any): value is Newable<T> {
        return typeof value === 'function'
            && 'prototype' in value
            && value.prototype.constructor === value;
    }

    public static isAbstract<T>(value: any): value is Abstract<T> {
        return 'prototype' in value
    }

    public static isClosure<T>(value: any): value is Closure<T> {
        return typeof value === 'function'
            && !('prototype' in value);
    }

    public static isObject(value: any): value is object {
        return typeof value === "object"
            ? value !== null
            : typeof value === "function";
    }
}
