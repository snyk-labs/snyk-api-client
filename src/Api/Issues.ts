import { Client } from "../Client";
import { IssuesResponse, IssueFilters } from "./IssuesList.types";

export class Issues {
  private client: Client;

  public constructor(client: Client) {
    this.client = client;
  }

  public async getAll({ filters }: { filters: IssueFilters }): Promise<IssuesResponse[]> {
    const queryParams = { ...filters["date"] };
    const requestBody = {
      filters: {
        orgs: filters["orgs"],
        severity: filters["severity"],
        types: filters["types"],
        languages: filters["languages"],
        ignored: filters["ignored"],
        patched: filters["patched"],
        fixable: filters["fixable"],
        isFixed: filters["isFixed"],
        isUpgradable: filters["isUpgradable"],
        isPatchable: filters["isPatchable"],
      },
    };

    const path = "/reporting/issues";
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
