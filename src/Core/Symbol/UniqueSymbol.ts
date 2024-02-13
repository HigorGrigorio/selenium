/**
 * @file UniqueSymbol.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-03
 *
 * @changelog
 *  - 2024-02-03 - Higor Grigorio
 *    - Create UniqueSymbol.ts.
 */

import { v4 } from 'uuid';
import { Nullable, Stringable, Valuable } from '@/Contracts/Core';

export class UniqueSymbol
  implements Valuable<String>, Stringable {
  private readonly value: String;

  constructor(value: Nullable<String> = null) {
    this.value = value ?? v4();
  }

  public toString(): String {
    return this.value;
  }

  public toValue(): String {
    return this.value;
  }

  public static make(value: Nullable<String> = null): UniqueSymbol {
    return new UniqueSymbol(value);
  }

  public static flatten(value: Nullable<UniqueSymbol | String>): UniqueSymbol {
    if (value instanceof UniqueSymbol) {
      return value;
    }

    return UniqueSymbol.make(value)
  }
}
