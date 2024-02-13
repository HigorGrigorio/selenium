/**
 * @file BindingWhenBuilder.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-09
 *
 * @changelog
 *  - 2024-02-09 - Higor Grigorio
 *    - Create BindingWhenBuilder.ts.
 */
import {Binding, Constraint} from "@/Contracts/Container";

export class BindingWhenBuilder<T> {

    constructor(
        private readonly binding: Binding<T>
    ) {
    }

    public when(constraint: Constraint<T>): BindingWhenBuilder<T> {
        this.binding.constraint = constraint;

        return new BindingWhenBuilder(this.binding);
    }
}
