import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-hot-toast";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async ({ currentPassword, newPassword, confirmPassword }) => {
      if (newPassword !== confirmPassword) {
        throw new Error("New passwords do not match");
      }
      return axiosInstance.put("/auth/password", {
        currentPassword,
        newPassword,
      });
    },
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || error.message);
    },
  });
};
