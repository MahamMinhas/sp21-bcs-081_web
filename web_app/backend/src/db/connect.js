const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/webDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error.message);
});

db.once('open', () => {
  console.log('Connected to MongoDB Compass');
});
