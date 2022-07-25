import { Router } from "express";
import * as testController from "../controllers/testController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import * as testSchema from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.post("/test/create", validateSchemaMiddleware(testSchema.testSchema), testController.createTest);
testRouter.get("/test", testController.getTests);
testRouter.get("/test/teacher", testController.getTestsByTeacher);

export default testRouter;

