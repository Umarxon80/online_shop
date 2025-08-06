import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import secr  from "../config/dotenv.config.js";
import { AuthValidator } from "../validation/auth.validator.js";
import { totp } from "otplib";
import nodemailer from "nodemailer"
import { emailValidator } from "../validation/email.validator.js";


let JWT_SECRET=secr.JWT_SECRET


const emailTransporter=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"umarhonsultanov3@gmail.com",
    pass:"ngon afkb ufzm gbdb"
  }
})


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
  let {email}=req.body
  let {value,error}=emailValidator.validate(email)
  const otp=totp.generate(email+JWT_SECRET)
  if (error) {
    return res.status(400).send({message:error.details[0].message})
  }
  try {
    await emailTransporter.sendMail({
      from:"umarhonsultanov3@gmail.com",
      to:email,
      subject:"Verification",
      text:`your otp code ${otp}`
    })
    res.send("send to email")
  } catch (e) {
    res.status(400).send({message:e.message})
  }
}
export const verifyemail = async(req,res)=>{
  const {email,otp}=req.body  
  const verify=totp.check(otp,email+JWT_SECRET)
  res.send({verify})
}