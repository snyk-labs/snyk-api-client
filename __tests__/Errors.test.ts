import nock from "nock";
import { Client } from "../src/Client";
import { Errors } from "../src/index";

describe("Errors", () => {
  describe("Errors exported properly", () => {
    test("should export errors", () => {
      let err;
      err = new Errors.RequestError();
      expect(err instanceof Error).toBe(true);

      err = new Errors.HTTPError();
      expect(err instanceof Error).toBe(true);
    });
  });

  describe("Error classes used when thrown", () => {
    test("HTTPError should be thrown upon an HTTP error", async () => {
      expect.hasAssertions();

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
        .query({ from: dateStart, to: dateEnd })
        .reply(
          500,
          {
            code: 500,
            message: "bad API request, please contact support@snyk.io for assistance",
            error: "unsupported url",
          },
          {
            "snyk-request-id": "12345",
          },
        );

      try {
        await snykClient.issues.getAll({ filters });
      } catch (error) {
        expect(error).toBeInstanceOf(Errors.HTTPError);
        expect(error.code).toBe(500);
        expect(error.metadata.message).toBe("bad API request, please contact support@snyk.io for assistance");
        expect(error.metadata.error).toBe("unsupported url");
        expect(error.metadata.snykRequestId).toBe("12345");
      }
    });
  });
});
