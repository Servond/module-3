const request = require("supertest");
const app = require("../index");
const { branch } = require("../models");

jest.mock("../models");

const sampleData = {
  id: 1,
  branchName: "Testing",
  address: "Testing",
};

const sampleCreateExist = {
  name: "Testing",
  address: "Testing",
};

describe("Testing Branchs Routes", () => {
  describe("get /branchs", () => {
    it("Should return an array of branchs", async () => {
      branch.findAll.mockResolvedValue(sampleData);
      const response = await request(app).get("/branchs").set({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImVtYWlsIjoiYnJ5YW4ua2FydGFAcHVyd2FkaGlrYS5jb20iLCJ1c2VybmFtZSI6ImJyeWFuayIsImJyYW5jaElkIjpudWxsLCJyb2xlSWQiOjEsImF2YXRhciI6ImF2YXRhcl9icnlhbmstMTY5OTE5Nzg3NDI3Ny1teUltYWdlLTE2OTg1ODU4MzI0NTAuUE5HIiwiaWF0IjoxNjk5MjM4NzU5LCJleHAiOjE2OTkyNDIzNTl9.tnhWDlLuXfvtaXJzWjhLkw_wBAyCTOgfXeWxe6oZH_A",
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
    });
  });
  describe("post /branchs", () => {
    // it("Should return an error if branch already exist", async () => {
    //   branch.findOne.mockResolvedValue(1);
    //   const response = await request(app)
    //     .post("/branchs")
    //     .send(sampleCreateExist);
    //   expect(response.status).toBe(500);
    //   expect(response.error?.text).toEqual("Branch already exist");
    // });
    it("Should return 200 and the created branch", async () => {
      branch.findOne.mockResolvedValue(0);
      branch.create.mockResolvedValue(sampleData);
      const response = await request(app)
        .post("/branchs")
        .send(sampleCreateExist);

      expect(response.status).toBe(200);
      expect(response.body?.message).toEqual("success");
    });
  });
  // describe("patch /branchs/:id", () => {
  //   it("Should return an error if branch doesnt exist", async () => {
  //     branch.findOne.mockResolvedValue(0);
  //     const response = await request(app).patch("/branchs/1");
  //     expect(response.status).toBe(500);
  //     expect(response.error?.text).toEqual("Branch doesnt exist");
  //   });
  //   it("Should return 200 and success messsage", async () => {
  //     branch.findOne.mockResolvedValue(sampleData);
  //     const response = await request(app)
  //       .patch("/branchs/13")
  //       .send(sampleCreateExist);

  //     expect(response.status).toBe(200);
  //     expect(response.body?.message).toEqual("update success");
  //   });
  // });
});
