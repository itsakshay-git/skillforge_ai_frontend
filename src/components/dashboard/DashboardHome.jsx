import { sidebarItems } from "@/constant";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFeatureUsage } from "@/hooks/useFeatureUsage";
import { useState, useEffect } from "react";

export default function DashboardHome() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: usageData, isLoading: usageLoading } = useFeatureUsage();
    const [selectedRoute, setSelectedRoute] = useState(null);

    useEffect(() => {
        if (usageData?.length > 0) {
            setSelectedRoute(usageData[0].routeType);
        }
    }, [usageData]);

    return (
        <div className="p-6 space-y-8">
            {/* Welcome */}
            <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.username || user?.email}!
            </h1>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sidebarItems.slice(1).map((item) => (
                    <div
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-200 hover:border-blue-300"
                    >
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <item.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {item.label}
                            </h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                            {item.label === "Resume Optimizer" &&
                                "Optimize your resume for specific job descriptions"}
                            {item.label === "Document Summarizer" &&
                                "Summarize long documents quickly and efficiently"}
                            {item.label === "Code Explainer" &&
                                "Understand complex code with AI-powered explanations"}
                            {item.label === "Email Assistant" &&
                                "Craft professional emails with AI assistance"}
                            {item.label === "Code Quiz Generator" &&
                                "Generate coding quizzes and interview questions"}
                        </p>
                        <div className="mt-4 text-blue-600 text-sm font-medium">
                            Get Started →
                        </div>
                    </div>
                ))}
            </div>


            {/* Feature Usage Table */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Feature Usage Stats
                </h2>
                {usageLoading ? (
                    <p className="text-gray-500">Loading usage...</p>
                ) : usageData?.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="text-gray-700 border-b border-gray-300">
                                    <th className="px-6 py-3 font-semibold">Feature</th>
                                    <th className="px-6 py-3 font-semibold">Usage Count</th>
                                    <th className="px-6 py-3 font-semibold">Last Used</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usageData.map((feature) => (
                                    <tr
                                        key={feature.routeType}
                                        className={`transition-colors duration-200 border-b border-gray-300`}
                                    >
                                        <td className="px-6 py-3 font-medium text-gray-800">
                                            {feature.routeType}
                                        </td>
                                        <td className="px-6 py-3">{feature.usageCount}</td>
                                        <td className="px-6 py-3 text-gray-600">
                                            {new Date(feature.lastUsed).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No usage data available.</p>
                )}
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Quick Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">5</div>
                        <div className="text-sm text-gray-600">AI Tools Available</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">24/7</div>
                        <div className="text-sm text-gray-600">AI Assistance</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">100%</div>
                        <div className="text-sm text-gray-600">Secure & Private</div>
                    </div>
                </div>
            </div>

        </div>
    );
}
