export class InvalidQuery extends Error {
  description: string;

  message: string;

  constructor() {
    super();
    this.description = 'Invalid query param';
    this.message = `'name' or 'state' query params missed`;
  }
}
