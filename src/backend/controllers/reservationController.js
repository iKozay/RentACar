const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Reservation = require("../models/reservationModel");
const { authenticate } = require("../config/passport");
// View a reservation by reservation ID
const { sendConfirmationEmail } = require("../config/emailService");
const User = require("../models/userModel");
const Vehicle = require("../models/vehicleModel");

exports.view_reservation = asyncHandler(async (req, res) => {
  const reservationId = req.params.reservationId;
  const reservation = await Reservation.findById(reservationId)
    .populate("userID")
    .populate("vin")
    .exec();
  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }
  res.status(200).json(reservation);
});

// view all reservations
exports.view_all_reservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({})
    .populate("userID")
    .populate("vin")
    .exec();
  res.status(200).json(reservations);
});

// View all reservations for a user
exports.view_user_reservations = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const reservations = await Reservation.find({ userID: userId })
    .populate("userID")
    .populate("vin")
    .exec();
  res.status(200).json(reservations);
});

// View vehicle reservations
exports.view_vehicle_reservations = asyncHandler(async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const reservations = await Reservation.find({ vin: vehicleId })
    .populate("userID")
    .populate("vin")
    .exec();
  res.status(200).json(reservations);
});

// Create a new reservation
exports.create_reservation = asyncHandler(async (req, res) => {
  const {
    vin,
    reservationDate,
    pickupDate,
    returnDate,
    userID,
    status = "To Pickup",
    addons,
  } = req.body;

  // Check if all required fields are present in the request body
  if (
    !vin ||
    !reservationDate ||
    !pickupDate ||
    !returnDate ||
    !userID ||
    !addons
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new reservation object with the provided data
    const reservation = new Reservation({
      vin,
      reservationDate,
      pickupDate,
      returnDate,
      userID,
      status,
      addons,
    });
    console.log(vin);
    const user = await User.findById(reservation.userID).exec();
    const vehicle = await Vehicle.findById(reservation.vin).exec();

    // console.log("User:", user);
    // console.log("Vehicle:", vehicle);

    if (!user || !vehicle)
      return res.status(404).json({ error: "user or vehicle not found" });

    // Save the reservation to the database
    const newReservation = await reservation.save();
    const emailSent = await sendConfirmationEmail(user.email, {
      user: {
        name: user.username,
      },
      vehicle: {
        make: vehicle.make,
        model: vehicle.model,
      },
      pickupDate:pickupDate.substring(0,10),
      returnDate:returnDate.substring(0,10),
    });

    if (!emailSent)
      return res
        .status(500)
        .json({ error: "failed to send confirmation email" });
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
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      updates,
      { new: true }
    );
    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cancel a reservation
exports.cancel_reservation = asyncHandler(async (req, res) => {
  const reservationId = req.params.reservationId;
  try {
    const canceledReservation = await Reservation.findByIdAndDelete(
      reservationId
    );
    if (!canceledReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.status(200).json({ message: "Reservation canceled successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
exports.reservation_count = async (req, res) => {
  try {
    const count = await Reservation.countDocuments({});
    res.json({ count });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete vehicle reservations
exports.delete_vehicle_reservations = [
  authenticate,
  asyncHandler(async (req, res) => {
    const vehicleId = req.params.vehicleId;
    const reservations = await Reservation.deleteMany({
      vin: vehicleId,
    }).exec();
    res
      .status(200)
      .json({
        message:
          "successfully deleted reservations associated with vehicle: " +
          vehicleId,
      });
  }),
];

// delete user reservations
exports.delete_user_reservations = [
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const reservations = await Reservation.deleteMany({
      userId: userId,
    }).exec();
    res
      .status(200)
      .json({
        message:
          "successfully deleted reservations associated with user: " + userId,
      });
  }),
];

// delete reservations with given ids

exports.delete_reservations = [
  authenticate,
  async (req, res) => {
    try {
      const ids = req.body;

      const reservations = await Reservation.deleteMany({ _id: { $in: ids } });

      if (!reservations.deletedCount) {
        return res
          .status(404)
          .json({ message: "No reservations found with the provided IDs." });
      }

      res.status(200).json({ message: "Reservations deleted successfully." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
];
