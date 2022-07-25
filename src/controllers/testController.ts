import { Request, Response } from 'express';
import * as testSchema from '../schemas/testSchema.js';
import ResponseModel from '../config/ResponseModel.js';
import * as testService from '../services/testService.js';


export async function createTest(req: Request, res: Response) {
    try {
        const teste: testSchema.TestCreateInput = req.body;

        const testeCreated = await testService.insertTest(teste);

        res.json(new ResponseModel("User created successfully", 201, testeCreated));
    }
    catch (error) {
        res.status(500).json(new ResponseModel(error.message, 500));
    }
}

export async function getTests(req: Request, res: Response) {
    try {
        const tests = await testService.getTests();

        res.json(new ResponseModel("Tests retrieved successfully", 200, tests));
    }
    catch (error) {
        res.status(500).json(new ResponseModel(error.message, 500));
    }
}

export async function getTestsByTeacher(req: Request, res: Response) {
    try {
        const tests = await testService.getTestsOrderByTeacher();

        res.json(new ResponseModel("Tests retrieved successfully", 200, tests));
    }
    catch (error) {
        res.status(500).json(new ResponseModel(error.message, 500));
    }
}