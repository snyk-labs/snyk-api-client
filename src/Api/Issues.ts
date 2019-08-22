import { Client } from "../Client";
import { IssuesResponse } from "./IssuesList.types";

export class Issues {
  private client: Client;

  public constructor(client: Client) {
    this.client = client;
  }

  public async getAll(): Promise<IssuesResponse[]> {
    const path = "/reporting/issues";

    const queryParams = {
      from: "2018-01-01",
      to: "2019-01-01",
    };

    const requestBody = {
      filters: {
        orgs: [""],
        severity: ["high", "medium", "low"],
        types: ["vuln", "license"],
        languages: ["node", "ruby", "java", "scala", "python", "golang", "php", "dotnet"],
        ignored: false,
        patched: false,
        fixable: false,
        isFixed: false,
        isUpgradable: false,
        isPatchable: false,
      },
    };

    const method = "POST";

    const response = await this.client.makeRequest({
      path,
      queryParams,
      body: requestBody,
      method,
    });

    return response.body.results;
  }
}
