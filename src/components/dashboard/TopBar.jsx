import { Menu, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopBar({ setSidebarOpen, title }) {
    const navigate = useNavigate();

    const handleSettingsClick = () => {
        navigate("/dashboard/settings");
    };

    return (
        <div className="bg-white/70 backdrop-blur-xl border-b border-white/20 h-16 px-4 py-3 shadow-sm">
            <div className="flex items-center justify-between h-full">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-white/50 transition-all duration-200 hover:shadow-md"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white">
                                    <path
                                        d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg blur-md opacity-30"></div>
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            {title}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Settings */}
                    <button
                        onClick={handleSettingsClick}
                        className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-white/50 transition-all duration-200 hover:shadow-md"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
