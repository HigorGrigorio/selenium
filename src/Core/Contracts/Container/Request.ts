/**
 * @file Request.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-09
 *
 * @changelog
 *  - 2024-02-09 - Higor Grigorio
 *    - Create Request.ts.
 */

import { UniqueSymbol } from '@/Symbol';
import { Binding, Container, Identifier, RequestScope, Target } from '@/Contracts/Container';

export interface Request<T = unknown> {
  id: UniqueSymbol;

  getBindings(): Binding<T>[];

  getIdentifier(): Identifier<T>;

  getScope(): RequestScope;

  getTarget(): Target;

  getContainer(): Container;

  getParent(): Request<T> | null;
}
