import Joi from "joi";

export interface TestCreateInput {
    name: string;
    pdfUrl: string;
    category: string;
    discipline: string;
    teacher: string;
}

export const testSchema = Joi.object<TestCreateInput>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().required(),
    category: Joi.string().required(),
    discipline: Joi.string().required(),
    teacher: Joi.string().required(),
});
