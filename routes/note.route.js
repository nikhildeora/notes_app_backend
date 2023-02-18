const express = require("express");
const noteRoute = express.Router();
const {NoteModel} = require("../module/Note.model")

noteRoute.get("/",async(req,res)=>{
    try {
        const allNotes = await NoteModel.find();
        res.send(allNotes);
    } catch (err) {
        res.send({"msg":"error occurred in fetching of notes","error":err})
    }
})

noteRoute.post("/create",async(req,res)=>{
    try {
        let note = new NoteModel(req.body);
        await note.save();
        res.send({"msg":"Notes created successfully"})
    } catch (err) {
        res.send({"msg":"error occurred in creation of notes","error":err})
    }
})

noteRoute.patch("/update/:id",async(req,res)=>{
    const ID = req.params.id;
    const payload = req.body;
    try {
       const userID = req.body.userID;
       const user = await NoteModel.find({_id:ID});
       if(userID!==user[0].userID){
           res.send("You are not authorize")
       }else{
           await NoteModel.findByIdAndUpdate({_id:ID},payload);
           res.send({"msg":"Notes updated successfully"})   
       }
    } catch (err) {
        res.send({"msg":"error occurred in updation of notes","error":err})
    }
})

noteRoute.delete("/delete/:id",async(req,res)=>{
    const ID = req.params.id;
    try {
       const userID = req.body.userID;
       const user = await NoteModel.find({_id:ID});
       if(userID!==user[0].userID){
           res.send("You are not authorize")
       }else{
           await NoteModel.findByIdAndDelete(ID);
           res.send({"msg":"Notes deleted successfully"})   
       }
    } catch (err) {
        res.send({"msg":"error occurred in updation of notes","error":err})
    }
})

module.exports={
    noteRoute
}

