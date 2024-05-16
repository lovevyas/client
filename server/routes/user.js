import express from 'express';
import bcryt from 'bcrypt';
import {User} from '../models/User.js'
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
const router = express.Router();

router.post('/signup',async(req,res) =>{
    const {username,email,password} =req.body;
    const user = await User.findOne({email});
    if(user){
        return res.json({message: "user already existed"})
    }
    const hashpassword = await bcryt.hash(password,10);
    const newUser = new User({
        username,
        email,
        password: hashpassword,
    })
    await newUser.save()
    return res.json({status:true, message: "record registerd"})

})

router.post('/login', async (req,res) => {
    const {email,password}= req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.json({message: "User is not registered"})
    }
    const validPasword = await bcryt.compare(password, user.password);
    if(!validPasword){
        return res.json({message: "Password is Incorrect"});
    }

    const token = jwt.sign({username: user.username}, process.env.KEY, {expiresIn:'1h'})
    res.cookie('token',token , {httpOnly: true , maxAge: 360000})
    return res.json({status: true, message: "login successfully"})
})

router.post('/forget', async(req, res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email})
        if(!user) {
            return res.json({message: "user not registered"})
        }
        const token = jwt.sign({id: user._id},process.env.KEY, {expiresIn: '5m'})


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'love1252.be21@chitkarauniversity.edu.in',
              pass: 'xiud lbug bjoo fbkn'
            }
          });
          
          var mailOptions = {
            from: 'love1252.be21@chitkarauniversity.edu.in',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/forget/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return res.json({message: "Error sending email. Please check the email !!"})
            } else {
              return res.json({status:true, message: "email sent"})
            }
          });

    } catch(err) {
        console.log(err)
    }
})

export {router as UserRouter};