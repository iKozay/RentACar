const mongoose = require('mongoose');

const { Schema } = mongoose;

const reservationSchema = new Schema({

  vin: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  reservationDate: {
    type: Date,
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['To Pickup', 'Checked In', 'Checked Out', 'Cancelled'],
    default: 'To Pickup',
  },
  addons: {
    insurance: {
      type: Number,
      required: true,
      default: 0,
    },
    gps: {
      type: Number,
      required: true,
      default: 0,
    },
    childSeat: {
      type: Number,
      required: true,
      default: 0,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
