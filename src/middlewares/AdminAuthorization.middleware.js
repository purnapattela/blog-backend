import CustomError from "../helpers/CustomError.js";
import asyncHandler from "../helpers/AsyncHandler.js";

export const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        throw new CustomError("Unauthorized: Admin access required", 403);
    }
});