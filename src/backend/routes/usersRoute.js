const express = require('express');
const router = express.Router();
// const {authenticate} = require('passport');
const user_controller = require('../controllers/userController');
// GET users listing.
router.get('/',user_controller.user_list );
// GET a user by his id 
router.get('/:userId',user_controller.user_detail)

// POST a user
router.post('/',user_controller.user_create)

// PUT (update) a user

router.put('/:userId',user_controller.user_update)

// Delete a user
router.delete('/:userId',user_controller.user_delete)
module.exports = router;

router.get('/customers',user_controller.customer_list);