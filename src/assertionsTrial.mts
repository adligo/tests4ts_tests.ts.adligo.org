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
import {I_AssertionContext, I_EquatableString} from '../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs';
import { ApiTrial } from '../../tests4ts.ts.adligo.org/src/trials.mjs';
import { Test } from '../../tests4ts.ts.adligo.org/src/tests4ts.mjs';

export class EqMock implements  I_Equatable {
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

export class EqStrMock implements  I_EquatableString {
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
export class AssertionsTrial extends ApiTrial {
  public static readonly CLAZZ_NAME = 'org.adligo.ts.tests4ts_tests.AssertionsTrial';
  public static new() {
    return new AssertionsTrial();
  }

  public static readonly testEqualsBooleanFailures = new Test(AssertionsTrial.CLAZZ_NAME +
    '.testEqualsNonStringPrimitivesFailures', (ac: I_AssertionContext) => {
      // Failure: Primitives that are not equal (expect throw with specific message)
      const expectedMsg = (exp: string, act: string, msg?: string) =>
        `\n${msg ? msg + '\n' : ''}The expected is; \n\t'${exp}'\n\tHowever the actual is;\n\t'${act}'`;

      ac.thrown(new Error(expectedMsg('true', 'true')), () => {
        ac.equals(true, 'true');
      }, 'equals should throw an error for the boolean true equaling the string true.');

      ac.thrown(new Error(expectedMsg('true', '42')), () => {
          ac.equals(true, 42);
      }, 'equals should throw an error for the boolean true equaling the number 42.');

      ac.thrown(new Error(expectedMsg('true', 'null')), () => {
        ac.equals(true, null);
      }, 'equals should throw an error for the boolean true equaling a null.');

      ac.thrown(new Error(expectedMsg('true', 'undefined')), () => {
          ac.equals(true, undefined);
      }, 'equals should throw an error for the boolean true equaling a undefined.');

      ac.thrown(new Error(expectedMsg('true', 'NaN')), () => {
          ac.equals(true, NaN);
      }, 'equals should throw an error for the boolean true equaling a NaN.');
    });
    public static readonly testEqualsI_EquatableSuccess = new Test(AssertionsTrial.CLAZZ_NAME +
        '.testEqualsI_EquatableSuccess', (ac: I_AssertionContext) => {

        let eqMockA = new EqMock('a');
        let eqMockA1 = new EqMock('a');

        ac.equals(eqMockA, eqMockA, "They have the same name and should be equals.");
        ac.equals(eqMockA, eqMockA1, "They have the same name and should be equals.");
        ac.equals(eqMockA1, eqMockA1, "They have the same name and should be equals.");
    });
    public static readonly testEqualsI_EquatableFailures = new Test(AssertionsTrial.CLAZZ_NAME +
        '.testEqualsI_EquatableFailures', (ac: I_AssertionContext) => {
        // Failure: Primitives that are not equal (expect throw with specific message)
        const expectedMsg = (exp: string, act: string, msg?: string) =>
            `\n${msg ? msg + '\n' : ''}The expected is; \n\t'${exp}'\n\tHowever the actual is;\n\t'${act}'`;

        let eqMockA = new EqMock('a');
        let eqMockB = new EqMock('b');

        ac.thrown(new Error(expectedMsg('{"name":"a"}', '{"name":"b"}')), () => {
            ac.equals(eqMockA, eqMockB);
        }, 'equals should throw an error for eqMockA.equals(eqMockB).');

        ac.thrown(new Error(expectedMsg('{"name":"b"}', '{"name":"a"}')), () => {
            ac.equals(eqMockB, eqMockA);
        }, 'equals should throw an error for eqMockB.equals(eqMockB).');
    });
    public static readonly testEqualsI_EquatableStringSuccess = new Test(AssertionsTrial.CLAZZ_NAME +
        '.testEqualsI_EquatableStringSuccess', (ac: I_AssertionContext) => {

        let eqStrMockA = new EqStrMock('a');
        let eqStrMockA1 = new EqStrMock('a');

        ac.equals(eqStrMockA, eqStrMockA, "They have the same name and should be equals.");
        ac.equals(eqStrMockA, eqStrMockA1, "They have the same name and should be equals.");
        ac.equals(eqStrMockA1, eqStrMockA1, "They have the same name and should be equals.");
    });
    public static readonly testEqualsI_EquatableStringFailures = new Test(AssertionsTrial.CLAZZ_NAME +
        '.testEqualsI_EquatableStringFailures', (ac: I_AssertionContext) => {
        // Failure: Primitives that are not equal (expect throw with specific message)
        const expectedMsg = (exp: string, act: string, msg?: string) =>
            `\n${msg ? msg + '\n' : ''}The expected is; \n\t'${exp}'\n\tHowever the actual is;\n\t'${act}'`;

        let eqStrMockA = new EqStrMock('a');
        let eqStrMockB = new EqStrMock('b');

        ac.thrown(new Error(expectedMsg('eqStr [asAString: a]', 'eqStr [asAString: b]')), () => {
            ac.equals(eqStrMockA, eqStrMockB);
        }, 'equals should throw an error for eqStrMockA.equals(eqStrMockB).');

        ac.thrown(new Error(expectedMsg('eqStr [asAString: b]', 'eqStr [asAString: a]')), () => {
            ac.equals(eqStrMockB, eqStrMockA);
        }, 'equals should throw an error for eqStrMockB.equals(eqStrMockB).');
    });
    public static readonly testEqualsNanFailures = new Test(AssertionsTrial.CLAZZ_NAME +
        '.testEqualsNonStringPrimitivesFailures', (ac: I_AssertionContext) => {
        // Failure: Primitives that are not equal (expect throw with specific message)
        const expectedMsg = (exp: string, act: string, msg?: string) =>
            `\n${msg ? msg + '\n' : ''}The expected is; \n\t'${exp}'\n\tHowever the actual is;\n\t'${act}'`;

        ac.thrown(new Error(expectedMsg('NaN', 'false')), () => {
            ac.equals(NaN, false);
        }, 'equals should throw an error for a NaN equaling the boolean false.');

        ac.thrown(new Error(expectedMsg('NaN', 'hello')), () => {
            ac.equals(NaN, 'hello');
        }, 'equals should throw an error for a NaN equaling the string hello.');

        ac.thrown(new Error(expectedMsg('NaN', '42')), () => {
            ac.equals(NaN, 42);
        }, 'equals should throw an error for a NaN equaling the number 42.');

        ac.thrown(new Error(expectedMsg('NaN', 'null')), () => {
            ac.equals(NaN, null);
        }, 'equals should throw an error for a NaN equaling a null.');

        ac.thrown(new Error(expectedMsg('true', 'undefined')), () => {
            ac.equals(true, undefined);
        }, 'equals should throw an error for a NaN equaling a undefined.');

    });
    public static readonly testEqualsNullFailures = new Test(AssertionsTrial.CLAZZ_NAME +
        '.testEqualsNullFailures', (ac: I_AssertionContext) => {
        // Failure: Primitives that are not equal (expect throw with specific message)
        const expectedMsg = (exp: string, act: string, msg?: string) =>
            `\n${msg ? msg + '\n' : ''}The expected is; \n\t'${exp}'\n\tHowever the actual is;\n\t'${act}'`;

        ac.thrown(new Error(expectedMsg('null', 'false')), () => {
            ac.equals(null, false);
        }, 'equals should throw an error for a null equaling the boolean false.');

        ac.thrown(new Error(expectedMsg('null', 'hello')), () => {
            ac.equals(null, 'hello');
        }, 'equals should throw an error for a null equaling the string hello.');

        ac.thrown(new Error(expectedMsg('null', '42')), () => {
            ac.equals(null, 42);
        }, 'equals should throw an error for a null equaling the number 42.');

        ac.thrown(new Error(expectedMsg('null', 'NaN')), () => {
            ac.equals(null, NaN);
        }, 'equals should throw an error for a null equaling a NaN.');

        ac.thrown(new Error(expectedMsg('null', 'undefined')), () => {
            ac.equals(null, undefined);
        }, 'equals should throw an null equaling a undefined.');

    });
    public static readonly testEqualsNumberFailures = new Test(AssertionsTrial.CLAZZ_NAME +
        '.testEqualsNumberFailures', (ac: I_AssertionContext) => {
        // Failure: Primitives that are not equal (expect throw with specific message)
        const expectedMsg = (exp: string, act: string, msg?: string) =>
            `\n${msg ? msg + '\n' : ''}The expected is; \n\t'${exp}'\n\tHowever the actual is;\n\t'${act}'`;

        ac.thrown(new Error(expectedMsg('1', 'false')), () => {
            ac.equals(1, false);
        }, 'equals should throw an error for a number 1 equaling the boolean false.');

        ac.thrown(new Error(expectedMsg('1', 'hello')), () => {
            ac.equals(1, 'hello');
        }, 'equals should throw an error for a number 1 equaling the string hello.');

        ac.thrown(new Error(expectedMsg('1', '1')), () => {
            ac.equals(1, '1');
        }, 'equals should throw an error for a number 1 equaling the string 1.');

        ac.thrown(new Error(expectedMsg('1', '42')), () => {
            ac.equals(1, 42);
        }, 'equals should throw an error for a number 1 equaling the number 42.');

        ac.thrown(new Error(expectedMsg('1', 'NaN')), () => {
            ac.equals(1, NaN);
        }, 'equals should throw an error for the number 1 equaling a NaN.');

        ac.thrown(new Error(expectedMsg('1', 'undefined')), () => {
            ac.equals(1, undefined);
        }, 'equals should throw an error for the number 1 equaling a undefined.');

        ac.thrown(new Error(expectedMsg('1', 'null')), () => {
            ac.equals(1, null);
        }, 'equals should throw an error for the number 1 equaling a null.');
    });
    public static readonly testEqualsObjectFailures = new Test(AssertionsTrial.CLAZZ_NAME +
        '.testEqualsObjectFailures', (ac: I_AssertionContext) => {
        // Failure: Primitives that are not equal (expect throw with specific message)
        const expectedMsg = (exp: string, act: string, msg?: string) =>
            `\n${msg ? msg + '\n' : ''}The expected is; \n\t'${exp}'\n\tHowever the actual is;\n\t'${act}'`;

        ac.thrown(new Error(expectedMsg('{"id":1}', 'false')), () => {
            ac.equals({ id: 1}, false);
        }, 'equals should throw an error for a object { id: 1} equaling the boolean false.');

        ac.thrown(new Error(expectedMsg('{"id":1}', 'hello')), () => {
            ac.equals({ id: 1}, 'hello');
        }, 'equals should throw an error for a object { id: 1} equaling the string hello.');

        ac.thrown(new Error(expectedMsg('{"id":1}', 'NaN')), () => {
            ac.equals({ id: 1}, NaN);
        }, 'equals should throw an error for a object { id: 1} equaling a NaN.');

        ac.thrown(new Error(expectedMsg('{"id":1}', '1')), () => {
            ac.equals({ id: 1}, 1);
        }, 'equals should throw an error for a object { id: 1} equaling a number 1.');

        ac.thrown(new Error(expectedMsg('{"id":1}', 'null')), () => {
            ac.equals({ id: 1}, null);
        }, 'equals should throw an error for a object { id: 1} equaling a null.');

        ac.thrown(new Error(expectedMsg('{"id":1}', '[object Object]')), () => {
            ac.equals({ id: 1}, '[object Object]');
        }, 'equals should throw an error for a object { id: 1} equaling a string [object Object].');

        ac.thrown(new Error(expectedMsg('{"id":1}', 'undefined')), () => {
            ac.equals({ id: 1}, undefined);
        }, 'equals should throw an error for a object { id: 1} equaling a undefined.');
    });
    public static readonly testEqualsPrimitivesSuccess = new Test(AssertionsTrial.CLAZZ_NAME +
        '.testEqualsPrimitivesSuccess', (ac: I_AssertionContext) => {
        // Success: Primitives that are equal (no throw expected)
        ac.equals('hello', 'hello');  // String equality
        ac.equals(42, 42);            // Number equality
        ac.equals(true, true);        // Boolean equality
        ac.equals(null, null);
        ac.equals(undefined, undefined);
        ac.equals(NaN, NaN);
    });
  public static readonly testEqualsStringFailures = new Test(AssertionsTrial.CLAZZ_NAME +
    '.testEqualsStringFailures', (ac: I_AssertionContext) => {
      // Failure: Primitives that are not equal (expect throw with specific message)
      const expectedMsg = (exp: string, act: string, msg?: string) =>
        `\n${msg ? msg + '\n' : ''}The expected is; \n\t'${exp}'\n\tHowever the actual is;\n\t'${act}'`;

      ac.thrown(new Error(expectedMsg('hello', 'world')), () => {
        ac.equals('hello', 'world');
      }, 'equals should throw an error for unequal strings.');

      ac.thrown(new Error(expectedMsg('hello', 'false')), () => {
        ac.equals('hello', false);
      }, "equals should throw an error for string 'hello' equals boolean false.");

      ac.thrown(new Error(expectedMsg('hello', '42')), () => {
        ac.equals('hello', 42);
      }, "equals should throw an error for string 'hello' equals number 42.");

      ac.thrown(new Error(expectedMsg('hello', 'null')), () => {
        ac.equals('hello', null);
      }, "equals should throw an error for string 'hello' equals null.");

      ac.thrown(new Error(expectedMsg('hello', 'undefined')), () => {
        ac.equals('hello', undefined);
      }, "equals should throw an error for string 'hello' equals undefined.");

      ac.thrown(new Error(expectedMsg('NaN', 'NaN')), () => {
          ac.equals('NaN', NaN);
      }, "equals should throw an error for string 'NaN' equals an actual NaN.");
    });
    public static readonly testEqualsUndefinedFailures = new Test(AssertionsTrial.CLAZZ_NAME +
        '.testEqualsUndefinedFailures', (ac: I_AssertionContext) => {
        // Failure: Primitives that are not equal (expect throw with specific message)
        const expectedMsg = (exp: string, act: string, msg?: string) =>
            `\n${msg ? msg + '\n' : ''}The expected is; \n\t'${exp}'\n\tHowever the actual is;\n\t'${act}'`;

        ac.thrown(new Error(expectedMsg(undefined, 'false')), () => {
            ac.equals(undefined, false);
        }, 'equals should throw an error for a undefined equaling the boolean false.');

        ac.thrown(new Error(expectedMsg('undefined', 'hello')), () => {
            ac.equals(undefined, 'hello');
        }, 'equals should throw an error for a undefined equaling the string hello.');

        ac.thrown(new Error(expectedMsg(undefined, 'NaN')), () => {
            ac.equals(undefined ,NaN);
        }, 'equals should throw an error for a undefined equaling a NaN.');

        ac.thrown(new Error(expectedMsg('undefined', '1')), () => {
            ac.equals(undefined, 1);
        }, 'equals should throw an error for a undefined equaling a number 1.');

        ac.thrown(new Error(expectedMsg('undefined', 'null')), () => {
            ac.equals(undefined, null);
        }, 'equals should throw an error for a undefined equaling a null.');

    });
  public static readonly testIsTrue = new Test(AssertionsTrial.CLAZZ_NAME +
    '.testIsTrue', (ac: I_AssertionContext) => {

      ac.isTrue(true, "True is true.");
      ac.isTrue(false == false, "False == false is true.");

      let f = false;
      let message = "My custom isTrue test, failure message.";
      ac.thrown(new Error(message), () => {
        ac.isTrue(f, message);
      }, "isTrue should throw an error when it's false!");
    });

  public static readonly testIsFalse = new Test(AssertionsTrial.CLAZZ_NAME +
    '.testIsFalse', (ac: I_AssertionContext) => {

      ac.isFalse(false, "False is false.");

      let t = true;
      let message = "My custom isFalse test, failure message.";
      ac.thrown(new Error(message), () => {
        ac.isFalse(t, message);
      }, "isFalse should throw an error when it's true!");
    });

  constructor() {
    super(AssertionsTrial.CLAZZ_NAME, [
        AssertionsTrial.testEqualsI_EquatableFailures, AssertionsTrial.testEqualsI_EquatableSuccess,
        AssertionsTrial.testEqualsI_EquatableStringFailures, AssertionsTrial.testEqualsI_EquatableStringSuccess,
     AssertionsTrial.testEqualsNanFailures, AssertionsTrial.testEqualsNullFailures,
        AssertionsTrial.testEqualsNumberFailures, AssertionsTrial.testEqualsObjectFailures,
        AssertionsTrial.testEqualsPrimitivesSuccess,
        AssertionsTrial.testEqualsStringFailures, AssertionsTrial.testEqualsUndefinedFailures,
      AssertionsTrial.testIsTrue, AssertionsTrial.testIsFalse
    ]);
  }
}
