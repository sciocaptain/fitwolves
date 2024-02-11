var mongoose = require("mongoose")
var express = require("express")
var cors = require('cors')
var calculatedFoodList = false;
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

// async function saveFoodItem() {
//     const foodItem = new Food({
//         name: 'Spaghetti with Meatballs',
//         date: new Date('2024-02-09'), // Assuming today's date
//         type: 'dinner',
//         carbs: 50,
//         protein: 20,
//         fat: 15,
//         calories: 500,
//         vegetarian: false
//     });

//     // Save the food item to the database
//     await foodItem.save();
// }

// Call the asynchronous function
// saveFoodItem();

// Constructing the prompt


const textPrompt = `so the idea is to create a diet plan for the week - breakfast, lunch and dinner - using the data i provide, my data will include all the food types, which comes UNDER breakfast, lunch or dinner menu, and how many calories each food is, and i will tell you how many calories the person should have in a day, based on that - you will provide what this person will eat for breakfast, lunch and dinner for the week. 

now I want you to create a json file, which has a date, then for that date, breakfast, lunch and dinner, and for each of these, what food item combination (say 3 items in breakfast, then it will come under breakfast) - then for each food item, it will have the breakdown of its details - fat,carbs, proteins, type ,vegetarian

the combination of foods for each meal (meal meaning whther breakfast, lunch or dinner) - depends on the persons daily calory range goal. for a person who has 2000 to 2200 calories - and then distrbute these calories to breakfast, lunch and dinner - say 700 calories for breakfast, 700 calories for lunch, and 700 calories for dinner  - so for breakfast, based on the data (generate more random data as you would need, follow same format as data given) - you would suggest a combination of food items that come under breakfast category not crossing 700 calories - and ofc this whole thing in json format .

the data i have provided is only for one day and does not include the other details of the food items like (protein,carbs,fats, vegetarian) - so also predict these values based on the food item, ONLY PREDICT THE VALUES I ASKED YOU TOO, FOR FOOD ITEMS DO NOT ADD YOUR OWN, REFER TO THE DATA I PROVIDED YOU WITH

so create the json file for 1 day for someone who's daily calories goal is 2000-2200 calories

FOOD ITEMSHUD BE (name, day, carbs, protein, fat, calories) - FOR ATTRIBUTES USE THE DATA, AND FOR THE ATTRIBUTES THAT ARE NOT MENTIONED PUT IN A NUMBER YOU THINK THAT WOULD BE RIGHT



json file format {date(within this date - breakfast (fooditems(food name(attributes), food name(attributes))), lunch, dinner)} do that for lunch dinner too. this is supposed to be for multiple dates, but I am just asking you to provide for monday only. 

only provide me with the json format, NO OTHER WORDS"`;

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

    // console.log(foodItems);
    return foodItems;
}

console.log("hello")
//console.log("check1" + calculatedFoodList)
//console.log(findFoodsByDay('Monday'))
//console.log("check2" + calculatedFoodList)
//const foodList = findFoodsByDay('Monday')
//console.log(foodList)
//console.log("IMMMMM HERRREEEEEEEEEEEEEEEEEEEEEEEEEE")
// findFoodsByDay();
const myString = JSON.stringify(
    [
        {
          name: 'Blueberry Pancakes',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Blueberry Compote',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Scrambled Eggs with Cream and Butter',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Scrambled Egg Whites',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Chorizo & Potato Frittata',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Green Pepper & Onion Tofu Scramble',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Turkey Sausage Patty',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Tater Tots',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Blueberry Pancakes',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Blueberry Compote',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Blueberry Pancakes',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Blueberry Compote',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Scrambled Eggs with Cream and Butter',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Scrambled Egg Whites',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Chorizo & Potato Frittata',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Green Pepper & Onion Tofu Scramble',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Turkey Sausage Patty',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Tater Tots',
          type: 'Breakfast',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Cajun Shrimp, Pork Sausage, Country Cheese Grits',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Black Eyed Peas, Rice, Pork Broth',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Collard Greens',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Cornbread',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'piri piri chicken thigh',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'piri-naise dipping sauce',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'escalivada',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Basmati Rice Pilaf',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Cajun Turkey Burger',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Deluxe Hamburger',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Garden Burger with Truffle Mayo, Mushrooms, Onions and Swiss Cheese',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Fried Chicken Tenders',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Sweet Potato Fries',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Grilled Vegetables',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Garden Burger, Rye Bread, Mushrooms, Onions, Cheese, Steak Sauce',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Chicken Tender',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Burger (1/3 lb) White Bun with Lettuce and Tomato',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'French Fries',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Grilled Vegetables',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Fried Mushrooms',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Grilled Vegetables',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'French Fries',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Chickpea Falafel',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Basmati Rice Pilaf',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Tahini Lemon Dressing',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Tomato Cucumber Onion Salad',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: '6" Flour Tortilla',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Sauteed Napa, Celery, Red Onion',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Sweet and Sour Vegan Meatballs',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Scallion Jasmine Rice',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        },
        {
          name: 'Almond Green Beans',
          type: 'Lunch/Dinner',
          calories: 10,
          day: 'Monday'
        }
      ]
)
// console.log(myString)
console.log("BLELHERLKEJRLKJJSFLKJSLKJFLSKDJFLKSJDFKJSDJFLSKDJFLK")
// const finalPrompt = jsonString.concat(textPrompt)

async function chatGPTReponse(){
    const response = await openai.chat.completions.create({

        model: 'gpt-3.5-turbo',
    
        messages: [{"role":"user", "content":myString.concat(textPrompt)}],
    
      })
    
      console.log(response.choices[0].message.content)
}

console.log("************************************")
chatGPTReponse();
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