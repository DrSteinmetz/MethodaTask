const express = require('express');
const mongoose = require('mongoose');
const { generateResponseObject, generateError } = require('./utils/utils');
const { Status } = require('./models/status')
const { Transaction } = require('./models/transaction');

const app = express();

app.use(express.json());


const headers = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
}

app.use(headers);

// Statuses Methods:
app.get('/api/statuses', async (req, res) => {
  try {
    const statuses = await Status.find();
    res.send(generateResponseObject(statuses));
  } catch(ex) {
    res.status(500).send(generateError(ex.message));
  }
});

app.post('/api/statuses', async (req, res) => {
  try {
    const status = new Status(req.body);
    await status.save();
    res.send(generateResponseObject(status));
  } catch(ex) {
    res.status(400).send(generateError(ex.message));
  }
});

app.delete('/api/statuses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Status.deleteOne({ _id: id });
    if(!result.deletedCount) return res.status(404).send(generateError(`${id} does not exist`))

    await Transaction.deleteMany({
      $or: [ { from: id }, { to: id } ]
    });

    res.send(generateResponseObject(result));
  } catch(ex) {
    res.status(400).send(generateError(ex.message));
  }
});


// Transactions Methods:
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('from').populate('to');
    res.send(generateResponseObject(transactions));
  } catch(ex) {
    res.status(500).send(generateError(ex.message));
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save(transaction);
    res.send(generateResponseObject( await transaction.populate('from').populate('to').execPopulate()));
  } catch(ex) {
    res.status(400).send(generateError(ex.message));
  }
});

app.delete('/api/transactions/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const result = await Transaction.deleteOne({ name });
    if(!result.deletedCount) return res.status(404).send(generateError(`'${name}' does not exist`))
    res.send(generateResponseObject(result));
  } catch(ex) {
    res.status(400).send(generateError(ex.message));
  }
});


mongoose.set('useCreateIndex', true);
  mongoose
    .connect('mongodb://localhost/methoda_task_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Conldn\'t connect to Monogodb', err));

// module.exports = function () {
//   mongoose.set('useCreateIndex', true);
//   mongoose
//     .connect('mongodb://localhost/methoda_task_db', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//     })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('Conldn\'t connect to Monogodb', err));
// };

const port = 5000;
app.listen(port, () => console.log(`Listening to port ${port}`));
