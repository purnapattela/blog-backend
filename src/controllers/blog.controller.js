import Blog from '../models/Blog.schema.js';
import CustomError from '../helpers/CustomError.js';
import ApiResponse from '../helpers/ApiResponse.js';
import AsyncHandler from '../helpers/AsyncHandler.js';
import { createBlogValidator, updateBlogValidator } from '../validators/blog.validators.js';

export const createBlog = AsyncHandler(async (req, res) => {
  const result = createBlogValidator.safeParse(req.body);
  if (!result.success) {
    const errors = result.error?.issues.map(err => ({
      path: err.path.join('.'),
      message: err.message
    }));
    return ApiResponse(res, 400, false, "Validation Error", { errors });
  }
  const { title, content, coverImage, status, tags } = result.data;
  const author = req.user._id;
  const newBlog = await Blog.create({ title, content, coverImage, status, tags, author });
  return ApiResponse(res, 201, true, "Blog created successfully", newBlog);
});

export const getBlog = AsyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId).populate('author', 'username');
  if (!blog) {
    throw new CustomError("Blog not found", 404);
  }
  return ApiResponse(res, 200, true, "Blog fetched successfully", blog);
});

export const updateBlog = AsyncHandler(async (req, res) => {
  const result = updateBlogValidator.safeParse(req.body);
  if (!result.success) {
    const errors = result.error?.issues.map(err => ({
      path: err.path.join('.'),
      message: err.message
    }));
    return ApiResponse(res, 400, false, "Validation Error", { errors });
  }
  const { blogId } = req.params;
  const { title, content, coverImage, status, tags } = result.data;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new CustomError("Blog not found", 404);
  }
  if (blog.author.toString() !== req.user._id.toString()) {
    throw new CustomError("You are not authorized to update this blog", 403);
  }
  const updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, content, coverImage, status, tags }, { new: true });
  return ApiResponse(res, 200, true, "Blog updated successfully", updatedBlog);
});

export const deleteBlog = AsyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new CustomError("Blog not found", 404);
  }
  if (blog.author.toString() !== req.user._id.toString()) {
    throw new CustomError("You are not authorized to delete this blog", 403);
  }
  await Blog.findByIdAndDelete(blogId);
  return ApiResponse(res, 200, true, "Blog deleted successfully", {});
});

export const getAllBlogs = AsyncHandler(async (req, res) => {
  const blogs = await Blog.find({ status: "published" }).populate('author', 'username');
  return ApiResponse(res, 200, true, "All blogs fetched successfully", blogs);
});
