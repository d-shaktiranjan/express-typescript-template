import request from "supertest";
import { describe, it } from "vitest";

import app from "@/index";

describe("GET /", () => {
    it("responds with a json message", () =>
        request(app)
            .get("/")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200));
});

describe("documentation routes", () => {
    it("mounts Swagger on the application", () =>
        request(app).get("/docs/").expect(200));
    it("mounts the changelog viewer on the application", () =>
        request(app).get("/docs/changelog").expect(200));
});
