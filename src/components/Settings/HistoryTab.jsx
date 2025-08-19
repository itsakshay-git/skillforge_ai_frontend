import React, { useEffect, useRef } from 'react'
import HistoryItem from './HistoryItem'
import { Trash2, Clock, AlertCircle, Loader2 } from 'lucide-react'

const HistoryTab = ({ loading, error, historyData, hasMore, onLoadMore, loadingMore, onDelete, onClear, onShowConfirmModal }) => {
    const loaderRef = useRef(null)

    useEffect(() => {
        if (!hasMore || loadingMore) return
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) onLoadMore()
            },
            { threshold: 1 }
        )
        if (loaderRef.current) observer.observe(loaderRef.current)
        return () => observer.disconnect()
    }, [hasMore, loadingMore, onLoadMore])



    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-gray-100 rounded-2xl flex items-center justify-center mb-4">
                    <Loader2 className="w-8 h-8 text-slate-500 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading History</h3>
                <p className="text-gray-600 text-sm">Please wait while we fetch your usage history...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-lg font-semibold text-red-800">Error Loading History</p>
                        <p className="text-red-600">{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    if (historyData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-gray-100 rounded-2xl flex items-center justify-center mb-4">
                    <Clock className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No History Found</h3>
                <p className="text-gray-600 text-sm text-center max-w-xs">
                    You haven't used any AI tools yet. Start exploring our features to build your usage history!
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header with Clear All Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-gray-500 rounded-xl flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Usage History</h3>
                </div>
                <button
                    onClick={() => onShowConfirmModal({ isOpen: true, action: 'clear' })}
                    className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 transform hover:-translate-y-1"
                >
                    <Trash2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Clear All</span>
                </button>
            </div>

            {/* History Items */}
            <div className="space-y-4">
                {historyData.map((item) => (
                    <HistoryItem
                        key={item.id}
                        item={item}
                        onDelete={(id) => onShowConfirmModal({ isOpen: true, action: 'delete', id })}
                    />
                ))}
            </div>

            {/* Load More Section */}
            {hasMore && !loadingMore && (
                <div ref={loaderRef} className="h-10" />
            )}

            {loadingMore && (
                <div className="flex items-center justify-center py-6">
                    <div className="flex items-center gap-3 text-slate-600">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-sm font-medium">Loading more history...</span>
                    </div>
                </div>
            )}

        </div>
    )
}

export default HistoryTab
