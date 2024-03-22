const express = require('express');
const router = express.Router();
const branch_controller = require('../controllers/branchController');
router.get("/count",branch_controller.branch_count)

router.get('/',branch_controller.branch_list);
router.get('/:branchId',branch_controller.branch_detail);
router.post('/',branch_controller.branch_create);
// router.put('/:branchId',);
// router.delete('/',)
module.exports = router;