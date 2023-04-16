const mongoose = require("mongoose")
const fs = require("fs")
const ProductModel = require("../models/productSchema")
const slugify = require('slugify')
const { parseArgs } = require("util")
const braintree = require("braintree");
const OrderModel= require("../models/orderSchema")
const dotenv = require("dotenv")

//PAYMENT GATEAWAY
dotenv.config()
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env. BRAINTREE_PRIVATE_KEY,
  });

exports.createProduct=  async(req, res)=>{
try{
const {name, slug , description,price, category, quantity,shipping} = req.fields
const {photo} = req.files

//validations
if(!name) return res.status(400).send({message:"Name is required"})
if(!description) return res.status(400).send({message:"description is required"})
if(!price) return res.status(400).send({message:"price is required"})
if(!category) return res.status(400).send({message:"category is required"})
if(!quantity) return res.status(400).send({message:"quantity is required"})
if(!photo) return res.status(400).send({message:"photo is required"})
if(photo.size>1000000) return res.status(400).send({message:"photo should be less than 1mb"})

let product= new ProductModel({...req.fields, slug:slugify(name)})
console.log(product)
if(photo){
    product.photo.data =fs.readFileSync(photo.path)
    product.photo.contentType= photo.type
}
await ProductModel.create(product)
 //let savedData = await ProductModel.create(product)
 return res.status(201).send({success:true, message:"Product created Successfully", product:product})


}
catch(err){
    res.status(500).send({success:false, message:"Something went wrong", error:err.message})
}
}

exports.getProduct= async(req,res)=>{
try{
  let products = await ProductModel.find().populate("category").select("-photo").limit(12).sort({createdAt:-1})
  return res.status(200).send({success:true,totalCount:products.length, message:"All Products", products:products})
}
catch(err){
    res.status(500).send({success:false, message:"Something went wrong", error:err.message})  
}
}

exports.getSingleProduct=async(req,res)=>{
try{
const {slug}= req.params
const product = await ProductModel.findOne({slug:slug}).populate("category").select("-photo")
return res.status(200).send({success:true, message:"Single Product Fetched", product:product})
}
catch(err){
    res.status(500).send({success:false, message:"Something went wrong", error:err.message})    
}
}


exports.getProductPhoto= async(req,res)=>{
try{
const {id}= req.params
let product= await ProductModel.findById(id).select("photo")
if(product.photo.data){
    res.set({"Content-type":product.photo.contentType})
    return res.status(200).send(product.photo.data)
}
}
catch(err){
    res.status(500).send({success:false, message:"Something went wrong", error:err.message}) 
}
}

exports.deleteProduct=async(req,res)=>{
try{
await ProductModel.findByIdAndDelete(req.params.id).select("-photo")
return res.status(200).send({success:true, message:"Product Deleted Successfully"})
}
catch(err){
 res.status(500).send({success:false, message:"Something went wrong", error:err.message}) 
}
}

exports.getByCategory= async(req, res)=>{
try{
const{slug}= req.params
console.log(slug)
let arr =[]
let product = await ProductModel.find().populate({path:"category", match :{slug:slug}}).select("-photo")
for(let i=0; i<product.length; i++){
if(product[i].category!==null){
    arr.push(product[i])
}
}
res.send(arr)
}
catch(err){
    res.status(500).send({success:false, message:"Something went wrong", error:err.message})    
}
}

exports.productFilter= async(req, res)=>{
try{
const {radio}= req.body
const {slug} =req.params
console.log(radio)
let args={}
let arr=[]
if(radio.length) args.price ={$gte : radio[0], $lte :radio[1]}
const products = await ProductModel.find(args).populate({path:"category", match :{slug:slug}}).select("-photo")
for(let i=0; i<products.length; i++){
    if(products[i].category!==null){
        arr.push(products[i])
    }
}
return res.status(200).send({success:true, products:arr})
}
catch(err){
    res.status(500).send({success:false, message:"Something went wrong", error:err.message}) 
}
}

exports.searchProduct = async(req,res)=>{
try{
const {keyword}= req.params
const products = await ProductModel.find({
    $or :[
        {name : {$regex: keyword, $options :"i"}},
        {description : {$regex: keyword, $options :"i"}}
    ]
}).select("-photo")

return res.status(200).send(products)
}
catch(err){
    res.status(500).send({success:false, message:"Something went wrong", error:err.message})   
}
}

exports.relatedProduct = async(req, res)=>{
try{
const {pid, cid} = req.params
const products = await ProductModel.find({category:cid, _id:{$ne :pid}}).select("-photo").limit(3).populate("category")
return res.status(200).send({success:true, products:products})
}
catch(err){
    res.status(500).send({success:false, message:"Something went wrong", error:err.message})    
}
}

exports.braintreeToken = async(req,res)=>{
try{
gateway.clientToken.generate({},function(err, response){
 if(err){
    res.status(500).send(err)
 }else{
    res.send(response)
 }
})
}
catch(err){
 console.log(err)
}
}

exports.braintreePayment= async(req,res)=>{
    try {
        const { nonce, cart } = req.body;
        let total = 0;
        cart.map((i) => {
          total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
          {
            amount: total,
            paymentMethodNonce: nonce,
            options: {
              submitForSettlement: true,
            },
          },
          function (error, result) {
            if (result) {
              const order = new OrderModel({
                products: cart,
                payment: result,
                buyer: req.user.id,
              }).save();
              res.json({ ok: true });
            } else {
              res.status(500).send(error);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
}