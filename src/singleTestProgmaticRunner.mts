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
import { run, RunTestParams } from '../../tests4ts.ts.adligo.org/src/singleTestRunner.mjs';
import { I_AssertionContext, I_AssertionContextConsumer, I_Test, I_TestFactory, I_Trial } from "@ts.adligo.org/i_tests4ts/dist/i_tests4ts.mjs";

import { AssertionsTrial} from './assertionsTrial.mjs';
import { BasicAssertionsTrial } from './assertions/basicAssertionsTrial.mjs';
import { EqualsRecursiveCheckerFastLevelOneTrial }  from './assertions/equals/equalsRecursiveCheckerFastLevelOneTrial.mjs';
import { EqualsRecursiveCheckerFastLevelThreeTrial }  from './assertions/equals/equalsRecursiveCheckerFastLevelThreeTrial.mjs';
import { EqualsRecursiveCheckerFastLevelTwoTrial }  from './assertions/equals/equalsRecursiveCheckerFastLevelTwoTrial.mjs';
import { ShallowEqualsRecursiveCheckerTrial  } from './assertions/equals/shallowEqualsRecursiveCheckerTrial.mjs';

//this method of running tests allows debugging right from this code which I think is nicer than the
// older runTest function
run(new RunTestParams((ac) => {
        new ShallowEqualsRecursiveCheckerTrial().testFastEqualsShallowSuccesses(ac);
}));
//runTest(new AbstractTrialTrial(), 'testGetErrorDetails');