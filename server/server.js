var mongoose = require("mongoose")
var express = require("express")
var cors = require('cors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const axios = require('axios');
const OpenAI= require("openai")

connectDB()

var server = express()
var MongoDB = process.env.MONGO_URI
var Food = require("./models/food.js")

const openai = new OpenAI({
    apiKey: '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'// This is also the default, can be omitted
});

/*CODE BELOW*/

async function saveFoodItem() {
    const foodItem = new Food({
        name: 'Spaghetti with Meatballs',
        date: new Date('2024-02-09'), // Assuming today's date
        type: 'dinner',
        carbs: 50,
        protein: 20,
        fat: 15,
        calories: 500,
        vegetarian: false
    });

    // Save the food item to the database
    await foodItem.save();
}

// Call the asynchronous function
saveFoodItem();

// Constructing the prompt
// const input = 'What are the colors in the rainbows';

// async function chatGPTReponse(){
//     const response = await openai.chat.completions.create({

//         model: 'gpt-3.5-turbo',
    
//         messages: [{"role":"user", "content":input}],
    
//       })
    
//       console.log(response.choices[0].message.content)
// }

// chatGPTReponse();


const hello = Food.find({name: 'Punit'})
console.log(hello);

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