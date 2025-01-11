class CustomError extends Error {
  constructor(message = "An Error Occurred", status = 500, data = null) {
    super(message);
    this.status = status;
    this.data = data;
  }
}


export {
    CustomError
}
