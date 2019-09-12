import { Client } from "../Client";
import { IssuesResponse, IssueFilters } from "./IssuesList.types";

export class Issues {
  private client: Client;

  public constructor(client: Client) {
    this.client = client;
  }

  public async getAll({ filters }: { filters: IssueFilters }): Promise<IssuesResponse[]> {
    // @TODO gets up to 10k issues, needs to be fixed by iterating the Link header
    const queryParams = { ...filters["date"], perPage: "1000" };
    const requestBody = {
      filters: {
        ...(filters.hasOwnProperty("orgs") && { orgs: filters["orgs"] }),
        ...(filters.hasOwnProperty("severity") && { severity: filters["severity"] }),
        ...(filters.hasOwnProperty("types") && { types: filters["types"] }),
        ...(filters.hasOwnProperty("languages") && { languages: filters["languages"] }),
        ...(filters.hasOwnProperty("ignored") && { ignored: filters["ignored"] }),
        ...(filters.hasOwnProperty("patched") && { patched: filters["patched"] }),
        ...(filters.hasOwnProperty("isFixed") && { isFixed: filters["isFixed"] }),
        ...(filters.hasOwnProperty("fixable") && { fixable: filters["fixable"] }),
        ...(filters.hasOwnProperty("isUpgradable") && { isUpgradable: filters["isUpgradable"] }),
        ...(filters.hasOwnProperty("isPatchable") && { isPatchable: filters["isPatchable"] }),
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
