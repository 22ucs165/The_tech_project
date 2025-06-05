const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{type: String, default: 'user'},
    wishlist: {type:Array, default:[]},
    oauth: {type:Object, default:{}}
})

const userModel = mongoose.model("users",userSchema);

module.exports = {
    userModel
}