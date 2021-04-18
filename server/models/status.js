const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255
  },
  lable: {
    type: String,
    required: true,
    enum: [
      'Initial',
      'Orphan',
      'Final',
    ],
  }
});

const Status = mongoose.model('Status', statusSchema);

// createStatus = async (status) => {}

module.exports.Status = Status;
