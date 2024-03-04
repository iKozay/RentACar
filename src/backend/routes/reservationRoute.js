const express = require('express');
const router = express.Router();

const reservation_controller = require('../controllers/reservationController');
// GET users listing.
router.get('/',reservation_controller.user_list );
// GET a user by his id 
router.get('/:reservationId',reservation_controller.user_detail)

// POST a user
router.post('/',reservation_controller.user_create)

module.exports = router;


