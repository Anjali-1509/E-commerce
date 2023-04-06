const express = require("express")
const router =express.Router()
const {createUser, loginUser, getUser, test, forgotPassword}= require("../controllers/userController")
const { authentication, isAdmin } = require("../middleware/middleware")


router.get("/", (req,res)=>{res.send("hi there")})
router.post("/register", createUser)
router.post("/login", loginUser)
router.post("/forgot-password", forgotPassword)
router.get("/users", getUser)
router.get("/user-auth",authentication, (req,res)=>{
    res.status(200).send({ok:true})
} )
router.get("/admin-auth",authentication,isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
} )

module.exports= router