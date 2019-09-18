import { exec } from 'child_process';
import { promisify } from 'util';
const asyncExec = promisify(exec);

export async function start() {
  // Get a list of volumes
  const list = await asyncExec('ls /volumes');
  const volumes = list.stdout.split('\n');

  volumes.forEach(async volume => {
    if (volume.length) {
      // Get the volume's date modified
      const dateModified = await asyncExec(`date -r /volumes/${volume}`);
      console.log( volume, dateModified.stdout );
    }
  })
}