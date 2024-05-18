const express = require("express");
const { get } = require("../controllers/helloWorld.controller");
const router = express.Router();

/* GET programming languages. */
router.get("", get);

module.exports = router;
