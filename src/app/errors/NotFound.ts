export default class NotFound extends Error {
  description: string;

  constructor(bodyMessage: string) {
    super();
    this.description = 'Not found';
    this.message = bodyMessage;
  }
}
