import AsyncHandler from '../helpers/AsyncHandler.js'
import CustomError from "../helpers/CustomError.js"

const AuthorizationMiddleware = (roles = []) => {
    return AsyncHandler(async (req, res, next) => {
        if (!req.user) {
            throw new CustomError("Unauthorized: User not authenticated", 401);
        }

        if (!roles.includes(req.user.role)) {
            throw new CustomError("Forbidden: You don't have permission to access this resource", 403);
        }

        next();
    });
};

export default AuthorizationMiddleware