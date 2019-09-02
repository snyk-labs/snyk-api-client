export class RequestError extends Error {
  public code: string;
  constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, RequestError.prototype);
  }

  public get name(): string {
    return this.constructor.name;
  }
}
