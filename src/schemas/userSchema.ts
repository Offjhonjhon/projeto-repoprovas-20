import Joi from "joi";

import { UserCreateData } from "../services/authService.js";

export const userSchema = Joi.object<UserCreateData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})