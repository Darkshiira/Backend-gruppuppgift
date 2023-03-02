const express = require('express');
const { DeleteCountry } = require('../Controllers/AdminRoutes/DeleteCountry');
const { PostCountry } = require('../Controllers/AdminRoutes/PostCountry');
const { PatchCountry } = require('../Controllers/AdminRoutes/PatchCountry');

const AdminRoute = express.Router();

AdminRoute.delete("/admin", DeleteCountry);

AdminRoute.post("/admin", PostCountry);


AdminRoute.patch("/admin", PatchCountry)

module.exports.AdminRoute  = AdminRoute;