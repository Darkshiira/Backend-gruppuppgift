const express = require('express');
const { HelloWorld } = require('../Controllers/PublicRoute/Helloworld');
const { getAPI } = require('../Controllers/PublicRoute/GetAPI');
const PublicRoute = express.Router();

PublicRoute.get('/', HelloWorld);

PublicRoute.post('/', getAPI);
 

module.exports.PublicRoute  = PublicRoute;