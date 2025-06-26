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

export class EqualsRecursiveCheckerFastLevelOneTrial extends ApiTrial {
  public static readonly CLAZZ_NAME = 'org.adligo.ts.tests4ts_tests.assertions.equals.EqualsRecursiveCheckerFastLevelOneTrial';

  constructor() {
    super(EqualsRecursiveCheckerFastLevelOneTrial.CLAZZ_NAME);
  }

  testFastEqualsDeepLevelOneArrayItemFailures(ac: I_AssertionContext) {
    let c = [[true]];
    let d = [[false]];

    let checker = new EqualsRecursiveChecker(FastOrDeep.Fast);
    let result1: RecursiveEqualsResult = checker.equals(c, d);

    //deep first assertions
    let cNode1: I_ComparisionNode = result1.getComparisionNode();
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
}
