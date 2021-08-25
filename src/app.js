//requires
'use strict';
require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var connection = require('./config/config');
var AuthRoute = require('./routes/user.route');


//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, x-access-token, Content-Length, X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});


//routes


app.use('/api',AuthRoute);
//server
app.listen(process.env.PORT, ()=>{
    
    if(process.env.HOST != 'localhost' && process.env.HOST !='0.0.0.0' ){

        console.log(`Express server is listening on http://${config.server.host}:${config.server.port}`);
    } else {
        process.env.HOST = 'localhost';
        console.log(`Express server is listening on http://${process.env.HOST}:${process.env.PORT}`);
    }
  })
