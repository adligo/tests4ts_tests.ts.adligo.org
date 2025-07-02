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

import {I_Equatable} from '@ts.adligo.org/i_obj/dist/i_obj.mjs';
import {I_String} from '@ts.adligo.org/i_strings/dist/i_strings.mjs';

import {isNil} from '@ts.adligo.org/type-guards/dist/typeGuards.mjs';
import {ComparisionNodeMutant} from '../../../../tests4ts.ts.adligo.org/src/comparisonNodes.mjs';
import {RecursiveEqualsResult} from '../../../../tests4ts.ts.adligo.org/src/equalsResults.mjs';
import {EqualsRecursiveChecker, FastOrDeep} from '../../../../tests4ts.ts.adligo.org/src/equals.mjs';

import {ComparisonNodeInfoType} from '../../../../i_tests4ts_types.ts.adligo.org/src/i_tests4ts_types.mjs';
import {
  I_AssertionContext,
  I_ComparisionArrayInfo,
  I_ComparisionMapValueInfo,
  I_ComparisionNode,
  I_EquatableString
} from '../../../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs';
import {ApiTrial} from '../../../../tests4ts.ts.adligo.org/src/trials.mjs';

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
  public static readonly CHECKER = new EqualsRecursiveChecker(FastOrDeep.Fast);



  private _ac: I_AssertionContext;
  private _actual: any;
  private _checker: EqualsRecursiveChecker;
  /**
   * The assertion count
   * @private
   */
  private _count: number = 1;
  private _expected: any;
  private _message: string;

  constructor(ac: I_AssertionContext, checker: EqualsRecursiveChecker) {
    this._ac = ac;
    this._checker = checker;
  }

  getAc(): I_AssertionContext {
    return this._ac;
  }

  getActual(): any {
    return this._actual;
  }

  getChecker(): EqualsRecursiveChecker {
    return this._checker;
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
  
  withActual(actual: any): AssertFastEqualsParams  {
    this._actual = actual;
    return this;
  }

  withCount(count: number): AssertFastEqualsParams  {
    this._count = count;
    return this;
  }

  withExpected(expected: any): AssertFastEqualsParams  {
    this._expected = expected;
    return this;
  }

  withMessage(message: any): AssertFastEqualsParams  {
    this._message = message;
    return this;
  }
}

class AssertFastEqualsParamsFactory {
  _ac: I_AssertionContext;
  _checker: EqualsRecursiveChecker;
  
  constructor(ac: I_AssertionContext, checker: EqualsRecursiveChecker) {
    this._ac = ac;
    this._checker = checker;
  }
  
  with(expected: any, actual: any, message: string, count?: number) : AssertFastEqualsParams {
    let r =  new AssertFastEqualsParams(this._ac, this._checker)
        .withActual(actual).withExpected(expected).withMessage(message);
    if ( !isNil(count)) {
      r.withCount(count);
    }
    return r;
  }
}

export class ShallowEqualsRecursiveCheckerTrial extends ApiTrial {
  public static readonly CLAZZ_NAME = 'org.adligo.ts.tests4ts_tests.assertions.equals.ShallowEqualsRecursiveCheckerTrial';

  private static assertFastEqualsShallowFailure(params: AssertFastEqualsParams) {
    let chk: EqualsRecursiveChecker = params.getChecker();
    let expected = params.getExpected();
    let actual = params.getActual();
    let result = chk.equals(expected, actual);
    params.getAc().same(false, result.isSuccess(), params.getMessage() + ' isSuccess.');
    params.getAc().same(params.getCount(), result.getAssertionCount(), params.getMessage() + ' getAssertionCount.');
  }

  private static assertFastEqualsShallowSuccess(params: AssertFastEqualsParams) {
    let chk: EqualsRecursiveChecker = params.getChecker();
    let expected = params.getExpected();
    let actual = params.getActual();
    let result = chk.equals(expected, actual);
    params.getAc().same(true, result.isSuccess(), params.getMessage() + ' isSuccess.');
    if (params.hasCount()) {
      params.getAc().same(params.getCount(), result.getAssertionCount(), params.getMessage() + ' getAssertionCount.');
    } else {
      params.getAc().same(1, result.getAssertionCount(), params.getMessage() + ' getAssertionCount.');
    }
  }

  constructor() {
    super(ShallowEqualsRecursiveCheckerTrial.CLAZZ_NAME);
  }

  testFastEqualsShallowArrayItemFailures(ac: I_AssertionContext) {
    let a = [true];
    let b = [false];

    let checker = new EqualsRecursiveChecker(FastOrDeep.Fast);
    let result1: RecursiveEqualsResult = checker.equals(a, b);

    //deep first assertions
    let cNode1: I_ComparisionNode = result1.getComparisionNode();
    ac.isTrue(cNode1.hasChildInfo(), "cNode1 should have child info");
    ac.isTrue(cNode1.getChildInfoSize() >= 1, "cNode1 should have at least one child");
    ac.same(ComparisonNodeInfoType.Type, cNode1.getChildInfo(0).getInfoType(),
        "cNode1's child at index 0 should be an Type");

    ac.isTrue(cNode1.getChildInfoSize() >= 2, "cNode1 should have at least two child");
    ac.same(ComparisonNodeInfoType.CollectionSize, cNode1.getChildInfo(1).getInfoType(),
        "cNode1's child at index 1 should be an CollectionSize");

    ac.isTrue(cNode1.getChildInfoSize() >= 3, "cNode1 should have at least three children");
    ac.same(ComparisonNodeInfoType.Array, cNode1.getChildInfo(2).getInfoType(),
        "cNode1's child at index 3 should be an Array");
    ac.same(0, (cNode1.getChildInfo(2) as I_ComparisionArrayInfo).getIndex() ,
        "cNode1's child at index 3 should have a index of 0");
    //
    //console.log('hmm' + JSON.stringify(cNode1.getChildInfo(1)));
    ac.isTrue(cNode1.getChildInfoSize() >= 4, "cNode1 should have at least four child");
    let arrayZeroCompare: ComparisionNodeMutant = cNode1.getChildInfo(3) as ComparisionNodeMutant;
    ac.same(ComparisonNodeInfoType.Equal, arrayZeroCompare.getInfoType(),
        "cNode1's child at index 3 should be an Equal");
    ac.same(true, arrayZeroCompare.getExpected(),
        "cNode1's child at index 3 should have true for expected");
    ac.same(false, arrayZeroCompare.getActual(),
        "cNode1's child at index 3 should have false for actual");

    ac.same(4, cNode1.getAssertionCount(), "The top most assertion count for a fastEquals b should be 1");

  }

  testFastEqualsShallowTypeFailures(ac: I_AssertionContext) {

    let paramFactory = new AssertFastEqualsParamsFactory(ac,
        new EqualsRecursiveChecker(FastOrDeep.Fast));
    let chk: EqualsRecursiveChecker = new EqualsRecursiveChecker(FastOrDeep.Fast);
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
      [], true, "An Array MUST fail fast equals with a boolean."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        [], new Map(), "An Array MUST fail fast equals with a Map."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
      [], NaN, "An Array MUST fail fast equals with a NaN."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
      [], null, "An Array MUST fail fast equals with a null."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
      [], {}, "An Array MUST fail fast equals with a object."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
      [], '', "An Array MUST fail fast equals with a string."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
      [], undefined, "An Array MUST fail fast equals with a undefined."));
    //Nan
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        NaN, [], "An NaN MUST fail fast equals with a array."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        NaN, true, "An NaN MUST fail fast equals with a boolean."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        NaN, new Map(), "An NaN MUST fail fast equals with a Map."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        NaN, null, "An NaN MUST fail fast equals with a null."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        NaN, {}, "An NaN MUST fail fast equals with a object."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        NaN, '', "An NaN MUST fail fast equals with a string."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        NaN, undefined, "An NaN MUST fail fast equals with a undefined."));
    //Null
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        null, [], "An null MUST fail fast equals with a array."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        null, true, "An null MUST fail fast equals with a boolean."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        null, new Map(), "An null MUST fail fast equals with a Map."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        null, {}, "An null MUST fail fast equals with a object."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        null, '', "An null MUST fail fast equals with a string."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        null, undefined, "An null MUST fail fast equals with a undefined."));
    //Object 
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        {}, [], "An Object MUST fail fast equals with a Array.", 2));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        {}, true, "An Object MUST fail fast equals with a boolean.", 1));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        {}, new Map(), "An Object MUST fail fast equals with a Map.", 2));
    // I guess a null has a typeof actual === 'object'
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        {}, null, "An Object MUST fail fast equals with a null.", 2));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        {}, '', "An Object MUST fail fast equals with a string.", 1));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        {}, undefined, "An Object MUST fail fast equals with a undefined.", 1));

    //String
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        '', [], "An string MUST fail fast equals with a Array."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        '', true, "An string MUST fail fast equals with a boolean."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        '', new Map(), "An string MUST fail fast equals with a Map."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        '', null, "An string MUST fail fast equals with a null."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        '', {}, "An string MUST fail fast equals with a Object."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        '', undefined, "An string MUST fail fast equals with a undefined."));

    //Undefined
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        undefined, [], "An undefined MUST fail fast equals with a Array."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        undefined, true, "An undefined MUST fail fast equals with a boolean."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        undefined, new Map(), "An undefined MUST fail fast equals with a Map."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        undefined, null, "An undefined MUST fail fast equals with a null."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        undefined, {}, "An undefined MUST fail fast equals with a Object."));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        undefined, '', "An undefined MUST fail fast equals with a string."));
  }

  testFastEqualsShallowSuccesses(ac: I_AssertionContext) {

    let paramFactory = new AssertFastEqualsParamsFactory(ac,
        new EqualsRecursiveChecker(FastOrDeep.Fast));
    let chk: EqualsRecursiveChecker = new EqualsRecursiveChecker(FastOrDeep.Fast);
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
       [], [], "Two empty arrays should be equal.", 2
    ));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
        true, true, "Two booleans should be equal."
    ));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
        new Map(), new Map(), "Two empty maps should be equal.", 2
    ));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
        NaN, NaN, "Two NaNs should be equal."
    ));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
        null, null, "Two nulls should be equal."
    ));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
        {}, {}, "Two empty Objects should be equal.", 2
    ));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
        '', '', "Two empty strings should be equal."
    ));
    ShallowEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
        undefined, undefined, "Two undefineds should be equal."
    ));
  }
}
