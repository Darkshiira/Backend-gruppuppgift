const express = require('express');
const { DeleteCountry } = require('../Controllers/AdminRoutes/DeleteCountry');
const { PostCountry } = require('../Controllers/AdminRoutes/PostCountry');
const { PatchCountry } = require('../Controllers/AdminRoutes/PatchCountry');

const AdminRoute = express.Router();

AdminRoute.delete('/', DeleteCountry);

AdminRoute.post('/', PostCountry);


AdminRoute.patch('/', PatchCountry)

module.exports.AdminRoute  = AdminRoute;