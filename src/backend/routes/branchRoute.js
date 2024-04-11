const express = require('express');

const router = express.Router();
const branchController = require('../controllers/branchController');

router.get('/count', branchController.branch_count);

router.get('/', branchController.branch_list);
router.get('/:branchId', branchController.branch_detail);
router.post('/', branchController.branch_create);
router.put('/:branchId', branchController.branch_update);
router.put('/reservations/:branchId', branchController.branch_append_reservation);
router.put('/vehicles/:branchId', branchController.branch_append_vehicle);
// router.put('/:branchId',);
router.delete('/:branchId', branchController.branch_delete);
router.get('/refresh/:branchId', branchController.branch_refresh);
module.exports = router;
