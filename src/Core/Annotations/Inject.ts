/**
 * @file Inject.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-04
 *
 * @changelog
 *  - 2024-02-04 - Higor Grigorio
 *    - Create Inject.ts.
 */

import {MetaTags} from "@/Annotations/Constants";
import {BaseTaggedDecorator} from "@/Annotations";

export const Inject = BaseTaggedDecorator(MetaTags.Inject);
