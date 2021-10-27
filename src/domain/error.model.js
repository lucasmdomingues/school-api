export class AppError {
  constructor(message, details, statusCode = 500) {
    this.message = message;
    this.details = details instanceof Array ? details : Array(details);
    this.statusCode = statusCode;
  }
}
