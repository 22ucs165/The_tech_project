const IdValidator = (model)=>{
  return  async(req,res,next) => {
            let id = req.params.id;
        if(id.length !== 24){
            res.send({msg:"invalid id"});
            return;
        }
        const response = await model.findById(id);
        if(response){
            next()
        }
        else{
            res.send({msg:"id does not exist"});
        }
    }
}

module.exports = {
    IdValidator
}