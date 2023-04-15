const express = require("express")
const router =express.Router()
const {createUser, loginUser, getUser, test, forgotPassword, updateUser}= require("../controllers/userController")
const { authentication, isAdmin } = require("../middleware/middleware")
const { getOrders } = require("../controllers/orderController")


router.get("/", (req,res)=>{res.send("hi there")})
router.post("/register", createUser)
router.post("/login", loginUser)
router.post("/forgot-password", forgotPassword)
router.get("/users", getUser)
router.put("/update-user", authentication,updateUser)
router.get("/user-auth",authentication, (req,res)=>{
    res.status(200).send({ok:true})
} )
router.get("/admin-auth",authentication,isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
} )

router.get("/orders", authentication, getOrders)

module.exports= router