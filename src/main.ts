import * as http from '@node-scarlet/http'
import { staticFiles } from './staticfiles'
import { run } from './run'
import * as notebook from './notebook'

const s = http.server();
s.route('GET', '/*.html', staticFiles(__dirname + "/static"));
s.route('GET', '/*.css', staticFiles(__dirname + "/static"));
s.route('GET', '/codemirror/*', staticFiles(__dirname + "/node_modules"));
s.route('POST', '/api/run', async (req, meta) => {
  const dependencies = notebook.getDependencies(req.body)
  const javascript = notebook.getExecutable(req.body)
  const { installation, execution }= await run(dependencies, javascript)
  return {
    installation,
    execution: notebook.splitExecutionIntoCells(execution)
  }
});

s.listen(process.env.PORT);
console.log('listening over port', process.env.PORT);
