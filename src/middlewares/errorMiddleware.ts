import { Request, Response, NextFunction } from "express";
import ResponseModel from "../config/ResponseModel.js";
import { AppError } from "../errors/AppError.js";

export default function errorHandlingMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json(new ResponseModel(error.message, error.statusCode, error.data));
    }

    console.log(error);

    res.status(500).json(new ResponseModel("Internal Server Error", 500));
}