import express from 'express';
import User from '../../db/models/UserSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const router=express.Router()

router.post('/signup',async(req,res)=>{
    const body={...req.body}
    const user=await User.findOne({username:body.username})
    if(user){
        return res.status(400).json({message:'username already taken'})
    }
    if(body.password !== body.confirmPassword){
        return res.status(400).json({message:'password not matching'})
    }
    try{
        const hashedPassword=await bcrypt.hash(body.password,10)
        body.password=hashedPassword
        await User.create(body)
        return res.status(201).json({message:'signup is successfully'})

    }
    catch(e){
        return res.status(500).json({error:e.message})
    }
})
router.post('/login',async(req,res)=>{
    const body={...req.body}
    const users=await User.findOne({username:body.username})
    if(!users){
        return res.status({message:'user not found'})
    }
    const isMatching=await bcrypt.compare(body.password,users.password)
    if (!isMatching) {
        return res.status(403).json({ message: "username and password mismatch" });
      }
      const token = jwt.sign(
        { role: "USER", id: users._id },
        process.env.SECRET_KEY,
        { expiresIn: "10d" }
      );
     
      return res.status(201).json({ message: "login sucessfull", token: token });
    
})

export default router;