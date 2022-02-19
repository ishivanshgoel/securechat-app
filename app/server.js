const http = require('http')
const app = require('./app')
const socket = require('./socket')
const logger = require('../logger/logger')

function startServer(PORT){

    const server = http.createServer(app);
    socket(server)

    server.listen(PORT, () => {
        logger.log(`Listening at PORT: ${PORT}`, 0);
    });
}

module.exports = startServer