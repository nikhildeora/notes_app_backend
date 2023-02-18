const express = require("express");
const {connection}= require("./config/main");
const {userRoute}= require("./routes/user.route")
const {noteRoute}= require("./routes/note.route")
const {AuthNotes}=require("./middlewares/auth.middleware")
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors());

app.use("/user",userRoute);
app.use(AuthNotes);
app.use("/note",noteRoute);

app.listen(8080,async()=>{
    try {
        await connection;
        console.log("database connected");
        console.log("server running");
    } catch (err) {
        console.log(err);
    }
})