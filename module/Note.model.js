const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    title : {type:String,required:true},
    note : {type:String,required:true},
    author : {type:String,required:true},
    userID : String
},{
    versionKey : false
})

const NoteModel = mongoose.model("note",NoteSchema);

module.exports={NoteModel};