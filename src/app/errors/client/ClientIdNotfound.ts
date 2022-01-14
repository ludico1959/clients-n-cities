export class ClientIdNotFound extends Error {
  description: string;

  message: string;

  constructor(id: string) {
    super();
    this.description = 'Not found';
    this.message = `The client ID: ${id} was not found`;
  }
}
