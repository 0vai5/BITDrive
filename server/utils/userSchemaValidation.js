import joi from 'joi';

const userSignUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    name: joi.string().required(),
})

const userSignInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
})

const userUpdateSchema = joi.object({
    email: joi.string().email(),
    password: joi.string().min(6),
    name: joi.string(),
})

export { userSignUpSchema, userSignInSchema, userUpdateSchema };