/**
 * @file Target.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-13
 *
 * @changelog
 *  - 2024-02-13 - Higor Grigorio
 *    - Create Target.ts.
 */

import { Identifier, Target as TargetContract, TargetType } from '@/Contracts/Container';
import { Metadata } from '@/Contracts/Annotations';
import { UniqueSymbol } from '@/Symbol';
import { MetaTags } from '@/Annotations/Constants';

export class Target implements TargetContract {
  private id: UniqueSymbol;

  constructor(
    private type: TargetType,
    private name: String | Symbol,
    private metadata: Metadata[],
    private identifier: Identifier,
  ) {
  }

  public hasTag(tag: String): Boolean {
    return this.metadata.some((meta) => meta.key === tag);
  }

  getIdentifier(): Identifier {
    return this.identifier;
  }

  isOptional(): Boolean {
    return this.hasTag(MetaTags.Optional)
  }

  isTagged(): Boolean {
    return this.hasTag(MetaTags.Tagged);
  }

  isArray(): Boolean {
    return this.hasTag(MetaTags.Array);
  }

  getName(): String | Symbol {
    return this.name;
  }

  getType(): TargetType {
    return this.type;
  }
}
