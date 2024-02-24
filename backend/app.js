//import express module
const express = require("express");
//importation
const mongoose = require('mongoose');
const cors = require('cors');
const { log } = require("util");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const session = require ("express-session");
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
// confi encodage data
const  secretKey = "encodade data for  jwt";
app.use(
    session({
        secret:secretKey,
    })
)

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
            userName : req.body.userName,
            fullName : req.body.fullName,
            phoneNumber : req.body.phoneNumber,
            gender : req.body.gender

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
app.post('/users/login', (req, res) => {
    let user = req.body;

    // Check if the email exists
    User.findOne({ email: user.email }).then((doc) => {
        // Email not found
        if (!doc) {
            return res.json({ msg: "Please check your Email" });
        }

        // Compare passwords
        const pwdResult = bcrypt.compareSync(user.password, doc.password);

        // Passwords do not match
        if (!pwdResult) {
            return res.json({ msg: "Please check your Password" });
        }

        let userToSend = {
            userName: doc.userName,
            fullName: doc.fullName,
            id: doc.id,
            role: doc.role,
            email: doc.email,
            gender: doc.gender,
            phoneNumber: doc.phoneNumber
        };

        const token = jwt.sign(userToSend, secretKey, { expiresIn: '1h' });

        res.json({ msg: "Welcome", token: token });
    });
});

//exportation app
module.exports = app;