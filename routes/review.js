const express = require("express");
const router = express.Router({ mergeParams: true }); 
const review = require("../models/review.js")
const item = require("../models/item")


//review route
router.post("/", async (req, res) => {
  let items = await item.findById(req.params.id);
  let newReview = new review(req.body.review);
  await newReview.save();
  items.reviews.push(newReview); // <-- push the review's _id
  await items.save();
  res.redirect(`/products/${items._id}`);
});
//Delete review route
router.delete("/:reviewId",async (req,res)=>{
  let {id,reviewId} = req.params;
  await item.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await review.findByIdAndDelete(reviewId)
  res.redirect(`/products/${id}`)
})

module.exports = router;