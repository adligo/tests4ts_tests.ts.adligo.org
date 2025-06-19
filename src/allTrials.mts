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

import { I_Trial } from '../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs';
import { ApiTrial } from '../../tests4ts.ts.adligo.org/src/trials.mjs';
import { AssertionContext } from '../../tests4ts.ts.adligo.org/src/assertions.mjs';
import { Test, TestParams } from '../../tests4ts.ts.adligo.org/src/tests.mjs';
import { BasicAssertionsTrial } from './assertions/basicAssertionsTrial.mjs';
import { AssertionsTrial } from './assertionsTrial.mjs';
import { FastEqualsRecursiveCheckerTrial } from './fastEqualsRecursiveCheckerTrial.mjs';
import { TestRunnerTrial } from './testRunnerTrial.mjs';

export const ALL_TRIAL_MAP: Map<string, I_Trial> = new Map();
function addTrial(trial: I_Trial) {
  ALL_TRIAL_MAP.set(trial.getName(), trial)
}
export const ALL_TRIALS: I_Trial[] = [
  //new BasicAssertionsTrial(),  
  new AssertionsTrial(),
  new FastEqualsRecursiveCheckerTrial()
  //new TestRunnerTrial()
]
for (const t of ALL_TRIALS) {
  addTrial(t);
}


Object.freeze(ALL_TRIAL_MAP);

