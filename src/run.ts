/**
 * Spin up a docker container to execute
 * an arbitrary Javascript string
 */

import { exec } from 'child_process'
import { readFile, writeFile, fstat } from 'fs';
import { promisify } from 'util'
const asyncExec = promisify(exec)
const asyncRead = promisify(readFile)
const asyncWrite = promisify(writeFile)

export async function run(javascript:string) {
  const packageJson = JSON.stringify({
    "name": "nb",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "lodash": "^4.17.15"
    }
  });

  await asyncWrite('containers/1/package.json', packageJson);
  await asyncWrite('containers/1/index.js', javascript);

  const dockerCommand = `
    docker run
    --volume="${__dirname}/containers/1/:/src"
    --workdir="/src"
    --rm
    node:12
    bash -c ' 
      npm install;
      node index.js;
    '
 `.split('\n').join(' ')

  const { stdout } = await asyncExec(dockerCommand)
  return stdout;
}
