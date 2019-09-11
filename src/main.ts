import * as http from '@node-scarlet/http'
import { staticFiles } from './staticfiles'
import { run } from './run'
import * as notebook from './notebook'

const s = http.server();
s.route('GET', '/*', staticFiles(__dirname + "/static"));
s.route('POST', '/api/run', async (req, meta) => {
  const { dependencies, javascript } = notebook.prepareForExecution(req.body)
  const { installation, execution }= await run(dependencies, javascript)
  return notebook.parseExecutionResults({ installation, execution })
});

s.listen(process.env.PORT);
console.log('listening over port', process.env.PORT);
