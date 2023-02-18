const express = require("express");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel}=require("../module/User.model")

userRoute.post("/register",async(req,res)=>{
    const {name,email,pass,age} = req.body;
    try {
        let encPass = await bcrypt.hash(pass,4)
        const user = new UserModel({name,email,pass:encPass,age});
        await user.save();
        res.send({"msg":"user successfully registred"})    
    } catch (err) {
        res.send({"msg":"cannot registered","error":err})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,pass} = req.body;
    try {
        const user = await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err,decrypt)=>{
                if(decrypt){
                    let token = jwt.sign({"user_id":user[0]._id},"noteappuser",{expiresIn:"1h"});
                    res.send({"msg":"Login succesfull","token":token});
                }else{
                    res.send("wrong credentials")
                }
            })
        }else{
            res.send("wrong credentials")
        }
    } catch (err) {
        res.send({"msg":"cannot login","error":err})
    }
})

module.exports={
    userRoute
}