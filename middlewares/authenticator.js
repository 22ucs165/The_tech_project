const jwt = require("jsonwebtoken");
require("dotenv").config()

const authenticate = (role)=>{
    return async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.send({msg:"you are not logged in"});
        return
    }
    jwt.verify(token,process.env.key,(err,decoded)=>{
        if(err){
            console.log(err);
            res.send({msg:"something went wrong", error:err.message});
        }
        else{
            if(decoded.role == role || decoded.role == "superadmin"){
                next();
            }
            else{
                res.send({msg:"you are not authorized for this operation"})
            }
        }
    });
 }
}

 module.exports = {
    authenticate
 }