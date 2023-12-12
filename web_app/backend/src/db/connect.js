//Here we are connecting the mongodb Atlas with visual studio
const mongoose = require('mongoose');

const uri = 'mongodb+srv://mahamminhas2:maham123@cluster0.jqbpycd.mongodb.net/';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});
