import requests
from bs4 import BeautifulSoup

def scrape_course_info(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            food_data = {'names': [], 'calories': [], 'carbs': [], 'protein': []}

            # Scrape food names
            food_names = soup.find_all(class_='name')
            for name in food_names:
                food_data['names'].append(name.text.strip())

            nutrition_facts = soup.find_all(class_='nutrition-container food-card')
            for fact in nutrition_facts:
                # Calories
                calories = fact.find(class_='calories')
                if calories:
                    food_data['calories'].append(calories.span.text)

                # Carbs
                carbs = fact.find(class_='g_carbs')
                if carbs:
                    food_data['carbs'].append(carbs.dd.text.strip('g'))

                # Protein
                protein = fact.find(class_='g_protein')
                if protein:
                    food_data['protein'].append(protein.dd.text.strip('g'))

            return food_data
        else:
            return f"Failed to retrieve content: {response.status_code}"
    except requests.RequestException as e:
        return f"Error during requests to {url}: {str(e)}"
    except Exception as e:
        return f"An error occurred: {str(e)}"

if __name__ == '__main__':
    url = 'https://stonybrook.nutrislice.com/menu/east-side-dining/dine-in-chefs-table/2024-02-09'
    food_data = scrape_course_info(url)
    print(food_data)
