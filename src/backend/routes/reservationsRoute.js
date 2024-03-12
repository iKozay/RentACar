const express = require('express');
const router = express.Router();

const reservation_controller = require('../controllers/reservationController');
// GET users listing.
router.get('/user/:userId', reservation_controller.view_user_reservations);
// GET a reservation by its id 
router.get('/:reservationId',reservation_controller.view_reservation)

// create a reservation
router.post('/',reservation_controller.create_reservation)

// update a reservation
router.put('/:reservationId',reservation_controller.modify_reservation);
// delete a reservation

router.delete('/:reservationId',reservation_controller.cancel_reservation)

module.exports = router;


