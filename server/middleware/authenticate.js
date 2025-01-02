import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiResponse.js";
import { CustomError } from "../utils/customError.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) throw new CustomError("Not Authorized", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiResponse(error.status || 500, error.message));
  }
};

export default authenticate;
