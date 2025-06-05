const express = require("express");
const { IdValidator } = require("../middlewares/id.validator");
const { deviceModel } = require("../models/device.model");

const productRouter = express.Router();

productRouter.get("/",async(req,res)=>{
    const devices = await deviceModel.find();
    res.send(devices);
})

productRouter.get("/:id",IdValidator(deviceModel),async(req,res)=>{
    const id = req.params.id;
    const device = await deviceModel.findById(id);
    res.send(device);
})

productRouter.post("/add",async(req,res)=>{
    const data = req.body;
    const product = new deviceModel(data);
    await product.save();
    res.send({msg:"product added successfully"});
})

productRouter.patch("/update/:id",IdValidator(deviceModel),async(req,res)=>{
    const id = req.params.id;
    const data = req.body;
    try {
        await deviceModel.findByIdAndUpdate(id,data);
        res.send({msg:"product updated successfully"});
    } catch (error) {
        console.log(error);
        res.send({mag:"Something went wrong",err:error.message})
    }  
})

productRouter.post("/delete/:id",IdValidator(deviceModel),async(req,res)=>{
    const id = req.params.id;
    try {
        await deviceModel.findByIdAndDelete(id);
        res.send({msg:"product deleted successfully"});
    } catch (error) {
        console.log(error);
        res.send({mag:"Something went wrong",err:error.message})
    }  
})

module.exports = {
    productRouter
}