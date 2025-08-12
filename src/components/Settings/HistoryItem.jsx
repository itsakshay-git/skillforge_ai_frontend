import React from 'react'
import { Trash2 } from 'lucide-react'

const HistoryItem = ({ item, onDelete }) => {
    return (
        <li className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 relative hover:shadow-md transition-shadow duration-200">
            <button
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete history item"
                onClick={() => onDelete(item.id)}
            >
                <Trash2 className="w-5 h-5" />
            </button>

            <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-800 capitalize">{item.routeType}</h3>
                <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                </p>
            </div>

            <div className="mb-2">
                <p className="text-sm font-medium text-gray-600">Input</p>
                <p className="text-gray-800 text-sm bg-gray-50 rounded-md p-2">{item.inputData}</p>
            </div>

            <div className="mb-2">
                <p className="text-sm font-medium text-gray-600">Output</p>
                <p className="text-gray-800 text-sm bg-gray-50 rounded-md p-2 whitespace-pre-line">
                    {item.outputData}
                </p>
            </div>

              {/* Metadata */}
            <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                    Tone: {item.metadata?.tone}
                </span>
                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md">
                    File: {item.metadata?.fileType}
                </span>
                <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md">
                    Length: {item.metadata?.contentLength}
                </span>
                <span className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-md">
                    Summary: {item.metadata?.summaryLength}
                </span>
            </div>
        </li>
    )
}

export default HistoryItem
