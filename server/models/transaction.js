const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
    required: true,
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// createTransaction = async (transaction) => {}

module.exports.Transaction = Transaction;
