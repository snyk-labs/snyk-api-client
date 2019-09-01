import nock from "nock";
import { Client } from "../src/Client";
import { Errors } from "../src/index";

import fixtureIssuesAll from "./fixtures/Issues.all.fixture.json";
const SNYK_API_HOST = "https://snyk.io";
const SNYK_API_TOKEN = "1234";

describe("Issues API", () => {
  test("should be able to get a list of issues", async () => {
    const snykClient = new Client({
      token: SNYK_API_TOKEN,
    });

    const dateStart = "2019-01-01";
    const dateEnd = "2019-10-01";
    const filters = {
      date: {
        from: dateStart,
        to: dateEnd,
      },
      orgs: ["a-b-c-d-e-f"],
      severity: ["high", "medium", "low"],
      types: ["vuln", "license"],
      languages: ["node", "ruby", "java", "scala", "python", "golang", "php", "dotnet"],
      ignored: false,
      patched: false,
      fixable: false,
      isFixed: false,
      isUpgradable: true,
      isPatchable: true,
    };

    nock(SNYK_API_HOST)
      .post("/api/v1/reporting/issues")
      .query({ from: dateStart, to: dateEnd })
      .reply(200, fixtureIssuesAll);

    const res = await snykClient.issues.getAll({ filters });
    expect(Array.isArray(res)).toBe(true);

    const firstIssue = res[0];
    expect(typeof firstIssue["issue"]).toBe("object");
  });
});

describe("Errors exported properly", () => {
  test("should export errors", () => {
    const err = new Errors.OneError();
    expect(err instanceof Error).toBe(true);
  });
});
