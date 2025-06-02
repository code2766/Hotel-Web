const express = require("express");
const router = express.Router(); 
const item = require("../models/item")
const {isLoggedIn} = require("../middleware.js")
//index Route
router.get("/",async (req,res)=>{
  let allitem=await item.find({})
  res.render("items/index.ejs",{allitem})
})

//new Form
router.get("/new",isLoggedIn,(req,res)=>{
  res.render("items/new.ejs")
})


//Show Route
router.get("/:id",async (req,res)=>{
  let {id} = req.params;
  const items = await item.findById(id).populate("reviews").populate("owner");
  res.render("items/show.ejs",{items})
})
//Creat Route
router.post("/",isLoggedIn,async(req,res)=>{
  let items = req.body.item
  items.owner = req.user._id;
  await item.create(items)
  res.redirect("/products")
})
//Edit Get
router.get("/:id/edit",isLoggedIn,async(req,res)=>{
  let {id} = req.params
  const items = await item.findById(id)
  res.render("items/edit.ejs",{items})
})
//Update route
router.put("/:id",isLoggedIn,async (req,res)=>{
  let {id} = req.params;
  await item.findByIdAndUpdate(id,{...req.body.item})
  res.redirect(`/products/${id}`)
})
//Delete Route
router.delete("/:id",isLoggedIn,async(req,res)=>{
   let {id} = req.params;
   let deleteListing=await item.findByIdAndDelete(id)
   console.log(deleteListing);
   res.redirect("/products")
})

module.exports = router; // export the router
