// from https://github.com/b-bly/simple-mern-passport

//needs to be changed to work with our database

//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//your local database url
//27017 is the default mongoDB port
const uri = "mongodb+srv://niyatisriram:YdE0qAyr4mnz5s1f@data-krx7s.mongodb.net/FINEX?retryWrites=true&w=majority";
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