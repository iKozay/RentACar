const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the sender (user)
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['open', 'closed'], // Status of the issue
      default: 'open'
    },
    replies: [{
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the admin who replied
        required: true
      },
      body: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  });

module.exports = mongoose.model('Issue', issueSchema);


