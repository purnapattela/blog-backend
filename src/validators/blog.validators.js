import { z } from "zod";

export const createBlogValidator = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    content: z.string().min(10, "Content must be at least 10 characters long"),
    coverImage: z.url("Cover image must be a valid URL").optional(),
    status: z.enum(["draft", "published", "private"]).default("draft"),
    tags: z.array(z.string()).optional()
});

export const updateBlogValidator = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").optional(),
    content: z.string().min(10, "Content must be at least 10 characters long").optional(),
    coverImage: z.url("Cover image must be a valid URL").optional(),
    status: z.enum(["draft", "published", "archived"]).optional(),
    tags: z.array(z.string().min(1, "Tag cannot be empty")).optional()
});
