require('dotenv').config();
require('express-async-errors');
//import express module
const express = require("express");
//importation
const mongoose = require('mongoose');
const cors = require('cors');
const { log } = require("util");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const session = require ("express-session");
const authRouter = require("./routes/authRoutes")



const reviewRouter = require("./routes/reviewRoutes")

//import mongoose module
//const mongoose = require("mongoose");
//import body-parser module
//const bodyParser = require("body-parser");



//creation app BE  name app
const app = express();
app.use(express.json());


// Enable CORS for all routes
app.use(cors());
//connection bd
mongoose.connect('mongodb://localhost:27017/LawExpert', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose.connect('mongodb+srv://wajdibejaoui26:1234@cluster0.azs73u3.mongodb.net/LawExpert?retryWrites=true&w=majority')



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connexion réussie à la base de données');
});



// Models Importation
const User= require("./Models/user");


//of sign up and login
app.use('/users', authRouter);
app.use('/api/v1/reviews', reviewRouter);








//exportation app
module.exports = app;