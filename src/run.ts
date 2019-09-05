/**
 * Spin up a docker container to execute
 * an arbitrary Javascript string
 */

import { exec } from 'child_process'
import { promisify } from 'util'
const asyncExec = promisify(exec)

const javascript = 'console.log(5 + 5)'

const dockerCommand = `
  docker run
  node:12
  node -e "${javascript}"
`.split('\n').join(' ')

async function run() {
  const { stdout } = await asyncExec(dockerCommand)
  console.log(stdout)
}

run();