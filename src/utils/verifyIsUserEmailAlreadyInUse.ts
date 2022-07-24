import { User } from "../repositories/authRepository.js";
import * as authRepository from "../repositories/authRepository.js";
import { AppError } from "../errors/AppError.js";

export default async function verifyIsUserEmailAlreadyInUse(email: string): Promise<User> {
    const isEmailAlreadyInUse = await authRepository.verifyEmail(email);

    if (isEmailAlreadyInUse) {
        throw new AppError("Email already in use", 400);
    }

    return
}