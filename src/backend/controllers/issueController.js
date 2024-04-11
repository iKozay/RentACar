const Issue = require("../models/issueModel");
const { authenticate } = require("../config/passport");

exports.issue_list = [
  authenticate,
  async (req, res) => {
    try {
      const issues = await Issue.find({})
        .populate({
          path: "replies",
          populate: {
            path: "sender",
            model: "User",
          },
        })
        .populate("sender")
        .exec();
      res.status(200).json(issues || []);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

exports.issue_detail = [
  authenticate,
  async (req, res) => {
    try {
      const id = req.params.issueId;
      const issue = await Issue.findById(id)
        .populate({
          path: "replies",
          populate: {
            path: "sender",
            model: "User",
          },
        })
        .populate("sender")
        .exec();
      if (issue !== null) return res.status(200).json(issue);
      else return res.status(404).json({ error: "Not found" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

exports.issue_list_user = [
  authenticate,
  async (req, res) => {
    try {
      const id = req.params.userId;
      const userIssues = await Issue.find({ sender: id })
        .populate({
          path: "replies",
          populate: {
            path: "sender",
            model: "User",
          },
        })
        .populate("sender")
        .exec();
      return res.status(200).json(userIssues || []);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

exports.issue_create = [
  authenticate,
  async (req, res) => {
    try {
      const { sender, subject, description } = req.body;
      if (!sender || !subject || !description) {
        return res
          .status(400)
          .json({ error: "Some of the required fields are empty" });
      }
      const issue = new Issue({
        seen: false,
        sender: sender,
        description: description,
        status: "open",
        subject: subject,
        replies: [],
      });
      issue.save();
      res.status(200).json(issue);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

exports.issue_delete = [
  authenticate,
  async (req, res) => {
    try {
      const issueId = req.params.issueId;
      const deletedIssue = await Issue.findByIdAndDelete(issueId);

      if (!deletedIssue) res.status(404).json({ error: "Issue doesn't exist" });
      else
        return res
          .status(200)
          .json({ message: "successfully deleted issue " + issueId });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

exports.issue_reply = [
  authenticate,
  async (req, res) => {
    try {
      const issueId = req.params.issueId;
      const { sender, body } = req.body;

      if (!sender || !body)
        return res.status(400).json({ error: "Some fields are not specified" });
      let issue = await Issue.findById(issueId);
      

      if (!issue) return res.status(404).json({ error: "Issue not found" });
      issue.seen = false;
      issue.replies.push({ sender, body });
      await issue.save(); // Save the updated issue
      issue = await Issue.findById(issueId)
      .populate({
        path: "replies",
        populate: {
          path: "sender",
          model: "User",
        },
      })
      .populate("sender")
      .exec();

      return res.status(200).json(issue);
    } catch (error) {
      console.error("Error adding reply:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

exports.issue_seen = [
  authenticate,
  async (req, res) => {
    try {
      const {userId}=req.body;
      const issueId = req.params.issueId;
      const issue = await Issue.findById(issueId)
        .populate({
          path: "replies",
          populate: {
            path: "sender",
            model: "User",
          },
        })
        .populate("sender")
        .exec();
      if (!issue) return res.status(404).json({ error: "Issue not found" });
      issue.replies.forEach((reply) => {
       if(reply.sender._id!==userId) reply.seen = true;
      });
      issue.seen=true;
      await issue.save();
      res.status(200).json(issue);
    } catch (error) {
      console.error("Error marking replies as seen:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
];
