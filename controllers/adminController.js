const User = require('../models/adminSchema')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_secret = process.env.JWT_secret;

const createUser=async(req,res)=>{
    try {
    
        const { email, password, firstname,lastname,isAdmin } = req.body;
        let newUser = await User.findOne({ email: email });
        if (newUser) {
            res.json("user already exists")
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            newUser = await User.create({ email: email, password: hash, firstname,lastname,isAdmin });
            res.status(200).json({ success: true, newUser });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("internal server error")
    }
}
const login = async(req,res)=>{
  try {
    const {email, password} = req.body;
    let user= await User.findOne({ email: req.body.email});
    if(!user){
        res.status(404).json({ msg:"User not found"});
    }
    const matchPassword = await bcrypt.compare(password,user.password);
    if(!matchPassword){
        res.status(400).json({msg:"Invalid Credentials"})
    }
    const data={
        user:{
            id:user.id,
            isAdmin:user.isAdmin
        }
    }
    // console.log("data", data)

    const authtoken=jwt.sign(data,JWT_secret);
    success=true;
    res.json({success,msg:"login successfull",authtoken})
  } catch (error) {
    console.error(error.message);
    // res.status(500).send("internal server error")
  }
}


module.exports ={
    createUser,
    login
}