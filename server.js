const http = require('http');
const port =  process.env.port || 3000;

const app = require('./backend/app');
app.set('port',port );


const server = http.createServer(app);

server.listen(port);
console.log('Server is running at http://localhost:'+port);

