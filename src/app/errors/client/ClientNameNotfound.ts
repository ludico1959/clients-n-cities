export class ClientNameNotFound extends Error {
  description: string;

  message: string;

  constructor(name: string) {
    super();
    this.description = 'Not found';
    this.message = `Client called ${name} was not found`;
  }
}
