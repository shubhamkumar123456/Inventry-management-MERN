var jwt = require('jsonwebtoken');
const JWT_secret = process.env.JWT_secret;

const fetchuser=(req,res,next)=>{
   
    const token = req.header('Authorization');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    try {
        const data =jwt.verify(token,JWT_secret);
        // if(!data.isAdmin){
        //     res.status(404).send("not authorized")
        // }
        req.user=data.user;
        console.log(data)
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token"})
    }
   
}


module.exports= fetchuser;