/**
 * Spin up a docker container to execute
 * an arbitrary Javascript string
 */

import { exec } from 'child_process'
import { promisify } from 'util'
const asyncExec = promisify(exec)

export async function run(javascript:string) {
  const dockerCommand = `
    docker run
    node:12
    node -e "${javascript}"
  `.split('\n').join(' ')

  const { stdout } = await asyncExec(dockerCommand)
  return stdout;
}