import joi from "joi"


export const emailValidator=joi.string().email().required()