export class OneError extends Error {
  public get name(): string {
    return this.constructor.name;
  }
}
