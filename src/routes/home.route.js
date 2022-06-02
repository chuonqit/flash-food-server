const express = require("express");
const router = express.Router();

const { getHomeData } = require("../controllers/home.controller");

router.get("/home", getHomeData);

module.exports = router;
