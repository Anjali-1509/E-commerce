const mongoose= require("mongoose")
const OrderModel = require("../models/orderSchema")

exports.getOrders= async(req, res)=>{
try{
const orders = await OrderModel.find({buyer:req.user.id}).populate("products", "-photo").populate("buyer" , "name")
console.log(req.user.id)
return res.status(200).send(orders)

}
catch(err){
    res.status(500).send({success:false, message:"Something went wrong", error:err.message})  
}
}