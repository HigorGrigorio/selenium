/**
 * @file Container.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-02
 *
 * @changelog
 *  - 2024-02-02 - Higor Grigorio
 *    - Create Container.ts.
 */

import {BindingAsSyntax, Identifier} from "@/Contracts/Container";
import {Any} from "@/Contracts/Core";

export interface Container {
    alias<U>(alias: String | Symbol, abstract: Identifier<U>): void;

    bind<T>(abstract: Identifier<T>): BindingAsSyntax<T>;

    make<T = any>(abstract: Identifier<T>): T;

    resolve<T = any>(abstract: Identifier<T>, ...args: Any[]): T;

    has(abstract: Identifier): Boolean;
}
