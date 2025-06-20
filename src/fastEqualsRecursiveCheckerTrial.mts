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

import { isNil } from '@ts.adligo.org/type-guards/dist/typeGuards.mjs';
import { FastEqualsRecursiveChecker, ComparisionNodeMutant } from '../../tests4ts.ts.adligo.org/src/assertions.mjs';
import { I_AssertionContext, I_EquatableString, I_Test } from '../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs';
import { ApiTrial } from '../../tests4ts.ts.adligo.org/src/trials.mjs';
import { Test, TestParams } from '../../tests4ts.ts.adligo.org/src/tests.mjs';

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

class AssertFastEqualsParams {
  get count(): number {
    return this._count;
  }
  public static readonly CHECKER = new FastEqualsRecursiveChecker();
  private static AC: I_AssertionContext;

  /**
   * All tests in this class will share the same AssertionContext instance
   * so this will be fine
   * @param ac
   */
  public static setAC(ac: I_AssertionContext) {
    AssertFastEqualsParams.AC = ac;
  }

  private _actual: any;
  /**
   * The assertion count
   * @private
   */
  private _count: number;
  private _expected: any;
  private _message: string;

  constructor(expected: any, actual: any, message: string, count?: number) {
    this._expected = expected;
    this._actual = actual;
    this._message = message;
    this._count = count;
  }

  getAc(): I_AssertionContext {
    return AssertFastEqualsParams.AC;
  }

  getActual(): any {
    return this._actual;
  }

  getChecker(): FastEqualsRecursiveChecker {
    return AssertFastEqualsParams.CHECKER;
  }

  getCount(): number {
    return this._count;
  }

  getExpected(): any {
    return this._expected;
  }

  getMessage(): string {
    return this._message;
  }

  hasCount(): boolean {
    if (isNil(this._count)) {
      return false;
    }
    return true;
  }
}
export class FastEqualsRecursiveCheckerTrial extends ApiTrial {
  public static readonly CLAZZ_NAME = 'org.adligo.ts.tests4ts_tests.FastEqualsRecursiveCheckerTrial';

  constructor() {
    super(FastEqualsRecursiveCheckerTrial.CLAZZ_NAME);
  }

  testFastEqualsShallowTypeFailures(ac: I_AssertionContext) {

    AssertFastEqualsParams.setAC(ac);
    let chk: FastEqualsRecursiveChecker = new FastEqualsRecursiveChecker();
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
      [], true, "An Array MUST fail fast equals with a boolean."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        [], new Map(), "An Array MUST fail fast equals with a Map."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
      [], NaN, "An Array MUST fail fast equals with a NaN."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
      [], null, "An Array MUST fail fast equals with a null."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
      [], {}, "An Array MUST fail fast equals with a object."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
      [], '', "An Array MUST fail fast equals with a string."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
      [], undefined, "An Array MUST fail fast equals with a undefined."));
    //Nan
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        NaN, [], "An NaN MUST fail fast equals with a array."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        NaN, true, "An NaN MUST fail fast equals with a boolean."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        NaN, new Map(), "An NaN MUST fail fast equals with a Map."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        NaN, null, "An NaN MUST fail fast equals with a null."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        NaN, {}, "An NaN MUST fail fast equals with a object."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        NaN, '', "An NaN MUST fail fast equals with a string."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        NaN, undefined, "An NaN MUST fail fast equals with a undefined."));
    //Null
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        null, [], "An null MUST fail fast equals with a array."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        null, true, "An null MUST fail fast equals with a boolean."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        null, new Map(), "An null MUST fail fast equals with a Map."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        null, {}, "An null MUST fail fast equals with a object."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        null, '', "An null MUST fail fast equals with a string."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        null, undefined, "An null MUST fail fast equals with a undefined."));
    //Object 
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        {}, [], "An Object MUST fail fast equals with a Array."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        {}, true, "An Object MUST fail fast equals with a boolean."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        {}, new Map(), "An Object MUST fail fast equals with a Map."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        {}, null, "An Object MUST fail fast equals with a null."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        {}, '', "An Object MUST fail fast equals with a string."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        {}, undefined, "An Object MUST fail fast equals with a undefined."));

    //String
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        '', [], "An string MUST fail fast equals with a Array."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        '', true, "An string MUST fail fast equals with a boolean."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        '', new Map(), "An string MUST fail fast equals with a Map."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        '', null, "An string MUST fail fast equals with a null."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        '', {}, "An string MUST fail fast equals with a Object."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        '', undefined, "An string MUST fail fast equals with a undefined."));

    //Undefined
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        undefined, [], "An undefined MUST fail fast equals with a Array."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        undefined, true, "An undefined MUST fail fast equals with a boolean."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        undefined, new Map(), "An undefined MUST fail fast equals with a Map."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        undefined, null, "An undefined MUST fail fast equals with a null."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        undefined, {}, "An undefined MUST fail fast equals with a Object."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(new AssertFastEqualsParams(
        undefined, '', "An undefined MUST fail fast equals with a string."));
  }

  testFastEqualsShallowSuccesses(ac: I_AssertionContext) {

    let chk: FastEqualsRecursiveChecker = new FastEqualsRecursiveChecker();
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(new AssertFastEqualsParams(
       [], [], "Two empty arrays should be equal.", 2
    ));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(new AssertFastEqualsParams(
        true, true, "Two booleans should be equal."
    ));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(new AssertFastEqualsParams(
        new Map(), new Map(), "Two empty maps should be equal.", 2
    ));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(new AssertFastEqualsParams(
        NaN, NaN, "Two NaNs should be equal."
    ));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(new AssertFastEqualsParams(
        null, null, "Two nulls should be equal."
    ));
    /** this one is weird, but complies with the specification, sorry if you want to compare object
     * you need to turn them into strings with JSON.stringify or override the equals method
     * but first fixing the build that I accidently broke
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(new AssertFastEqualsParams(
        {}, {}, "Two empty Objects should be equal."
    ));
     */
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(new AssertFastEqualsParams(
        '', '', "Two empty strings should be equal."
    ));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(new AssertFastEqualsParams(
        undefined, undefined, "Two undefineds should be equal."
    ));
  }


  private static assertFastEqualsShallowFailure(params: AssertFastEqualsParams) {
    let chk: FastEqualsRecursiveChecker = params.getChecker();
    let expected = params.getExpected();
    let actual = params.getActual();
    let result = chk.fastEquals(expected, actual);
    params.getAc().same(false, result.isSuccess(), params.getMessage() + ' isSuccess.');
    params.getAc().same(1, result.getAssertionCount(), params.getMessage() + ' getAssertionCount.');
  }

  private static assertFastEqualsShallowSuccess(params: AssertFastEqualsParams) {
    let chk: FastEqualsRecursiveChecker = params.getChecker();
    let expected = params.getExpected();
    let actual = params.getActual();
    let result = chk.fastEquals(expected, actual);
    params.getAc().same(true, result.isSuccess(), params.getMessage() + ' isSuccess.');
    if (params.hasCount()) {
      params.getAc().same(params.getCount(), result.getAssertionCount(), params.getMessage() + ' getAssertionCount.');
    } else {
      params.getAc().same(1, result.getAssertionCount(), params.getMessage() + ' getAssertionCount.');
    }
  }
}
