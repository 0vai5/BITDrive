export class ApiResponse {
  constructor(status, message = "Success", data = [], token = null) {
    this.status = status;
    this.message = message;
    this.data = data;

    if(token) {
      this.token = token;
    }
  }
}
