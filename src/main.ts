const http = require('@node-scarlet/http');

const s = http.server();
s.route('GET', '/*', () => 'Hello');
s.listen(5000);
console.log('listening ...');
