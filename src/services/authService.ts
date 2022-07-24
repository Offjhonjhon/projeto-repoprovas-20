import { User } from "../repositories/authRepository.js";
import { AppError } from "../errors/AppError.js";
import * as authRepository from "../repositories/authRepository.js";
export type UserCreateData = Omit<User, "id">;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyIsUserEmailAlreadyInUse from "../utils/verifyIsUserEmailAlreadyInUse.js";
import verifyUserExistsByEmail from "../utils/verifyUserExists.js";



export async function signUp(user: UserCreateData) {
    await verifyIsUserEmailAlreadyInUse(user.email);

    const hashedPassword = bcrypt.hashSync(user.password, 10);

    return await authRepository.insert(user, hashedPassword);
}

export async function signIn(user: User) {
    const verify = await verifyUserExistsByEmail(user.email);

    if (!verify) {
        throw new Error("User does not exist");
    }

    const isValid = bcrypt.compareSync(user.password, verify.password);
    if (!isValid) {
        throw new AppError("Invalid password", 401);
    }

    const token = jwt.sign({ id: verify.id, email: verify.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // await authRepository.insertSection({ userId: verify.id, token: token });

    return {
        token: token,
        user: verify
    }
}


