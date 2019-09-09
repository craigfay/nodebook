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
  const volumeId = randomBytes(16).toString('hex')
  const volume = `/volumes/${volumeId}`

  // Remove all artifacts after 60 seconds
  const cleanup = () => setTimeout(function() {
    asyncExec(`rm -rf ${volume}`)
  }, 60000)

  try {
    // Write files for the container to use
    asyncMkdir(volume, { recursive: true }).then(function() {
      if (dependencies) asyncWrite(`${volume}/package.json`, dependencies)
      if (javascript) asyncWrite(`${volume}/index.js`, javascript)
    })
    
    // Command that will spin up the container
    const dockerCommand = `
      docker run
      --volumes-from data_volume_host:ro
      --workdir="${volume}"
      --rm
      node:12
      bash -c '
        pwd
        && ls
      '
    `.split('\n').join(' ')

    // Return the console output of the command, then remove artifacts
    const { stdout } = await asyncExec(dockerCommand)
    cleanup()
    return stdout

  } catch (e) { // Failure
    cleanup()
    return e
  }
}
