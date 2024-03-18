const express = require('express');
const router = express.Router();
const branch_controller = require('../controllers/branchController');

router.get('/',);
router.get('/:branchId');
router.post('/',branch_controller.branch_create);
router.put('/:branchId',);
router.delete('/',)
module.exports = router;