/**
 * Spin up a docker container to execute
 * an arbitrary Javascript string
 */

import { exec } from 'child_process'
import { readFile, writeFile } from 'fs'
import { randomBytes } from 'crypto'
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

  // Generate Unique Container ID
  const containerId = randomBytes(16).toString('base64')

  // Write files for the container to use
  await asyncWrite(`containers/${containerId}/package.json`, packageJson)
  await asyncWrite(`containers/${containerId}/index.js`, javascript)

  // Command that will spin up the container
  const dockerCommand = `
    docker run
    --volume="${__dirname}/containers/${containerId}/:/src"
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
