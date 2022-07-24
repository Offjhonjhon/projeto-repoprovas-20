import { User } from "../repositories/authRepository.js";
import * as authRepository from "../repositories/authRepository.js";
import { AppError } from "../errors/AppError.js";

export default async function verifyUserExistsByEmail(email: string): Promise<User> {
    const user = await authRepository.verifyEmail(email);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
}
