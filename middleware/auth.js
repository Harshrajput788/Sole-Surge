const { validateToken } = require("../service/auth");


function checkForAuthCookie(tokenName) {
    return (req, res, next) => {
        const tokenCookiesValue = req.cookies?.token;

        req.user = null;

        if (!tokenCookiesValue) return next();
        
        const token = tokenCookiesValue;

        const user = validateToken(token);

        req.user = user;

        return next();
    }
}

function restirict(roles = ['ADMIN']) {
    
    return function (req, res, next) {

        if (!req.user) return res.redirect("/auth/add");

        if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next();
    }
}

module.exports = {
    checkForAuthCookie,
    restirict,
}