import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import {EMAIL_PASS, EMAIL_USER, JWT_SECRET}  from "../config/dotenv.config.js";
import { AuthValidator } from "../validation/auth.validator.js";
import { totp } from "otplib";
import nodemailer from "nodemailer"
import { emailValidator } from "../validation/email.validator.js";


const emailTransporter=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:EMAIL_USER,
    pass:EMAIL_PASS
  }
})

export const getUsers=async (req,res)=>{
 try {
  let users=await User.find()
  res.send(users)
 } catch (e) {
  res.status(400).send({message:e.message})
}
  
}


export const register = async (req, res) => {
  const { email, password } = req.body;
  let {value,error}=AuthValidator.validate(req.body)
  if (error) {
    return res.status(400).send({message:error.details[0].message})
  }
  try {
    let check=await User.findOne({email})
    if (check) {
      return res.status(409).send("Such user already exists")
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
    let token=jwt.sign({id:check._id,role:check.role},JWT_SECRET,{expiresIn:"1h"})
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