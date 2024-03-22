const Review = require("../models/reviewModel");

const {authenticate}=require('../config/passport')


const addReview = async (req, res) => {

  const review = new Review(req.body);
  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReviewsByBranchID = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.find({ [branchID]: id });
    if (!review) {
      return res.status(404).json({ messahe: "Reviews not found with Branch id " + id })
    }
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



/**
 * Deletes vehicle from the database
 * and return the deleted vehicle
 */
const deleteReview = [
  authenticate,
  async (req, res) => {
  
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: "Cannot find any review with id " + id + " to delete." })
    }
    res.status(200).json(review);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}];



/**
 * Updates vehicle from the database
 * and return the updated vehicle
 */
const updateReview = async (req, res) => {

  try {
    const { id } = req.params;

    const review = await Review.findByIdAndUpdate(id,{...req.body});
    if (!review) {
      return res.status(404).json({ message: "Cannot find any review with id " + id + " to update." })
    }
    const ureview = await Review.findById(id);
    if (!ureview) {
      return res.status(404).json({ message: "Review not found with id " + id })
    }

    res.status(200).json(ureview);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getCount= async(req,res)=>{
  try {
    const count = await Review.countDocuments({});
    res.json({ count });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



module.exports = {getCount, addReview, deleteReview, getReviews,getReviewsByBranchID, updateReview};

