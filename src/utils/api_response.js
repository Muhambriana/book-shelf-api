/**
 * General Response Class (Reusable)
 */
class ApiResponse {
  constructor(status, message, data = null) {
    this.status = status;
    if (message !== null) this.message = message;
    if (data !== null) this.data = data;
  }

  static success(message, data = {}) {
    return new ApiResponse('success', message, data);
  }

  static fail(message) {
    return new ApiResponse('fail', message);
  }
}

export default ApiResponse;
