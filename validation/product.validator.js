import joi from "joi"

export const ProductValidator=joi.object({
    name:joi.string().required(),
    price:joi.number().required(),
    img:joi.string().required(),
    desc:joi.string(),
    amount:joi.number().min(1).required()
})

export const ProductUpdateValidator=joi.object({
    name:joi.string(),
    price:joi.number(),
    img:joi.string(),
    desc:joi.string(),
    amount:joi.number().min(1)
})