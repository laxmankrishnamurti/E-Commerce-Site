class ApiResponse {
  constructor(statusCode: Number, data: String, message = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

module.exports = ApiResponse;
