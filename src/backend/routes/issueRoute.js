const express = require('express');

const router = express.Router();

const issueController = require('../controllers/issueController');

router.get('/', issueController.issue_list);
router.get('/:issueId', issueController.issue_detail);
router.get('/user/:userId', issueController.issue_list_user);
router.post('/', issueController.issue_create);
router.delete('/:issueId', issueController.issue_delete);
router.put('/reply/:issueId', issueController.issue_reply);
router.put('/seen/:issueId', issueController.issue_seen);
module.exports = router;
