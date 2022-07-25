import { prisma } from "../config/database.js";
import * as testService from "../services/testService.js";
import { TestCreateInput } from "../schemas/testSchema.js";

export interface Test {
    id: number;
    name: string;
    pdfUrl: string;
    categoryId: number;
    teacherDisciplineId: number;
}

export async function insert(TestCreateData: testService.TestCreateData) {
    const test = await prisma.tests.create({
        data: {
            name: TestCreateData.name,
            pdfUrl: TestCreateData.pdfUrl,
            categoryId: TestCreateData.categoryId,
            teacherDisciplineId: TestCreateData.teacherDisciplineId
        },
    });

    return test;
}

export async function verifyTestPossibility(test: TestCreateInput) {
    const category = await prisma.categories.findFirst({
        where: {
            name: test.category
        },
        select: {
            id: true
        }
    })

    const discipline = await prisma.disciplines.findFirst({
        where: {
            name: test.discipline
        },
        select: {
            id: true
        }
    })

    const teacher = await prisma.teachers.findFirst({
        where: {
            name: test.teacher
        },
        select: {
            id: true
        }
    })

    const teacherDiscipline = await prisma.teachersDisciplines.findFirst({
        where: {
            teacherId: teacher.id,
            disciplineId: discipline.id
        },
        select: {
            id: true
        }
    })

    return {
        categoryId: category.id,
        teacherDisciplineId: teacherDiscipline.id
    }
}

export async function getTests() {
    const tests = await prisma.$queryRaw`
        SELECT terms.number as term, d.name as discipline, t.name as test, te.name as teacher, c.name as category FROM terms
        JOIN disciplines d ON d."termId" = terms.id 
        JOIN "teachersDisciplines" td ON td."disciplineId" = d.id
        JOIN tests t ON t."teacherDisciplineId" = td.id
        JOIN teachers te ON te.id = td."teacherId"
        JOIN categories c ON c.id = t."categoryId";`

    return tests;
}

export async function getTestsByTeacher() {

    const tests = await prisma.$queryRaw`
        SELECT te.name as teacher, c.name as category, t.name as test, d.name as discipline FROM disciplines d
        JOIN "teachersDisciplines" td ON td."disciplineId" = d.id
        JOIN teachers te ON te.id = td."teacherId"
        JOIN tests t ON t."teacherDisciplineId" = td.id
        JOIN categories c ON c.id = t."categoryId"
        GROUP BY te.name, c.name, d.name, c.name, t.name`;


    return tests;
}

