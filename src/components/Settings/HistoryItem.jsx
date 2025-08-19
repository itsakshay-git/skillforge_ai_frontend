import React from 'react'
import { Trash2, Clock, FileText, Sparkles, Calendar, Tag } from 'lucide-react'
import { colorMap } from '@/constant'

const HistoryItem = ({ item, onDelete }) => {
    const getRouteIcon = (routeType) => {
        const iconMap = {
            'resume-optimizer': <FileText className="w-4 h-4" />,
            'file-upload': <FileText className="w-4 h-4" />,
            'code-explainer': <Sparkles className="w-4 h-4" />,
            'email-assistant': <FileText className="w-4 h-4" />,
            'code-quiz': <Sparkles className="w-4 h-4" />,
            'default': <FileText className="w-4 h-4" />
        }
        return iconMap[routeType] || iconMap.default
    }

    const getRouteColor = (routeType) => {
        const colorMap = {
            'resume-optimizer': 'from-blue-500 to-purple-600',
            'file-upload': 'from-purple-500 to-blue-600',
            'code-explainer': 'from-indigo-500 to-purple-600',
            'email-assistant': 'from-emerald-500 to-teal-600',
            'code-quiz': 'from-amber-500 to-orange-600',
            'default': 'from-slate-500 to-gray-600'
        }
        return colorMap[routeType] || colorMap.default
    }

    return (
        <div className="group bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 relative">
            {/* Delete Button */}
            <button
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110"
                title="Delete history item"
                onClick={() => onDelete(item.id)}
            >
                <Trash2 className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getRouteColor(item.routeType)} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                    {getRouteIcon(item.routeType)}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 capitalize mb-1">
                        {item.routeType.replace('-', ' ')}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(item.createdAt).toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Input Section */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-semibold text-gray-700">Input</span>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-gray-50/50 border border-slate-200/50 rounded-lg p-3">
                    <p className="text-gray-800 text-sm leading-relaxed">{item.inputData}</p>
                </div>
            </div>

            {/* Output Section */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-semibold text-gray-700">Output</span>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-gray-50/50 border border-slate-200/50 rounded-lg p-3">
                    <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                        {item.outputData}
                    </p>
                </div>
            </div>

            {/* Dynamic Metadata */}
            {item.metadata && Object.keys(item.metadata).length > 0 && (
                <div className="pt-4 border-t border-slate-200/50">
                    <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-semibold text-gray-700">Details</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(item.metadata).map(([key, value]) => {
                            const colorClasses = colorMap[key] || 'bg-slate-100 text-slate-700 border border-slate-200'
                            return (
                                <span
                                    key={key}
                                    className={`px-3 py-1.5 ${colorClasses} text-xs rounded-lg font-medium`}
                                >
                                    {key}: {value}
                                </span>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default HistoryItem
