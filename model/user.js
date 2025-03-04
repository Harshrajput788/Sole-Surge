const { Schema, model } = require("mongoose");
const { randomBytes, createHmac, hash, } = require("crypto");
const { stringify } = require("querystring");
const { createTokenForUser } = require("../service/auth");
const { type } = require("os");

const userSchema = new Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    salt:{
        type:String,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ["USER","ADMIN"],
        default: "USER",
    }
}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return null;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;
    next();
});


userSchema.static("matchPassword", async function (email, password) {
    const user = await this.findOne({email});

    if (!user) throw new Error("User Not Found");

    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedHash = createHmac("sha256", salt).update(password).digest("hex");

    if (hashedPassword !== userProvidedHash) throw new Error("Incorrect Password");

    const token = createTokenForUser(user);
    return token;
})

const User = model("user", userSchema);

module.exports = User;