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


import { ComparisonNodeInfoType, TypeName } from '../../../../i_tests4ts_types.ts.adligo.org/src/i_tests4ts_types.mjs';
import {
    I_AssertionContext,
    I_ComparisionArrayInfo,
    I_ComparisionCollectionSizeInfo,
    I_ComparisionEqualInfo,
    I_ComparisionMapValueInfo,
    I_ComparisionSetInfo,
    I_ComparisionTypeInfo
} from '../../../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs';
import { ApiTrial } from '../../../../tests4ts.ts.adligo.org/src/trials.mjs';
import { AssertionContext } from '../../../../tests4ts.ts.adligo.org/src/assertions.mjs';
import {
    ComparisionArrayInfo,
    ComparisionCollectionSizeInfo,
    ComparisionMapInfo,
    ComparisionSetInfo,
    ComparisionTypeInfo,
    RootComparisionNodeMutant,
    ComparisionNodeMutant
} from '../../../../tests4ts.ts.adligo.org/src/comparisonNodes.mjs';
import { RecursiveEqualsResult } from '../../../../tests4ts.ts.adligo.org/src/equalsResults.mjs';


export class EqualsFormatDeepNotEqualsTrial extends ApiTrial {
    public static readonly CLAZZ_NAME = 'org.adligo.ts.tests4ts_tests.assertions.EqualsFormatDeepNotEqualsTrial';


    constructor() {
        super(EqualsFormatDeepNotEqualsTrial.CLAZZ_NAME);
    }


    testEqualsFormatDeepNotEqualsBasicPrimitives(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let rootNode = new RootComparisionNodeMutant("actual", "expected");
        let result = new RecursiveEqualsResult(rootNode, false);


        let formatted = assertionContext.equalsFormatDeepNotEquals(result);
        let expected = "Equals expected;\n" +
            "  'expected'\n" +
            "Actual;\n" +
            "  'actual'\n";


        ac.same(expected, formatted, "Basic primitive formatting should match expected output");
    }


    testEqualsFormatDeepNotEqualsWithMessage(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let rootNode = new RootComparisionNodeMutant(456, 123);
        let result = new RecursiveEqualsResult(rootNode, false);


        let formatted = assertionContext.equalsFormatDeepNotEquals(result, "Custom message");
        let expected = "Custom message\nEquals expected;\n" +
            "  '123'\n" +
            "Actual;\n" +
            "  '456'\n";


        ac.same(expected, formatted, "Formatting with message should match expected output");
    }


    testEqualsFormatDeepNotEqualsWithArrayInfo(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let rootNode = new RootComparisionNodeMutant([1, 2, 4], [1, 2, 3]);
        rootNode.addChildInfo(new ComparisionArrayInfo(2));
        let result = new RecursiveEqualsResult(rootNode, false);


        let formatted = assertionContext.equalsFormatDeepNotEquals(result);
        let expected = "Equals expected;\n" +
            "  '[1,2,3]'\n" +
            "Actual;\n" +
            "  '[1,2,4]'\n" +
            "  #0 Array @ idx 2\n";


        ac.same(expected, formatted, "Array info formatting should match expected output");
    }


    testEqualsFormatDeepNotEqualsWithCollectionSizeInfo(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let rootNode = new RootComparisionNodeMutant([1, 2, 3], [1, 2]);
        rootNode.addChildInfo(new ComparisionCollectionSizeInfo(2, 3));
        let result = new RecursiveEqualsResult(rootNode, false);


        let formatted = assertionContext.equalsFormatDeepNotEquals(result);
        let expected = "Equals expected;\n" +
            "  '[1,2]'\n" +
            "Actual;\n" +
            "  '[1,2,3]'\n" +
            "  #0 CollectionSize expected 2 actual 3\n";


        ac.same(expected, formatted, "Collection size info formatting should match expected output");
    }


    testEqualsFormatDeepNotEqualsWithEqualInfo(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let rootNode = new RootComparisionNodeMutant("parent", "parent");
        let equalInfo = new ComparisionNodeMutant("child1", "child2");
        rootNode.addChildInfo(equalInfo);
        let result = new RecursiveEqualsResult(rootNode, false);


        let formatted = assertionContext.equalsFormatDeepNotEquals(result);
        let expected = "Equals expected;\n" +
            "  'parent'\n" +
            "Actual;\n" +
            "  'parent'\n" +
            "  #0 Equals expected;\n" +
            "    'child1'\n" +
            "  Actual;\n" +
            "    'child2'\n";


        ac.same(expected, formatted, "Equal info formatting should match expected output");
    }


    testEqualsFormatDeepNotEqualsWithMapValueInfo(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let rootNode = new RootComparisionNodeMutant(new Map(), new Map());
        rootNode.addChildInfo(new ComparisionMapInfo("key1", "expectedValue", "actualValue"));
        let result = new RecursiveEqualsResult(rootNode, false);


        let formatted = assertionContext.equalsFormatDeepNotEquals(result);
        let expected = "Equals expected;\n" +
            "  '{}'\n" +
            "Actual;\n" +
            "  '{}'\n" +
            "  #0 MapValue key;\n" +
            "    'key1'\n" +
            "  Expected;\n" +
            "    'expectedValue'\n" +
            "  Actual;\n" +
            "    'actualValue'\n";


        ac.same(expected, formatted, "Map value info formatting should match expected output");
    }

    testEqualsFormatDeepNotEqualsWithTypeInfo(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let rootNode = new RootComparisionNodeMutant(123, "actualS");
        rootNode.addChildInfo(new ComparisionTypeInfo(TypeName.String, TypeName.Number));
        let result = new RecursiveEqualsResult(rootNode, false);


        let formatted = assertionContext.equalsFormatDeepNotEquals(result);
        let expected = "Equals expected;\n" +
            "  'actualS'\n" +
            "Actual;\n" +
            "  '123'\n" +
            "  #0 TypeEquals expected;\n" +
            "    String\n" +
            "  Actual;\n" +
            "    Number\n";


        ac.same(expected, formatted, "Type info formatting should match expected output");
    }


    testEqualsFormatDeepNotEqualsWithMultipleChildInfo(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let rootNode = new RootComparisionNodeMutant([1, 3, 4],[1, 2]);
        rootNode.addChildInfo(new ComparisionArrayInfo(1));
        rootNode.addChildInfo(new ComparisionCollectionSizeInfo(2, 3));
        rootNode.addChildInfo(new ComparisionTypeInfo(TypeName.Array, TypeName.Array));
        let result = new RecursiveEqualsResult(rootNode, false);


        let formatted = assertionContext.equalsFormatDeepNotEquals(result);
        let expected = "Equals expected;\n" +
            "  '[1,2]'\n" +
            "Actual;\n" +
            "  '[1,3,4]'\n" +
            "  #0 TypeEquals expected;\n" +
            "    Array\n" +
            "  Actual;\n" +
            "    Array\n" +
            "    #1 CollectionSize expected 2 actual 3\n" +
            "      #2 Array @ idx 1\n";


        ac.same(expected, formatted, "Multiple child info formatting should match expected output with proper indentation");
    }


    testEqualsFormatDeepNotEqualsWithNullAndUndefined(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let rootNode = new RootComparisionNodeMutant(undefined, null);
        let result = new RecursiveEqualsResult(rootNode, false);


        let formatted = assertionContext.equalsFormatDeepNotEquals(result);
        let expected = "Equals expected;\n" +
            "  'null'\n" +
            "Actual;\n" +
            "  'undefined'\n";


        ac.same(expected, formatted, "Null and undefined formatting should match expected output");
    }


    testEqualsFormatDeepNotEqualsWithComplexObjects(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let expectedObj = { name: "John", age: 30 };
        let actualObj = { name: "Jane", age: 25 };
        let rootNode = new RootComparisionNodeMutant(actualObj, expectedObj);
        let result = new RecursiveEqualsResult(rootNode, false);


        let formatted = assertionContext.equalsFormatDeepNotEquals(result);
        let expected = "Equals expected;\n" +
            "  '{\"name\":\"John\",\"age\":30}'\n" +
            "Actual;\n" +
            "  '{\"name\":\"Jane\",\"age\":25}'\n";


        ac.same(expected, formatted, "Complex object formatting should match expected output");
    }


    // Tests for equalsFormatDeepNotEqualsHelper method specifically
    testEqualsFormatDeepNotEqualsHelperArrayInfo(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let arrayInfo = new ComparisionArrayInfo(5);
        let formatted = assertionContext.equalsFormatDeepNotEqualsHelper(arrayInfo, 3, "    ");


        let expected = "    #3 Array @ idx 5\n";
        ac.same(expected, formatted, "Array info helper formatting should match expected output");
    }


    testEqualsFormatDeepNotEqualsHelperCollectionSizeInfo(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let sizeInfo = new ComparisionCollectionSizeInfo(10, 15);
        let formatted = assertionContext.equalsFormatDeepNotEqualsHelper(sizeInfo, 1, "  ");


        let expected = "  #1 CollectionSize expected 10 actual 15\n";
        ac.same(expected, formatted, "Collection size info helper formatting should match expected output");
    }


    testEqualsFormatDeepNotEqualsHelperEqualInfo(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let equalInfo = new ComparisionNodeMutant("hello", "world");
        let formatted = assertionContext.equalsFormatDeepNotEqualsHelper(equalInfo, 0, "");


        let expected = "#0 Equals expected;\n" +
            "  'hello'\n" +
            "Actual;\n" +
            "  'world'\n";
        ac.same(expected, formatted, "Equal info helper formatting should match expected output");
    }


    testEqualsFormatDeepNotEqualsHelperMapValueInfo(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let mapInfo = new ComparisionMapInfo("testKey", "expectedVal", "actualVal");
        let formatted = assertionContext.equalsFormatDeepNotEqualsHelper(mapInfo, 2, "      ");


        let expected =
            "      #2 MapValue key;\n" +
            "        'testKey'\n" +
            "      Expected;\n" +
            "        'expectedVal'\n" +
            "      Actual;\n" +
            "        'actualVal'\n";
        ac.same(expected, formatted, "Map value info helper formatting should match expected output");
    }


    testEqualsFormatDeepNotEqualsHelperSetInfo(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let missingExpected = new Set(["a", "b"]);
        let missingActuals = new Set(["c", "d"]);
        let setInfo = new ComparisionSetInfo(missingExpected, missingActuals, true);
        let formatted = assertionContext.equalsFormatDeepNotEqualsHelper(setInfo, 4, "        ");


        let expected = "        #4 Set is NOT yet suppored. \n";
        ac.same(expected, formatted, "Set info helper formatting should match expected output");
    }


    testEqualsFormatDeepNotEqualsHelperTypeInfo(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let typeInfo = new ComparisionTypeInfo(TypeName.Boolean, TypeName.String);
        let formatted = assertionContext.equalsFormatDeepNotEqualsHelper(typeInfo, 7, "          ");


        let expected = "          #7 TypeEquals expected;\n" +
            "            Boolean\n" +
            "          Actual;\n" +
            "            String\n";
        ac.same(expected, formatted, "Type info helper formatting should match expected output");
    }


    testEqualsFormatDeepNotEqualsHelperWithSpecialCharacters(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let equalInfo = new ComparisionNodeMutant("line1\nline2\ttab", "special'quote\"double");
        let formatted = assertionContext.equalsFormatDeepNotEqualsHelper(equalInfo, 0, "");


        let expected = "#0 Equals expected;\n" +
            "  'line1\nline2\ttab'\n" +
            "Actual;\n" +
            "  'special'quote\"double'\n";
        ac.same(expected, formatted, "Special characters should be preserved in formatting");
    }


    testEqualsFormatDeepNotEqualsHelperWithEmptyStrings(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let equalInfo = new ComparisionNodeMutant("", "   ");
        let formatted = assertionContext.equalsFormatDeepNotEqualsHelper(equalInfo, 1, "  ");


        let expected = "  #1 Equals expected;\n" +
            "    ''\n" +
            "  Actual;\n" +
            "    '   '\n";
        ac.same(expected, formatted, "Empty and whitespace strings should be formatted correctly");
    }


    testEqualsFormatDeepNotEqualsHelperWithNumbers(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let equalInfo = new ComparisionNodeMutant(3.14159, -42);
        let formatted = assertionContext.equalsFormatDeepNotEqualsHelper(equalInfo, 0, "");


        let expected = "#0 Equals expected;\n" +
            "  '3.14159'\n" +
            "Actual;\n" +
            "  '-42'\n";
        ac.same(expected, formatted, "Numbers should be formatted as strings correctly");
    }


    testEqualsFormatDeepNotEqualsHelperWithBooleans(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();
        let equalInfo = new ComparisionNodeMutant(true, false);
        let formatted = assertionContext.equalsFormatDeepNotEqualsHelper(equalInfo, 0, "");


        let expected = "#0 Equals expected;\n" +
            "  'true'\n" +
            "Actual;\n" +
            "  'false'\n";
        ac.same(expected, formatted, "Booleans should be formatted as strings correctly");
    }

    testEqualsFormatDeepNotEqualsHelperThreeLevelsOfArrays(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();

        let rootNode = new ComparisionNodeMutant([1, [2,[3]]], [1, [2,[4]]]);
        rootNode.addChildInfo(new ComparisionNodeMutant(3,4));
        rootNode.addChildInfo(new ComparisionArrayInfo(0));
        rootNode.addChildInfo(new ComparisionArrayInfo(1));
        rootNode.addChildInfo(new ComparisionArrayInfo(1));

        let result = new RecursiveEqualsResult(rootNode, false);
        let formatted = assertionContext.equalsFormatDeepNotEquals(result);


        let expected = "Equals expected;\n" +
            "  '[1,[2,[3]]]'\n" +
            "Actual;\n" +
            "  '[1,[2,[4]]]'\n" +
            "  #0 Array @ idx 1\n" +
            "    #1 Array @ idx 1\n" +
            "      #2 Array @ idx 0\n" +
            "        #3 Equals expected;\n" +
            "          '3'\n" +
            "        Actual;\n" +
            "          '4'\n";
        ac.same(expected, formatted, "ThreeLevelsOfArrays should be formatted correctly");
    }
    testEqualsFormatDeepNotEqualsHelperThreeLevelsOfArraysStripeMap(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();

        let eMapMid = new Map();
        let aMapMid = new Map();
        eMapMid.set(2,[3]);
        aMapMid.set(2,['a']);
        let rootNode = new ComparisionNodeMutant([1, eMapMid], [1, aMapMid]);
        rootNode.addChildInfo(new ComparisionTypeInfo(TypeName.Number, TypeName.String));
        rootNode.addChildInfo(new ComparisionNodeMutant(3,'a'));
        rootNode.addChildInfo(new ComparisionArrayInfo(0));
        rootNode.addChildInfo(new ComparisionMapInfo(2,[3], ['a']));
        rootNode.addChildInfo(new ComparisionArrayInfo(1));

        let result = new RecursiveEqualsResult(rootNode, false);
        let formatted = assertionContext.equalsFormatDeepNotEquals(result);


        let expected = "Equals expected;\n" +
            "  '[1,{}]'\n" +
            "Actual;\n" +
            "  '[1,{}]'\n" +
            "  #0 Array @ idx 1\n" +
            "    #1 MapValue key;\n" +
            "      '2'\n" +
            "    Expected;\n" +
            "      '[3]'\n" +
            "    Actual;\n" +
            "      '[\"a\"]'\n" +
            "      #2 Array @ idx 0\n" +
            "        #3 Equals expected;\n" +
            "          '3'\n" +
            "        Actual;\n" +
            "          'a'\n" +
            "          #4 TypeEquals expected;\n" +
            "            Number\n" +
            "          Actual;\n" +
            "            String\n"
        ;
        ac.same(expected, formatted, "ThreeLevelsOfArrays should be formatted correctly");
    }

    testEqualsFormatDeepNotEqualsHelperThreeLevelsOfMaps(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();

        let eMapTop = new Map();
        let eMap2nd = new Map();
        let eMap3rd = new Map();
        eMap3rd.set('d','e');
        eMap2nd.set('c', eMap3rd);
        eMapTop.set('a', eMap2nd);
        let aMapTop = new Map();
        let aMap2nd = new Map();
        let aMap3rd = new Map();
        aMap3rd.set('d',43);
        aMap2nd.set('c', aMap3rd);
        aMapTop.set('a', aMap2nd);

        let rootNode = new ComparisionNodeMutant(eMapTop, aMapTop);
        rootNode.addChildInfo(new ComparisionTypeInfo(TypeName.String, TypeName.Number));
        rootNode.addChildInfo(new ComparisionMapInfo('d','e',43));
        rootNode.addChildInfo(new ComparisionMapInfo('c',eMap3rd,aMap3rd));
        rootNode.addChildInfo(new ComparisionMapInfo('a',eMap2nd,aMap2nd));

        let result = new RecursiveEqualsResult(rootNode, false);
        let formatted = assertionContext.equalsFormatDeepNotEquals(result);


        let expected =
            "Equals expected;\n" +
            "  '{\"a\":{}}'\n" +
            "Actual;\n" +
            "  '{\"a\":{}}'\n" +
            "  #0 MapValue key;\n" +
            "    'a'\n" +
            "  Expected;\n" +
            "    '{\"c\":{}}'\n" +
            "  Actual;\n" +
            "    '{\"c\":{}}'\n" +
            "    #1 MapValue key;\n" +
            "      'c'\n" +
            "    Expected;\n" +
            "      '{\"d\":\"e\"}'\n" +
            "    Actual;\n" +
            "      '{\"d\":43}'\n" +
            "      #2 MapValue key;\n" +
            "        'd'\n" +
            "      Expected;\n" +
            "        'e'\n" +
            "      Actual;\n" +
            "        '43'\n" +
            "        #3 TypeEquals expected;\n" +
            "          String\n" +
            "        Actual;\n" +
            "          Number\n"
        ;
        ac.same(expected, formatted, "ThreeLevelsOfMaps should be formatted correctly");
    }

    testEqualsFormatDeepNotEqualsHelperThreeLevelsOfMapsStripeArray(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();

        let eMapTop = new Map();
        let eMap3rd = new Map();
        let aMapTop = new Map();
        let aMap3rd = new Map();
        eMap3rd.set('d','e');
        eMapTop.set('z',[eMap3rd]);
        aMapTop.set('z',[aMapTop]);
        let rootNode = new ComparisionNodeMutant(eMapTop, aMapTop);
        rootNode.addChildInfo(new ComparisionTypeInfo(TypeName.String, TypeName.Null));
        rootNode.addChildInfo(new ComparisionMapInfo('d','e', null));
        rootNode.addChildInfo(new ComparisionArrayInfo(0));
        rootNode.addChildInfo(new ComparisionMapInfo('z',[eMap3rd], [aMap3rd]));

        let result = new RecursiveEqualsResult(rootNode, false);
        let formatted = assertionContext.equalsFormatDeepNotEquals(result);


        let expected = "Equals expected;\n" +
            "  '{\"z\":[{}]}'\n" +
            "Actual;\n" +
            "  '{\"z\":[{}]}'\n" +
            "  #0 MapValue key;\n" +
            "    'z'\n" +
            "  Expected;\n" +
            "    '[{}]'\n" +
            "  Actual;\n" +
            "    '[{}]'\n" +
            "    #1 Array @ idx 0\n" +
            "      #2 MapValue key;\n" +
            "        'd'\n" +
            "      Expected;\n" +
            "        'e'\n" +
            "      Actual;\n" +
            "        'null'\n" +
            "        #3 TypeEquals expected;\n" +
            "          String\n" +
            "        Actual;\n" +
            "          Null\n"
        ;
        ac.same(expected, formatted, "ThreeLevelsOfArrays should be formatted correctly");
    }
    testEqualsFormatDeepNotEqualsHelperTwoLevelsOfArrays(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();

        let rootNode = new ComparisionNodeMutant([1, [3]], [1, [2]]);
        rootNode.addChildInfo(new ComparisionNodeMutant(3,2));
        rootNode.addChildInfo(new ComparisionArrayInfo(0));
        rootNode.addChildInfo(new ComparisionArrayInfo(1));

        let result = new RecursiveEqualsResult(rootNode, false);
        let formatted = assertionContext.equalsFormatDeepNotEquals(result);


        let expected = "Equals expected;\n" +
            "  '[1,[3]]'\n" +
            "Actual;\n" +
            "  '[1,[2]]'\n" +
            "  #0 Array @ idx 1\n" +
            "    #1 Array @ idx 0\n" +
            "      #2 Equals expected;\n" +
            "        '3'\n" +
            "      Actual;\n" +
            "        '2'\n";
        ac.same(expected, formatted, "TwoLevelsOfArrays should be formatted correctly");
    }

    testEqualsFormatDeepNotEqualsHelperTwoLevelsOfMaps(ac: I_AssertionContext) {
        let assertionContext = new AssertionContext();

        let eMapTop = new Map();
        let eMap2nd = new Map();
        eMap2nd.set('c', 'd');
        eMapTop.set('a', eMap2nd);
        let aMapTop = new Map();
        let aMap2nd = new Map();
        aMap2nd.set('c', 'f');
        aMapTop.set('a', aMap2nd);

        let rootNode = new ComparisionNodeMutant(eMapTop, aMapTop);
        rootNode.addChildInfo(new ComparisionMapInfo('c','d','f'));
        rootNode.addChildInfo(new ComparisionMapInfo('a',eMap2nd,aMap2nd));

        let result = new RecursiveEqualsResult(rootNode, false);
        let formatted = assertionContext.equalsFormatDeepNotEquals(result);


        let expected =
            "Equals expected;\n" +
            "  '{\"a\":{}}'\n" +
            "Actual;\n" +
            "  '{\"a\":{}}'\n" +
            "  #0 MapValue key;\n" +
            "    'a'\n" +
            "  Expected;\n" +
            "    '{\"c\":\"d\"}'\n" +
            "  Actual;\n" +
            "    '{\"c\":\"f\"}'\n" +
            "    #1 MapValue key;\n" +
            "      'c'\n" +
            "    Expected;\n" +
            "      'd'\n" +
            "    Actual;\n" +
            "      'f'\n";
        ac.same(expected, formatted, "TwoLevelsOfMaps should be formatted correctly");
    }
}