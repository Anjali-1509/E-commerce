const express = require("express")
const { createProduct, getProduct, getSingleProduct, getProductPhoto, deleteProduct, getByCategory, productFilter, searchProduct, relatedProduct } = require("../controllers/productController")
const { isAdmin, authentication } = require("../middleware/middleware")
const router = express.Router()
const formidable= require("express-formidable")
  
router.post("/create-product", authentication, isAdmin, formidable() ,createProduct)
router.get("/get-product", getProduct)
router.get("/get-product/:slug", getSingleProduct)
router.get("/product-photo/:id", getProductPhoto)
router.get("/get-product-by-category/:slug", getByCategory)
router.delete("/delete-product/:id", deleteProduct)
router.post("/product-filters/:slug", productFilter)
router.get("/search/:keyword", searchProduct)
router.get("/related-product/:pid/:cid", relatedProduct)


module.exports= router