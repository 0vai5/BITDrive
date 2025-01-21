export class ApiResponse {
  constructor(status, message = "Success", data = [], token = null) {
    this.status = status;
    this.message = message;
     if(data) {
            this.data = data;
        };

    if(token) {
      this.token = token;
    }
  }
}
