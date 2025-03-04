const mongoose = require("mongoose");

async function connectionToMongoDB(url) {
    return mongoose.connect(url).then(()=>console.log("Server Started"));
}

module.exports = {
    connectionToMongoDB,
}