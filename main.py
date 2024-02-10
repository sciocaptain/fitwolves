from dotenv import load_dotenv
import os
from pymongo import MongoClient
from datetime import datetime
from datetime import timedelta
import csv
from zeast.eastscraper import scrape_menu_files

load_dotenv() 
mongo_uri = os.getenv("MONGO_URI")

db_name = "sbuhacks2024"
db_collection_name = "food"

# Connect to the MongoDB Atlas cluster
client = MongoClient(mongo_uri)

# Access the db
db = client[db_name]
collection = db[db_collection_name]

def add_to_db(data):
    collection.insert_many(data)
  
def delete_db():
    collection.delete_many({})

def save_to_mongodb(file_paths):
    # Call the function to scrape menu files
    scraped_data = scrape_menu_files(file_paths)
    # Add the scraped data to the database
    add_to_db(scraped_data)

if __name__ == '__main__':
    # List of file paths to scrape
    file_paths = [
        'zeast/easthtmlcontent/eastbreakfast.html',
        'zeast/easthtmlcontent/eastcheftablelunch.html',
        'zeast/easthtmlcontent/grilllunch.html',
        'zeast/easthtmlcontent/rootedlunch.html',
    ]

    # Call the function to save data to MongoDB
    save_to_mongodb(file_paths)
