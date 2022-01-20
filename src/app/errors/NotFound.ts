export default class NotFound extends Error {
  description: string;

  constructor(item: string) {
    super();
    this.description = 'Not found';
    this.message = item;
  }
}
