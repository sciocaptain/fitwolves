// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
const mongoDB = 'mongodb://127.0.0.1:27017/fake_so';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define cors option to allow connection to localhost:3000
const corsOptions = {
  origin: 'http://localhost:3000',
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());


/* THIS IS WHERE WE SHOULD START CODING */





/* DON'T ADD ANY CODE AFTER THIS */


// Start the server
const port = 8000;
const server = app.listen(port, () => {console.log(`Server is running on https://localhost:${port}`);});

// Handle server termination
process.on('SIGINT', () => {
    server.close(() => {
      mongoose.disconnect().then(() => {
        console.log('\nServer closed. Database instance disconnected');
        process.exit(0);
      });
    });
  });
  