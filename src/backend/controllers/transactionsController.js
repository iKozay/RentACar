const Transaction = require("../models/transactionModel");
const Reservation = require("../models/reservationModel");
const User = require("../models/userModel");

const addTransaction = async (req, res) => {
    const { name, cardNumber, expDate, ccv,amount,date,userId,reservationId } = req.body;
    if (!name || !cardNumber || !expDate || !ccv || !amount || !date || !userId || !reservationId) {
        return res.status(400).json({ message: "All fields are required" });
    }
    // check if the reservation exists
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
    }
    // check if user exists
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
  try {
    const trans = new Transaction(req.body);
    const newTransaction = await trans.save();

    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.status(200).json(transaction);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

const getAllTransactions = async (req, res) => {
try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTransactionsByUserID = async (req, res) => {
    try {
        const { id } = req.params;
        //check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const transactions = await Transaction.find({userId: id});
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTransactionByReservationID = async (req, res) => {
    try {
        const { id } = req.params;
        //check if reservation exists
        const reservation = await Reservation.findById(id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        const transaction = await Transaction.findOne({reservationId: id});
        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = { addTransaction, getTransaction, getAllTransactions, getTransactionsByUserID, getTransactionByReservationID};

