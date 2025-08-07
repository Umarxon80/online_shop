import joi from "joi"

export const AuthValidator=joi.object({
    fullName:joi.string().required(),
    email:joi.string().email().lowercase().required(),
    password:joi.string().min(6).required(),
    role:joi.string().valid("admin","user").default("user")
})