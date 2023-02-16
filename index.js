require('dotenv').config();

const Server = require('./models/Server');

const iniciarServer = new Server();

iniciarServer.listen();