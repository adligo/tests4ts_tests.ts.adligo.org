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

import { I_AssertionContext } from '../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs';
import {ApiTrial} from '../../tests4ts.ts.adligo.org/src/trials.mjs';
import { Test } from '../../tests4ts.ts.adligo.org/src/tests4ts.mjs';

export class AssertionsTrial extends ApiTrial {
  public static readonly CLAZZ_NAME = 'org.adligo.ts.tests4ts_tests.AssertionsTrial';
  public static new() {
      return new AssertionsTrial();
  }

  public static readonly testIsTrue = new Test(AssertionsTrial.CLAZZ_NAME +
    '.testIsTrue', (ac: I_AssertionContext) => {

      ac.isTrue(true, "True is true.");
      ac.isTrue(false == false, "False == false is true.");

      let f = false;
      let message = "My custom isTrue test, failure message.";
      ac.thrown(new Error(message), () => {
        ac.isTrue(f, message);
      },"isTrue should throw an error when it's false!");
  });

  public static readonly testIsFalse = new Test(AssertionsTrial.CLAZZ_NAME +
    '.testIsFalse', (ac: I_AssertionContext) => {

      ac.isFalse(false, "False is false.");

      let t = true;
      let message = "My custom isFalse test, failure message.";
      ac.thrown(new Error(message), () => {
          ac.isFalse(t, message);
      },"isFalse should throw an error when it's true!");
  });

  constructor() {
    super(AssertionsTrial.CLAZZ_NAME, [AssertionsTrial.testIsTrue, AssertionsTrial.testIsFalse
    ]);
  }
}
