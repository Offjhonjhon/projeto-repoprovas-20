import Joi from "joi";

import { UserCreateData } from "../services/authService.js";

export const userSchema = Joi.object<UserCreateData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
});