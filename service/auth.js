const JWT = require("jsonwebtoken");

const secret = "$sole-surge-8224987868";

function createTokenForUser(user) {
    const payload = {
        _id:user._id,
        email:user.email,
        role:user.role,
    }

    const token = JWT.sign(payload,secret);
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token,secret);
    return token;
}

module.exports={
    createTokenForUser,
    validateToken,
}