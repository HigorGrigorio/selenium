/**
 * @file Target.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-10
 *
 * @changelog
 *  - 2024-02-10 - Higor Grigorio
 *    - Create Target.ts.
 */

import { Identifier, TargetType } from '@/Contracts/Container';

export interface Target {
  getName(): String | Symbol;

  getIdentifier(): Identifier;

  isOptional(): Boolean;

  isTagged(): Boolean;

  isArray(): Boolean;

  hasTag(tag: String): Boolean;

  getType(): TargetType;
}
