const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    street: String, 
    postal_code: String,
    city: String,
    province: String
  },
  vehicles: [{
    type: Schema.Types.ObjectId,
    ref: 'Vehicle'
  }]
});


branchSchema.virtual('address').get(function() {
  return `${this.location.street}, ${this.location.city}, ${this.location.province}`;
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
