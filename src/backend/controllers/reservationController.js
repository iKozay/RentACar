const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Reservation = require("../models/reservationModel");

// View a reservation by reservation ID
exports.view_reservation = asyncHandler(async (req, res) => {
  const reservationId = req.params.reservationId;
  const reservation = await Reservation.findById(reservationId).populate('userID').populate('vin').exec();
  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }
  res.status(200).json(reservation);
});

// view all reservations
exports.view_all_reservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({}).populate('userID').populate('vin').exec();
  res.status(200).json(reservations);
});

// View all reservations for a user
exports.view_user_reservations = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const reservations = await Reservation.find({ userID: userId }).populate('userID').populate('vin').exec();
  res.status(200).json(reservations);
});

// Create a new reservation
exports.create_reservation = asyncHandler(async (req, res) => {
  const { vin, reservationDate, pickupDate, returnDate, userID } = req.body;

  // Check if all required fields are present in the request body
  if (!vin || !reservationDate || !pickupDate || !returnDate || !userID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new reservation object with the provided data
    const reservation = new Reservation({
      vin,
      reservationDate,
      pickupDate,
      returnDate,
      userID
    });

    // Save the reservation to the database
    const newReservation = await reservation.save();

    // Send a success response with the newly created reservation
    res.status(201).json(newReservation);
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(400).json({ message: err.message });
  }
});

// Modify a reservation
exports.modify_reservation = asyncHandler(async (req, res) => {
  const reservationId = req.params.reservationId;
  const updates = req.body;
  try {
    // Ensure that the 'vin' property is updated correctly if necessary
    if (updates.vin) {
      updates.vin = updates.vin; // Assuming the 'vin' property is provided in the request body
    }
    const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, updates, { new: true });
    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cancel a reservation
exports.cancel_reservation = asyncHandler(async (req, res) => {
  const reservationId = req.params.reservationId;
  try {
    const canceledReservation = await Reservation.findByIdAndDelete(reservationId);
    if (!canceledReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.status(200).json({ message: "Reservation canceled successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
