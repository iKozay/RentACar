// Importing mongoose for database interaction
const mongoose = require('mongoose');

// Destructuring Schema from mongoose
const { Schema } = mongoose;

// Creating a reservation schema
const reservationSchema = new Schema({
  // Reference to the vehicle associated with the reservation
  vin: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  // Date of reservation creation
  reservationDate: {
    type: Date,
    required: true,
  },
  // Date of vehicle pickup
  pickupDate: {
    type: Date,
    required: true,
  },
  // Date of vehicle return
  returnDate: {
    type: Date,
    required: true,
  },
  // Reference to the user who made the reservation
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Status of the reservation (To Pickup, Checked In, Checked Out, Cancelled)
  status: {
    type: String,
    enum: ['To Pickup', 'Checked In', 'Checked Out', 'Cancelled'],
    default: 'To Pickup',
  },
  // Add-ons selected for the reservation (insurance, GPS, child seat)
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
}, { timestamps: true }); // Automatic timestamping for document creation and updating

// Exporting the reservation schema as a model
module.exports = mongoose.model('Reservation', reservationSchema);

