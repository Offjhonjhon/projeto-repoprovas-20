import superteste from "supertest";
import app from "../src/index.js";
import { prisma } from "../src/config/database.js";
import * as testFactory from "./factories/testFactory.js";
const agent = superteste(app);

import { notDisciplinesDiego } from "./factories/testFactory.js";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "tests" RESTART IDENTITY CASCADE;`;
})

describe("POST /test/create", () => {
    it("should return a test", async () => {
        const body = await testFactory.createTest();
        const result = await agent.post("/test/create").send(body);
        const status = result.status;

        const testCreated = await testFactory.verifyTest(body);

        expect(status).toBe(200);
        expect(testCreated).not.toBeUndefined();
    });

    it("should return an error as the specified category does not exist", async () => {
        const body = await testFactory.createTest();
        body.category = "random";

        const result = await agent.post("/test/create").send(body);
        const status = result.status;

        const testCreated = await testFactory.verifyTest(body);

        expect(status).toBe(500);
        expect(testCreated).toStrictEqual([]);
    })

    it("should return an error as the specified discipline does not exist", async () => {
        const body = await testFactory.createTest();
        body.discipline = "random";

        const result = await agent.post("/test/create").send(body);
        const status = result.status;

        const testCreated = await testFactory.verifyTest(body);

        expect(status).toBe(500);
        expect(testCreated).toStrictEqual([]);
    })

    it("should return an error as the specified teacher does not exist", async () => {
        const body = await testFactory.createTest();
        body.teacher = "random";

        const result = await agent.post("/test/create").send(body);
        const status = result.status;

        const testCreated = await testFactory.verifyTest(body);

        expect(status).toBe(500);
        expect(testCreated).toStrictEqual([]);
    })

    it("should return a error because the teacher does not teach this subject", async () => {
        const body = await testFactory.createTest();
        body.teacher = notDisciplinesDiego[Math.floor(Math.random() * notDisciplinesDiego.length)]

        const result = await agent.post("/test/create").send(body);
        const status = result.status;

        const testCreated = await testFactory.verifyTest(body);

        expect(status).toBe(500);
        expect(testCreated).toStrictEqual([]);
    })
})

describe("GET /test", () => {
    it("should return a list of tests by Term", async () => {
        await testFactory.insertTest(4);

        const result = await agent.get("/test");
        const status = result.status;

        expect(status).toBe(200);
        expect(result.body.data.length > 0).toBeTruthy();
    })
})

describe("GET /test/teacher", () => {
    it("should return a list of tests by Teacher", async () => {
        await testFactory.insertTest(4);

        const result = await agent.get("/test/teacher");
        const status = result.status;

        expect(status).toBe(200);
        expect(result.body.data.length > 0).toBeTruthy();
    })
})

