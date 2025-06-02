const express = require("express");
const router = express.Router();
const user = require("../models/user");
const passport = require("passport");
const { saveUrl } = require("../middleware");

router.get("/signup",(req,res)=>{
    res.render("user/signup.ejs")
})

router.post("/signup",async (req,res)=>{
    let {username,email,password} = req.body;
    const newUser = new user({username,email})
    let registeredUser = await user.register(newUser, password)
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err)
        }
        res.redirect("/products")
    });

})

router.get("/login",(req,res)=>{
    res.render("user/login.ejs")
})

router.post("/login",saveUrl,passport.authenticate("local",{failureRedirect:"/login"}),
    (req,res)=>{
        res.redirect(res.locals.redirectUrl || "/products")
})

router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if (err){
            return next()
        }
        res.redirect("/products")

    })
})

module.exports = router;