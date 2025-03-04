const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const userRouter = require("./route/user");
const authRouter = require("./route/add");

const { connectionToMongoDB } = require("./connection/connection");
const exp = require("constants");
const { checkForAuthCookie, restirict, } = require("./middleware/auth");

const app = express();
const PORT = 8000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(checkForAuthCookie("token"));

connectionToMongoDB("mongodb://127.0.0.1:27017/sole");

app.set("view engine","ejs");
app.set("views",path.resolve("./view"));

app.use("/",userRouter);
app.use("/auth",authRouter);

app.listen(PORT,()=>console.log("Server Started at PORT",PORT));