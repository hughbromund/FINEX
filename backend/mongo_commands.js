/**
 * All Node.js functions to edit and communicate with MongoDB database
 * @author: Niyati
 * 
 */

//define global variables
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://niyatisriram:4A!B:mUj2_X8xZE@data-krx7s.mongodb.net/test?retryWrites=true&w=majority";
var database = db.db("FINEX");
var users = database.collection("Users");
var transactions = database.collection("Transactions");

//insert new user

//check that username and email do not already exist in database

//encrypt password

//insert transaction; also adds transaction id to user 

//return user based on username

//return all transactions of a single user based on username

//check that given password matches with given username

//add to user stock array

//change password

//return stock array based on username

//set good and bad color based on hex value inputs








