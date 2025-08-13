import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/lib/schema/changePasswordSchema";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";

const ChangePasswordTab = () => {
  const updatePasswordMutation = useUpdatePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    updatePasswordMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Current Password
          </label>
          <input
            type="password"
            {...register("currentPassword")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.currentPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.currentPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            New Password
          </label>
          <input
            type="password"
            {...register("newPassword")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.newPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={updatePasswordMutation.isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {updatePasswordMutation.isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordTab;
