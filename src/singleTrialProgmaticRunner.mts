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

import { runTrial } from '../../tests4ts.ts.adligo.org/src/singleTrialRunner.mjs';
import { TestRunnerTrial } from './testRunnerTrial.mjs';

//Trials
import { AssertionsTrial} from './assertionsTrial.mjs';
import { BasicAssertionsTrial } from './assertions/basicAssertionsTrial.mjs';
import { EqualsRecursiveCheckerFastLevelOneTrial }  from './assertions/equals/equalsRecursiveCheckerFastLevelOneTrial.mjs';
import { EqualsRecursiveCheckerFastLevelThreeTrial }  from './assertions/equals/equalsRecursiveCheckerFastLevelThreeTrial.mjs';
import { EqualsRecursiveCheckerFastLevelTwoTrial }  from './assertions/equals/equalsRecursiveCheckerFastLevelTwoTrial.mjs';
import { ShallowEqualsRecursiveCheckerTrial  } from './assertions/equals/shallowEqualsRecursiveCheckerTrial.mjs';

//runTrial( new BasicAssertionsTrial());
//runTrial(new TestRunnerTrial());
runTrial(new EqualsRecursiveCheckerFastLevelThreeTrial());