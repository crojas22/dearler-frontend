const express = require('express');
const router = express.Router();
const universal = require("../universal");

router.get("/", universal);

module.exports = router;