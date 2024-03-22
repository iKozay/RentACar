const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Creating a new schema for the property model for the make an offer.

const reviewSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  rating: {
    type: Number,
    required: false,
    min: 0,
    max: 5
  },

  comment: {
    type: String,
    required: false,
  },


  branchID: {
    type: Schema.Types.ObjectId,
    ref: 'Branch'
  }


});

module.exports = mongoose.model("Review", reviewSchema);