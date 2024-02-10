var mongoose = require("mongoose")
var express = require("express")
var cors = require('cors')
const dotenv = require('dotenv').config()
var bcrypt = require('bcrypt')
var ExpressSession = require("express-session")
var SessionStore = require('connect-mongodb-session')(ExpressSession);
var keySecret = process.argv[2];
const connectDB = require('./config/db')

connectDB()

var server = express()
var MongoDB = "mongodb+srv://ormstats1:ORMdb2024@orm.cmeeoo3.mongodb.net/?retryWrites=true&w=majority"

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
  