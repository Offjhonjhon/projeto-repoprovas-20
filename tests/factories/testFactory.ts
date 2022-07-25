import { faker } from '@faker-js/faker';
import { prisma } from "../../src/config/database.js";
import { TestCreateInput } from '../../src/schemas/testSchema.js';

const categories = ["Projeto", "Prática", "Recuperação"];
const teachers = ["Diego Pinho", "Bruna Hamori"];
const disciplines = ["HTML e CSS", "JavaScript", "React", "Humildade", "Planejamento", "Autoconfiança"];

export async function createTest() {
    const body = {
        name: faker.name.firstName(),
        pdfUrl: faker.internet.url(),
        category: categories[Math.floor(Math.random() * categories.length)],
        discipline: disciplines[Math.floor(Math.random() * disciplines.length)],
        teacher: teachers[Math.floor(Math.random() * teachers.length)]
    }

    return body;
}

export async function verifyTest(body: TestCreateInput) {
    const testCreated = await prisma.tests.findMany({
        where: {
            name: body.name,
            pdfUrl: body.pdfUrl
        }
    })

    return testCreated;
}