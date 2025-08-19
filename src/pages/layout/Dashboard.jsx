import { useState } from "react";
import { useLocation } from "react-router-dom";
import { sidebarItems } from "@/constant";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import DashboardHome from "@/components/dashboard/DashboardHome";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const currentPath = location.pathname;
    const currentItem =
        sidebarItems.find((item) => item.path === currentPath) || sidebarItems[0];

    const renderContent = () => {
        if (currentPath === "/dashboard") return <DashboardHome />;
        return currentItem.component ? <currentItem.component /> : null;
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                currentPath={currentPath}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar setSidebarOpen={setSidebarOpen} title={currentItem.label} />
                <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50/30 via-white/20 to-blue-50/30">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
