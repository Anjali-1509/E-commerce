const { hashPassword, comparePassword } = require("../helpers/authHelper")
const userModel = require("../models/userSchema")
const mongoose = require("mongoose")
let jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.createUser = async(req, res)=>{
  try{
   let data = req.body
   const {name, email,password, phone, address,role,answer}= data

   //validations
   if(!name) return res.status(400).send({message:"name is required"})
   if(!email) return res.status(400).send({message:"email is required"})
   if(!password) return res.status(400).send({message:"password is required"})
   if(!phone) return res.status(400).send({message:"phone is required"})
   if(!address) return res.status(400).send({message:"address is required"})
   if(!answer) return res.status(400).send({message:"Answer is required"})

   let existingUser = await userModel.findOne({email:email})
   if(existingUser) return res.status(400).send({success:false,message:"User already registered"})

  let hashedPassword = await hashPassword(password)
  data.password= hashedPassword
  let savedData= await userModel.create(data)
  return res.status(201).send({success:true,message:"successfully registered", data: savedData})

  }
  catch(err){
     res.status(500).send({success:false, message:err.message})
  }  
}

exports.loginUser= async(req, res)=>{ 
  try{
    let data = req.body
    let {email, password} = data
    if(!email) return res.status(400).send({message:"email is required"})
    if(!password) return res.status(400).send({message:"password is required"})
    
    
    let user = await userModel.findOne({email:email})
    if(!user) return res.status(404).send({success:false, message:"This email is not registered"})

    let match =await comparePassword(password, user.password)
    console.log(match)
    if(!match) return res.status(404).send({success:false, message:"Incorrect Password"})

    let token = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY)
    return res.status(201).send(
      {
        success:true,
        message:"Login Successfully",
        user:{
          name:user.name,
          email:user.email,
          phone:user.phone,
          address:user.address,
          role: user.role
        },
        token : token})
  }
  catch(error){
    res.status(500).send({success: false, message: error.message})
  }
}

exports.forgotPassword = async (req, res)=>{
  try{
   let {email, answer, newPassword} = req.body
   if(!email) return res.status(400).send({message:"Email is required"})
   if(!answer) return res.status(400).send({message:"Answer is required"})
   if(!newPassword) return res.status(400).send({message:"New Password is required"})

   let user = await userModel.findOne({email:email, answer:answer})
   if(!user) return res.status(404).send({success:false, message:"Email or Answer is wrong"})

   let hashed = await hashPassword(newPassword)
   console.log(hashed)
   let updatedPassword = await userModel.findOneAndUpdate(user._id, {password:hashed})
   return res.status(200).send({success:true, message:"Password Reset Successfully"})
  }
  catch(err){
    res.status(500).send({success:false, message:err.message})
  }
}


exports.getUser=async(req, res)=>{
  try{
  let data= await userModel.find()
  return res.status(200).send(data)
  }
  catch(err){
    res.status(500).send({status:false, message:err.message})
  }
}


exports.test= (req, res)=>{
  res.send("hi i m foine")
}

exports.updateUser= async(req, res)=>{
try{
let {password} = req.body
let data = req.body
let id = req.user.id
if(password && password.length<6) return res.status(400).send("Password should be 6 digits long")
const hashedPassword= password ? await hashedPassword(password) : undefined
const updateProfile = await userModel.findOneAndUpdate({_id:id}, data,{new:true})
 return res.status(200).send({success:true,message : "Profile Updated Successfully", updatedUser : updateProfile})
}
catch(err){
  res.status(500).send({success:false, message:"Something went wrong", error:err.message})    
}
}
