import { resolve, join } from 'path'
import { promisify } from 'util';
import { createReadStream, stat } from 'fs';
const asyncStat = promisify(stat);

/**
 * Create a handler that will attempt to serve static files
 * from a given directory path.
 */
export const staticFiles = path => {
  return async req => {
    try {
      const filepath = join(resolve(path), req.url)
      if ((await asyncStat(filepath)).isFile())
      return createReadStream(filepath)
    } catch (e) {}
  }
}
