import { Issues } from "./Api/Issues";
import { ClientResponse } from "./Client.types";
import { HTTPError, RequestError } from "./Errors";
import Got from "got";

export class Client {
  public token: string;
  public baseUrl: string;
  public apiUrl: string;
  public baseApiPath: string;
  protected request: Got.GotInstance<any>;
  public issues: Issues;

  constructor({ token }: { token: string }) {
    this.token = token;

    this.baseApiPath = "/api/v1";
    this.baseUrl = "https://snyk.io";

    this.apiUrl = this.baseUrl + this.baseApiPath;

    this.request = Got.extend({
      baseUrl: this.apiUrl,
      headers: {
        authorization: `token ${this.token}`,
      },
    });

    this.issues = new Issues(this);
  }

  public async makeRequest({ path, headers = {}, queryParams, body, method }): Promise<ClientResponse> {
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
      throw err;
    }
  }
}
