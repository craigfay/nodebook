import { exec } from 'child_process';
import { promisify } from 'util';
const asyncExec = promisify(exec);

// Amount of milliseconds a volume should exist before it's removed
const volumeLifespan = 1000 * 60 * 5;

async function cleanup() {
  // Get a list of volumes
  const listCommand = await asyncExec('ls /volumes');
  const volumes = listCommand.stdout.trim().split('\n');

  volumes.forEach(async volume => {
    // Get the volume's date modified
    const dateCommand = await asyncExec(`date -r /volumes/${volume}`);
    const dateModified = new Date(dateCommand.stdout.trim());
    const now = new Date();

    // Remove the volume if it's older than the lifespan
    const timeElapsed = now.getTime() - dateModified.getTime();
    if (timeElapsed > volumeLifespan)
      await asyncExec(`rm -rf /volumes/${volume}`);
  })
}

export async function start() {
  const cleanupFrequency = 1000 * 60 * 1;
  setInterval(cleanup, cleanupFrequency);
}
