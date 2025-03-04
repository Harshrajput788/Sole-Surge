const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    proName:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    productImg:{
        type:String,
        require:true,
    },
    des:{
        type:String,
    }
},{timestamps:true,});

const Products = model("products",productSchema);

module.exports = Products;