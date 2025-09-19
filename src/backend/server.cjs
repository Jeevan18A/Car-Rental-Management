require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

console.log("Mongo URI:", process.env.MONGO_URI); // DEBUG: Should print full Mongo URI

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Define a generic schema for your collection (replace 'your_collection_name')
const schema = new mongoose.Schema({}, { strict: false });
const Sample = mongoose.model('Sample', new mongoose.Schema({}, { strict: false }), 'comments');
// Replace with your collection name

// API endpoint to fetch all documents from the collection
app.get('/data', async (req, res) => {
  try {
    const data = await Sample.find({});
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/', (req, res) => {
  res.send('API Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
