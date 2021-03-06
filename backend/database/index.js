// from https://github.com/b-bly/simple-mern-passport

//needs to be changed to work with our database
const path = require("path");
const config = require(path.resolve(__dirname, "../config.json"));

//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//your local database url
//27017 is the default mongoDB port
const uri = config.database.uri;
//const uri = 'mongodb://localhost:27017/simple-mern-passport' 

mongoose.connect(uri).then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Connected to Mongo');
        
    },
    err => {
         /** handle initial connection error */ 
         console.log('error connecting to Mongo: ')
         console.log(err);   
        }
  );


module.exports = mongoose.connection