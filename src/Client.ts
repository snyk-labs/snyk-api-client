import { Issues } from "./Api/Issues";
import { ClientResponse } from "./Client.types";
import Got from "got";

export class Client {
  public token: string;
  public baseUrl: string;
  public baseDomain: string;
  public baseApiUrl: string;
  protected request: Got.GotInstance<any>;
  public issues: Issues;

  constructor({ token }: { token: string }) {
    this.token = token;

    this.request = Got.extend({
      baseUrl: this.baseUrl,
      headers: {
        authorization: `token ${this.token}`,
      },
    });

    this.baseApiUrl = "/api/v1";
    this.baseDomain = "https://snyk.io";
    this.baseUrl = this.baseDomain + this.baseApiUrl;

    this.issues = new Issues(this);
  }

  public async makeRequest({ path, headers = {}, queryParams, body, method }): Promise<ClientResponse> {
    const url = this.baseUrl + path;

    const options = {
      headers,
      query: queryParams,
      body,
      method,
      json: false,
    };

    if (body) {
      options.json = true;
    }

    const result = await this.request(url, options);
    return {
      body: result.body,
      statusCode: result.statusCode,
      statusMessage: result.statusMessage,
    };
  }
}
