import { Router } from 'express';
import {
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
} from '../controllers/blog.controller.js';
import AuthenticationMiddleware from '../middlewares/Authentication.middleware.js';
import AuthorizationMiddleware from "../middlewares/Authorization.middleware.js"
const blogRoutes = Router();


blogRoutes.post('/', AuthenticationMiddleware, AuthorizationMiddleware(["admin"]), createBlog);
blogRoutes.get('/:blogId', getBlog);
blogRoutes.put('/:blogId', AuthenticationMiddleware, AuthorizationMiddleware, updateBlog);
blogRoutes.delete('/:blogId', AuthenticationMiddleware, AuthorizationMiddleware, deleteBlog);
blogRoutes.get('/', getAllBlogs);

export default blogRoutes;
