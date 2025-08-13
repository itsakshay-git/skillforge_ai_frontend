import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .nonempty("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username must be less than 50 characters"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
