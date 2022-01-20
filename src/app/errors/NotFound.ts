export class NotFound extends Error {
  description: string;

  message: string;

  constructor() {
    super();
    this.description = 'Not found';
    this.message = `The client was not found`;
  }
}
