export class HTTPError extends Error {
  metadata: { message: string; error: string; snykRequestId: string };
  code: number;
  message: string;

  constructor(msg?) {
    super(msg);
    Object.setPrototypeOf(this, HTTPError.prototype);
  }

  public get name(): string {
    return this.constructor.name;
  }
}
