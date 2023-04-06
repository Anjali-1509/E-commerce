const express = require("express")
const {CreateCategory, updateCategory, getCategory, getSingleCategory, deleteCategory} = require("../controllers/categoryController")
const { authentication, isAdmin } = require("../middleware/middleware")
const router= express.Router()

router.post("/create-category", authentication, isAdmin, CreateCategory)
router.put("/update-category/:id", authentication, isAdmin, updateCategory)
router.get("/get-category", getCategory)
router.get("/single-category/:slug", getSingleCategory)
router.delete("/delete-category/:id",authentication, isAdmin, deleteCategory)
module.exports= router