const mongoose = require("mongoose")
const initData = require("./data")
const item = require("../models/item")

mongoose.connect('mongodb://127.0.0.1:27017/hotelweb')

const initDB = async()=>{
    await item.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner:"683cc361784c5d59d5514519",
    }));
    await item.insertMany(initData.data);
    console.log("Data was initialized");
    
}

initDB()