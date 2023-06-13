const CustomApiError = require("./custom");
class NotFound extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
module.exports = NotFound;
