const express = require('express');
const { DeleteCountry } = require('../Controllers/AdminRoutes/DeleteCountry');
const { PostCountry } = require('../Controllers/AdminRoutes/PostCountry');
const { PatchCountry } = require('../Controllers/AdminRoutes/PatchCountry');

const adminRoute = express.Router();


adminRoute.delete("/", DeleteCountry);

adminRoute.post("/", PostCountry);


adminRoute.patch("/", PatchCountry)

module.exports.adminRoute  = adminRoute;