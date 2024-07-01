const request = require("supertest");

const captains = require("../app.js");
let captainsArray = require("../models/captains.js");

describe("logs", () => {
  let originalLogsArray = captainsArray;

  beforeEach(() => {
    captainsArray = originalLogsArray;
  });

  describe("/captains", () => {
    describe("GET", () => {
      it("sends the logs array", async () => {
        const response = await request(captains).get("/captains");

        expect(JSON.parse(response.text)).toEqual(captainsArray);
      });
    });

    describe("POST", () => {
      it("adds new log to end of logs array", async () => {
        const newLastArrayPosition = captainsArray.length;
        const newLog = {
          captainName: "Picard",
          title: "Stars",
          post: "Today I contemplated that there sure are a lot of stars in the sky",
          mistakesWereMadeToday: true,
          daysSinceLastCrisis: "10",
        };

        await new Promise((resolve) => {
          request(captains)
            .post(`/captains`)
            .send(newLog)
            .set("Accept", "application/json")
            .expect("headers.location", "/captains")
            .expect("statusCode", 303)
            .end(resolve);
        });

        expect(captainsArray[newLastArrayPosition]).toEqual(newLog);
      });
    });
  });

  describe("/captains/:arrayIndex", () => {
    describe("GET", () => {
      it("sends the corresponding log when a valid index is given", async () => {
        const response = await request(captains).get("/captains/1");

        expect(JSON.parse(response.text)).toEqual(captainsArray[1]);
      });

      it("sends a redirect when an invalid index is given", async () => {
        const response = await request(captains).get("/captains/9001");

        expect(response.redirect).toBe(true);
      });
    });

    describe("PUT", () => {
      it("replaces the index in the logs array", async () => {
        const updatedLog = captainsArray[0];

        await new Promise((resolve) => {
          request(captains)
            .put("/captains/0")
            .send(updatedLog)
            .set("Accept", "application/json")
            .expect("headers.location", "/logs/")
            .expect("statusCode", 303)
            .end(resolve);
        });

        expect(captainsArray[0]).toEqual(updatedLog);
      });
    });

    describe("DELETE", () => {
      it("deletes at the index in the logs array", async () => {
        const logToDelete = captainsArray[2];
        const originalLength = captainsArray.length;
        await new Promise((resolve) => {
          request(captains)
            .delete("/captains/2")
            .set("Accept", "application/json")
            .expect("headers.location", "/captains")
            .expect("statusCode", 303)
            .end(resolve);
        });

        expect(captainsArray[2]).toEqual(originalLogsArray[2]);
        expect(captainsArray).toHaveLength(originalLength - 1);
      });
    });
  });
});
