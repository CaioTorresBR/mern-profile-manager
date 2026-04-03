const http = require('http'); 
const app = require('./app'); // imports express app

app.set('port', 3000);
const server = http.createServer(app); // creates a server with the express app as callback

server.listen(3000, () => console.log('Server is running on port 3000'));