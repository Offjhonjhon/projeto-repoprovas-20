import { prisma } from "../config/database.js";
import { UserCreateData } from "../services/authService.js";

export interface User {
    id: number;
    email: string;
    password: string;
}


export async function insert(UsercreateData: UserCreateData, hashedPassword: string) {
    const user = await prisma.users.create({
        data: {
            email: UsercreateData.email,
            password: hashedPassword
        },
    });

    return user;
}

export async function verifyEmail(email: string) {
    return await prisma.users.findUnique({
        where: {
            email: email
        }
    })
}

// export async function insertSection(section: { userId: number, token: string }) {
//     return await prisma.users.create({
//         data: {
//             token: section.token,
//             userId: section.userId
//         }
//     })
// }
