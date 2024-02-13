/**
 * @file BindingOnSyntax.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-11
 *
 * @changelog
 *  - 2024-02-11 - Higor Grigorio
 *    - Create BindingOnSyntax.ts.
 */

export interface BindingOnSyntax<T> {
    onActivation(callback: (context: T) => void): void;
    onDeactivation(callback: (context: T) => void): void;
}
