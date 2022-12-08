from pymongo import MongoClient

client = MongoClient('mongodb+srv://mchoe:ForSchool23%21@cs411b4g6.e9hxzy4.mongodb.net/test')
# Creating a database name GFG
db = client['mydb']
# Col = db[‘concerts']