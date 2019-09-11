import { Issues } from "./Api/Issues";
import { ClientResponse } from "./Client.types";
import { HTTPError, RequestError } from "./Errors";
import Got from "got";
import pkgInfo from "../package.json";

export class Client {
  public token: string;
  public baseUrl: string;
  public apiUrl: string;
  public baseApiPath: string;
  protected request: Got.GotInstance<any>;
  public issues: Issues;

  constructor({ token, baseUrl }: { token: string; baseUrl?: string }) {
    this.token = token;

    this.baseApiPath = "/api/v1";
    this.baseUrl = baseUrl || "https://snyk.io";

    this.apiUrl = this.baseUrl + this.baseApiPath;

    this.request = Got.extend({
      baseUrl: this.apiUrl,
      headers: {
        authorization: `token ${this.token}`,
        "user-agent": `Snyk API Client v${pkgInfo.version}`,
      },
    });

    this.issues = new Issues(this);
  }

  public async makeRequest({
    path,
    headers,
    queryParams,
    body,
    method,
  }: {
    path: string;
    headers?: object;
    queryParams: object;
    body: object;
    method: string;
  }): Promise<ClientResponse> {
    const url = path;

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

    try {
      const result = await this.request(url, options);
      return {
        body: result.body,
        statusCode: result.statusCode,
        statusMessage: result.statusMessage,
      };
    } catch (clientError) {
      if (clientError.name === "HTTPError") {
        const err = new HTTPError(clientError.message);
        err.code = clientError.statusCode;
        err.metadata = {
          message: clientError.body.message,
          error: clientError.body.error,
          snykRequestId: clientError.headers["snyk-request-id"],
        };

        throw err;
      }

      const err = new RequestError(clientError.message);
      err.code = clientError.name;
      throw err;
    }
  }
}
