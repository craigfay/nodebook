import * as http from '@node-scarlet/http'
import { staticFiles } from './staticfiles'
import { run } from './run'

const s = http.server();
s.route('GET', '/*', staticFiles(__dirname + "/static"));
s.route('POST', '/api/run', async (req, meta) => {
  return await run(req.body)
});

s.listen(process.env.PORT);
console.log('listening ...');
