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

import { Obj, Strings } from '@ts.adligo.org/type-guards/dist/typeGuards.mjs';
import { I_Classifiable, I_Equatable, I_Hashable} from '@ts.adligo.org/i_obj/dist/i_obj.mjs';
import { I_AssertionContext } from '../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs';
import {ApiTrial, SourceFileTrial} from '../../tests4ts.ts.adligo.org/src/trials.mjs';
import { Test, TestParams } from '../../tests4ts.ts.adligo.org/src/tests4ts.mjs';

export class AssertionsTrial extends ApiTrial {
  public static readonly CLAZZ_NAME = 'org.adligo.ts.tests4ts_tests.AssertionsTrial';
  public static new() {
      return new AssertionsTrial();
  }
  public static readonly testIsTrue = new Test(AssertionsTrial.CLAZZ_NAME +
    '.testIsTrue', (ac: I_AssertionContext) => {

      ac.isTrue(true, "True is true.");
      ac.isTrue(false == false, "False == false is true.");
  });
  public static readonly testIsFalse = new Test(AssertionsTrial.CLAZZ_NAME +
    '.testIsFalse', (ac: I_AssertionContext) => {

      ac.isFalse(false, "False is false.");
      let f = false;
  });
  constructor() {
    super(AssertionsTrial.CLAZZ_NAME, [AssertionsTrial.testIsTrue, AssertionsTrial.testIsFalse
    ]);
  }
}
