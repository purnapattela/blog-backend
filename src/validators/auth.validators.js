import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password must not exceed 100 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)");


export const signupValidator = z.object({
  email: z.email("Invalid email address")
    .min(5, "Email must be at least 5 characters long")
    .max(50, "Email must be at most 50 characters long"),
  username: z.string()
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username must be at most 50 characters long"),
  password: passwordSchema
});

export const loginValidator = z.object({
  email: z.email("Invalid email").optional(),
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  password: z.string().min(1, "Password is required").max(100)
}).superRefine((data, ctx) => {
  if (!data.email && !data.username) {
    ctx.addIssue({
      code: "custom",
      message: "Either email or username is required",
      path: []
    });
  }
});
