const express = require("express");
const router = express.Router();
const {addTransaction, getTransaction, getAllTransactions, getTransactionByReservationID, getTransactionsByUserID} = require("../controllers/transactionsController");


router.post("/add", addTransaction);
router.get("/", getAllTransactions);
router.get("/:id", getTransaction);
router.get("/user/:id", getTransactionsByUserID);
router.get("/reservation/:id", getTransactionByReservationID);


module.exports = router;