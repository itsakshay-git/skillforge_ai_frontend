import { Menu } from "lucide-react";

export default function TopBar({ setSidebarOpen, title }) {
    return (
        <div className="bg-white border-b border-gray-200 h-16 px-6 py-4">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>
        </div>
    );
}
