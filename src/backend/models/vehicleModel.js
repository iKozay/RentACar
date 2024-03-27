const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Creating a new schema for the property model for the make an offer.

const vehicleSchema = new Schema({
  make: {
    type: String,
    required: false,
  },

  model: {
    type: String,
    required: false,
  },
  year: {
        type: Number,
        required: false,
    },
  price: {
    type: Number,
    required: false,
  },
  transmisssion: {
    type: String,
    required: false,
  },
  numberOfSeats: {
    type: Number,
    required: false,
  },
  address: {
    type: String,
    default: false

  },
  colour: {
    type: String,
    default: false

  },
 numberOfDoors: {
    type: Number,
    required: false,
  },
  numberOfBaggage: {
    type: Number,
    required: false,
  },

  kilometrage: {
    type: Number,
    required: false,
  },
  
  licensePlate:{
    type: String,
    required: false,
  },

  electricalOrFuel:{
    type: String,
    required: false,
  },

  Availability:{
    type: String,
    required: false,

  },
  Image:{
    type: String,
    required: true
  }

});

module.exports = mongoose.model("Vehicle", vehicleSchema);