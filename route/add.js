const express = require("express");
const { addProductByAuth } = require("../controller/add");
const { restirict } = require("../middleware/auth");
const router = express.Router();

router.get("/add",addProductByAuth);


module.exports = router;