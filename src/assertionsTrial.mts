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

export class AssertionsTrial extends ApiTrial {
  public static readonly CLAZZ_NAME = 'org.adligo.ts.tests4ts_tests.AssertionsTrial';
  public static new() {
    return new AssertionsTrial();
  }

  public static readonly TESTS: I_Test[] = [
    new Test('testEqualsArrayFailures', (ac: I_AssertionContext) => {
      // Failure: Primitives that are not equal (expect throw with specific message)
      let arrA: any[] = [];
      let arrB = ['a', 'b'];
      let arrC = ['a', 'b', 'c', 'd'];
      let arrC1 = ['a', 'b', 'c', 'd1'];
      let arrC2 = ['a', 'b', 'c', true];
      let arrB1 = ['a1', 'b'];

      ac.thrown(new Error(EXPECTED_MESSAGE('isArray == true', '{}', 'B null msg.')), () => {
        ac.equals(arrA, {}, 'B null msg.');
      }, 'equals should throw an error when compairing the arrays arrA and an empty Object.');

      ac.thrown(new Error(EXPECTED_MESSAGE('isArray == true', 'null', 'B null msg.')), () => {
        ac.equals(arrA, null, 'B null msg.');
      }, 'equals should throw an error when compairing the arrays arrA and null.');

      ac.thrown(new Error(EXPECTED_MESSAGE('a', 'a1',
        '\n\t\tThe array element at the following index should match idx: 0')), () => {
          ac.equals(arrB, arrB1);
        }, 'equals should throw an error when compairing the arrays arrB and arrB1.');

      ac.thrown(new Error(EXPECTED_MESSAGE('a1', 'a',
        '\n\t\tThe array element at the following index should match idx: 0')), () => {
          ac.equals(arrB1, arrB);
        }, 'equals should throw an error when compairing the arrays arrB1 and arrB.');

      ac.thrown(new Error(EXPECTED_MESSAGE('Array size 0', 'Array size 2')), () => {
        ac.equals(arrA, arrB);
      }, 'equals should throw an error when compairing the arrays arrA and arrB.');

      ac.thrown(new Error(EXPECTED_MESSAGE('d', 'd1',
        '\n\t\tThe array element at the following index should match idx: 3')), () => {
          ac.equals(arrC, arrC1);
        }, 'equals should throw an error when compairing the arrays arrC and arrC1.');

      ac.thrown(new Error(EXPECTED_MESSAGE('d', 'true',
        '\n\t\tThe array element at the following index should match idx: 3')), () => {
          ac.equals(arrC, arrC2);
        }, 'equals should throw an error when compairing the arrays arrC and arrC2 because of type differences');

      //Equatable Objects in Arrays
      let johnA = [new EqMock('john')];
      let bobA = [new EqMock('bob')];

      ac.thrown(new Error(EXPECTED_MESSAGE('{"name":"john"}', '{"name":"bob"}',
        '\n\t\tThe array element at the following index should match idx: 0')), () => {
          ac.equals(johnA, bobA);
        }, 'equals should throw an error when compairing the arrays johnA and bobA because of delegated calls to their equals methods');

      ac.thrown(new Error(EXPECTED_MESSAGE('{"name":"bob"}', '{"name":"john"}',
        '\n\t\tThe array element at the following index should match idx: 0')), () => {
          ac.equals(bobA, johnA);
        }, 'equals should throw an error when compairing the arrays johnA and bobA because of delegated calls to their equals methods');

      let objArrA = [new EqMock('john'), new EqMock('bob'), new EqMock('bob')];
      let objArrB = [new EqMock('john'), new EqMock('bob'), new EqStrMock('amy')];

      ac.thrown(new Error(EXPECTED_MESSAGE('{"name":"bob"}', 'eqStr [asAString: amy]',
        '\n\t\tThe array element at the following index should match idx: 2')), () => {
          ac.equals(objArrA, objArrB);
        }, 'equals should throw an error when compairing the arrays objArrA and objArrB because of delegated calls to their equals methods');

      ac.thrown(new Error(EXPECTED_MESSAGE('eqStr [asAString: amy]', '{"name":"bob"}',
        '\n\t\tThe array element at the following index should match idx: 2')), () => {
          ac.equals(objArrB, objArrA);
        }, 'equals should throw an error when compairing the arrays objArrB and objArrA because of delegated calls to their equals methods');
    }),
    new Test('testEqualsBooleanFailures', (ac: I_AssertionContext) => {
      // Failure: Primitives that are not equal (expect throw with specific message)

      ac.thrown(new Error(EXPECTED_MESSAGE('true', 'true')), () => {
        ac.equals(true, 'true');
      }, 'equals should throw an error for the boolean true equaling the string true.');

      ac.thrown(new Error(EXPECTED_MESSAGE('true', '42')), () => {
        ac.equals(true, 42);
      }, 'equals should throw an error for the boolean true equaling the number 42.');

      ac.thrown(new Error(EXPECTED_MESSAGE('true', 'null')), () => {
        ac.equals(true, null);
      }, 'equals should throw an error for the boolean true equaling a null.');

      ac.thrown(new Error(EXPECTED_MESSAGE('true', 'undefined')), () => {
        ac.equals(true, undefined);
      }, 'equals should throw an error for the boolean true equaling a undefined.');

      ac.thrown(new Error(EXPECTED_MESSAGE('true', 'NaN')), () => {
        ac.equals(true, NaN);
      }, 'equals should throw an error for the boolean true equaling a NaN.');
    }),
    new Test('testEqualsI_EquatableFailures', (ac: I_AssertionContext) => {
      // Failure: Primitives that are not equal (expect throw with specific message)

      let eqMockA = new EqMock('a');
      let eqMockB = new EqMock('b');

      ac.thrown(new Error(EXPECTED_MESSAGE('{"name":"a"}', '{"name":"b"}')), () => {
        ac.equals(eqMockA, eqMockB);
      }, 'equals should throw an error for eqMockA.equals(eqMockB).');

      ac.thrown(new Error(EXPECTED_MESSAGE('{"name":"b"}', '{"name":"a"}')), () => {
        ac.equals(eqMockB, eqMockA);
      }, 'equals should throw an error for eqMockB.equals(eqMockB).');
    }),
    new Test('testEqualsI_EquatableStringFailures', (ac: I_AssertionContext) => {

      let eqStrMockA = new EqStrMock('a');
      let eqStrMockB = new EqStrMock('b');

      ac.thrown(new Error(EXPECTED_MESSAGE('eqStr [asAString: a]', 'eqStr [asAString: b]')), () => {
        ac.equals(eqStrMockA, eqStrMockB);
      }, 'equals should throw an error for eqStrMockA.equals(eqStrMockB).');

      ac.thrown(new Error(EXPECTED_MESSAGE('eqStr [asAString: b]', 'eqStr [asAString: a]')), () => {
        ac.equals(eqStrMockB, eqStrMockA);
      }, 'equals should throw an error for eqStrMockB.equals(eqStrMockB).');
    }),
    new Test('testEqualsI_StringFailures', (ac: I_AssertionContext) => {

      let strMockA = new StrMock('a');
      let strMockB = new StrMock('b');

      ac.thrown(new Error(EXPECTED_MESSAGE('eqStr [asAString: a]', 'eqStr [asAString: b]')), () => {
        ac.equals(strMockA, strMockB);
      }, 'equals should throw an error for eqStrMockA.equals(eqStrMockB).');

      ac.thrown(new Error(EXPECTED_MESSAGE('eqStr [asAString: b]', 'eqStr [asAString: a]')), () => {
        ac.equals(strMockB, strMockA);
      }, 'equals should throw an error for eqStrMockB.equals(eqStrMockB).');
    }),
    new Test('testEqualsMapFailures', (ac: I_AssertionContext) => {
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

      ac.thrown(new Error(EXPECTED_MESSAGE('isMap == true', 'null')), () => {
        ac.equals(mapA, null);
      }, 'equals should throw an error when compairing the arrays mapA and null.');

      ac.thrown(new Error(EXPECTED_MESSAGE('isMap == true', '{}')), () => {
        ac.equals(mapA, {});
      }, 'equals should throw an error when compairing the arrays mapA and an empty object.');


      ac.thrown(new Error(EXPECTED_MESSAGE('Map size 0', 'Map size 1')), () => {
        ac.equals(mapA, mapB);
      }, 'equals should throw an error when compairing the arrays mapA and mapB.');

      ac.thrown(new Error(EXPECTED_MESSAGE('b', 'c',
        "\n\tThe value with the following key should match;\n\t\t 'a'\n")), () => {
          ac.equals(mapB, mapC);
        }, 'equals should throw an error when compairing the arrays mapB and mapC.');

      ac.thrown(new Error(EXPECTED_MESSAGE('c', 'b',
        "\n\tThe value with the following key should match;\n\t\t 'a'\n")), () => {
          ac.equals(mapC, mapB);
        }, 'equals should throw an error when compairing the arrays mapC and mapB.');

      ac.thrown(new Error(
        "\n\tThe following keys are missing from the expected Map;\n\t\td,f\n"), () => {
          ac.equals(mapC, mapD);
        }, 'equals should throw an error when compairing the arrays mapC and mapD.');

      ac.thrown(new Error(
        "\n\tThe following keys are missing from the actual Map;\n\t\td,f\n"), () => {
          ac.equals(mapD, mapC);
        }, 'equals should throw an error when compairing the arrays mapD and mapC.');

      let objMapA3: Map<any, any> = new Map();
      objMapA3.set('john', new EqMock('john'));
      Object.freeze(objMapA3);

      let objMapB4: Map<any, any> = new Map();
      objMapB4.set('john', new EqStrMock('jim'));
      Object.freeze(objMapB4);

      ac.thrown(new Error(EXPECTED_MESSAGE('{"name":"john"}', 'eqStr [asAString: jim]',
        "\n\tThe value with the following key should match;\n\t\t 'john'\n")), () => {
          ac.equals(objMapA3, objMapB4);
        }, 'equals should throw an error when compairing the arrays objMapA3 and objMapB4.');

      ac.thrown(new Error(EXPECTED_MESSAGE('eqStr [asAString: jim]', '{"name":"john"}',
        "\n\tThe value with the following key should match;\n\t\t 'john'\n")), () => {
          ac.equals(objMapB4, objMapA3);
        }, 'equals should throw an error when compairing the arrays objMapB4 and objMapA3.');
    }),

    new Test('testEqualsNonStringPrimitivesFailures', (ac: I_AssertionContext) => {

      ac.thrown(new Error(EXPECTED_MESSAGE('NaN', 'false')), () => {
        ac.equals(NaN, false);
      }, 'equals should throw an error for a NaN equaling the boolean false.');

      ac.thrown(new Error(EXPECTED_MESSAGE('NaN', 'hello')), () => {
        ac.equals(NaN, 'hello');
      }, 'equals should throw an error for a NaN equaling the string hello.');

      ac.thrown(new Error(EXPECTED_MESSAGE('NaN', '42')), () => {
        ac.equals(NaN, 42);
      }, 'equals should throw an error for a NaN equaling the number 42.');

      ac.thrown(new Error(EXPECTED_MESSAGE('NaN', 'null')), () => {
        ac.equals(NaN, null);
      }, 'equals should throw an error for a NaN equaling a null.');

      ac.thrown(new Error(EXPECTED_MESSAGE('true', 'undefined')), () => {
        ac.equals(true, undefined);
      }, 'equals should throw an error for a NaN equaling a undefined.');

    }),
    new Test('testEqualsNullFailures', (ac: I_AssertionContext) => {

      ac.thrown(new Error(EXPECTED_MESSAGE('null', 'false')), () => {
        ac.equals(null, false);
      }, 'equals should throw an error for a null equaling the boolean false.');

      ac.thrown(new Error(EXPECTED_MESSAGE('null', 'hello')), () => {
        ac.equals(null, 'hello');
      }, 'equals should throw an error for a null equaling the string hello.');

      ac.thrown(new Error(EXPECTED_MESSAGE('null', '42')), () => {
        ac.equals(null, 42);
      }, 'equals should throw an error for a null equaling the number 42.');

      ac.thrown(new Error(EXPECTED_MESSAGE('null', 'NaN')), () => {
        ac.equals(null, NaN);
      }, 'equals should throw an error for a null equaling a NaN.');

      ac.thrown(new Error(EXPECTED_MESSAGE('null', 'undefined')), () => {
        ac.equals(null, undefined);
      }, 'equals should throw an null equaling a undefined.');

    }),
    new Test('testEqualsNumberFailures', (ac: I_AssertionContext) => {

      ac.thrown(new Error(EXPECTED_MESSAGE('1', 'false')), () => {
        ac.equals(1, false);
      }, 'equals should throw an error for a number 1 equaling the boolean false.');

      ac.thrown(new Error(EXPECTED_MESSAGE('1', 'hello')), () => {
        ac.equals(1, 'hello');
      }, 'equals should throw an error for a number 1 equaling the string hello.');

      ac.thrown(new Error(EXPECTED_MESSAGE('1', '1')), () => {
        ac.equals(1, '1');
      }, 'equals should throw an error for a number 1 equaling the string 1.');

      ac.thrown(new Error(EXPECTED_MESSAGE('1', '42')), () => {
        ac.equals(1, 42);
      }, 'equals should throw an error for a number 1 equaling the number 42.');

      ac.thrown(new Error(EXPECTED_MESSAGE('1', 'NaN')), () => {
        ac.equals(1, NaN);
      }, 'equals should throw an error for the number 1 equaling a NaN.');

      ac.thrown(new Error(EXPECTED_MESSAGE('1', 'undefined')), () => {
        ac.equals(1, undefined);
      }, 'equals should throw an error for the number 1 equaling a undefined.');

      ac.thrown(new Error(EXPECTED_MESSAGE('1', 'null')), () => {
        ac.equals(1, null);
      }, 'equals should throw an error for the number 1 equaling a null.');
    }),
    new Test('testEqualsObjectFailures', (ac: I_AssertionContext) => {

      ac.thrown(new Error(EXPECTED_MESSAGE('{"id":1}', 'false')), () => {
        ac.equals({ id: 1 }, false);
      }, 'equals should throw an error for a object { id: 1} equaling the boolean false.');

      ac.thrown(new Error(EXPECTED_MESSAGE('{"id":1}', 'hello')), () => {
        ac.equals({ id: 1 }, 'hello');
      }, 'equals should throw an error for a object { id: 1} equaling the string hello.');

      ac.thrown(new Error(EXPECTED_MESSAGE('{"id":1}', 'NaN')), () => {
        ac.equals({ id: 1 }, NaN);
      }, 'equals should throw an error for a object { id: 1} equaling a NaN.');

      ac.thrown(new Error(EXPECTED_MESSAGE('{"id":1}', '1')), () => {
        ac.equals({ id: 1 }, 1);
      }, 'equals should throw an error for a object { id: 1} equaling a number 1.');

      ac.thrown(new Error(EXPECTED_MESSAGE('{"id":1}', 'null')), () => {
        ac.equals({ id: 1 }, null);
      }, 'equals should throw an error for a object { id: 1} equaling a null.');

      ac.thrown(new Error(EXPECTED_MESSAGE('{"id":1}', '[object Object]')), () => {
        ac.equals({ id: 1 }, '[object Object]');
      }, 'equals should throw an error for a object { id: 1} equaling a string [object Object].');

      ac.thrown(new Error(EXPECTED_MESSAGE('{"id":1}', 'undefined')), () => {
        ac.equals({ id: 1 }, undefined);
      }, 'equals should throw an error for a object { id: 1} equaling a undefined.');

      let john = new EqMock('john');
      let bob = new EqMock('bob');

      ac.thrown(new Error(EXPECTED_MESSAGE('{"name":"john"}', '{"name":"bob"}')), () => {
        ac.equals(john, bob);
      }, 'equals should throw an error for john equaling bob.');

      ac.thrown(new Error(EXPECTED_MESSAGE('{"name":"bob"}', '{"name":"john"}')), () => {
        ac.equals(bob, john);
      }, 'equals should throw an error for bob equaling john.');

      let chris = new EqStrMock('chris');
      let amy = new EqStrMock('amy');

      ac.thrown(new Error(EXPECTED_MESSAGE('eqStr [asAString: chris]', 'eqStr [asAString: amy]')), () => {
        ac.equals(chris, amy);
      }, 'equals should throw an error for chris equaling amy.');

      ac.thrown(new Error(EXPECTED_MESSAGE('eqStr [asAString: amy]', 'eqStr [asAString: chris]')), () => {
        ac.equals(amy, chris);
      }, 'equals should throw an error for chris equaling amy.');

      ac.thrown(new Error(EXPECTED_MESSAGE('{"name":"john"}', 'eqStr [asAString: amy]')), () => {
        ac.equals(john, amy);
      }, 'equals should throw an error for john equaling amy.');

      ac.thrown(new Error(EXPECTED_MESSAGE('eqStr [asAString: amy]', '{"name":"bob"}')), () => {
        ac.equals(amy, bob);
      }, 'equals should throw an error for amy equaling bob.');
    }),
    new Test('testEqualsStringFailures', (ac: I_AssertionContext) => {

      ac.thrown(new Error(EXPECTED_MESSAGE('hello', 'world')), () => {
        ac.equals('hello', 'world');
      }, 'equals should throw an error for unequal strings.');

      ac.thrown(new Error(EXPECTED_MESSAGE('hello', 'false')), () => {
        ac.equals('hello', false);
      }, "equals should throw an error for string 'hello' equals boolean false.");

      ac.thrown(new Error(EXPECTED_MESSAGE('hello', '42')), () => {
        ac.equals('hello', 42);
      }, "equals should throw an error for string 'hello' equals number 42.");

      ac.thrown(new Error(EXPECTED_MESSAGE('hello', 'null')), () => {
        ac.equals('hello', null);
      }, "equals should throw an error for string 'hello' equals null.");

      ac.thrown(new Error(EXPECTED_MESSAGE('hello', 'undefined')), () => {
        ac.equals('hello', undefined);
      }, "equals should throw an error for string 'hello' equals undefined.");

      ac.thrown(new Error(EXPECTED_MESSAGE('NaN', 'NaN')), () => {
        ac.equals('NaN', NaN);
      }, "equals should throw an error for string 'NaN' equals an actual NaN.");
    }),
    new Test('testEqualsUndefinedFailures', (ac: I_AssertionContext) => {

      ac.thrown(new Error(EXPECTED_MESSAGE(undefined, 'false')), () => {
        ac.equals(undefined, false);
      }, 'equals should throw an error for a undefined equaling the boolean false.');

      ac.thrown(new Error(EXPECTED_MESSAGE('undefined', 'hello')), () => {
        ac.equals(undefined, 'hello');
      }, 'equals should throw an error for a undefined equaling the string hello.');

      ac.thrown(new Error(EXPECTED_MESSAGE(undefined, 'NaN')), () => {
        ac.equals(undefined, NaN);
      }, 'equals should throw an error for a undefined equaling a NaN.');

      ac.thrown(new Error(EXPECTED_MESSAGE('undefined', '1')), () => {
        ac.equals(undefined, 1);
      }, 'equals should throw an error for a undefined equaling a number 1.');

      ac.thrown(new Error(EXPECTED_MESSAGE('undefined', 'null')), () => {
        ac.equals(undefined, null);
      }, 'equals should throw an error for a undefined equaling a null.');

    }),
    new Test('testEqualsArraySuccesses', (ac: I_AssertionContext) => {
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
    }),
    new Test('testEqualsI_EquatableSuccess', (ac: I_AssertionContext) => {

      let eqMockA = new EqMock('a');
      let eqMockA1 = new EqMock('a');

      ac.equals(eqMockA, eqMockA, "They have the same name and should be equals.");
      ac.equals(eqMockA, eqMockA1, "They have the same name and should be equals.");
      ac.equals(eqMockA1, eqMockA1, "They have the same name and should be equals.");
    }),
    new Test('testEqualsI_EquatableStringSuccess', (ac: I_AssertionContext) => {

      let eqStrMockA = new EqStrMock('a');
      let eqStrMockA1 = new EqStrMock('a');

      ac.equals(eqStrMockA, eqStrMockA, "They have the same name and should be equals.");
      ac.equals(eqStrMockA, eqStrMockA1, "They have the same name and should be equals.");
      ac.equals(eqStrMockA1, eqStrMockA1, "They have the same name and should be equals.");
    }),
    new Test('testEqualsI_StringSuccess', (ac: I_AssertionContext) => {

      let strMockA = new StrMock('a');
      let strMockA1 = new StrMock('a');

      ac.equals(strMockA, strMockA, "A and a are the same name and should be equals.");
      ac.equals(strMockA1, strMockA1, "A1 and a1 are the same name and should be equals.");
    }),
    new Test('testEqualsPrimitivesSuccess', (ac: I_AssertionContext) => {
      // Success: Primitives that are equal (no throw expected)
      ac.equals('hello', 'hello');  // String equality
      ac.equals(42, 42);            // Number equality
      ac.equals(true, true);        // Boolean equality
      ac.equals(null, null);
      ac.equals(undefined, undefined);
      ac.equals(NaN, NaN);
    }),
    new Test('testIsTrue', (ac: I_AssertionContext) => {

      ac.isTrue(true, "True is true.");
      ac.isTrue(false == false, "False == false is true.");

      let f = false;
      let message = "My custom isTrue test, failure message.";
      ac.thrown(new Error(message), () => {
        ac.isTrue(f, message);
      }, "isTrue should throw an error when it's false!");
    }),
    new Test('testIsFalse', (ac: I_AssertionContext) => {

      ac.isFalse(false, "False is false.");

      let t = true;
      let message = "My custom isFalse test, failure message.";
      ac.thrown(new Error(message), () => {
        ac.isFalse(t, message);
      }, "isFalse should throw an error when it's true!");
    }),
    new Test('testNotEqualsBooleanFailures', (ac: I_AssertionContext) => {

      ac.thrown(new Error(EXPECTED_MESSAGE('true', 'true')), () => {
        ac.notEquals(true, true);
      }, 'equals should throw an error for the boolean true not equaling the boolean true.');

      ac.thrown(new Error(EXPECTED_MESSAGE('false', 'false')), () => {
        ac.notEquals(false, false);
      }, 'equals should throw an error for the boolean false not equaling the boolean false.');
    }),
    new Test('testNotEqualsI_EquatableSuccess', (ac: I_AssertionContext) => {

      let eqMockA = new EqMock('a');
      let eqMockB = new EqMock('b');

      ac.notEquals(eqMockA, eqMockB, "A and B have different names and should NOT be equals.");
      ac.notEquals(eqMockB, eqMockA, "B and A have different names and should NOT be equals.");
    }),
    new Test('testNotEqualsI_EquatableFailures', (ac: I_AssertionContext) => {

      let eqMockA = new EqMock('a');

      ac.thrown(new Error(EXPECTED_MESSAGE('{"name":"a"}', '{"name":"a"}')), () => {
        ac.notEquals(eqMockA, eqMockA);
      }, 'notEquals should throw an error for eqMockA.equals(eqMockA).');

    }),
    new Test('testNotEqualsI_EquatableStringSuccess', (ac: I_AssertionContext) => {

      let eqStrMockA = new EqStrMock('a');
      let eqStrMockB = new EqStrMock('b');

      ac.notEquals(eqStrMockA, eqStrMockB, "eqStrMockA should NOT equal eqStrMockB");
      ac.notEquals(eqStrMockB, eqStrMockA, "eqStrMockB should NOT equal eqStrMockA");
    }),
    new Test('testNotEqualsI_EquatableStringFailures', (ac: I_AssertionContext) => {

      let eqStrMockA = new EqStrMock('a');
      let eqStrMockA1 = new EqStrMock('a');

      ac.thrown(new Error(EXPECTED_MESSAGE('eqStr [asAString: a]', 'eqStr [asAString: a]')), () => {
        ac.notEquals(eqStrMockA, eqStrMockA);
      }, 'eqStrMockA notEquals eqStrMockA should throw a exception');

      ac.thrown(new Error(EXPECTED_MESSAGE('eqStr [asAString: a]', 'eqStr [asAString: a]')), () => {
        ac.notEquals(eqStrMockA, eqStrMockA1);
      }, 'eqStrMockA notEquals eqStrMockA1 should throw a exception');

      ac.thrown(new Error(EXPECTED_MESSAGE('eqStr [asAString: a]', 'eqStr [asAString: a]')), () => {
        ac.notEquals(eqStrMockA1, eqStrMockA);
      }, 'eqStrMockA1 notEquals eqStrMockA should throw a exception');
    }),
    new Test('testNotEqualsI_StringSuccess', (ac: I_AssertionContext) => {

      let strMockA = new StrMock('a');
      let strMockB = new StrMock('b');

      ac.notEquals(strMockA, strMockB, "A and b are the same name and should not throw an error from a notEquals.");
    }),
    new Test('testNotEqualsI_StringFailures', (ac: I_AssertionContext) => {

      let strMockA = new StrMock('a');

      ac.thrown(new Error(EXPECTED_MESSAGE('eqStr [asAString: a]', 'eqStr [asAString: a]')), () => {
        ac.notEquals(strMockA, strMockA);
      }, 'equals should throw an error for eqStrMockA.notEquals(eqStrMockB).');

    }),
    new Test('testNotEqualsNonStringPrimitivesFailures', (ac: I_AssertionContext) => {

      ac.thrown(new Error(EXPECTED_MESSAGE('NaN', 'NaN')), () => {
        ac.notEquals(NaN, NaN);
      }, 'notEquals should throw an error for a NaN NOT equaling a NaN');

    }),
    new Test('testNotEqualsNullFailures', (ac: I_AssertionContext) => {

      ac.thrown(new Error(EXPECTED_MESSAGE('null', 'null')), () => {
        ac.notEquals(null, null);
      }, 'equals should throw an error for a null NOT equaling a null.');

    }),
    new Test('testNotEqualsNumberFailures', (ac: I_AssertionContext) => {

      ac.thrown(new Error(EXPECTED_MESSAGE('1', '1')), () => {
        ac.notEquals(1, 1);
      }, 'equals should throw an error for a number 1 NOT equaling a number 1.');

    }),
    new Test('testNotEqualsObjectFailures', (ac: I_AssertionContext) => {

      let obj1 = { id: 1 };
      ac.thrown(new Error(EXPECTED_MESSAGE('{"id":1}', '{"id":1}')), () => {
        ac.notEquals(obj1, obj1);
      }, 'notEquals should throw an error for a object obj1 NOT equaling the same object.');

    }),
    new Test('testNotEqualsPrimitivesSuccess', (ac: I_AssertionContext) => {
      // Success: Primitives that are equal (no throw expected)
      ac.equals('hello', 'hello');  // String equality
      ac.equals(42, 42);            // Number equality
      ac.equals(true, true);        // Boolean equality
      ac.equals(null, null);
      ac.equals(undefined, undefined);
      ac.equals(NaN, NaN);
    }),
    new Test('testNotEqualsStringFailures', (ac: I_AssertionContext) => {

      ac.thrown(new Error(EXPECTED_MESSAGE('hello', 'hello')), () => {
        ac.notEquals('hello', 'hello');
      }, 'notEquals should throw an error the string hello != hello.');
    }),
    new Test('testNotEqualsUndefinedFailures', (ac: I_AssertionContext) => {

      ac.thrown(new Error(EXPECTED_MESSAGE(undefined, 'undefined')), () => {
        ac.notEquals(undefined, undefined);
      }, 'notEquals should throw an error for a undefined NOT equaling a undefined.')
    })
  ];

  constructor() {
    super(AssertionsTrial.CLAZZ_NAME, AssertionsTrial.TESTS);
  }
}


