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

import { ALL_TRIAL_MAP } from './allTrials.mjs';
import { SingleTrialRunner } from '@ts.adligo.org/tests4ts/dist/singleTrialRunner.mjs';

new SingleTrialRunner(ALL_TRIAL_MAP).runTrial();