import { JWT_SECRET } from "../config/dotenv.config.js"
import jwt from "jsonwebtoken"
export function role(roles) {
    return function auth(req,res,next) {
        let token=req.headers.authorization?.split(' ')[1]
        if (!token) {
            res.status(401).json({message:"token doesn't exists, please log in and use tokens"})
        }
        console.log(roles);
        
        try {
            const data=jwt.verify(token,JWT_SECRET)
            console.log(data);
            if (data) {
                if (roles.includes(data.role)) {
                    next()
                }
                else{
                   return res.status(400).json({message:"Not permitted"})

                }
            }
            else{
                return res.status(401).json({message:"token is wrong"})
            }
        } catch (error) {
            res.status(401).send({message:"token is wrong"})
        }
    }
}