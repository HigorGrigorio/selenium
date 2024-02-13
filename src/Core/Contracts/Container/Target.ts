/**
 * @file Target.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-10
 *
 * @changelog
 *  - 2024-02-10 - Higor Grigorio
 *    - Create Target.ts.
 */

export interface Target {
    getName(): String;
    getIdentifier(): String;
    isOptional():Boolean;
    isTagged():Boolean;
    isArray():Boolean;
}
