
/**
 * All Node.js functions to edit and communicate with MongoDB database
 * @author: Niyati
 * https://codeforgeek.com/mongodb-atlas-node-js/
 * */

//Connect to MongoDB Database via MongoClient and define global variables
const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.

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

    console.log("reached");
    users.insertOne({ username: username, password: password, email: email, name: name }, (err, result) => {
    console.log("New user inserted\n");
  });

   client.close();
});
