import { Request, Response } from 'express';
import { User } from '../repositories/authRepository.js';
import ResponseModel from '../config/ResponseModel.js';
import * as authService from '../services/authService.js';

export async function signUp(req: Request, res: Response) {
    try {
        const user: authService.UserCreateData = req.body;

        const userCreated = await authService.signUp(user);

        res.json(new ResponseModel("User created successfully", 201, userCreated));
    }
    catch (error) {
        res.status(500).json(new ResponseModel(error.message, 500));
    }
}

export async function signIn(req: Request, res: Response) {
    try {
        const user: User = req.body;

        const userSignedIn = await authService.signIn(user);


        res.status(200).json({ token: userSignedIn.token });
    }
    catch (error) {
        res.status(500).json(new ResponseModel(error.message, 500));
    }
}