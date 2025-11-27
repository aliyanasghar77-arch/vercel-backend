require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const items = [
  { name: "Espresso",    category: "Hot Drinks",  price: 800.00, inStock: true },
  { name: "Cappuccino",  category: "Hot Drinks",  price: 550.50, inStock: true },
  { name: "Iced Coffee", category: "Cold Drinks", price: 800.00, inStock: true },
  { name: "Latte",       category: "Hot Drinks",  price: 900.00, inStock: true },
  { name: "Croissant",   category: "Pastries",    price: 700.50, inStock: true },
  { name: "Muffin",      category: "Pastries",    price: 400.00, inStock: false }
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB (seed)');
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(items);
    console.log('Seed data inserted');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

run();
