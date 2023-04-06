const mongoose = require("mongoose")
const fs = require("fs")
const ProductModel = require("../models/productSchema")
const slugify = require('slugify')

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
    res.set({"Coontent-type":product.photo.contentType})
    return res.status(200).send(product.photo.data)
}
}
catch(err){
  c
}
}

exports.deleteProduct=async(req,res)=>{
try{
await ProductModel.findByIdAndDeletee(req.params.id).select("-photo")
return res.status(200).send({success:true, message:"Product Deleted Successfully"})
}
catch(err){
 res.status(500).send({success:false, message:"Something went wrong", error:err.message}) 
}
}