from dotenv import load_dotenv
import os
from pymongo import MongoClient
from datetime import datetime
from datetime import timedelta

load_dotenv() 
mongo_uri = os.getenv("MONGO_URI")

db_name = "sbuhacks2024"
db_collection_name = "food"

#connect to the MongoDB Atlas cluster
client = MongoClient(mongo_uri)

#access the db
db = client[db_name]
collection = db[db_collection_name]

def add_to_db(courses):
    collection.insert_many(courses)
  
def delete_db():
    collection.delete_many({})