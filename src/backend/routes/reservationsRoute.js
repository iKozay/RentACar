//this file contains all the routes needed for the reservation related routes

const express = require('express');

const router = express.Router();

const reservation_controller = require('../controllers/reservationController');
// GET users listing.
router.get('/count', reservation_controller.reservation_count);

router.get('/user/:userId', reservation_controller.view_user_reservations);
// GET a reservation by its id

// GET all reservation
router.get('/', reservation_controller.view_all_reservations);
router.get('/:reservationId', reservation_controller.view_reservation);
router.get('/vehicle/:vehicleId', reservation_controller.view_vehicle_reservations);

// create a reservation
router.post('/', reservation_controller.create_reservation);

// update a reservation
router.put('/:reservationId', reservation_controller.modify_reservation);
// delete a reservation
router.delete('/:reservationId', reservation_controller.cancel_reservation);
router.delete('/vehicle/:vehicleId', reservation_controller.delete_vehicle_reservations);
router.delete('/user/:userId', reservation_controller.delete_user_reservations);
router.delete('/', reservation_controller.delete_reservations);

module.exports = router;
