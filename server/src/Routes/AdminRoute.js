const express = require('express');
const { DeleteCountry } = require('../Controllers/AdminRoutes/DeleteCountry');
const { PostCountry } = require('../Controllers/AdminRoutes/PostCountry');
const { PatchCountryHuvudstad } = require('../Controllers/AdminRoutes/PatchCountryHuvudstad');
const { PatchCountryBefolkning } = require('../Controllers/AdminRoutes/PatchCountryBefolkning');
const { PatchCountrySprak } = require('../Controllers/AdminRoutes/PatchCountrySprak');

const adminRoute = express.Router();


adminRoute.delete("/", DeleteCountry);

adminRoute.post("/", PostCountry);

adminRoute.patch("/Huvudstad", PatchCountryHuvudstad)
adminRoute.patch("/Befolkning", PatchCountryBefolkning)
adminRoute.patch("/Sprak", PatchCountrySprak)


module.exports.adminRoute  = adminRoute;