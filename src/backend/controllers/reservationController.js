const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Reservation = require("../models/reservationModel");

// View a reservation by reservation ID
exports.view_reservation = asyncHandler(async (req, res) => {
  const reservationId = req.params.reservationId;
  const reservation = await Reservation.findById(reservationId).populate('userID').exec();
  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }
  res.status(200).json(reservation);
});

// View all reservations for a user
exports.view_user_reservations = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const reservations = await Reservation.find({ userID: userId }).populate('userID').exec();
  res.status(200).json(reservations);
});

// Create a new reservation
exports.create_reservation = asyncHandler(async (req, res) => {
  const reservation = new Reservation(req.body);
  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Modify a reservation
exports.modify_reservation = asyncHandler(async (req, res) => {
  const reservationId = req.params.reservationId;
  const updates = req.body;
  try {
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
