import { describe, it, expect } from "@jest/globals";
import api from "../api";
import request from "supertest";
import { Application } from "express";

describe("GET /", () => {
  it("Get started API application blog", async () => {
    const app: Application = await api.startServer();
    const res = await request(app).get("/").expect(200);
    expect(res.text).toBe("Welcome to TrySomeThign-Blog application");
  });
});
