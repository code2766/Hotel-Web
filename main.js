const express = require("express")
const app = express()
const path = require("path")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const ejsMate = require('ejs-mate')
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine","ejs")

session = require('express-session')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine('ejs', ejsMate);

const passport = require("passport")
const localStrategy = require("passport-local")
const user = require("./models/user.js")

const sessionOptions = {
  secret:"mySuperSecret",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now() + 7 * 24 * 60 *60*1000,
    maxAge:7 * 24 * 60 *60*1000,
    httpOnly:true,
  }
}
app.use(session(sessionOptions))

//Passport

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())


app.use((req,res,next)=>{
  res.locals.currUser = req.user;
  next();
})

const reviews = require("./routes/review.js")
const items = require("./routes/items.js")
const userRouter = require("./routes/user.js")


app.use("/products",items)
app.use("/products/:id/review",reviews)
app.use("/",userRouter)


mongoose.connect('mongodb://127.0.0.1:27017/hotelweb');
app.listen(3000) 





