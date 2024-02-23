//import express module
const express = require("express");
//importation
const mongoose = require('mongoose');
const cors = require('cors');
const { log } = require("util");
const bcrypt = require ("bcrypt");
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

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connexion réussie à la base de données');
});
//creation app BE  name app

// Models Importation
const User= require("./Models/user");


//of sign up
app.post('/users/signup', async (req, res) => {
    try {
        // Vérifiez si l'e-mail existe déjà dans la base de données
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.json({ msg: 'E-mail already exists' });
        }

        let obj = req.body;

        console.log("here sign up");
        console.log("here sign up", obj);

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Création d'un nouvel utilisateur avec le mot de passe hashé
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            // ... autres champs du modèle
        });

        // Sauvegarde de l'utilisateur dans la base de données
        await newUser.save();

        res.json({ msg: 'Registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.json({ msg: 'Internal server error' });
    }
});


//of login
app.post('/users/login',(req,res)=>{
    let obj = req.body;
    console.log("here login");
    console.log("tttttttt",obj);
    

    let foundUser = false;
    let userObj ;
    for (let i = 0; i < allusers.length; i++) {
        if (allusers[i].email == obj.email && allusers[i].password == obj.password) {
            foundUser = true;
            userObj = allusers[i];
            break;
        }
    }
    
    if(foundUser){
res.json({msg:true, Name:userObj.userName, lName:userObj.fullName}
    )}
    else{
        res.json({msg:false})
    }

})
//exportation app
module.exports = app;