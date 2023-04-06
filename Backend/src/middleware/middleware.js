const JWT = require("jsonwebtoken")
const userModel = require("../models/userSchema")

exports.authentication = async(req, res, next)=>{
try{
let token = req.headers["x-auth-token"]
if(!token) return res.status(400).send("Please provide token")

let decodedToken = await JWT.verify(token, process.env.JWT_SECRET_KEY)
req.user= decodedToken
console.log(decodedToken)
if(!decodedToken) return res.status(401).send("You are not authentic user")
next()

}
catch(err){
    res.status(500).send({status:false, message:err.message})
}
}

//admin access

exports.isAdmin= async(req, res,next)=>{
try{
const user= await userModel.findById(req.user.id)
if(user.role!==1) return res.status(401).send({status:false, message: "unauthorized access"})
next()
}
catch(err){
 return res.status(500).send({status:false, message: err.message})
}
}