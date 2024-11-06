const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

/
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: false,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
