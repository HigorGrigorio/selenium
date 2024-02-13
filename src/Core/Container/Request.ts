/**
 * @file Request.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-13
 *
 * @changelog
 *  - 2024-02-13 - Higor Grigorio
 *    - Create Request.ts.
 */


import {
  Binding,
  Container,
  Identifier,
  Request as RequestContract,
  RequestScope,
  Target,
} from '@/Contracts/Container';
import { UniqueSymbol } from '@/Symbol';
import { Nullable } from '@/Contracts/Core';

export class Request<T = unknown> implements RequestContract<T> {
  readonly id: UniqueSymbol;

  constructor(
    private identifier: Identifier<T>,
    private scope: RequestScope,
    private bindings: Binding<T>[],
    private target: Target,
    private container: Container,
    private parent: RequestContract<T> | null = null,
    id: Nullable<UniqueSymbol | String> = null,
  ) {
    this.id = UniqueSymbol.flatten(id);
  }

  getBindings(): Binding<T>[] {
    return this.bindings;
  }

  getIdentifier(): Identifier<T> {
    return this.identifier;
  }

  getScope(): RequestScope {
    return this.scope;
  }

  getTarget(): Target {
    return this.target;
  }

  getContainer(): Container {
    return this.container;
  }

  getParent(): RequestContract<T> | null {
    return this.parent;
  }
}
