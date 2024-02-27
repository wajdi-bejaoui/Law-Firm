const User = require("../Models/user")
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const express = require("express");
const session = require ("express-session");
const app = express();
const secretKey = "your-secret-key";
// confi encodage data
app.use(
    session({
        secret: secretKey,
        resave: false,
        saveUninitialized: true
    })
);
const register = async (req, res) => {

    console.log("here sign up");
    try {
        // Vérifiez si l'e-mail existe déjà dans la base de données
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.json({ msg: 'E-mail already exists' });
        }

        let obj = req.body;


        // Création d'un nouvel utilisateur avec le mot de passe hashé
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
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
};




const login = async (req, res) => {
    let user = req.body;

    // Check if the email exists
    User.findOne({ email: user.email }).then((doc) => {
        // Email not found
        if (!doc) {
            return res.json({ msg: "Please check your Email" });
        }
    

        // Compare passwords
        const pwdResult =  doc.comparePassword(user.password);
   
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
            phoneNumber: doc.phoneNumber,
           
        };

        const token = jwt.sign(userToSend, secretKey, { expiresIn: '1h' });
        

        res.json({ msg: "Welcome", token: token });
    });
}

module.exports = {
    register,
    login
  };
  