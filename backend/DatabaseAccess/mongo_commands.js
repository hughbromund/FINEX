
/**
 * All Node.js functions to edit and communicate with MongoDB database
 * @author: Niyati
 * https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp
 * http://www.java2s.com/Tutorials/Javascript/Node.js_Tutorial/0100__Node.js_Functions.htm
 * https://flaviocopes.com/node-mongodb/
 * https://stackoverflow.com/questions/24094129/mongodb-update-push-array
 * https://codeforgeek.com/mongodb-atlas-node-js/
 * https://thecodebarbarian.com/unhandled-promise-rejections-in-node.js.html
 * https://developer.ibm.com/technologies/node-js/tutorials/learn-nodejs-mongodb/
 * 
 * TODO:
 * test concurrency
 * see if there are any other relevant methods to add
 * make global connection string
 * make sure commands can be accessed throughout backend folder
 * 
 */


/**
 * IMPORTANT NOTE
 * The below code is for database connection and needs 
 * to be written every time database actions need to be
 * performed. Write commands under "perform actions" comment. 
 * Ideally, only one mongo call should be performed per 
 * connection because of the asynchronous nature of MongoDB.
 */

// replace the uri string with your connection string
// password is user password for the cluster, not mongodb account
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://niyatisriram:YdE0qAyr4mnz5s1f@data-krx7s.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   else console.log('Connected...');

   const database = client.db("FINEX"); 
   const users = database.collection("Users");
   const transactions = database.collection("Transactions");
   
   // perform actions on the collection object

    client.close();
  });


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
    console.log("New user inserted\n");
  });
}

/**
 * Insert a new transaction into the database 
 * @param {*} username 
 * @param {*} cost 
 * @param {*} type 
 * @param {*} name 
 * Return value: void
 */
function insert_new_transaction(username, cost, type, name) {
  var new_transaction = { username: username, cost: cost, type: type, name: name };
  transactions.insertOne(new_transaction, (err, result) => {
    console.log("New transaction inserted\n");
    return new_transaction;
  });
}

/**
 * Get transaction id given all other transaction indices
 * @param {*} username 
 * @param {*} cost 
 * @param {*} type 
 * @param {*} name 
 * Return value: int
 */
function get_transaction_id(username, cost, type, name) {
  transactions.findOne( { username: username, cost: cost, type: type, name: name }, 
  { projection: { username: 0, cost: 0, type: 0, name: 0 } }, (err, transaction_id) => {
    console.log("transaction found\n");
    return transaction_id;
  });
}

/**
 * Add transaction ID to user's transaction array
 * @param {*} transaction_id 
 */
function add_transaction_to_user(transaction_id) {
  users.updateOne( { username: username }, { $push: { transaction_ids: transaction }}).catch(() => {});
  console.log("user updated\n")
}


/**
 * Find a particular user
 * @param {*} username 
 * Return value: user object
 */
function find_user(username) {
  users.findOne( { username: username }, (err, user) => {
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
  users.find( { username: username }, { projection: { _id: 0, username: 0, stocks: 0,
     password: 0, email: 0, good_color: 0, bad_color: 0, name: 0 } }, (err, list) => {
       console.log("found transactions\n");
       console.log(list);
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
  users.findOne( { username: username }, { projection: { _id: 0, username: 0, stocks: 0, 
    email: 0, good_color: 0, bad_color: 0, name: 0, transaction_ids: 0 } }, (err, pass) => {
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
  users.updateOne( { username: username }, { $push: { stocks: stock_id } } ).catch(() => {});
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
  users.updateOne( { username: username }, { $set: { password: new_password } } ).catch(() => {});
  console.log("password updated\n");
}

/**
 * Return array of stock IDs for a particular user
 * @param {*} username 
 * Return value: array of stock IDs
 */
function get_stocks(username) {
  users.find( { username: username }, { projection: { _id: 0, username: 0, transaction_ids: 0,
     password: 0, email: 0, good_color: 0, bad_color: 0, name: 0 } }, (err, list) => {
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
  users.updateOne( { username: username }, { $set: { good_color: good, bad_color: bad } } ).catch(() => {});
  console.log("colors updated\n");
}
