/**
 * 
 * This code is copied from /tests4ts_tests.ts.adligo.org/src/assertions/equals/equalsFormatDeepNotEqualsTrial.mts
 * but we want to actually see what the failures look like when we encounter them with out all the 
 * mocking and stubbing.
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


import { run, RunTestParams } from '../../../tests4ts.ts.adligo.org/src/singleTestRunner.mjs';
import { I_Eval, I_FunctionFactory, I_Trial } from '../../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs';
import { TestRunner } from '../../../tests4ts.ts.adligo.org/src/tests.mjs';
import { ApiTrial } from '../../../tests4ts.ts.adligo.org/src/trials.mjs';
import { AssertionContext } from '../../../tests4ts.ts.adligo.org/src/assertions.mjs';
import { Test, TestParams } from '../../../tests4ts.ts.adligo.org/src/tests.mjs';
import { I_AssertionContext } from "../../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs";
import { Errors } from "@ts.adligo.org/type-guards/dist/typeGuards.mjs";
import { TrialParams } from "../../../tests4ts.ts.adligo.org/src/trials.mjs";



export class Manual3DeepEqualsFailureVisualCheckTrial extends ApiTrial /** TODO move to a SourceFileTrial */ {
  public static readonly CLAZZ_NAME = "org.adligo.ts.tests4ts_tests.manual.Manual3DeepEqualsFailureVisualCheckTrial";

  constructor() {
    super(Manual3DeepEqualsFailureVisualCheckTrial.CLAZZ_NAME);
  }

  /**
   * This should print something like the following when it fails (which is intentional)
<code><pre>
Test testDelegate Failed
AssertionError: 
Equals expected;
  '[1,[2,[3]]]'
Actual;
  '[1,[2,[4]]]'
  #0 TypeEquals expected;
    Array
  Actual;
    Array
    #1 CollectionSize expected 2 actual 2
      #2 Array @ idx 1
        #3 TypeEquals expected;
          Array
        Actual;
          Array
          #4 CollectionSize expected 2 actual 2
            #5 Array @ idx 1
              #6 TypeEquals expected;
                Array
              Actual;
                Array
                #7 CollectionSize expected 1 actual 1
                  #8 Array @ idx 0
                    #9 Equals expected;
                      '3'
                    Actual;
                      '4'
</pre></code>
   */
  testEqualsFailureArrays3Deep(ac: I_AssertionContext) {
    ac.equals([1, [2,[3]]], [1, [2,[4]]]);
  }

  /**
   * This should print something like the following when it fails (which is intentional)
  <code><pre>
Test testDelegate Failed
AssertionError:
Equals expected;
  '[1,{}]'
Actual;
  '[1,{}]'
  #0 TypeEquals expected;
    Array
  Actual;
    Array
    #1 CollectionSize expected 2 actual 2
      #2 Array @ idx 1
        #3 TypeEquals expected;
          Map
        Actual;
          Map
          #4 CollectionSize expected 1 actual 1
            #5 MapValue key;
              '2'
            Expected;
              '[3]'
            Actual;
              '["a"]'
              #6 TypeEquals expected;
                Array
              Actual;
                Array
                #7 CollectionSize expected 1 actual 1
                  #8 Array @ idx 0
                    #9 Equals expected;
                      '3'
                    Actual;
                      'a'
  </pre></code>
     */
  testEqualsFailureArraysStripeMap3Deep(ac: I_AssertionContext) {
    let eMapMid = new Map();
    let aMapMid = new Map();
    eMapMid.set(2,[3]);
    aMapMid.set(2,['a']);
    ac.equals([1, eMapMid], [1, aMapMid]);
  }
  
  /**
   * This should print something like the following when it fails (which is intentional)
  <code><pre>
Test testDelegate Failed
AssertionError:
Custom test message from testEqualsFailureMaps3Deep
Equals expected;
  '{"a":{}}'
Actual;
  '{"a":{}}'
  #0 TypeEquals expected;
    Map
  Actual;
    Map
    #1 CollectionSize expected 1 actual 1
      #2 MapValue key;
        'a'
      Expected;
        '{"c":{}}'
      Actual;
        '{"c":{}}'
        #3 TypeEquals expected;
          Map
        Actual;
          Map
          #4 CollectionSize expected 1 actual 1
            #5 MapValue key;
              'c'
            Expected;
              '{"d":"e"}'
            Actual;
              '{"d":43}'
              #6 TypeEquals expected;
                Map
              Actual;
                Map
                #7 CollectionSize expected 1 actual 1
                  #8 MapValue key;
                    'd'
                  Expected;
                    'e'
                  Actual;
                    '43'
                    #9 Equals expected;
                      'e'
                    Actual;
                      '43'
  </pre></code>
   */
  testEqualsFailureMaps3Deep(ac: I_AssertionContext) {
    let eMapTop = new Map();
    let eMap2nd = new Map();
    let eMap3rd = new Map();
    eMap3rd.set('d','e');
    eMap2nd.set('c', eMap3rd);
    eMapTop.set('a', eMap2nd);
    let aMapTop = new Map();
    let aMap2nd = new Map();
    let aMap3rd = new Map();
    aMap3rd.set('d',43);
    aMap2nd.set('c', aMap3rd);
    aMapTop.set('a', aMap2nd);
    ac.equals(eMapTop, aMapTop, 'Custom test message from testEqualsFailureMaps3Deep');
  }
  
  /**
   * This should print something like the following when it fails (which is intentional)
  <code><pre>
  Test testDelegate Failed
  AssertionError:
  Equals expected;
    '{"z":[{}]}'
  Actual;
    '{"z":[{}]}'
    #0 TypeEquals expected;
      Map
    Actual;
      Map
      #1 CollectionSize expected 1 actual 1
        #2 MapValue key;
          'z'
        Expected;
          '[{}]'
        Actual;
          '[{}]'
          #3 TypeEquals expected;
            Array
          Actual;
            Array
            #4 CollectionSize expected 1 actual 1
              #5 Array @ idx 0
                #6 TypeEquals expected;
                  Map
                Actual;
                  Map
                  #7 CollectionSize expected 1 actual 1
                    #8 MapValue key;
                      'd'
                    Expected;
                      'e'
                    Actual;
                      'null'
  </pre></code>
  */
  testEqualsFailureMapsStripeArray3Deep(ac: I_AssertionContext) {
    let eMapTop = new Map();
    let eMap3rd = new Map();
    let aMapTop = new Map();
    let aMap3rd = new Map();
    eMap3rd.set('d','e');
    eMapTop.set('z',[eMap3rd]);
    aMapTop.set('z',[aMapTop]);
    ac.equals(eMapTop, aMapTop);
  }
}

//
run(new RunTestParams((ac) => {
        new Manual3DeepEqualsFailureVisualCheckTrial().testEqualsFailureMapsStripeArray3Deep(ac);
}));