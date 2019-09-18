import { exec } from 'child_process';
import { promisify } from 'util';
const asyncExec = promisify(exec);

export async function start() {
  // Get a list of volumes
  const listCommand = await asyncExec('ls /volumes');
  const volumes = listCommand.stdout.trim().split('\n');
  console.log(volumes)

  volumes.forEach(async volume => {
    // Get the volume's date-modified
    const dateCommand = await asyncExec(`date -r /volumes/${volume}`);
    const dateModified = new Date(dateCommand.stdout.trim());
    console.log(volume, dateModified)
  })
}