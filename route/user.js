const express = require("express");
const { 
    handleToHomePage, 
    handleToCreateUser, 
    handleToCreateUserPost, 
    handleToUserSignin,
    handleToUserSigninPost, } = require("../controller/user");
const { restirict } = require("../middleware/auth");

const router = express.Router();

router.get("/",handleToHomePage);

router.get("/signup",handleToCreateUser);

router.post("/signup",handleToCreateUserPost);

router.get("/signin",handleToUserSignin);

router.post("/signin",handleToUserSigninPost);

module.exports = router;