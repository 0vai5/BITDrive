class CustomError extends Error {
  constructor(message = "An Error Occurred", statusCode = 500, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}


export {
    CustomError
}
