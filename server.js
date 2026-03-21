const http = require('http')
const port = 3000;
const app = require('./app')
const { initSocket } = require('./socket')

const server = http.createServer(app)

// Initialize socket behavior
initSocket(server);

server.listen(port,()=>{console.log("this app is runing on port "+port)})