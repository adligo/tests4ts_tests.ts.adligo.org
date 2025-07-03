// slink_tests.ts.adligo.org/src/pathsTest.ts


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
import { I_AssertionContext, I_EquatableString, I_Test } from '../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs';
import { ApiTrial } from '../../tests4ts.ts.adligo.org/src/trials.mjs';
import { Test } from '../../tests4ts.ts.adligo.org/src/tests.mjs';
import { EXPECTED_MESSAGE } from './assertions/basicAssertionsTrial.mjs'
import {AssertionError} from "../../tests4ts.ts.adligo.org/src/assertions.mjs";

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



export class AssertionsTrial extends ApiTrial {
  public static readonly CLAZZ_NAME = 'org.adligo.ts.tests4ts_tests.AssertionsTrial';

  constructor() {
    super(AssertionsTrial.CLAZZ_NAME);
  }

  testEqualsArrayFailures(ac: I_AssertionContext) {
    // Failure: Primitives that are not equal (expect throw with specific message)
    let arrA: any[] = [];
    let arrB = ['a', 'b'];
    let arrC = ['a', 'b', 'c', 'd'];
    let arrC1 = ['a', 'b', 'c', 'd1'];
    let arrC2 = ['a', 'b', 'c', true];
    let arrB1 = ['a1', 'b'];

    //Note @Beetle would have wiped out this code, if you just copied and pasted
    // from the beetle output
    //Equatable Objects in Arrays
    let johnA = [new EqMock('john')];
    let bobA = [new EqMock('bob')];
    let objArrA = [new EqMock('john'), new EqMock('bob'), new EqMock('bob')];
    let objArrB = [new EqMock('john'), new EqMock('bob'), new EqStrMock('amy')];
    
    ac.thrown(new AssertionError("\n" +
        "B null msg.\n" +
        "Equals expected;\n" +
        "  '[]'\n" +
        "Actual;\n" +
        "  '{}'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Array\n" +
        "  Actual;\n" +
        "    Object\n"), () => {
      ac.equals(arrA, {}, 'B null msg.');
    }, 'equals should throw an error when comparing the arrays arrA and an empty Object.');

    ac.thrown(new AssertionError("\n" +
        "B null msg.\n" +
        "Equals expected;\n" +
        "  '[]'\n" +
        "Actual;\n" +
        "  'null'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Array\n" +
        "  Actual;\n" +
        "    Null\n"), () => {
      ac.equals(arrA, null, 'B null msg.');
    }, 'equals should throw an error when comparing the arrays arrA and null.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '[\"a\",\"b\"]'\n" +
        "Actual;\n" +
        "  '[\"a1\",\"b\"]'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Array\n" +
        "  Actual;\n" +
        "    Array\n" +
        "    #1 CollectionSize expected 2 actual 2\n" +
        "      #2 Array @ idx 0\n" +
        "        #3 Equals expected;\n" +
        "          'a'\n" +
        "        Actual;\n" +
        "          'a1'\n"), () => {
      ac.equals(arrB, arrB1);
    }, 'equals should throw an error when comparing the arrays arrB and arrB1.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '[\"a1\",\"b\"]'\n" +
        "Actual;\n" +
        "  '[\"a\",\"b\"]'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Array\n" +
        "  Actual;\n" +
        "    Array\n" +
        "    #1 CollectionSize expected 2 actual 2\n" +
        "      #2 Array @ idx 0\n" +
        "        #3 Equals expected;\n" +
        "          'a1'\n" +
        "        Actual;\n" +
        "          'a'\n"), () => {
      ac.equals(arrB1, arrB);
    }, 'equals should throw an error when comparing the arrays arrB1 and arrB.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '[]'\n" +
        "Actual;\n" +
        "  '[\"a\",\"b\"]'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Array\n" +
        "  Actual;\n" +
        "    Array\n" +
        "    #1 CollectionSize expected 0 actual 2\n"), () => {
      ac.equals(arrA, arrB);
    }, 'equals should throw an error when comparing the arrays arrA and arrB.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '[\"a\",\"b\",\"c\",\"d\"]'\n" +
        "Actual;\n" +
        "  '[\"a\",\"b\",\"c\",\"d1\"]'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Array\n" +
        "  Actual;\n" +
        "    Array\n" +
        "    #1 CollectionSize expected 4 actual 4\n" +
        "      #2 Array @ idx 3\n" +
        "        #3 Equals expected;\n" +
        "          'd'\n" +
        "        Actual;\n" +
        "          'd1'\n"), () => {
      ac.equals(arrC, arrC1);
    }, 'equals should throw an error when comparing the arrays arrC and arrC1.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '[\"a\",\"b\",\"c\",\"d\"]'\n" +
        "Actual;\n" +
        "  '[\"a\",\"b\",\"c\",true]'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Array\n" +
        "  Actual;\n" +
        "    Array\n" +
        "    #1 CollectionSize expected 4 actual 4\n" +
        "      #2 Array @ idx 3\n" +
        "        #3 TypeEquals expected;\n" +
        "          String\n" +
        "        Actual;\n" +
        "          Boolean\n"), () => {
      ac.equals(arrC, arrC2);
    }, 'equals should throw an error when comparing the arrays arrC and arrC2 because of type differences.');
    

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '[{\"name\":\"john\"}]'\n" +
        "Actual;\n" +
        "  '[{\"name\":\"bob\"}]'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Array\n" +
        "  Actual;\n" +
        "    Array\n" +
        "    #1 CollectionSize expected 1 actual 1\n" +
        "      #2 Array @ idx 0\n" +
        "        #3 Equals expected;\n" +
        "          '{\"name\":\"john\"}'\n" +
        "        Actual;\n" +
        "          '{\"name\":\"bob\"}'\n"), () => {
      ac.equals(johnA, bobA);
    }, 'equals should throw an error when comparing the arrays johnA and bobA because of delegated calls to their equals methods.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '[{\"name\":\"bob\"}]'\n" +
        "Actual;\n" +
        "  '[{\"name\":\"john\"}]'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Array\n" +
        "  Actual;\n" +
        "    Array\n" +
        "    #1 CollectionSize expected 1 actual 1\n" +
        "      #2 Array @ idx 0\n" +
        "        #3 Equals expected;\n" +
        "          '{\"name\":\"bob\"}'\n" +
        "        Actual;\n" +
        "          '{\"name\":\"john\"}'\n"), () => {
      ac.equals(bobA, johnA);
    }, 'equals should throw an error when comparing the arrays johnA and bobA because of delegated calls to their equals methods.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '[{\"name\":\"john\"},{\"name\":\"bob\"},{\"name\":\"bob\"}]'\n" +
        "Actual;\n" +
        "  '[{\"name\":\"john\"},{\"name\":\"bob\"},{\"name\":\"amy\"}]'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Array\n" +
        "  Actual;\n" +
        "    Array\n" +
        "    #1 CollectionSize expected 3 actual 3\n" +
        "      #2 Array @ idx 2\n" +
        "        #3 Equals expected;\n" +
        "          '{\"name\":\"bob\"}'\n" +
        "        Actual;\n" +
        "          'eqStr [asAString: amy]'\n"), () => {
      ac.equals(objArrA, objArrB);
    }, 'equals should throw an error when comparing the arrays objArrA and objArrB because of delegated calls to their equals methods.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '[{\"name\":\"john\"},{\"name\":\"bob\"},{\"name\":\"amy\"}]'\n" +
        "Actual;\n" +
        "  '[{\"name\":\"john\"},{\"name\":\"bob\"},{\"name\":\"bob\"}]'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Array\n" +
        "  Actual;\n" +
        "    Array\n" +
        "    #1 CollectionSize expected 3 actual 3\n" +
        "      #2 Array @ idx 2\n" +
        "        #3 Equals expected;\n" +
        "          'eqStr [asAString: amy]'\n" +
        "        Actual;\n" +
        "          '{\"name\":\"bob\"}'\n"), () => {
      ac.equals(objArrB, objArrA);
    }, 'equals should throw an error when comparing the arrays objArrB and objArrA because of delegated calls to their equals methods.');
  }

  testEqualsArraySuccesses(ac: I_AssertionContext) {
    // Failure: Primitives that are not equal (expect throw with specific message)
    let arrA: any[] = [];
    let arrA1: any[] = [];
    ac.equals(arrA, arrA1);

    let arrB = ['a', 'b'];
    let arrB1 = ['a', 'b'];
    ac.equals(arrB, arrB1);

    let arrC = ['a', 'b', 'c', true];
    let arrC1 = ['a', 'b', 'c', true];
    ac.equals(arrC, arrC1);

    let arrD = [1, 2, 3];
    let arrD1 = [1, 2, 3];
    ac.equals(arrD, arrD1);
  }

  testEqualsBooleanFailures(ac: I_AssertionContext) {
    // Failure: Primitives that are not equal (expect throw with specific message)

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'true'\n" +
        "Actual;\n" +
        "  'true'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Boolean\n" +
        "  Actual;\n" +
        "    String\n"), () => {
      ac.equals(true, 'true');
    }, 'equals should throw an error for the boolean true equaling the string true.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'true'\n" +
        "Actual;\n" +
        "  '42'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Boolean\n" +
        "  Actual;\n" +
        "    Number\n"), () => {
      ac.equals(true, 42);
    }, 'equals should throw an error for the boolean true equaling the number 42.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'true'\n" +
        "Actual;\n" +
        "  'null'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Boolean\n" +
        "  Actual;\n" +
        "    Null\n"), () => {
      ac.equals(true, null);
    }, 'equals should throw an error for the boolean true equaling a null.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'true'\n" +
        "Actual;\n" +
        "  'undefined'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Boolean\n" +
        "  Actual;\n" +
        "    Undefined\n"), () => {
      ac.equals(true, undefined);
    }, 'equals should throw an error for the boolean true equaling a undefined.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'true'\n" +
        "Actual;\n" +
        "  'NaN'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Boolean\n" +
        "  Actual;\n" +
        "    NaN\n"), () => {
      ac.equals(true, NaN);
    }, 'equals should throw an error for the boolean true equaling a NaN.');
  }


  testEqualsI_EquatableFailures(ac: I_AssertionContext) {
    // Failure: Primitives that are not equal (expect throw with specific message)

    let eqMockA = new EqMock('a');
    let eqMockB = new EqMock('b');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"name\":\"a\"}'\n" +
        "Actual;\n" +
        "  '{\"name\":\"b\"}'\n" +
        "  #0 Equals expected;\n" +
        "    '{\"name\":\"a\"}'\n" +
        "  Actual;\n" +
        "    '{\"name\":\"b\"}'\n"), () => {
      ac.equals(eqMockA, eqMockB);
    }, 'equals should throw an error for eqMockA.equals(eqMockB).');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"name\":\"b\"}'\n" +
        "Actual;\n" +
        "  '{\"name\":\"a\"}'\n" +
        "  #0 Equals expected;\n" +
        "    '{\"name\":\"b\"}'\n" +
        "  Actual;\n" +
        "    '{\"name\":\"a\"}'\n"), () => {
      ac.equals(eqMockB, eqMockA);
    }, 'equals should throw an error for eqMockB.equals(eqMockB).');
  }

  testEqualsI_EquatableSuccess(ac: I_AssertionContext) {
    let eqMockA = new EqMock('a');
    let eqMockA1 = new EqMock('a');

    ac.equals(eqMockA, eqMockA, "They have the same name and should be equals.");
    ac.equals(eqMockA, eqMockA1, "They have the same name and should be equals.");
    ac.equals(eqMockA1, eqMockA1, "They have the same name and should be equals.");
  }

  testEqualsI_EquatableStringFailures(ac: I_AssertionContext)  {
    let eqStrMockA = new EqStrMock('a');
    let eqStrMockB = new EqStrMock('b');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'eqStr [asAString: a]'\n" +
        "Actual;\n" +
        "  'eqStr [asAString: b]'\n" +
        "  #0 Equals expected;\n" +
        "    'eqStr [asAString: a]'\n" +
        "  Actual;\n" +
        "    'eqStr [asAString: b]'\n"), () => {
      ac.equals(eqStrMockA, eqStrMockB);
    }, 'equals should throw an error for eqStrMockA.equals(eqStrMockB).');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'eqStr [asAString: b]'\n" +
        "Actual;\n" +
        "  'eqStr [asAString: a]'\n" +
        "  #0 Equals expected;\n" +
        "    'eqStr [asAString: b]'\n" +
        "  Actual;\n" +
        "    'eqStr [asAString: a]'\n"), () => {
      ac.equals(eqStrMockB, eqStrMockA);
    }, 'equals should throw an error for eqStrMockB.equals(eqStrMockB).');
  }

  testEqualsI_EquatableStringSuccess(ac: I_AssertionContext) {
    let eqStrMockA = new EqStrMock('a');
    let eqStrMockA1 = new EqStrMock('a');

    ac.equals(eqStrMockA, eqStrMockA, "They have the same name and should be equals.");
    ac.equals(eqStrMockA, eqStrMockA1, "They have the same name and should be equals.");
    ac.equals(eqStrMockA1, eqStrMockA1, "They have the same name and should be equals.");
  }

  testEqualsI_StringFailures(ac: I_AssertionContext) {
    let strMockA = new StrMock('a');
    let strMockB = new StrMock('b');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'eqStr [asAString: a]'\n" +
        "Actual;\n" +
        "  'eqStr [asAString: b]'\n" +
        "  #0 Equals expected;\n" +
        "    'eqStr [asAString: a]'\n" +
        "  Actual;\n" +
        "    'eqStr [asAString: b]'\n"), () => {
      ac.equals(strMockA, strMockB);
    }, 'equals should throw an error for eqStrMockA.equals(eqStrMockB).');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'eqStr [asAString: b]'\n" +
        "Actual;\n" +
        "  'eqStr [asAString: a]'\n" +
        "  #0 Equals expected;\n" +
        "    'eqStr [asAString: b]'\n" +
        "  Actual;\n" +
        "    'eqStr [asAString: a]'\n"), () => {
      ac.equals(strMockB, strMockA);
    }, 'equals should throw an error for eqStrMockB.equals(eqStrMockB).');
  }

  testEqualsI_StringSuccess(ac: I_AssertionContext)  {

    let strMockA = new StrMock('a');
    let strMockA1 = new StrMock('a');

    ac.equals(strMockA, strMockA, "A and a are the same name and should be equals.");
    ac.equals(strMockA1, strMockA1, "A1 and a1 are the same name and should be equals.");
  }

  testEqualsPrimitivesSuccess(ac: I_AssertionContext)  {
    // Success: Primitives that are equal (no throw expected)
    ac.equals('hello', 'hello');  // String equality
    ac.equals(42, 42);            // Number equality
    ac.equals(true, true);        // Boolean equality
    ac.equals(null, null);
    ac.equals(undefined, undefined);
    ac.equals(NaN, NaN);
  }

  testEqualsMapFailures(ac: I_AssertionContext)  {
    // Failure: Primitives that are not equal (expect throw with specific message)
    let mapA: Map<any, any> = Object.freeze(new Map());

    let mapB: Map<any, any> = new Map();
    mapB.set('a', 'b');
    Object.freeze(mapB);

    let mapC: Map<any, any> = new Map();
    mapC.set('a', 'c');
    Object.freeze(mapC);

    let mapD: Map<any, any> = new Map();
    mapD.set('a', 'c');
    mapD.set('d', 'e');
    mapD.set('f', 'a');
    Object.freeze(mapD);

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{}'\n" +
        "Actual;\n" +
        "  'null'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Map\n" +
        "  Actual;\n" +
        "    Null\n"), () => {
      ac.equals(mapA, null);
    }, 'equals should throw an error when compairing the maps mapA and null.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{}'\n" +
        "Actual;\n" +
        "  '{}'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Map\n" +
        "  Actual;\n" +
        "    Object\n"), () => {
      ac.equals(mapA, {});
    }, 'equals should throw an error when compairing the maps mapA and an empty object.');


    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{}'\n" +
        "Actual;\n" +
        "  '{\"a\":\"b\"}'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Map\n" +
        "  Actual;\n" +
        "    Map\n" +
        "    #1 CollectionSize expected 0 actual 1\n" +
        "      #2 MapValue key;\n" +
        "        'a'\n" +
        "      Expected;\n" +
        "        'null'\n" +
        "      Actual;\n" +
        "        'b'\n"), () => {
      ac.equals(mapA, mapB);
    }, 'equals should throw an error when compairing the maps mapA and mapB.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"a\":\"b\"}'\n" +
        "Actual;\n" +
        "  '{\"a\":\"c\"}'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Map\n" +
        "  Actual;\n" +
        "    Map\n" +
        "    #1 CollectionSize expected 1 actual 1\n" +
        "      #2 MapValue key;\n" +
        "        'a'\n" +
        "      Expected;\n" +
        "        'b'\n" +
        "      Actual;\n" +
        "        'c'\n" +
        "        #3 Equals expected;\n" +
        "          'b'\n" +
        "        Actual;\n" +
        "          'c'\n"), () => {
      ac.equals(mapB, mapC);
    }, 'equals should throw an error when compairing the maps mapB and mapC.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"a\":\"c\"}'\n" +
        "Actual;\n" +
        "  '{\"a\":\"b\"}'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Map\n" +
        "  Actual;\n" +
        "    Map\n" +
        "    #1 CollectionSize expected 1 actual 1\n" +
        "      #2 MapValue key;\n" +
        "        'a'\n" +
        "      Expected;\n" +
        "        'c'\n" +
        "      Actual;\n" +
        "        'b'\n" +
        "        #3 Equals expected;\n" +
        "          'c'\n" +
        "        Actual;\n" +
        "          'b'\n"), () => {
      ac.equals(mapC, mapB);
    }, 'equals should throw an error when compairing the maps mapC and mapB.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"a\":\"c\"}'\n" +
        "Actual;\n" +
        "  '{\"a\":\"c\",\"d\":\"e\",\"f\":\"a\"}'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Map\n" +
        "  Actual;\n" +
        "    Map\n" +
        "    #1 CollectionSize expected 1 actual 3\n" +
        "      #2 MapValue key;\n" +
        "        'd'\n" +
        "      Expected;\n" +
        "        'null'\n" +
        "      Actual;\n" +
        "        'e'\n"), () => {
      ac.equals(mapC, mapD);
    }, 'equals should throw an error when compairing the maps mapC and mapD.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"a\":\"c\",\"d\":\"e\",\"f\":\"a\"}'\n" +
        "Actual;\n" +
        "  '{\"a\":\"c\"}'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Map\n" +
        "  Actual;\n" +
        "    Map\n" +
        "    #1 CollectionSize expected 3 actual 1\n" +
        "      #2 MapValue key;\n" +
        "        'd'\n" +
        "      Expected;\n" +
        "        'e'\n" +
        "      Actual;\n" +
        "        'null'\n"), () => {
      ac.equals(mapD, mapC);
    }, 'equals should throw an error when compairing the maps mapD and mapC.');

    let objMapA3: Map<any, any> = new Map();
    objMapA3.set('john', new EqMock('john'));
    Object.freeze(objMapA3);

    let objMapB4: Map<any, any> = new Map();
    objMapB4.set('john', new EqStrMock('jim'));
    Object.freeze(objMapB4);

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"john\":{\"name\":\"john\"}}'\n" +
        "Actual;\n" +
        "  '{\"john\":{\"name\":\"jim\"}}'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Map\n" +
        "  Actual;\n" +
        "    Map\n" +
        "    #1 CollectionSize expected 1 actual 1\n" +
        "      #2 MapValue key;\n" +
        "        'john'\n" +
        "      Expected;\n" +
        "        '{\"name\":\"john\"}'\n" +
        "      Actual;\n" +
        "        'eqStr [asAString: jim]'\n" +
        "        #3 Equals expected;\n" +
        "          '{\"name\":\"john\"}'\n" +
        "        Actual;\n" +
        "          'eqStr [asAString: jim]'\n"), () => {
      ac.equals(objMapA3, objMapB4);
    }, 'equals should throw an error when compairing the maps objMapA3 and objMapB4.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"john\":{\"name\":\"jim\"}}'\n" +
        "Actual;\n" +
        "  '{\"john\":{\"name\":\"john\"}}'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Map\n" +
        "  Actual;\n" +
        "    Map\n" +
        "    #1 CollectionSize expected 1 actual 1\n" +
        "      #2 MapValue key;\n" +
        "        'john'\n" +
        "      Expected;\n" +
        "        'eqStr [asAString: jim]'\n" +
        "      Actual;\n" +
        "        '{\"name\":\"john\"}'\n" +
        "        #3 Equals expected;\n" +
        "          'eqStr [asAString: jim]'\n" +
        "        Actual;\n" +
        "          '{\"name\":\"john\"}'\n"), () => {
      ac.equals(objMapB4, objMapA3);
    }, 'equals should throw an error when compairing the maps objMapB4 and objMapA3.');
  }

  testEqualsNonStringPrimitivesFailures(ac: I_AssertionContext) {
    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'NaN'\n" +
        "Actual;\n" +
        "  'false'\n" +
        "  #0 TypeEquals expected;\n" +
        "    NaN\n" +
        "  Actual;\n" +
        "    Boolean\n"), () => {
      ac.equals(NaN, false);
    }, 'equals should throw an error for a NaN equaling the boolean false.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'NaN'\n" +
        "Actual;\n" +
        "  'hello'\n" +
        "  #0 TypeEquals expected;\n" +
        "    NaN\n" +
        "  Actual;\n" +
        "    String\n"), () => {
      ac.equals(NaN, 'hello');
    }, 'equals should throw an error for a NaN equaling the string hello.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'NaN'\n" +
        "Actual;\n" +
        "  '42'\n" +
        "  #0 TypeEquals expected;\n" +
        "    NaN\n" +
        "  Actual;\n" +
        "    Number\n"), () => {
      ac.equals(NaN, 42);
    }, 'equals should throw an error for a NaN equaling the number 42.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'NaN'\n" +
        "Actual;\n" +
        "  'null'\n" +
        "  #0 TypeEquals expected;\n" +
        "    NaN\n" +
        "  Actual;\n" +
        "    Null\n"), () => {
      ac.equals(NaN, null);
    }, 'equals should throw an error for a NaN equaling a null.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'true'\n" +
        "Actual;\n" +
        "  'undefined'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Boolean\n" +
        "  Actual;\n" +
        "    Undefined\n"), () => {
      ac.equals(true, undefined);
    }, 'equals should throw an error for a NaN equaling a undefined.');
  }

  testEqualsNullFailures(ac: I_AssertionContext) {
    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'null'\n" +
        "Actual;\n" +
        "  'false'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Null\n" +
        "  Actual;\n" +
        "    Boolean\n"), () => {
      ac.equals(null, false);
    }, 'equals should throw an error for a null equaling the boolean false.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'null'\n" +
        "Actual;\n" +
        "  'hello'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Null\n" +
        "  Actual;\n" +
        "    String\n"), () => {
      ac.equals(null, 'hello');
    }, 'equals should throw an error for a null equaling the string hello.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'null'\n" +
        "Actual;\n" +
        "  '42'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Null\n" +
        "  Actual;\n" +
        "    Number\n"), () => {
      ac.equals(null, 42);
    }, 'equals should throw an error for a null equaling the number 42.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'null'\n" +
        "Actual;\n" +
        "  'NaN'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Null\n" +
        "  Actual;\n" +
        "    NaN\n"), () => {
      ac.equals(null, NaN);
    }, 'equals should throw an error for a null equaling a NaN.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'null'\n" +
        "Actual;\n" +
        "  'undefined'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Null\n" +
        "  Actual;\n" +
        "    Undefined\n"), () => {
      ac.equals(null, undefined);
    }, 'equals should throw an null equaling a undefined.');
  }


  testEqualsNumberFailures(ac: I_AssertionContext) {

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '1'\n" +
        "Actual;\n" +
        "  'false'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Number\n" +
        "  Actual;\n" +
        "    Boolean\n"), () => {
      ac.equals(1, false);
    }, 'equals should throw an error for a number 1 equaling the boolean false.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '1'\n" +
        "Actual;\n" +
        "  'hello'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Number\n" +
        "  Actual;\n" +
        "    String\n"), () => {
      ac.equals(1, 'hello');
    }, 'equals should throw an error for a number 1 equaling the string hello.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '1'\n" +
        "Actual;\n" +
        "  '1'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Number\n" +
        "  Actual;\n" +
        "    String\n"), () => {
      ac.equals(1, '1');
    }, 'equals should throw an error for a number 1 equaling the string 1.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '1'\n" +
        "Actual;\n" +
        "  '42'\n" +
        "  #0 Equals expected;\n" +
        "    '1'\n" +
        "  Actual;\n" +
        "    '42'\n"), () => {
      ac.equals(1, 42);
    }, 'equals should throw an error for a number 1 equaling the number 42.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '1'\n" +
        "Actual;\n" +
        "  'NaN'\n" +
        "  #0 Equals expected;\n" +
        "    '1'\n" +
        "  Actual;\n" +
        "    'NaN'\n"), () => {
      ac.equals(1, NaN);
    }, 'equals should throw an error for the number 1 equaling a NaN.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '1'\n" +
        "Actual;\n" +
        "  'undefined'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Number\n" +
        "  Actual;\n" +
        "    Undefined\n"), () => {
      ac.equals(1, undefined);
    }, 'equals should throw an error for the number 1 equaling a undefined.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '1'\n" +
        "Actual;\n" +
        "  'null'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Number\n" +
        "  Actual;\n" +
        "    Null\n"), () => {
      ac.equals(1, null);
    }, 'equals should throw an error for the number 1 equaling a null.');
  }


  testEqualsObjectFailures(ac: I_AssertionContext) {

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"id\":1}'\n" +
        "Actual;\n" +
        "  'false'\n" +
        "  #0 Equals expected;\n" +
        "    '{\"id\":1}'\n" +
        "  Actual;\n" +
        "    'false'\n"), () => {
      ac.equals({ id: 1 }, false);
    }, 'equals should throw an error for a object { id: 1} equaling the boolean false.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"id\":1}'\n" +
        "Actual;\n" +
        "  'hello'\n" +
        "  #0 Equals expected;\n" +
        "    '{\"id\":1}'\n" +
        "  Actual;\n" +
        "    'hello'\n"), () => {
      ac.equals({ id: 1 }, 'hello');
    }, 'equals should throw an error for a object { id: 1} equaling the string hello.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"id\":1}'\n" +
        "Actual;\n" +
        "  'NaN'\n" +
        "  #0 Equals expected;\n" +
        "    '{\"id\":1}'\n" +
        "  Actual;\n" +
        "    'NaN'\n"), () => {
      ac.equals({ id: 1 }, NaN);
    }, 'equals should throw an error for a object { id: 1} equaling a NaN.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"id\":1}'\n" +
        "Actual;\n" +
        "  '1'\n" +
        "  #0 Equals expected;\n" +
        "    '{\"id\":1}'\n" +
        "  Actual;\n" +
        "    '1'\n"), () => {
      ac.equals({ id: 1 }, 1);
    }, 'equals should throw an error for a object { id: 1} equaling a number 1.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"id\":1}'\n" +
        "Actual;\n" +
        "  'null'\n" +
        "  #0 Equals expected;\n" +
        "    '{\"id\":1}'\n" +
        "  Actual;\n" +
        "    'null'\n"), () => {
      ac.equals({ id: 1 }, null);
    }, 'equals should throw an error for a object { id: 1} equaling a null.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"id\":1}'\n" +
        "Actual;\n" +
        "  '[object Object]'\n" +
        "  #0 Equals expected;\n" +
        "    '{\"id\":1}'\n" +
        "  Actual;\n" +
        "    '[object Object]'\n"), () => {
      ac.equals({ id: 1 }, '[object Object]');
    }, 'equals should throw an error for a object { id: 1} equaling a string [object Object].');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"id\":1}'\n" +
        "Actual;\n" +
        "  'undefined'\n" +
        "  #0 Equals expected;\n" +
        "    '{\"id\":1}'\n" +
        "  Actual;\n" +
        "    'undefined'\n"), () => {
      ac.equals({ id: 1 }, undefined);
    }, 'equals should throw an error for a object { id: 1} equaling a undefined.');

    let john = new EqMock('john');
    let bob = new EqMock('bob');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"name\":\"john\"}'\n" +
        "Actual;\n" +
        "  '{\"name\":\"bob\"}'\n" +
        "  #0 Equals expected;\n" +
        "    '{\"name\":\"john\"}'\n" +
        "  Actual;\n" +
        "    '{\"name\":\"bob\"}'\n"), () => {
      ac.equals(john, bob);
    }, 'equals should throw an error for john equaling bob.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"name\":\"bob\"}'\n" +
        "Actual;\n" +
        "  '{\"name\":\"john\"}'\n" +
        "  #0 Equals expected;\n" +
        "    '{\"name\":\"bob\"}'\n" +
        "  Actual;\n" +
        "    '{\"name\":\"john\"}'\n"), () => {
      ac.equals(bob, john);
    }, 'equals should throw an error for bob equaling john.');

    let chris = new EqStrMock('chris');
    let amy = new EqStrMock('amy');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'eqStr [asAString: chris]'\n" +
        "Actual;\n" +
        "  'eqStr [asAString: amy]'\n" +
        "  #0 Equals expected;\n" +
        "    'eqStr [asAString: chris]'\n" +
        "  Actual;\n" +
        "    'eqStr [asAString: amy]'\n"), () => {
      ac.equals(chris, amy);
    }, 'equals should throw an error for chris equaling amy.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'eqStr [asAString: amy]'\n" +
        "Actual;\n" +
        "  'eqStr [asAString: chris]'\n" +
        "  #0 Equals expected;\n" +
        "    'eqStr [asAString: amy]'\n" +
        "  Actual;\n" +
        "    'eqStr [asAString: chris]'\n"), () => {
      ac.equals(amy, chris);
    }, 'equals should throw an error for chris equaling amy.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  '{\"name\":\"john\"}'\n" +
        "Actual;\n" +
        "  'eqStr [asAString: amy]'\n" +
        "  #0 Equals expected;\n" +
        "    '{\"name\":\"john\"}'\n" +
        "  Actual;\n" +
        "    'eqStr [asAString: amy]'\n"), () => {
      ac.equals(john, amy);
    }, 'equals should throw an error for john equaling amy.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'eqStr [asAString: amy]'\n" +
        "Actual;\n" +
        "  '{\"name\":\"bob\"}'\n" +
        "  #0 Equals expected;\n" +
        "    'eqStr [asAString: amy]'\n" +
        "  Actual;\n" +
        "    '{\"name\":\"bob\"}'\n"), () => {
      ac.equals(amy, bob);
    }, 'equals should throw an error for amy equaling bob.');
  }


  testEqualsStringFailures(ac: I_AssertionContext) {
    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'hello'\n" +
        "Actual;\n" +
        "  'world'\n" +
        "  #0 Equals expected;\n" +
        "    'hello'\n" +
        "  Actual;\n" +
        "    'world'\n"), () => {
      ac.equals('hello', 'world');
    }, 'equals should throw an error for unequal strings.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'hello'\n" +
        "Actual;\n" +
        "  'false'\n" +
        "  #0 TypeEquals expected;\n" +
        "    String\n" +
        "  Actual;\n" +
        "    Boolean\n"), () => {
      ac.equals('hello', false);
    }, "equals should throw an error for string 'hello' equals boolean false.");

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'hello'\n" +
        "Actual;\n" +
        "  '42'\n" +
        "  #0 TypeEquals expected;\n" +
        "    String\n" +
        "  Actual;\n" +
        "    Number\n"), () => {
      ac.equals('hello', 42);
    }, "equals should throw an error for string 'hello' equals number 42.");

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'hello'\n" +
        "Actual;\n" +
        "  'null'\n" +
        "  #0 TypeEquals expected;\n" +
        "    String\n" +
        "  Actual;\n" +
        "    Null\n"), () => {
      ac.equals('hello', null);
    }, "equals should throw an error for string 'hello' equals null.");

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'hello'\n" +
        "Actual;\n" +
        "  'undefined'\n" +
        "  #0 TypeEquals expected;\n" +
        "    String\n" +
        "  Actual;\n" +
        "    Undefined\n"), () => {
      ac.equals('hello', undefined);
    }, "equals should throw an error for string 'hello' equals undefined.");

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'NaN'\n" +
        "Actual;\n" +
        "  'NaN'\n" +
        "  #0 TypeEquals expected;\n" +
        "    String\n" +
        "  Actual;\n" +
        "    NaN\n"), () => {
      ac.equals('NaN', NaN);
    }, "equals should throw an error for string 'NaN' equals an actual NaN.");
  }

  testEqualsUndefinedFailures(ac: I_AssertionContext) {
    ac.thrown(new AssertionError(
        "\nEquals expected;\n" +
        "  'undefined'\n" +
        "Actual;\n" +
        "  'false'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Undefined\n" +
        "  Actual;\n" +
        "    Boolean\n"), () => {
      ac.equals(undefined, false);
    }, 'equals should throw an error for a undefined equaling the boolean false.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'undefined'\n" +
        "Actual;\n" +
        "  'hello'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Undefined\n" +
        "  Actual;\n" +
        "    String\n"), () => {
      ac.equals(undefined, 'hello');
    }, 'equals should throw an error for a undefined equaling the string hello.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'undefined'\n" +
        "Actual;\n" +
        "  'NaN'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Undefined\n" +
        "  Actual;\n" +
        "    NaN\n"), () => {
      ac.equals(undefined, NaN);
    }, 'equals should throw an error for a undefined equaling a NaN.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'undefined'\n" +
        "Actual;\n" +
        "  '1'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Undefined\n" +
        "  Actual;\n" +
        "    Number\n"), () => {
      ac.equals(undefined, 1);
    }, 'equals should throw an error for a undefined equaling a number 1.');

    ac.thrown(new AssertionError("\n" +
        "Equals expected;\n" +
        "  'undefined'\n" +
        "Actual;\n" +
        "  'null'\n" +
        "  #0 TypeEquals expected;\n" +
        "    Undefined\n" +
        "  Actual;\n" +
        "    Null\n"), () => {
      ac.equals(undefined, null);
    }, 'equals should throw an error for a undefined equaling a null.');
  }


  testNotEqualsBooleanFailures(ac: I_AssertionContext) {
    ac.thrown(new AssertionError(EXPECTED_MESSAGE('true', 'true')), () => {
      ac.notEquals(true, true);
    }, 'equals should throw an error for the boolean true not equaling the boolean true.');

    ac.thrown(new AssertionError(EXPECTED_MESSAGE('false', 'false')), () => {
      ac.notEquals(false, false);
    }, 'equals should throw an error for the boolean false not equaling the boolean false.');
  }

  testNotEqualsI_EquatableFailures(ac: I_AssertionContext) {
    let eqMockA = new EqMock('a');

    ac.thrown(new AssertionError(EXPECTED_MESSAGE('{"name":"a"}', '{"name":"a"}')), () => {
      ac.notEquals(eqMockA, eqMockA);
    }, 'notEquals should throw an error for eqMockA.equals(eqMockA).');
  }

  testNotEqualsI_EquatableStringFailures(ac: I_AssertionContext) {

    let eqStrMockA = new EqStrMock('a');
    let eqStrMockA1 = new EqStrMock('a');

    ac.thrown(new AssertionError(EXPECTED_MESSAGE('eqStr [asAString: a]', 'eqStr [asAString: a]')), () => {
      ac.notEquals(eqStrMockA, eqStrMockA);
    }, 'eqStrMockA notEquals eqStrMockA should throw a exception');

    ac.thrown(new AssertionError(EXPECTED_MESSAGE('eqStr [asAString: a]', 'eqStr [asAString: a]')), () => {
      ac.notEquals(eqStrMockA, eqStrMockA1);
    }, 'eqStrMockA notEquals eqStrMockA1 should throw a exception');

    ac.thrown(new AssertionError(EXPECTED_MESSAGE('eqStr [asAString: a]', 'eqStr [asAString: a]')), () => {
      ac.notEquals(eqStrMockA1, eqStrMockA);
    }, 'eqStrMockA1 notEquals eqStrMockA should throw a exception');
  }

  testNotEqualsI_EquatableStringSuccess(ac: I_AssertionContext) {

    let eqStrMockA = new EqStrMock('a');
    let eqStrMockB = new EqStrMock('b');

    ac.notEquals(eqStrMockA, eqStrMockB, "eqStrMockA should NOT equal eqStrMockB");
    ac.notEquals(eqStrMockB, eqStrMockA, "eqStrMockB should NOT equal eqStrMockA");
  }

  testNotEqualsI_EquatableSuccess(ac: I_AssertionContext) {

    let eqMockA = new EqMock('a');
    let eqMockB = new EqMock('b');

    ac.notEquals(eqMockA, eqMockB, "A and B have different names and should NOT be equals.");
    ac.notEquals(eqMockB, eqMockA, "B and A have different names and should NOT be equals.");
  }

  testNotEqualsI_StringFailures(ac: I_AssertionContext) {
    let strMockA = new StrMock('a');
    ac.thrown(new AssertionError(EXPECTED_MESSAGE('eqStr [asAString: a]', 'eqStr [asAString: a]')), () => {
      ac.notEquals(strMockA, strMockA);
    }, 'equals should throw an error for eqStrMockA.notEquals(eqStrMockB).');
  }

  testNotEqualsI_StringSuccess(ac: I_AssertionContext) {
    let strMockA = new StrMock('a');
    let strMockB = new StrMock('b');
    ac.notEquals(strMockA, strMockB, "A and b are the same name and should not throw an error from a notEquals.");
  }


  testNotEqualsNonStringPrimitivesFailures(ac: I_AssertionContext)  {
    ac.thrown(new AssertionError(EXPECTED_MESSAGE('NaN', 'NaN')), () => {
      ac.notEquals(NaN, NaN);
    }, 'notEquals should throw an error for a NaN NOT equaling a NaN');
  }

  testNotEqualsNullFailures(ac: I_AssertionContext) {
    ac.thrown(new AssertionError(EXPECTED_MESSAGE('null', 'null')), () => {
      ac.notEquals(null, null);
    }, 'equals should throw an error for a null NOT equaling a null.');
  }

  testNotEqualsNumberFailures(ac: I_AssertionContext) {

    ac.thrown(new AssertionError(EXPECTED_MESSAGE('1', '1')), () => {
      ac.notEquals(1, 1);
    }, 'equals should throw an error for a number 1 NOT equaling a number 1.');

  }

  testNotEqualsObjectFailures(ac: I_AssertionContext) {
    let obj1 = { id: 1 };
    ac.thrown(new AssertionError(EXPECTED_MESSAGE('{"id":1}', '{"id":1}')), () => {
      ac.notEquals(obj1, obj1);
    }, 'notEquals should throw an error for a object obj1 NOT equaling the same object.');
  }

  testNotEqualsPrimitivesSuccess(ac: I_AssertionContext)  {
    // Success: Primitives that are equal (no throw expected)
    ac.equals('hello', 'hello');  // String equality
    ac.equals(42, 42);            // Number equality
    ac.equals(true, true);        // Boolean equality
    ac.equals(null, null);
    ac.equals(undefined, undefined);
    ac.equals(NaN, NaN);
  }

  testNotEqualsStringFailures(ac: I_AssertionContext)  {
    ac.thrown(new AssertionError(EXPECTED_MESSAGE('hello', 'hello')), () => {
      ac.notEquals('hello', 'hello');
    }, 'notEquals should throw an error the string hello != hello.');
  }

  testNotEqualsUndefinedFailures(ac: I_AssertionContext) {
    ac.thrown(new AssertionError(EXPECTED_MESSAGE(undefined, 'undefined')), () => {
      ac.notEquals(undefined, undefined);
    }, 'notEquals should throw an error for a undefined NOT equaling a undefined.')
  }

}


