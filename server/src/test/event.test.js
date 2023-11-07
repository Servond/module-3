const request = require("supertest");
const app = require("../index");
const { event } = require("../models");

jest.mock("../models");

const sampleData = {
  name: "Konser Testing",
  location: "Konser Testing",
};

describe("Testing Event Routes", () => {
  describe("get /event", () => {
    it("Should return status 200 and an array of events", async () => {
      event.findAll.mockResolvedValue(sampleData);
      const response = await request(app).get("/event");
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(sampleData);
    });
  });
});
