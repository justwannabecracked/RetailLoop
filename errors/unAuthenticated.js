const CustomApiError = require("./custom");

class UnAuthenticated extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnAuthenticated;
