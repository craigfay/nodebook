import { resolve, join } from 'path'
import { createReadStream } from 'fs';

/**
 * Create a handler that will attempt to serve static files
 * from a given directory path.
 */
export const staticFiles = path => {
  return async req => {
    const filepath = join(resolve(path), req.url)
    if (filepath[filepath.length-1] != '/')
    return createReadStream(filepath)
  }
}
