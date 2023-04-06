const mongoose = require("mongoose")
const CategoryModel = require("../models/categorySchema")
const slugify = require("slugify")


exports.CreateCategory = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) return res.status(400).send({ message: "Name is required" })

        let existingCaegory = await CategoryModel.findOne({ name: name })
        if (existingCaegory) return res.status(400).send({ message: "category already exists" })

        let data = { name: name, slug: slugify(name) }
        let createdData = await CategoryModel.create(data)
        return res.status(201).send({ success: true, message: "New category created", category: createdData })
    }
    catch (err) {
        res.status(500).send({ success: false, message: "Something went wrong", err })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            id,
            { name: name, slug: slugify(name) },
            { new: true })

        return res.status(200).send({ success: true, message: "Category  updated successfully", data: updatedCategory })
    }
    catch (err) {
        res.status(500).send({ success: false, message: "something went wrong", error: err.message })
    }
}

exports.getCategory= async(req,res)=>{
try{
let data =await CategoryModel.find()
return res.status(200).send({success:true, message:"all category list",category:data})
}
catch(err){
  res.status(500).send({success:false, message:"Something went wrong", error:err.message})
}
}

exports.getSingleCategory=async(req, res)=>{
try{
 let {slug} = req.params
 let data = await CategoryModel.findOne({slug:slug})
 return res.status(200).send({success:true, message:"single category", data:data})
}
catch(err){
    res.status(500).send({success:false, message:"Something went wrong", error:err.message})  
}
}

exports.deleteCategory=async(req,res)=>{
try{
let {id} = req.params
let deletedData = await CategoryModel.findByIdAndDelete(id)
return res.status(200).send({success:true, message:"Category Deleted Successfully"})
}
catch(err){
    res.status(500).send({success:false, message:"Something went wrong", error:err.message})    
}
}