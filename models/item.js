const mongoose = require("mongoose")

const review = require("./review")
const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
  url: String,
},
  price: Number,
  location: String,
  country: String,
  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Review"
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
const item = mongoose.model("item",itemSchema)

itemSchema.post("findOneAndDelete",async (dets) => {
  if(dets){
    await review.deleteMany( { _id: { $in : item.reviews } } )
  }
})

module.exports = item;