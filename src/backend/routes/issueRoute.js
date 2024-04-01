const express = require('express');
const router = express.Router();

const issue_controller = require('../controllers/issueController');

router.get('/',issue_controller.issue_list);
router.get('/:issueId',issue_controller.issue_detail);
router.get('/user/:userId',issue_controller.issue_list_user);
router.post('/',issue_controller.issue_create);
router.delete('/:issueId',issue_controller.issue_delete);
module.exports = router;
