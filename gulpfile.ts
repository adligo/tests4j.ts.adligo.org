/**
  * Copyright 2023 Adligo Inc / Scott Morgan
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
const { parallel, series } = require('gulp');
const { spawnSync } = require('child_process');
const IS_WIN = process.platform === "win32";
var npm = 'npm'
if (IS_WIN) {
  npm = 'npm.cmd'
}

function tsc() {
  run(npm,['run','tsc']);
}

function clean() {
  run('rm',['-fr','dist']);
}

function build() {
  clean();
    //getDependencies();
  tsc();
  return Promise.resolve('build complete');
}

function out(cmd, spawnSyncReturns) {
  console.log('ran ' + cmd );
  console.log('\tand the spawnSyncReturns had;');
  if (spawnSyncReturns.error != undefined) {
    console.log('\tError: ' + spawnSyncReturns.error);
    console.log('\t\t' + spawnSyncReturns.error.message);
  }  
  if (spawnSyncReturns.stderr != undefined) {
    console.log('\tStderr: ' + spawnSyncReturns.stderr);
  }
  if (spawnSyncReturns.stdout != undefined) {
    console.log('\tStdout: ' + spawnSyncReturns.stdout);
  }
}

function run(cmd, args) {
  var cc = cmd;
  for (var i=0; i < args.length; i++) {
    cc = cc + ' ' + args[i];
  }
  out(cc, spawnSync(cmd, args));
}

exports.default = build;

