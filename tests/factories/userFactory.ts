import { faker } from '@faker-js/faker';
import { prisma } from "../../src/config/database.js";

interface Body {
    email: string;
    password: string;
}

export async function createUser(passwordLength = 20) {
    const body = {
        email: faker.internet.email(),
        password: faker.internet.password(passwordLength)
    }

    return body;
}
export async function verifyUser(body: Body) {
    const userCreated = await prisma.users.findUnique({
        where: {
            email: body.email
        }
    })

    return userCreated;
}
