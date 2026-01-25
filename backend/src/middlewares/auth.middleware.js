import { User } from "../models/user.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";

const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const accessToken =
      req?.cookies?.accessToken ||
      req?.header("Authorization")?.replace("Bearer", "");

    if (!accessToken) {
      return next(new ErrorHandler("Unauthorized request", 400));
    }

    const decodedData = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );

    if (!decodedData) {
      return next(new ErrorHandler("Invalid access token", 400));
    }

    const user = await User.findById(decodedData?._id);
    if (!user) {
      return next(new ErrorHandler("Invalid access token", 400));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(
      new ErrorHandler(
        `something went wrong while decoding the token ${error?.response?.data}`,
      ),
    );
  }
});

export { verifyJwt };
