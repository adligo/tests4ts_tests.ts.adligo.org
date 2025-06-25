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

import { isNil } from '@ts.adligo.org/type-guards/dist/typeGuards.mjs';
import { ComparisionNodeMutant } from '../../tests4ts.ts.adligo.org/src/comparisonNodes.mjs';
import { RecursiveEqualsResult } from '../../tests4ts.ts.adligo.org/src/equalsResults.mjs';

import { ComparisionNodeType, ComparisonNodeInfoType, TypeName } from '../../i_tests4ts_types.ts.adligo.org/src/i_tests4ts_types.mjs';
import {
  I_AssertionContext,
  I_ComparisionBaseInfo,
  I_ComparisionNode,
  I_EquatableString,
  I_Test
} from '../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs';
import { AbstractTrial, ApiTrial } from '../../tests4ts.ts.adligo.org/src/trials.mjs';
import { Test, TestParams } from '../../tests4ts.ts.adligo.org/src/tests.mjs';


export class AbstractTrialTrial extends ApiTrial {
  public static readonly CLAZZ_NAME = 'org.adligo.ts.tests4ts_tests.AbstractTrialTrial';


  constructor() {
    super(AbstractTrialTrial.CLAZZ_NAME);
  }


  testGetErrorDetails(ac: I_AssertionContext) {
    let trial = new ApiTrial('com.example.TrialName') as AbstractTrial ;
    
    let r = trial.getErrorDetails(new Error("Hey you guys"));
    console.log(r);
    let lines = r.split('\n');
    ac.equals("Error: Hey you guys", lines[0], "This should be the first line.");
    ac.equals(0,lines[1].indexOf("    at AbstractTrialTrial.testGetErrorDetails"),
        "The first stack line should start with");

  }
}
