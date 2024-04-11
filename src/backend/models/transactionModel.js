const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true
  },
  expDate: {
      type: String,
      required: true
  },
  ccv: {
      type: String,
      required: true
  },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
  status: {
    type: String,
    default: "approved"
  },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
  reservationId: {
    type: Schema.Types.ObjectId,
    ref: "Reservation"
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
