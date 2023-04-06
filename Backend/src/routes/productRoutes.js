const express = require("express")
const { createProduct, getProduct, getSingleProduct, getProductPhoto, deleteProduct } = require("../controllers/productController")
const { isAdmin, authentication } = require("../middleware/middleware")
const router = express.Router()
const formidable= require("express-formidable")
  
router.post("/create-product", authentication, isAdmin, formidable() ,createProduct)
router.get("/get-product", getProduct)
router.get("/get-product/:slug", getSingleProduct)
router.get("/product-photo/:id", getProductPhoto)
router.delete("/produc/:id", deleteProduct)

module.exports= router