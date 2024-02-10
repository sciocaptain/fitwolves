from bs4 import BeautifulSoup

def scrape_menu_files(file_paths):
    # Define the days of the week
    days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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

            # Iterate over each food name and calories, and print them along with the day of the week and meal type
            for name, calorie in zip(food_names, food_calories):
                print("Day of the Week:", day)
                print("Food Name:", name.get_text(strip=True))
                print("Calories:", calorie.get_text(strip=True))
                print("Meal Type:", meal_type)
                print()
