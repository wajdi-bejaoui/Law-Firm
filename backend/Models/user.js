//import mongoose
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    
        fullName: String,
        username: String,
        phoneNumber: Number,
        gender : String,
        password : String,
        confirmPassword:String,
        email:String
    
    
});
// create user model
const user = mongoose.model("User", userSchema);
// export fichier user
module.exports = user;