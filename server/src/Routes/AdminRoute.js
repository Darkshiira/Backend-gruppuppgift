const express = require('express');
const { DeleteCountry } = require('../Controllers/AdminRoutes/DeleteCountry');
const { PostCountry } = require('../Controllers/AdminRoutes/PostCountry');
const { PatchCountry } = require('../Controllers/AdminRoutes/PatchCountry');

const adminRoute = express.Router();

/* AdminRoute.get("/admin", (req, res) => {
    res.send("AdminRoute");
}); */

adminRoute.delete("/", DeleteCountry);

adminRoute.post("/", PostCountry);


adminRoute.patch("/", PatchCountry)

module.exports.adminRoute  = adminRoute;