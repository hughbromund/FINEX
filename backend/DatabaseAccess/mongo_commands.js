/**
 * All Node.js functions to edit and communicate with MongoDB database
 * @author: Niyati
 * https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp
 * http://www.java2s.com/Tutorials/Javascript/Node.js_Tutorial/0100__Node.js_Functions.htm
 * https://flaviocopes.com/node-mongodb/
 * https://stackoverflow.com/questions/24094129/mongodb-update-push-array
 */

//Connect to MongoDB Database via MongoClient and define global variables
var MongoClient = require('mongodb').MongoClient;

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
})

var url = "mongodb+srv://niyatisriram:4A!B:mUj2_X8xZE@data-krx7s.mongodb.net/test?retryWrites=true&w=majority";
var database = client.db("FINEX");
var users = database.collection("Users");
var transactions = database.collection("Transactions");


/**
 * Insert a new user into the database
 * @param {*} username 
 * @param {*} password 
 * @param {*} email 
 * @param {*} name 
 * Return value: void
 */
function insert_new_user(username, password, email, name) {
  var new_user = { username: username, password: password, email: email, name: name };
  users.insertOne(new_user, (err, result) => {
    if (err) throw err;
    console.log("New user inserted\n");
  });
}

//encrypt password

/**
 * Insert a new transaction into the database 
 * Add new transaction's default ID to the user's transaction ID array
 * @param {*} username 
 * @param {*} cost 
 * @param {*} type 
 * @param {*} name 
 * Return value: void
 */
function insert_new_transaction(username, cost, type, name) {
  var new_transaction = { username: username, cost: cost, type: type, name: name };
  transactions.insertOne(new_transaction, (err, result) => {
    if (err) throw err;
    console.log("New transaction inserted\n");
  });
  var transaction_id
  transactions.findOne( { username: username, cost: cost, type: type, name: name }, 
  { projection: { username: 0, cost: 0, type: 0, name: 0 } }, (err, transaction_id) => {
    if (err) throw err;
  });
  users.update( { username: username }, { $push: { transaction_ids: transaction_id }});
  console.log("user updated\n");
}

/**
 * Find a particular user
 * @param {*} username 
 * Return value: user object
 */
function find_user(username) {
  var user
  users.findOne( { username: username }, (err, user) => {
    if (err) throw err;
    console.log("found user\n");
    return user;
  });
}

/**
 * Return array of transaction IDs for a particular user
 * @param {*} username 
 * Return value: array of transaction IDs
 */
function get_transactions(username) {
  var list
  users.find( { username: username }, { projection: { _id: 0, username: 0, stocks: 0,
     password: 0, email: 0, good_color: 0, bad_color: 0, name: 0 } }, (err, list) => {
       if (err) throw err;
       console.log("found transactions\n")
       return list;
  });
}

/**
 * Check that the inputted username and password match correctly in the database
 * @param {*} username 
 * @param {*} password 
 * Return value: boolean
 */
function check_password(username, password) {
  var pass
  users.findOne( { username: username }, { projection: { _id: 0, username: 0, stocks: 0, 
    email: 0, good_color: 0, bad_color: 0, name: 0, transaction_ids: 0 } }, (err, pass) => {
      if (err) throw err;
      if (pass == password) {
        console.log("password matches\n");
        return true;
      }
      return false;
  });
}

/**
 * Add a stock ID to a particular user's stock array
 * @param {*} username 
 * @param {*} stock_id 
 * Return value: void
 */
function add_stock(username, stock_id) {
  users.update( { username: username }, { $push: { stocks: stock_id } } );
  console.log("stock added\n");
}

/**
 * Updates user password
 * Assume the new password is already encrypted
 * @param {*} username 
 * @param {*} new_password 
 * Return value: void
 */
function change_password(username, new_password) {
  users.update( { username: username }, { $set: { password: new_password } } );
  console.log("password updated\n");
}

/**
 * Return array of stock IDs for a particular user
 * @param {*} username 
 * Return value: array of stock IDs
 */
function get_stocks(username) {
  var list
  users.find( { username: username }, { projection: { _id: 0, username: 0, transaction_ids: 0,
     password: 0, email: 0, good_color: 0, bad_color: 0, name: 0 } }, (err, list) => {
       if (err) throw err;
       console.log("stocks returned");
       return list;
  });
}

/**
 * Set a particular user's color preferences
 * @param {*} username 
 * @param {*} good 
 * @param {*} bad 
 * Return value: void
 */
function set_colors(username, good, bad) {
  users.update( { username: username }, { $set: { good_color: good, bad_color: bad } } );
  console.log("colors updated\n");
}








