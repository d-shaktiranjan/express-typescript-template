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
