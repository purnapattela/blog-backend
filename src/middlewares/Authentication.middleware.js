import AsyncHandler from '../helpers/AsyncHandler.js'
import jwt from 'jsonwebtoken'
import User from "../models/User.schema.js"
import CustomError from "../helpers/CustomError.js"

const AuthenticationMiddleware = AsyncHandler(async (req, res, next) => {
    const tokenFromCookie = req.cookies?.token;
    const tokenFromHeader = req.headers['authorization']?.startsWith('Bearer ')
        ? req.headers['authorization'].split(' ')[1]
        : null;

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
        throw new CustomError("Authorization token missing or invalid", 401);
    }

    const { _id } = jwt.verify(token, process.env.JWT_SECRET)


    const user = await User.findById(_id).select("+role");

    if (!user) {
        throw new CustomError("You are unauthorized! Please login", 400)
    }
    req.user = user;
    next()
})

export default AuthenticationMiddleware