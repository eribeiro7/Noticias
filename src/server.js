require('dotenv').config({path:'.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./route');
const server = express();
server.use(cors());
//Expecificação da requesição HTTP
server.use(express.json(), bodyParser.urlencoded({extended: false}));
server.use('/api', routes);

server.listen(process.env.PORT, () =>{
    console.log(`O servidor está a rodar em http://localhost:${process.env.PORT}`);
});