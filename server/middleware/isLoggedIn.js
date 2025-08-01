import { ApiResponse } from "../utils/apiResponse.js";
import { CustomError } from "../utils/customError.js";

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    console.log("Checking if user is logged in with token:", token);

    if (token) throw new CustomError("You are already logged in", 200);

    next();
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiResponse(error.status || 500, error.message));
  }
};

export default isLoggedIn;
