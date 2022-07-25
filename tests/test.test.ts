import superteste from "supertest";
import app from "../src/index.js";
import { prisma } from "../src/config/database.js";
import * as testFactory from "./factories/testFactory.js";
const agent = superteste(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "tests" RESTART IDENTITY CASCADE;`;
})

describe("POST /test/create", () => {
    it("should return a test", async () => {
        const body = await testFactory.createTest();

        const result = await agent.post("/test/create").send(body);
        const status = result.status;

        const testCreated = await testFactory.verifyTest(body);
        // console.log(testCreated);

        expect(status).toBe(200);
        expect(testCreated).not.toBeUndefined();
    });


})