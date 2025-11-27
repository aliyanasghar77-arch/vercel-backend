require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const MenuItem = require('./models/MenuItem');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection failed:', err.message || err);
    process.exit(1);
  });

app.get('/', (req, res) => res.send('Coffee shop API'));

app.get('/menu', async (req, res) => {
  try {
    const items = await MenuItem.find({});
    res.json({ success: true, data: items });
  } catch (err) {
    console.error('Error fetching menu:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch menu', error: err.message });
  }
});

app.get('/menu/random', async (req, res) => {
  try {
    const [item] = await MenuItem.aggregate([
      { $match: { inStock: true } },
      { $sample: { size: 1 } }
    ]);
    if (!item) return res.status(404).json({ success: false, message: 'No in-stock items found' });
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Error fetching random item:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch random item', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Coffee shop server running on port ${PORT}`);
});
