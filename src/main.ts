import * as http from '@node-scarlet/http'
import { staticFiles } from './staticfiles'

const s = http.server();
s.route('GET', '/*', staticFiles(__dirname + "/static"));
s.route('GET', '/*', () => 'Hello, World!');
s.listen(process.env.PORT);
console.log('listening ...');
