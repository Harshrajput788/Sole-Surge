const User = require("../model/user");

async function handleToHomePage(req,res) {
    return res.render("home");
}

async function handleToCreateUser(req,res) {
    return res.render("signup");
}

async function handleToCreateUserPost(req,res) {
    const {fullName,email,password, } = req.body;

    try {
        await User.create({
            fullName,
            email,
            password,
        });
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.render("signup",{error:"Incorrect Email or Password"})
    }
}

async function handleToUserSignin(req,res) {
    return res.render("signin");
}

async function handleToUserSigninPost(req,res) {
    const {email,password} = req.body;
    try {
        const token = await User.matchPassword(email,password);

        console.log("token",token);

        return res.cookie("token",token).redirect("/");
    } catch (error) {

        console.log(error);
        return res.render("signin",{error:"Incorrect Email or Password"});
    }
}

module.exports={
    handleToHomePage,
    handleToCreateUser,
    handleToCreateUserPost,
    handleToUserSignin,
    handleToUserSigninPost,
}