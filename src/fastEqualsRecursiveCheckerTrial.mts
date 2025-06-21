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
import { ComparisionNodeMutant } from '../../tests4ts.ts.adligo.org/src/comparisonNodes.mjs';
import { RecursiveEqualsResult } from '../../tests4ts.ts.adligo.org/src/equalsResults.mjs';
import { FastEqualsRecursiveChecker } from '../../tests4ts.ts.adligo.org/src/fastEquals.mjs';

import { ComparisionNodeType, ComparisonNodeInfoType, TypeName } from '../../i_tests4ts_types.ts.adligo.org/src/i_tests4ts_types.mjs';
import {
  I_AssertionContext, I_ComparisionArrayInfo,
  I_ComparisionBaseInfo, I_ComparisionMapValueInfo,
  I_ComparisionNode,
  I_EquatableString,
  I_Test
} from '../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs';
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



  private _ac: I_AssertionContext;
  private _actual: any;
  private _checker: FastEqualsRecursiveChecker;
  /**
   * The assertion count
   * @private
   */
  private _count: number;
  private _expected: any;
  private _message: string;

  constructor(ac: I_AssertionContext, checker: FastEqualsRecursiveChecker) {
    this._ac = ac;
    this._checker = checker;
  }

  getAc(): I_AssertionContext {
    return this._ac;
  }

  getActual(): any {
    return this._actual;
  }

  getChecker(): FastEqualsRecursiveChecker {
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
  _checker: FastEqualsRecursiveChecker;
  
  constructor(ac: I_AssertionContext, checker: FastEqualsRecursiveChecker) {
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

export class FastEqualsRecursiveCheckerTrial extends ApiTrial {
  public static readonly CLAZZ_NAME = 'org.adligo.ts.tests4ts_tests.FastEqualsRecursiveCheckerTrial';

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

  constructor() {
    super(FastEqualsRecursiveCheckerTrial.CLAZZ_NAME);
  }

  testFastEqualsDeepLevelOneArrayItemFailures(ac: I_AssertionContext) {
    let c = [[true]];
    let d = [[false]];

    let checker = new FastEqualsRecursiveChecker();
    let result1: RecursiveEqualsResult = checker.fastEquals(c, d);

    //deep first assertions
    let cNode1: I_ComparisionNode = result1.getComparisionNode();
    ac.same(ComparisonNodeInfoType.Type, cNode1.getInfoType(), "The top most node type for c fastEquals d should be Array");
    ac.isTrue(cNode1.hasChildInfo(), "cNode1 should have child info");
    ac.isTrue(cNode1.getChildInfoSize() >= 1, "cNode1 should have at least one child");
    ac.same(ComparisonNodeInfoType.Type, cNode1.getChildInfo(0).getInfoType(),
        "cNode1's child at index 0 should be an Type");

    //
    //console.log('hmm' + JSON.stringify(cNode1.getChildInfo(1)));
    ac.isTrue(cNode1.getChildInfoSize() >= 2, "cNode1 should have at least two children");
    ac.same(ComparisonNodeInfoType.CollectionSize, cNode1.getChildInfo(1).getInfoType(),
        "cNode1's child at index 1 should be an CollectionSize");

    ac.isTrue(cNode1.getChildInfoSize() >= 3, "cNode1 should have at least three children");
    ac.same(ComparisonNodeInfoType.Array, cNode1.getChildInfo(2).getInfoType(),
        "cNode1's child at index 2 should be an Array");
    ac.same(0, (cNode1.getChildInfo(2) as I_ComparisionArrayInfo).getIndex() ,
        "cNode1's child at index 2 should have a index of 1");

    ac.isTrue(cNode1.getChildInfoSize() >= 4, "cNode1 should have at least four children");
    ac.same(ComparisonNodeInfoType.Type, cNode1.getChildInfo(3).getInfoType(),
        "cNode1's child at index 3 should be an Type");

    ac.isTrue(cNode1.getChildInfoSize() >= 5, "cNode1 should have at least five children");
    ac.same(ComparisonNodeInfoType.CollectionSize, cNode1.getChildInfo(4).getInfoType(),
        "cNode1's child at index 4 should be an CollectionSize");

    ac.isTrue(cNode1.getChildInfoSize() >= 6, "cNode1 should have at least six children");
    ac.same(ComparisonNodeInfoType.Array, cNode1.getChildInfo(5).getInfoType(),
        "cNode1's child at index 5 should be an Array");
    ac.same(0, (cNode1.getChildInfo(5) as I_ComparisionArrayInfo).getIndex() ,
        "cNode1's child at index 5 should have a index of 1");

    ac.isTrue(cNode1.getChildInfoSize() >= 7, "cNode1 should have at least seven children");
    let arrayZeroCompare: ComparisionNodeMutant = cNode1.getChildInfo(6) as ComparisionNodeMutant;
    ac.same(true, arrayZeroCompare.getExpected(),
        "cNode1's child at index 4 [0,0] should have true for expected");
    ac.same(false, arrayZeroCompare.getActual(),
        "cNode1's child at index 4 [0,0] should have false for actual");

    ac.same(5, cNode1.getAssertionCount(), "The top most assertion count for c fastEquals d should be 1");

  }

  testFastEqualsDeepLevelTwoArrayItemFailures(ac: I_AssertionContext) {
    let g = [[1,2,3], [4, 5, 'i']];
    let h = [[1,2,3], [4, 5, 'k']];

    let checker = new FastEqualsRecursiveChecker();
    let result1: RecursiveEqualsResult = checker.fastEquals(g, h);

    //deep first assertions
    let cNode1: I_ComparisionNode = result1.getComparisionNode();
    ac.same(ComparisonNodeInfoType.Type, cNode1.getInfoType(), "The top most node type for g fastEquals h should be Array");
    ac.isTrue(cNode1.hasChildInfo(), "cNode1 should have child info");
    ac.isTrue(cNode1.getChildInfoSize() >= 1, "cNode1 should have at least one child");
    ac.same(ComparisonNodeInfoType.Type, cNode1.getChildInfo(0).getInfoType(),
        "cNode1's child at index 0 should be an Type");

    //
    //console.log('hmm' + JSON.stringify(cNode1.getChildInfo(1)));
    ac.isTrue(cNode1.getChildInfoSize() >= 2, "cNode1 should have at least two children");
    ac.same(ComparisonNodeInfoType.CollectionSize, cNode1.getChildInfo(1).getInfoType(),
        "cNode1's child at index 1 should be an CollectionSize");

    ac.isTrue(cNode1.getChildInfoSize() >= 3, "cNode1 should have at least three children");
    ac.same(ComparisonNodeInfoType.Array, cNode1.getChildInfo(2).getInfoType(),
        "cNode1's child at index 2 should be an Array");
    ac.same(1, (cNode1.getChildInfo(2) as I_ComparisionArrayInfo).getIndex() ,
        "cNode1's child at index 2 should have a index of 1");

    ac.isTrue(cNode1.getChildInfoSize() >= 4, "cNode1 should have at least four children");
    ac.same(ComparisonNodeInfoType.Type, cNode1.getChildInfo(3).getInfoType(),
        "cNode1's child at index 3 should be an Type");

    ac.isTrue(cNode1.getChildInfoSize() >= 5, "cNode1 should have at least five children");
    ac.same(ComparisonNodeInfoType.CollectionSize, cNode1.getChildInfo(4).getInfoType(),
        "cNode1's child at index 4 should be an CollectionSize");

    ac.isTrue(cNode1.getChildInfoSize() >= 6, "cNode1 should have at least six children");
    ac.same(ComparisonNodeInfoType.Array, cNode1.getChildInfo(5).getInfoType(),
        "cNode1's child at index 5 should be an Array");
    ac.same(2, (cNode1.getChildInfo(5) as I_ComparisionArrayInfo).getIndex() ,
        "cNode1's child at index 2 should have a index of 1");

    ac.isTrue(cNode1.getChildInfoSize() >= 7, "cNode1 should have at least seven children");
    let arrayZeroCompare: ComparisionNodeMutant = cNode1.getChildInfo(6) as ComparisionNodeMutant;
    ac.same('i', arrayZeroCompare.getExpected(),
        "cNode1's child at index 4 [1,2] should have true for expected");
    ac.same('k', arrayZeroCompare.getActual(),
        "cNode1's child at index 4 [1,2] should have false for actual");

    ac.same(12, cNode1.getAssertionCount(), "The top most assertion count for h fastEquals h should be 1");

  }

  testFastEqualsDeepLevelThreeArrayItemFailures(ac: I_AssertionContext) {
    let e = [[1,2,3], [4, 5, 6], [6,7,[9, 10, 11]]];
    let f = [[1,2,3], [4, 5, 6], [6,7,[9, 10, 12]]];

    let checker = new FastEqualsRecursiveChecker();
    let result1: RecursiveEqualsResult = checker.fastEquals(e, f);

    //deep first assertions
    let cNode1: I_ComparisionNode = result1.getComparisionNode();
    ac.same(ComparisonNodeInfoType.Type, cNode1.getInfoType(), "The top most node type for c fastEquals d should be Array");
    ac.isTrue(cNode1.hasChildInfo(), "cNode1 should have child info");
    ac.isTrue(cNode1.getChildInfoSize() >= 1, "cNode1 should have at least one child");
    ac.same(ComparisonNodeInfoType.Type, cNode1.getChildInfo(0).getInfoType(),
        "cNode1's child at index 0 should be an Type");

    //
    //console.log('hmm' + JSON.stringify(cNode1.getChildInfo(1)));
    ac.isTrue(cNode1.getChildInfoSize() >= 2, "cNode1 should have at least two children");
    ac.same(ComparisonNodeInfoType.CollectionSize, cNode1.getChildInfo(1).getInfoType(),
        "cNode1's child at index 1 should be an CollectionSize");

    ac.isTrue(cNode1.getChildInfoSize() >= 3, "cNode1 should have at least three children");
    ac.same(ComparisonNodeInfoType.Array, cNode1.getChildInfo(2).getInfoType(),
        "cNode1's child at index 2 should be an Array");
    ac.same(2, (cNode1.getChildInfo(2) as I_ComparisionArrayInfo).getIndex() ,
        "cNode1's child at index 2 should have a index of 2");

    ac.isTrue(cNode1.getChildInfoSize() >= 4, "cNode1 should have at least three children");
    ac.same(ComparisonNodeInfoType.Type, cNode1.getChildInfo(3).getInfoType(),
        "cNode1's child at index 3 should be an Type");

    ac.isTrue(cNode1.getChildInfoSize() >= 5, "cNode1 should have at least five children");
    ac.same(ComparisonNodeInfoType.CollectionSize, cNode1.getChildInfo(4).getInfoType(),
        "cNode1's child at index 4 should be an CollectionSize");

    ac.isTrue(cNode1.getChildInfoSize() >= 6, "cNode1 should have at least six children");
    ac.same(ComparisonNodeInfoType.Array, cNode1.getChildInfo(5).getInfoType(),
        "cNode1's child at index 2 should be an Array");
    ac.same(2, (cNode1.getChildInfo(5) as I_ComparisionArrayInfo).getIndex() ,
        "cNode1's child at index 5 should have a index of 2");

    ac.isTrue(cNode1.getChildInfoSize() >= 7, "cNode1 should have at least seven children");
    ac.same(ComparisonNodeInfoType.Type, cNode1.getChildInfo(6).getInfoType(),
        "cNode1's child at index 6 should be an Type");

    ac.isTrue(cNode1.getChildInfoSize() >= 8, "cNode1 should have at least eight children");
    ac.same(ComparisonNodeInfoType.CollectionSize, cNode1.getChildInfo(7).getInfoType(),
        "cNode1's child at index 7 should be an CollectionSize");

    ac.isTrue(cNode1.getChildInfoSize() >= 9, "cNode1 should have at least nine children");
    ac.same(ComparisonNodeInfoType.Array, cNode1.getChildInfo(8).getInfoType(),
        "cNode1's child at index 8 should be an Array");
    ac.same(2, (cNode1.getChildInfo(8) as I_ComparisionArrayInfo).getIndex() ,
        "cNode1's child at index 8 should have a index of 2");

    ac.isTrue(cNode1.getChildInfoSize() >= 10, "cNode1 should have at least ten children");
    let arrayZeroCompare: ComparisionNodeMutant = cNode1.getChildInfo(9) as ComparisionNodeMutant;
    ac.same(11, arrayZeroCompare.getExpected(),
        "cNode1's child at index 6 [2,2,2] should have true for expected");
    ac.same(12, arrayZeroCompare.getActual(),
        "cNode1's child at index 6 [2,2,2] should have false for actual");

    ac.same(21, cNode1.getAssertionCount(), "The top most assertion count for e fastEquals f should be 1");
  }


  testFastEqualsDeepLevelThreeMapItemFailures(ac: I_AssertionContext) {
    let mapA = new Map();
    let mapB = new Map();

    let mapA1 = new Map();
    mapA.set('k1', mapA1);
    let mapB1 = new Map();
    mapB.set('k1', mapB1);

    let mapA2 = new Map();
    mapA1.set('k2', mapA2);
    let mapB2 = new Map();
    mapB1.set('k2', mapB2);

    mapA2.set('k3', "abc");
    mapB2.set('k3', "xyz");


    let checker = new FastEqualsRecursiveChecker();
    let result1: RecursiveEqualsResult = checker.fastEquals(mapA, mapB);

    //deep first assertions
    let cNode1: I_ComparisionNode = result1.getComparisionNode();
    ac.same(ComparisonNodeInfoType.Type, cNode1.getInfoType(), "The top most node type for c fastEquals d should be Array");
    ac.isTrue(cNode1.hasChildInfo(), "cNode1 should have child info");
    ac.isTrue(cNode1.getChildInfoSize() >= 1, "cNode1 should have at least one child");
    ac.same(ComparisonNodeInfoType.Type, cNode1.getChildInfo(0).getInfoType(),
        "cNode1's child at index 0 should be an Type");

    //
    //console.log('hmm' + JSON.stringify(cNode1.getChildInfo(1)));
    ac.isTrue(cNode1.getChildInfoSize() >= 2, "cNode1 should have at least two children");
    ac.same(ComparisonNodeInfoType.CollectionSize, cNode1.getChildInfo(1).getInfoType(),
        "cNode1's child at index 1 should be an CollectionSize");

    ac.isTrue(cNode1.getChildInfoSize() >= 3, "cNode1 should have at least three children");
    ac.same(ComparisonNodeInfoType.MapValue, cNode1.getChildInfo(2).getInfoType(),
        "cNode1's child at index 2 should be a MapValue");
    let ciIdx2 = cNode1.getChildInfo(2) as I_ComparisionMapValueInfo;
    console.log(JSON.stringify(ciIdx2));
    ac.same('k1',ciIdx2.getKey() ,
        "cNode1's child at index 2 should have a key of k1");

    ac.isTrue(cNode1.getChildInfoSize() >= 4, "cNode1 should have at least three children");
    ac.same(ComparisonNodeInfoType.Type, cNode1.getChildInfo(3).getInfoType(),
        "cNode1's child at index 3 should be an Type");

    ac.isTrue(cNode1.getChildInfoSize() >= 5, "cNode1 should have at least five children");
    ac.same(ComparisonNodeInfoType.CollectionSize, cNode1.getChildInfo(4).getInfoType(),
        "cNode1's child at index 4 should be an CollectionSize");

    ac.isTrue(cNode1.getChildInfoSize() >= 6, "cNode1 should have at least six children");
    ac.same(ComparisonNodeInfoType.MapValue, cNode1.getChildInfo(5).getInfoType(),
        "cNode1's child at index 2 should be a MapValue");
    ac.same('k2', (cNode1.getChildInfo(5) as I_ComparisionMapValueInfo).getKey() ,
        "cNode1's child at index 5 should have a index of 2");

    ac.isTrue(cNode1.getChildInfoSize() >= 7, "cNode1 should have at least seven children");
    ac.same(ComparisonNodeInfoType.Type, cNode1.getChildInfo(6).getInfoType(),
        "cNode1's child at index 6 should be an Type");

    ac.isTrue(cNode1.getChildInfoSize() >= 8, "cNode1 should have at least eight children");
    ac.same(ComparisonNodeInfoType.CollectionSize, cNode1.getChildInfo(7).getInfoType(),
        "cNode1's child at index 7 should be an CollectionSize");

    ac.isTrue(cNode1.getChildInfoSize() >= 9, "cNode1 should have at least nine children");
    ac.same(ComparisonNodeInfoType.MapValue, cNode1.getChildInfo(8).getInfoType(),
        "cNode1's child at index 8 should be an Array");
    ac.same('k3', (cNode1.getChildInfo(8) as I_ComparisionMapValueInfo).getKey() ,
        "cNode1's child at index 8 should have a index of 2");

    ac.isTrue(cNode1.getChildInfoSize() >= 10, "cNode1 should have at least ten children");
    let arrayZeroCompare: ComparisionNodeMutant = cNode1.getChildInfo(9) as ComparisionNodeMutant;
    ac.same('abc', arrayZeroCompare.getExpected(),
        "cNode1's child at index 6 [2,2,2] should have abc for expected");
    ac.same('xyz', arrayZeroCompare.getActual(),
        "cNode1's child at index 6 [2,2,2] should have xyz for actual");

    ac.same(7, cNode1.getAssertionCount(), "The top most assertion count for e fastEquals f should be 1");
  }

  testFastEqualsShallowArrayItemFailures(ac: I_AssertionContext) {
    let a = [true];
    let b = [false];

    let checker = new FastEqualsRecursiveChecker();
    let result1: RecursiveEqualsResult = checker.fastEquals(a, b);

    //deep first assertions
    let cNode1: I_ComparisionNode = result1.getComparisionNode();
    ac.same(ComparisonNodeInfoType.Type, cNode1.getInfoType(), "The top most node type for a fastEquals b should be Array");
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

    ac.same(3, cNode1.getAssertionCount(), "The top most assertion count for a fastEquals b should be 1");

  }

  testFastEqualsShallowTypeFailures(ac: I_AssertionContext) {

    let paramFactory = new AssertFastEqualsParamsFactory(ac, new FastEqualsRecursiveChecker());
    let chk: FastEqualsRecursiveChecker = new FastEqualsRecursiveChecker();
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
      [], true, "An Array MUST fail fast equals with a boolean."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        [], new Map(), "An Array MUST fail fast equals with a Map."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
      [], NaN, "An Array MUST fail fast equals with a NaN."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
      [], null, "An Array MUST fail fast equals with a null."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
      [], {}, "An Array MUST fail fast equals with a object."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
      [], '', "An Array MUST fail fast equals with a string."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
      [], undefined, "An Array MUST fail fast equals with a undefined."));
    //Nan
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        NaN, [], "An NaN MUST fail fast equals with a array."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        NaN, true, "An NaN MUST fail fast equals with a boolean."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        NaN, new Map(), "An NaN MUST fail fast equals with a Map."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        NaN, null, "An NaN MUST fail fast equals with a null."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        NaN, {}, "An NaN MUST fail fast equals with a object."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        NaN, '', "An NaN MUST fail fast equals with a string."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        NaN, undefined, "An NaN MUST fail fast equals with a undefined."));
    //Null
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        null, [], "An null MUST fail fast equals with a array."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        null, true, "An null MUST fail fast equals with a boolean."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        null, new Map(), "An null MUST fail fast equals with a Map."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        null, {}, "An null MUST fail fast equals with a object."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        null, '', "An null MUST fail fast equals with a string."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        null, undefined, "An null MUST fail fast equals with a undefined."));
    //Object 
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        {}, [], "An Object MUST fail fast equals with a Array."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        {}, true, "An Object MUST fail fast equals with a boolean."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        {}, new Map(), "An Object MUST fail fast equals with a Map."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        {}, null, "An Object MUST fail fast equals with a null."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        {}, '', "An Object MUST fail fast equals with a string."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        {}, undefined, "An Object MUST fail fast equals with a undefined."));

    //String
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        '', [], "An string MUST fail fast equals with a Array."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        '', true, "An string MUST fail fast equals with a boolean."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        '', new Map(), "An string MUST fail fast equals with a Map."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        '', null, "An string MUST fail fast equals with a null."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        '', {}, "An string MUST fail fast equals with a Object."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        '', undefined, "An string MUST fail fast equals with a undefined."));

    //Undefined
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        undefined, [], "An undefined MUST fail fast equals with a Array."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        undefined, true, "An undefined MUST fail fast equals with a boolean."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        undefined, new Map(), "An undefined MUST fail fast equals with a Map."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        undefined, null, "An undefined MUST fail fast equals with a null."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        undefined, {}, "An undefined MUST fail fast equals with a Object."));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowFailure(paramFactory.with(
        undefined, '', "An undefined MUST fail fast equals with a string."));
  }

  testFastEqualsShallowSuccesses(ac: I_AssertionContext) {

    let paramFactory = new AssertFastEqualsParamsFactory(ac, new FastEqualsRecursiveChecker());
    let chk: FastEqualsRecursiveChecker = new FastEqualsRecursiveChecker();
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
       [], [], "Two empty arrays should be equal.", 2
    ));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
        true, true, "Two booleans should be equal."
    ));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
        new Map(), new Map(), "Two empty maps should be equal.", 2
    ));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
        NaN, NaN, "Two NaNs should be equal."
    ));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
        null, null, "Two nulls should be equal."
    ));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
        {}, {}, "Two empty Objects should be equal."
    ));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
        '', '', "Two empty strings should be equal."
    ));
    FastEqualsRecursiveCheckerTrial.assertFastEqualsShallowSuccess(paramFactory.with(
        undefined, undefined, "Two undefineds should be equal."
    ));
  }
}
