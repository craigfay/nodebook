/**
 * Spin up a docker container to execute
 * an arbitrary Javascript string
 * 
 * @TODO Cache node_modules
 * @TODO Allow clients to specify node version
 * @TODO Maybe show clients stderr
 * @TODO Add/Remove Cells
 * @TODO Download Notebook
 * @TODO Remodel Notebook Object
 * @TODO Make Emojis Easy
 * @TODO Allow file/figure cells
 */

import { exec } from 'child_process'
import { writeFile, mkdir } from 'fs'
import { randomBytes } from 'crypto'
import { promisify } from 'util'
const asyncExec = promisify(exec)
const asyncWrite = promisify(writeFile)
const asyncMkdir = promisify(mkdir)
const INSTALL_ERROR = 'Could not install dependencies'
const ALLOCATE_ERROR = 'Could not allocate execution file space'
const CONTAINER_ERROR = 'Could not create an execution run time'

export async function run(dependencies:string, javascript:string) {
  // Generate a subdirectory name to allocate to a sibling container
  const hash = randomBytes(16).toString('hex')
  const volume = `/volumes/${hash}`

  // Remove all artifacts after 60 seconds
  const cleanup = () => setTimeout(function() {
    asyncExec(`rm -rf ${volume}`)
  }, 60000)

  try {
    // Allocate files for the container to use
    asyncMkdir(volume, { recursive: true }).then(function() {
      if (dependencies) asyncWrite(`${volume}/package.json`, dependencies)
      if (javascript) asyncWrite(`${volume}/index.js`, javascript)
    }).catch(e => { throw  ALLOCATE_ERROR })

    // Run npm install for the new container
    const installation = await asyncExec(`npm install --prefix ${volume}`)
      .catch(e => { throw INSTALL_ERROR})
    
    // The command that will spin up a sibling container
    const dockerCommand = `
      docker run
      --volume ${process.env.HOME}${volume}:/code
      --workdir="/code"
      --rm
      node:12
      node index.js
    `.split('\n').join(' ')

    // Return the console output of the command, schedule artifact removal
    if (installation || !dependencies) {
      const execution = await asyncExec(dockerCommand)
        .catch(e => { throw CONTAINER_ERROR })

      // cleanup()
      return {
        installation: installation.stdout,
        execution: execution.stdout,
      }
    }

  } catch (e) { // Failure
    cleanup()
    switch(e) {
      case INSTALL_ERROR:
        return { installation: INSTALL_ERROR }
      case ALLOCATE_ERROR:
        return { execution: ALLOCATE_ERROR }
      case CONTAINER_ERROR:
        return { execution: CONTAINER_ERROR }
      default:
        return { execution: 'An unexpected error occurred' }
    }
  }
}
