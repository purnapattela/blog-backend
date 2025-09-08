import User from '../models/User.schema.js'
import { loginValidator, signupValidator } from "../validators/auth.validators.js";
import CustomError from "../helpers/CustomError.js";
import ApiResponse from "../helpers/ApiResponse.js";
import AsyncHandler from "../helpers/AsyncHandler.js";
import cookieOptions from "../config/cookieOptions.js"

export const signupController = AsyncHandler(async (req, res) => {
  const result = signupValidator.safeParse(req.body);

  if (!result.success) {
    const errors = result.error?.issues.map(err => ({
      path: err.path.join('.'),
      message: err.message
    }));
    return ApiResponse(res, 400, false, "Validation Error", { errors });
  }

  const { username, email, password } = result.data;
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new CustomError("User with this email or username already exists", 409);
  }
  const newUser = await User.create({ username, email, password });

  return ApiResponse(res, 201, true, "User registered successfully", {});
})

export const loginController = AsyncHandler(async (req, res) => {
  const { email, username, password } = loginValidator.parse(req.body);

  const user = await User.findOne(email ? { email } : { username }).select("+password -createdAt -updatedAt +role");
  if (!user) {
    throw new CustomError("Invalid credentials", 401);
  }

  const isPasswordValid = await user.checkPassword(password);
  if (!isPasswordValid) {
    throw new CustomError("Invalid credentials", 401);
  }

  const token = user.generateJWT();

  res.cookie("token", token, cookieOptions)

  return ApiResponse(res, 200, true, "Login successful", {
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  })
});

export const profileController = AsyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new CustomError("Please login to check the profile", 400)
  }
  return ApiResponse(res, 200, true, "Profile fetched successfully", {
    username: user.username,
    email: user.email,
    _id: user._id,
    role: user.role
  })
})

export const logoutController = AsyncHandler(async (req, res) => {
  res.clearCookie("token", cookieOptions);
  return ApiResponse(res, 200, true, "Logged out successfully", {});
});