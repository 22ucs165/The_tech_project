const devicevalidator = async (req,res,next)=>{
    const data = req.body;
    if(data.title,data.category,data.brand,data.price,data.images,data,manufacturerinfo){
        next();
    }
    else{
        res.send({msg:"please provide title, category, brand, price, images and manufacturer info"});
    }
}

module.exports = {
    devicevalidator
}