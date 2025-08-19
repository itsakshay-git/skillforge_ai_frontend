import { X, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { sidebarItems } from "@/constant";

export default function Sidebar({ sidebarOpen, setSidebarOpen, currentPath }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <div
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-white/20 bg-gradient-to-r from-blue-600/8 to-purple-600/8">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white">
                                <path
                                    d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-lg opacity-30"></div>
                    </div>
                    <span
                        className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        SkillForge AI
                    </span>
                </div>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-white/20 transition-all duration-200"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* User Info */}
            <div className="px-4 py-4 border-b border-white/20">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-md">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                            {user?.username || user?.email}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                            <p className="text-xs text-gray-500 font-medium">Premium User</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nav Items */}
            <nav className="px-3 py-4 space-y-1.5">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => {
                                navigate(item.path);
                                setSidebarOpen(false);
                            }}
                            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${isActive
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md shadow-blue-500/20 transform scale-102"
                                : "text-gray-600 hover:bg-white/50 hover:text-gray-800 hover:shadow-sm hover:scale-102"
                                }`}
                        >
                            <Icon
                                className={`w-4 h-4 transition-all duration-200 ${isActive
                                    ? "text-white"
                                    : "text-gray-400 group-hover:text-blue-600"
                                    }`}
                            />
                            <span className="font-medium text-sm">{item.label}</span>
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20 bg-gradient-to-t from-blue-50/20 to-transparent">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:shadow-sm hover:scale-102 group"
                >
                    <LogOut className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
}
