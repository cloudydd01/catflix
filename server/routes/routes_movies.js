const express = require("express");
const Router = express.Router();

const {getAllBrowse,
   } = require("../controllers/controllers_movies");


//user routes
Router.route("/")
.post(getAllBrowse)


module.exports = Router;
