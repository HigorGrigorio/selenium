/**
 * @file Arr.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-04
 *
 * @changelog
 *  - 2024-02-04 - Higor Grigorio
 *    - Create Arr.ts.
 */
import {Nullable} from "@/Contracts/Core";

export class Arr {
    public static wrap<T>(value: T | T[]): T[] {
        return Array.isArray(value) ? value : [value];
    }

    public static getFirstArrayDuplicate<T>(arr: T[]): Nullable<T> {
        const seen = new Set<T>();
        for (const item of arr) {
            if (seen.has(item)) {
                return item;
            }
            seen.add(item);
        }
        return null;
    }

    public static isDuplicated<T>(arr: T[]): boolean {
        return new Set(arr).size !== arr.length;
    }
}
