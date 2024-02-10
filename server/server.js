var mongoose = require("mongoose")
var express = require("express")
var cors = require('cors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const axios = require('axios');

connectDB()

var server = express()
var MongoDB = process.env.MONGO_URI

/*CODE BELOW*/
 
/*CODE ABOVE*/

const ServerV = server.listen(8000, () => {
    console.log("Server is running on port 8000")
})

process.on("SIGINT", () => {
    ServerV.close(() => {
        console.log("Server closed. Database instance disconnected")
        process.exit(0)
    });
});

server.use(cors({
    origin: true,
    credentials: true
}))
server.use(express.json())