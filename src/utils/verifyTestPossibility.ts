import * as testeRepositorie from "../repositories/testeRepositories.js";
import { AppError } from "../errors/AppError.js";
import { TestCreateInput } from "../schemas/testSchema.js";

export default async function verifyTestPossibility(test: TestCreateInput) {
    const isTestPossible = await testeRepositorie.verifyTestPossibility(test);

    if (!isTestPossible.categoryId) {
        throw new AppError("Category does not exist", 400);
    }
    if (!isTestPossible.teacherDisciplineId) {
        throw new AppError("Teacher or discipline does not exist", 400);
    }

    return {
        categoryId: isTestPossible.categoryId,
        teacherDisciplineId: isTestPossible.teacherDisciplineId
    }
}