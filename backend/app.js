//import express module
const express = require("express");
//creation app BE  name app
const app = express();
const cors = require('cors');
const { log } = require("util");
// Enable CORS for all routes
app.use(cors());
app.use(express.json());
//pour pouvoir imporet app
module.exports = app;
//tables des données
let allusers=[
    {
        id:1, fullName:"aaa",userName:"yy", password:"123456", confirmPassword:"123456",phoneNumber:27741552, gender:"female", email:"hjeijinabil22@gmail.com"
    }
];
//of sign up
app.post('/users/signup',(req,res)=>{
    let obj = req.body;
    console.log("here sign up");
    console.log("here sign up",obj);
  
   
    
    allusers.push(obj)
    res.json({msg:"sign up succsefful" })
})
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