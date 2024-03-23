const express = require('express');
const router = express.Router();
const branch_controller = require('../controllers/branchController');
router.get("/count",branch_controller.branch_count)

router.get('/',branch_controller.branch_list);
router.get('/:branchId',branch_controller.branch_detail);
router.post('/',branch_controller.branch_create);
router.put('/:branchId',branch_controller.branch_update);
router.put('/reservations/:branchId',branch_controller.branch_append_reservation);
// router.put('/:branchId',);
router.delete('/:branchId',branch_controller.branch_delete);
router.get('/refresh/:branchId',branch_controller.branch_refresh)
module.exports = router;