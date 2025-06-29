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

import { I_Eval, I_FunctionFactory, I_Trial } from '../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs';
import { TestRunner } from '../../tests4ts.ts.adligo.org/src/tests.mjs';
import { ApiTrial } from '../../tests4ts.ts.adligo.org/src/trials.mjs';
import { AssertionContext } from '../../tests4ts.ts.adligo.org/src/assertions.mjs';
import { Test, TestParams } from '../../tests4ts.ts.adligo.org/src/tests.mjs';
import { BasicAssertionsTrial } from './assertions/basicAssertionsTrial.mjs';
import { AssertionsTrial } from './assertionsTrial.mjs';
import { I_AssertionContext } from "../../i_tests4ts.ts.adligo.org/src/i_tests4ts.mjs";
import { Errors } from "@ts.adligo.org/type-guards/dist/typeGuards.mjs";
import { TrialParams } from "../../tests4ts.ts.adligo.org/src/trials.mjs";

export class FunctionFactoryMock implements I_FunctionFactory {
  _calls: string[] = [];
  _results: Map<string, Function | Error> = new Map();

  constructor(results?: Map<string, Function | Error>) {
    this._results = results;
  }

  public newFun(...params: string[]): Function {
    var paramsConcat = '';
    for (const p of params) {
      paramsConcat += p + ' ';
    }
    this._calls.push(paramsConcat);
    let r = this._results.get(paramsConcat);
    if (Errors.isAError(r)) {
      throw r;
    }
    return r as Function;
  }

  public getCall(idx: number): string {
    return this._calls[idx];
  }

  public getCallCount(): number {
    return this._calls.length;
  }
}

export class TestRunnerTrial extends ApiTrial /** TODO move to a SourceFileTrial */ {
  public static readonly CLAZZ_NAME = "org.adligo.ts.tests4ts_tests.TestRunnerTrial";

  constructor() {
    super(TestRunnerTrial.CLAZZ_NAME);
  }

  testConstructorErrors(ac: I_AssertionContext) {
    let results: Map<string, Function | Error> = new Map();
    results.set('testInstance return testInstance.testConstructorErrorsMissingMethod == undefined; ',
        new Function('testInstance', 'return testInstance.testConstructorErrorsMissingMethod == undefined;'));
    let ffMock = new FunctionFactoryMock(results);
    ac.thrown(new Error('Unable to find the following testMethod on the testInstance; ' +
        '{"_name":"org.adligo.ts.tests4ts_tests.TestRunnerTrial","_ignored":0,"_tab":"  ' +
        '","_testFactory":{},"_testFactoryParams":{"_testNamePrefix":"test","_testIgnoredSuffix":"Ignored"},"_results":[],"_failures":0}\n' +
        '\t testMethod: testConstructorErrorsMissingMethod'), () => {
      let testRunner = new TestRunner(new TestRunnerTrial(),
        'testConstructorErrorsMissingMethod', ffMock);
    });
  }
}

