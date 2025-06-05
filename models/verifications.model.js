const mongoose = require("mongoose");

const codeSchema = mongoose.Schema({
    mobile:{type:String,default:null},
    email:{type:String,default:null},
    code:String,
    expires:String,
    verified:{type:Boolean, default:false}
})

codeSchema.index({"createdAt": 1}, { expireAfterSeconds: 10});

const codeModel = mongoose.model("verifications",codeSchema);

module.exports = {
    codeModel
}