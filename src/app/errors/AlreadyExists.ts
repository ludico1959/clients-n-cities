export default class AlreadyExists extends Error {
  description: string;

  constructor(bodyMessage: string) {
    super();
    this.description = 'Bad request';
    this.message = bodyMessage;
  }
}
