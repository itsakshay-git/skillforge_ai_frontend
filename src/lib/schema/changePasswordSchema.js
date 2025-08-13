import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("Current password is required"),
    newPassword: z
      .string()
      .nonempty("New password is required")
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .nonempty("Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
