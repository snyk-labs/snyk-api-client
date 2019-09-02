import nock from "nock";
import { Client } from "../src/index";

describe("Client", () => {
  describe("HTTP Client settings", () => {
    test("Requests should always include a user-agent signature", async () => {
      const snykClient = new Client({
        token: "1234",
      });

      const dateStart = "2019-01-01";
      const dateEnd = "2019-10-01";
      const filters = {
        date: {
          from: dateStart,
          to: dateEnd,
        },
        orgs: ["a30b7399-4e0c-4f6e-ba84-b27e131db54c"],
        severity: ["high", "medium", "low"],
        types: ["vuln", "license"],
        languages: ["node", "ruby", "java", "scala", "python", "golang", "php", "dotnet"],
        ignored: false,
        patched: false,
        fixable: false,
        isFixed: false,
        isUpgradable: false,
        isPatchable: false,
      };

      nock("https://snyk.io")
        .post("/api/v1/reporting/issues")
        .matchHeader("User-Agent", /Snyk API Client v0.0.0-development/)
        .query({ from: dateStart, to: dateEnd })
        .reply(200);

      await snykClient.issues.getAll({ filters });
    });
  });
});
