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

    // Run npm install for the new container, which has read-only access
    const installation = await asyncExec(`npm install --prefix ${volume}`)
    
    // Command that will spin up the container
    const dockerCommand = `
      docker run
      --volume ${process.env.HOME}${volume}:/code
      --workdir="/code"
      --rm
      node:12
      node index.js
    `.split('\n').join(' ')

    // Return the console output of the command, then remove artifacts
    if (installation || !dependencies) {
      const { stdout } = await asyncExec(dockerCommand)
      cleanup()
      return stdout
    }

  } catch (e) { // Failure
    cleanup()
    return e
  }
}
