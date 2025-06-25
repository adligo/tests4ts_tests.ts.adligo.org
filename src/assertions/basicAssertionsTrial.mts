/**
 * The BasicAssertionsTrial in this file tests the AssertionContext isTrue, isFalse
 * isSame, isNotSame, isNull and isNotNull methods for success and failure conditions.
 *
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


import { AssertionError } from '../../../tests4ts.ts.adligo.org/src/assertions.mjs';
import { ComparisionNodeMutant } from '../../../tests4ts.ts.adligo.org/src/comparisonNodes.mjs';
import { EqualsRecursiveChecker } from '../../../tests4ts.ts.adligo.org/src/equals.mjs';
import { I_AssertionContext, I_EquatableString, I_Test } from '../../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs';
import { ApiTrial } from '../../../tests4ts.ts.adligo.org/src/trials.mjs';
import { Test, TestParams } from '../../../tests4ts.ts.adligo.org/src/tests.mjs';
import { isNull } from '@ts.adligo.org/type-guards/dist/typeGuards.mjs'

export const EXPECTED_MESSAGE = (exp: string, act: string, msg?: string) => {
  if (isNull(msg)) {
      return  "The expected is; \n\t'" + exp + "'\n\n\tHowever the actual is;\n\t'" + act + "'";
  }
  return `${msg ? msg + '\n' : ''}The expected is; \n\t'${exp}'\n\n\tHowever the actual is;\n\t'${act}'`;
}

export class BasicAssertionsTrial extends ApiTrial /*todo move to SoruceFileTrial */ {
    public static readonly CLAZZ_NAME = 'org.adligo.ts.tests4ts_tests.BasicAssertionsTrial';

    constructor() {
        super(BasicAssertionsTrial.CLAZZ_NAME);
    }

    testIsFalseFailures(ac: I_AssertionContext) {
        let t = true;
        let message = "My custom isFalse test, failure message.";
        ac.thrown(new AssertionError(message), () => {
            ac.isFalse(t, message);
        }, "isFalse should throw an error when it's true!");
    }

    testIsTrueFailures(ac: I_AssertionContext) {
        let f = false;
        let message = "My custom isTrue test, failure message.";
        ac.thrown(new AssertionError(message), () => {
            ac.isTrue(f, message);
        }, "isTrue should throw an error when it's false!");
    }

    testIsFalseSuccess(ac: I_AssertionContext) {
        ac.isFalse(false, "False is false.");
    }

    testIsTrueSuccess(ac: I_AssertionContext) {
        ac.isTrue(true, "True is true.");
        ac.isTrue(false == false, "False == false is true.");
    }

    testSameFailures(ac: I_AssertionContext) {
        let objA = {};
        let objB = {};
        let message = "My custom same test, failure message.";
        ac.thrown(new AssertionError(EXPECTED_MESSAGE('{}','{}', message)), () => {
            ac.same(objA, objB, message);
        }, "same should throw an error when the instances are different!");
    }

    testSameSuccess(ac: I_AssertionContext) {
        let objA = {};
        ac.same(objA, objA, "These are the same.");
    }
}