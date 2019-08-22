import { Client } from "../src/Client";
import { Errors } from "../src/index";

import config from "/Users/lirantal/.config/configstore/snyk.json";

jest.setTimeout(30000);

describe("Issues API", () => {
  test("should be able to get a list of issues", async () => {
    const snykClient = new Client({
      token: config.api,
    });

    try {
      const res = await snykClient.issues.getAll();
      console.log(res);
      // expect(res).toBe({});
    } catch (error) {
      console.error(error);
    }
  });
});

describe("Errors exported properly", () => {
  test("should export errors", () => {
    const err = new Errors.OneError();
    expect(err instanceof Error).toBe(true);
  });
});
