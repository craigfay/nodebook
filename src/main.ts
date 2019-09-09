import * as http from '@node-scarlet/http'
import { staticFiles } from './staticfiles'
import { run } from './run'

const s = http.server();
s.route('GET', '/*', staticFiles(__dirname + "/static"));
s.route('POST', '/api/run', async (req, meta) => {
  const { dependencies, javascript } = req.body
  return await run(dependencies, javascript)
});

s.listen(process.env.PORT);
console.log('listening over port', process.env.PORT);
