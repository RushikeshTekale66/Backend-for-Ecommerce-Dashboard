// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');


const mongoose = require('mongoose');
require('dotenv').config();
const DatabaseUrl = process.env.DATABASEURL;

try{
    mongoose.connect(DatabaseUrl);
    // mongoose.connect('mongodb+srv://rushikesh:Rushi7887@cluster0.fllhqkj.mongodb.net/');
    console.log("Connected to database");
}
catch(error){
    console.log("Unable to connect database");
}