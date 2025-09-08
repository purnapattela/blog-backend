import ApiResponse  from "../helpers/ApiResponse.js";
import CustomError from "../helpers/CustomError.js";

const GlobalErrorHandler = (err, req, res, next) => {
   if (err instanceof CustomError) {
    return ApiResponse(res, err.statusCode, false, err.message, {
      ...err.details,
      ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {})
    });
  }

  return ApiResponse(res, 500, false, "Internal Server Error", {
    message: err.message,
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {})
  });
};

export default GlobalErrorHandler;