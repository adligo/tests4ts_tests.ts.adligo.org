/**
 * Copyright 2025 Adligo Inc / Scott Morgan
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { I_Equatable } from '@ts.adligo.org/i_obj/dist/i_obj.mjs';
import { I_String } from '@ts.adligo.org/i_strings/dist/i_strings.mjs';
import { FastEqualsRecursiveChecker, ComparisionNodeMutant } from '../../tests4ts.ts.adligo.org/src/assertions.mjs';
import { I_AssertionContext, I_EquatableString, I_Test } from '../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs';
import { ApiTrial } from '../../tests4ts.ts.adligo.org/src/trials.mjs';
import { Test } from '../../tests4ts.ts.adligo.org/src/tests4ts.mjs';

export class EqMock implements I_Equatable {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  equals(obj: any): boolean {
    if (this === obj) {
      return true;
    }
    if ((obj as EqMock).name != undefined) {
      if (this.name === obj.name) {
        return true;
      }
    }
    return false;
  }
}

export class EqStrMock implements I_EquatableString {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  hasToStringOverride(): boolean {
    return true;
  }

  equals(obj: any): boolean {
    if (this === obj) {
      return true;
    }
    if ((obj as I_String).toString != undefined) {
      if (this.toString() == obj.toString()) {
        return true;
      }
    }
    return false;
  }

  toString(): string {
    return "eqStr [asAString: " + this.name + "]";
  }

}

export class StrMock implements I_String {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  hasToStringOverride(): boolean {
    return true;
  }

  toString(): string {
    return "eqStr [asAString: " + this.name + "]";
  }

}

const EXPECTED_MESSAGE = (exp: string, act: string, msg?: string) => {
  if (msg == undefined || msg == null) {
    return `\n${msg ? msg + '\n' : ''}The expected is; \n\t'${exp}'\n\n\tHowever the actual is;\n\t'${act}'`;
  }
  return '' + msg + "\nThe expected is; \n\t'" + exp + "'\n\n\tHowever the actual is;\n\t'" + act + "'";
}

export class FastEqualsRecursiveCheckerTrial extends ApiTrial {
  public static readonly CLAZZ_NAME = 'org.adligo.ts.tests4ts_tests.FastEqualsRecursiveCheckerTrial';
  public static new() {
    return new FastEqualsRecursiveCheckerTrial();
  }

  public static readonly TESTS: I_Test[] = [
    new Test(
      'testNotEqualsShallowFailures', (ac: I_AssertionContext) => {

        let chk: FastEqualsRecursiveChecker = new FastEqualsRecursiveChecker();
        let undefResult = chk.fastEquals(undefined, '');
        ac.same(false, undefResult.isSuccess());
        ac.same(1, undefResult.getAssertionCount());

        let nullResult = chk.fastEquals(null, '');
        ac.same(false, nullResult.isSuccess());
        ac.same(1, nullResult.getAssertionCount());

        let nanResult = chk.fastEquals(NaN, '');
        ac.same(false, nanResult.isSuccess());
        ac.same(1, nanResult.getAssertionCount());
      }),
    new Test(
      'testNotEqualsShallowSuccesses', (ac: I_AssertionContext) => {

        let chk: FastEqualsRecursiveChecker = new FastEqualsRecursiveChecker();
        let undefResult = chk.fastEquals(undefined, undefined);
        ac.same(true, undefResult.isSuccess());
        ac.same(1, undefResult.getAssertionCount());

        let nullResult = chk.fastEquals(null, null);
        ac.same(true, nullResult.isSuccess());
        ac.same(1, nullResult.getAssertionCount());

        let nanResult = chk.fastEquals(NaN, NaN);
        ac.same(true, nanResult.isSuccess());
        ac.same(1, nanResult.getAssertionCount());
      })
  ]

    ;
  constructor() {
    super(FastEqualsRecursiveCheckerTrial.CLAZZ_NAME, FastEqualsRecursiveCheckerTrial.TESTS);
  }
}
