from bs4 import BeautifulSoup
from datetime import datetime

# Import MongoDB related modules here
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['sbuh']
collection = db['food']

def scrape_menu_files(file_paths):
    # Define the days of the week
    days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    # Initialize an empty list to store food items
    food_items = []

    # Iterate over each file path
    for file_path in file_paths:
        print("Scraping file:", file_path)

        # Read the HTML content from the file
        with open(file_path, 'r', encoding='utf-8') as file:
            html_content = file.read()

        # Parse the HTML content
        soup = BeautifulSoup(html_content, 'html.parser')

        # Find all menu-station-wrapper elements
        menu_station_wrappers = soup.find_all(class_='day-column')

        # Determine meal type based on file path
        meal_type = 'Breakfast' if 'breakfast' in file_path.lower() else 'Lunch/Dinner'

        # Iterate over each menu-station-wrapper along with its corresponding day of the week
        for day, menu_station in zip(days_of_week, menu_station_wrappers):
            # Find all food-name and food-calories elements within the current menu-station-wrapper
            food_names = menu_station.find_all(class_='food-name')
            food_calories = menu_station.find_all(class_='food-calories')

            # Iterate over each food name and calories, and create a food object
            for name, calorie in zip(food_names, food_calories):
                # Create a food item dictionary
                food_item = {
                    'name': name.get_text(strip=True),
                    'day': day,  # You may want to adjust this based on the actual date
                    'type': meal_type,
                    'calories': 10,
                }

                # Append the food item to the list
                food_items.append(food_item)

    return food_items

