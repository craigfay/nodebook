/**
 * Spin up a docker container to execute
 * an arbitrary Javascript string
 */

import { exec } from 'child_process'
import { promisify } from 'util'
const asyncExec = promisify(exec)

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

  const dockerCommand = `
    docker run
    --workdir=""
    node:12
    bash -c "
      printf '${packageJson.split('"').join('\\"')}' > package.json;
      npm install;
    "
 `.split('\n').join(' ')

  const { stdout } = await asyncExec(dockerCommand)
  return stdout;
}

// echo ${packageJson} > package.json 
// && npm install
// && node -e "${javascript}"