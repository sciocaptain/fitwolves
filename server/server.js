const mongoose = require("mongoose")
const express = require("express")
const cors = require('cors')
const connectDB = require('./config/db')
const axios = require('axios');
const dotenv = require('dotenv').config()
const OpenAI= require("openai")

connectDB()

var server = express()
server.use(cors());
server.use(express.json());
var MongoDB = process.env.MONGO_URI
var Food = require("./models/food.js")

const openai = new OpenAI({
    apiKey: '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'// This is also the default, can be omitted
});

/*CODE BELOW*/
var userCalories;
var textPrompt;

server.post("/postCalories", async (req, res) => {
 const { calories } = req.body;
 userCalories = calories;
  console.log(userCalories);
  textPrompt = `so the idea is to create a diet plan for the week - breakfast, lunch and dinner - using the data i provide, my data will include all the food types, which comes UNDER breakfast, lunch or dinner menu, and how many calories each food is, and i will tell you how many calories the person should have in a day, based on that - you will provide what this person will eat for breakfast, lunch and dinner for the week. 

  now I want you to create a json file, which has a date, then for that date, breakfast, lunch and dinner, and for each of these, what food item combination (say 3 items in breakfast, then it will come under breakfast) - then for each food item, it will have the breakdown of its details - fat,carbs, proteins, type ,vegetarian
  
  the combination of foods for each meal (meal meaning whther breakfast, lunch or dinner) - depends on the persons daily calory range goal. for a person who has 2000 to 2200 calories - and then distrbute these calories to breakfast, lunch and dinner - say 700 calories for breakfast, 700 calories for lunch, and 700 calories for dinner  - so for breakfast, based on the data (generate more random data as you would need, follow same format as data given) - you would suggest a combination of food items that come under breakfast category not crossing 700 calories - and ofc this whole thing in json format .
  
  the data i have provided is only for one day and does not include the other details of the food items like (protein,carbs,fats, vegetarian) - so also predict these values based on the food item, ONLY PREDICT THE VALUES I ASKED YOU TOO, FOR FOOD ITEMS DO NOT ADD YOUR OWN, REFER TO THE DATA I PROVIDED YOU WITH
  
  so create the json file for 1 day for someone who's daily calories goal is ${userCalories} calories
  
  FOOD ITEMSHUD BE (name, day, carbs, protein, fat, calories) - FOR ATTRIBUTES USE THE DATA, AND FOR THE ATTRIBUTES THAT ARE NOT MENTIONED PUT IN A NUMBER YOU THINK THAT WOULD BE RIGHT
  
  json file format {date(within this date - breakfast (fooditems(food name(attributes), food name(attributes))), lunch, dinner)} do that for lunch dinner too. I want you to provide me with a breakfast, lunch, and dinner and
  
  only provide me with the json format, NO OTHER WORDS.
  
  Make the response in this format. This is just an example. We want to it be formatted like this.

  "`;

  await generateMealPlan(textPrompt)
});

const days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const mealPlanJSON = [];

async function findFoodsByDay(day) {
    // Use the find method to retrieve documents from the Food collection with the specified day
    const foods = await Food.find({ day }).exec();

    // Create an array to store food items
    const foodItems = foods.map(food => ({
        name: food.name,
        type: food.type,
        calories: food.calories,
        day: food.day, // Include the day information in each food item
    }));

    return foodItems;
}

async function generateMealPlan(modifiedPrompt) {
    // Create an array to hold all promises for fetching food items for each day
    const promises = days_of_week.map(async dayItem => {
        try {
            const foodItems = await findFoodsByDay(dayItem);
            const foodList = JSON.stringify(foodItems);
            const finalPrompt = foodList.concat(textPrompt);
            const response = await chatGPTReponse(finalPrompt + `Please make this response for ${dayItem}`);
            return response.choices[0].message.content;
        } catch (error) {
            // Handle any errors that occur during the process
            console.error('Error fetching and storing food items:', error);
            return null; // Or any other default value
        }
    });

        // Wait for all promises to resolve
    Promise.all(promises)
    .then(results => {
        console.log("All promises resolved");
        // Filter out any null values (if needed)
        const filteredResults = results.filter(result => result !== null);
        // console.log(filteredResults);
        // Send the mealPlanJSON array to the client using Axios
        server.get('/getJSON', (req, res) => {
            console.log("HEY")
            // Send the meal plan JSON as the response
            res.json(filteredResults);
        });
    })
    .catch(error => {
        // Handle errors that occur during Promise.all
        console.error('Error fetching and storing food items:', error);
    });

    async function chatGPTReponse(prompt){
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{"role":"user", "content":prompt}],
    });
    mealPlanJSON.push(response.choices[0].message.content);
    return response;
    }

}




// server.get('/getJSON', (req, res) => {
//     // Assuming mealPlanJSON is the JSON data you want to send to the client
//     const mealPlanJSON = {
//         breakfast: [
//             { name: 'Scrambled Eggs', calories: 300 },
//             { name: 'Toast', calories: 150 }
//         ],
//         lunch: [
//             { name: 'Grilled Chicken Salad', calories: 400 },
//             { name: 'Brown Rice', calories: 200 }
//         ],
//         dinner: [
//             { name: 'Salmon', calories: 350 },
//             { name: 'Steamed Vegetables', calories: 150 }
//         ]
//     };

//     // Send the meal plan JSON as the response
//     res.json(mealPlanJSON);
// });


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
