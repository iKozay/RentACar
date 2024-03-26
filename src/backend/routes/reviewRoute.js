const express = require("express");


const {getCount, addReview, deleteReview, getReviews,getReviewsByBranchID, updateReview} = require('../controllers/reviewController');


const router = express.Router();

router.post("/add",addReview);
router.get("/reviews",getReviews);
router.get("/reviews/:id",getReviewsByBranchID);



// delete route
router.delete("/delete/:id",deleteReview);

// update review
router.put("/update/:id",updateReview);

router.get("/count",getCount)




module.exports = router;