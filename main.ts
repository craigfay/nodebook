const http = require('@node-scarlet/http');

const s = http.server();
s.route('GET', '/*', () => 200);
s.listen(5000);
console.log('listening ...');
