const Products = require("../model/add");

async function addProductByAuth(req,res) {
    return res.render("add");
}

module.exports ={
    addProductByAuth,
}