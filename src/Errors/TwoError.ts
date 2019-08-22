export class TwoError extends Error {
  public get name(): string {
    return this.constructor.name;
  }
}
