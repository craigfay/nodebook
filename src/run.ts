/**
 * Spin up a docker container to execute
 * an arbitrary Javascript string
 */

import { exec } from 'child_process'
import { writeFile, mkdir } from 'fs'
import { randomBytes } from 'crypto'
import { promisify } from 'util'
const asyncExec = promisify(exec)
const asyncWrite = promisify(writeFile)
const asyncMkdir = promisify(mkdir)

export async function run(dependencies:string, javascript:string) {
  // Generate Unique Container ID and corresponding volume path
  const containerId = randomBytes(16).toString('hex')
  const volume = `${__dirname}/containers/${containerId}`

  // Write files for the container to use
  asyncMkdir(volume, { recursive: true }).then(function() {
    asyncWrite(`${volume}/index.js`, javascript)
    asyncWrite(`${volume}/package.json`, dependencies)
  })

  // Command that will spin up the container
  const dockerCommand = `
    docker run
    --volume="${__dirname}/containers/${containerId}/:/src"
    --workdir="/src"
    --rm
    node:12
    bash -c '
      npm install
      && node index.js
    '
  `.split('\n').join(' ')

  const { stdout } = await asyncExec(dockerCommand)
  const cleanup = setTimeout(function() {
    asyncExec(`rm -rf ${volume}`)
  }, 10000)
  return stdout;
}
