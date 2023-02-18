const jwt = require("jsonwebtoken");

function AuthNotes(req,res,next){
    let token = req.headers.authorization;
     jwt.verify(token,"noteappuser",(err,jwtverified)=>{
       if(err){
         res.send({"msg":"Please Login First","error":err})
       }
       else{
          req.body.userID = jwtverified.user_id;
          next()
       }
     })
}

module.exports={
    AuthNotes
}