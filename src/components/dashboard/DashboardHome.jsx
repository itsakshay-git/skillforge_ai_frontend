import { sidebarItems } from "@/constant";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFeatureUsage } from "@/hooks/useFeatureUsage";
import { useState, useEffect } from "react";
import { TrendingUp, Users, Zap, Shield } from "lucide-react";

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
        <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></span>
                    <span className="text-blue-600 font-semibold text-xs">Welcome Back</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {user?.username || user?.email}!
                    </span>
                </h1>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                    Ready to boost your productivity with our AI-powered tools? Let's get started!
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="group bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-green-600">+12%</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">5</h3>
                    <p className="text-gray-600 text-sm font-medium">AI Tools Available</p>
                </div>

                <div className="group bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-purple-600">24/7</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Always</h3>
                    <p className="text-gray-600 text-sm font-medium">AI Assistance</p>
                </div>

                <div className="group bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-green-600">100%</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Secure</h3>
                    <p className="text-gray-600 text-sm font-medium">& Private</p>
                </div>

                <div className="group bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-orange-600">∞</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Unlimited</h3>
                    <p className="text-gray-600 text-sm font-medium">Usage</p>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="mb-8">
                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        Explore Our{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            AI Tools
                        </span>
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto">
                        Choose from our suite of powerful AI tools designed to enhance your productivity
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sidebarItems.slice(1).map((item) => (
                        <div
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className="group bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-white/20 hover:border-blue-300/50 overflow-hidden relative"
                        >
                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative z-10">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="p-2.5 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                        <item.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {item.label}
                                    </h3>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                    {item.label === "Resume Optimizer" &&
                                        "Optimize your resume for specific job descriptions with AI insights"}
                                    {item.label === "Document Summarizer" &&
                                        "Summarize long documents quickly and efficiently using advanced AI"}
                                    {item.label === "Code Explainer" &&
                                        "Understand complex code with AI-powered explanations in multiple languages"}
                                    {item.label === "Email Assistant" &&
                                        "Craft professional emails with AI assistance and smart suggestions"}
                                    {item.label === "Code Quiz Generator" &&
                                        "Generate coding quizzes and interview questions to test your knowledge"}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-600 text-sm font-semibold group-hover:text-purple-600 transition-colors">
                                        Get Started →
                                    </div>
                                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Feature Usage Table */}
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Feature Usage Stats
                    </h2>
                </div>

                {usageLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    </div>
                ) : usageData?.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="text-gray-700 border-b border-gray-200/50">
                                    <th className="px-4 py-3 font-semibold text-gray-800">Feature</th>
                                    <th className="px-4 py-3 font-semibold text-gray-800">Usage Count</th>
                                    <th className="px-4 py-3 font-semibold text-gray-800">Last Used</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usageData.map((feature, index) => (
                                    <tr
                                        key={feature.routeType}
                                        className={`transition-all duration-200 border-b border-gray-200/30 hover:bg-white/30 ${index % 2 === 0 ? 'bg-white/20' : 'bg-transparent'
                                            }`}
                                    >
                                        <td className="px-4 py-3 font-medium text-gray-800">
                                            {feature.routeType}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                {feature.usageCount} uses
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {new Date(feature.lastUsed).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <TrendingUp className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-base">No usage data available yet.</p>
                        <p className="text-gray-400 text-sm">Start using our AI tools to see your statistics here!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
