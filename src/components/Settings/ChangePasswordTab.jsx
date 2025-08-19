import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/lib/schema/changePasswordSchema";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const ChangePasswordTab = () => {
  const updatePasswordMutation = useUpdatePassword();
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

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

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Current Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? "text" : "password"}
              {...register("currentPassword")}
              placeholder="Enter your current password"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-slate-400/20 focus:border-slate-400 transition-all duration-300 pr-12 pl-12"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <div className="absolute top-3 left-3 pointer-events-none">
              <div className="w-5 h-5 bg-gradient-to-br from-slate-400 to-gray-500 rounded-lg flex items-center justify-center">
                <Lock className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          {errors.currentPassword && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4" />
              {errors.currentPassword.message}
            </div>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? "text" : "password"}
              {...register("newPassword")}
              placeholder="Enter your new password"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-slate-400/20 focus:border-slate-400 transition-all duration-300 pr-12 pl-12"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <div className="absolute top-3 left-3 pointer-events-none">
              <div className="w-5 h-5 bg-gradient-to-br from-slate-400 to-gray-500 rounded-lg flex items-center justify-center">
                <Lock className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          {errors.newPassword && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4" />
              {errors.newPassword.message}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Confirm your new password"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-slate-400/20 focus:border-slate-400 transition-all duration-300 pr-12 pl-12"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <div className="absolute top-3 left-3 pointer-events-none">
              <div className="w-5 h-5 bg-gradient-to-br from-slate-400 to-gray-500 rounded-lg flex items-center justify-center">
                <Lock className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          {errors.confirmPassword && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4" />
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={updatePasswordMutation.isLoading}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700 text-white py-4 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:shadow-slate-500/25 transform hover:-translate-y-1"
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            {updatePasswordMutation.isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Updating Password...</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>Update Password</span>
              </>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-500 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Success Message */}
        {updatePasswordMutation.isSuccess && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">Password Updated Successfully!</p>
                <p className="text-xs text-green-600">Your password has been changed. Please use your new password for future logins.</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {updatePasswordMutation.isError && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">Password Update Failed</p>
                <p className="text-xs text-red-600">{updatePasswordMutation.error?.message || 'Something went wrong while updating your password.'}</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChangePasswordTab;
