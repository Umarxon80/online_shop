import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import secr  from "../config/dotenv.config.js";
import { AuthValidator } from "../validation/auth.validator.js";
let JWT_SECRET=secr.JWT_SECRET

export const register = async (req, res) => {
  const { email, password } = req.body;
  let {value,error}=AuthValidator.validate(req.body)
  if (error) {
    return res.status(400).send({message:error.details[0].message})
  }
  try {
    let check=await User.findOne({email})
    if (check) {
      return res.send("Such user already exists")
    }
  let nUser=new User(req.body)
  await nUser.save()
  res.send(nUser)
  } catch (e) {
    res.status(400).send({message:e.message})
  }
};

export const login=async (req,res)=>{
  let {email,password}=req.body
  try {
    let check=await User.findOne({email})
    if (!check) {
      return res.send("Such user doesn't exists")
    }
    let acsess=bcrypt.compareSync(password,check.password)
    if (!acsess) {
      return res.status(400).send("incorrect password")
    }
    let token=jwt.sign({id:check._id},JWT_SECRET,{expiresIn:"1h"})
    res.send(token)
  } catch (e) {
    res.status(400).send({message:e.message})
  }
}

export const sendmail=async (req,res)=>{
  res.send("hello world")
}