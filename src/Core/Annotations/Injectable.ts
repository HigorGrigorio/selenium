/**
 * @file Injectable.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-04
 *
 * @changelog
 *  - 2024-02-04 - Higor Grigorio
 *    - Create Injectable.ts.
 */

import 'reflect-metadata';
import {MetaTags} from "@/Annotations/Constants";
import {Identifier} from "@/Contracts/Container";
import {Nullable} from "@/Contracts/Core";

export function Injectable(identifier: Nullable<Identifier> = null) {
    return (target: any) => {
        if (Reflect.hasOwnMetadata(MetaTags.ParamTypes, target)) {
            throw new Error(`The class ${target.name} is already decorated with @Injectable.`);
        }

        const types = Reflect.getMetadata('design:paramtypes', target) || [];
        Reflect.defineMetadata(MetaTags.ParamTypes, types, target);

        if (identifier) {
            Reflect.defineMetadata(MetaTags.Identifier, identifier, target);
        }

        return target;
    }
}
