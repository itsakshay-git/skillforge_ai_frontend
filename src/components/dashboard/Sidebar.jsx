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
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                <span
                    className="text-xl font-bold text-gray-900 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    SkillForge AI
                </span>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* User Info */}
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {user?.username || user?.email}
                        </p>
                        <p className="text-xs text-gray-500">Premium User</p>
                    </div>
                </div>
            </div>

            {/* Nav Items */}
            <nav className="px-3 py-4 space-y-1">
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
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${isActive
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <Icon
                                className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400"
                                    }`}
                            />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors mt-2"
                >
                    <LogOut className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
