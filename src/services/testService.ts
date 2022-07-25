import * as testeRepository from "../repositories/testeRepositories.js";
import verifyTestPossibility from "../utils/verifyTestPossibility.js";
import * as testeSchema from "../schemas/testSchema.js";


export type TestCreateData = Omit<testeRepository.Test, "id">;

export async function insertTest(test: testeSchema.TestCreateInput) {
    const verify = await verifyTestPossibility(test);

    const testeData = {
        name: test.name,
        pdfUrl: test.pdfUrl,
        categoryId: verify.categoryId,
        teacherDisciplineId: verify.teacherDisciplineId
    }

    return await testeRepository.insert(testeData);
}

export async function getTests() {
    return await testeRepository.getTests();
}

export async function getTestsOrderByTeacher() {
    return await testeRepository.getTestsByTeacher();
}