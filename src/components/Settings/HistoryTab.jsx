import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmModal from '@/components/models/ConfirmModal'
import HistoryItem from './HistoryItem'

const HistoryTab = ({ loading, error, historyData, hasMore, onLoadMore, loadingMore, onDelete, onClear }) => {
    const loaderRef = useRef(null)
    const [confirmState, setConfirmState] = useState({ isOpen: false, action: null, id: null })

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

    const handleConfirm = async () => {
        if (confirmState.action === 'delete') {
            await onDelete(confirmState.id)
            toast.success('History item deleted')
        } else if (confirmState.action === 'clear') {
            await onClear()
            toast.success('All history cleared')
        }
        setConfirmState({ isOpen: false, action: null, id: null })
    }

    if (loading) return <p>Loading history...</p>
    if (error) return <p className="text-red-600">Error: {error}</p>
    if (historyData.length === 0) return <p>No history found.</p>

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">History</h2>
                <button
                    onClick={() => setConfirmState({ isOpen: true, action: 'clear' })}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Clear All
                </button>
            </div>

            <ul className="space-y-4">
                {historyData.map((item) => (
                    <HistoryItem
                        key={item.id}
                        item={item}
                        onDelete={(id) => setConfirmState({ isOpen: true, action: 'delete', id })}
                    />
                ))}
            </ul>
            {hasMore && !loadingMore && <div ref={loaderRef} className="h-10" />}
            {loadingMore && <p className="mt-4 text-gray-500">Loading more...</p>}

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={confirmState.isOpen}
                title={confirmState.action === 'clear' ? 'Clear All History' : 'Delete History Item'}
                message={confirmState.action === 'clear'
                    ? 'Are you sure you want to clear all history? This action cannot be undone.'
                    : 'Are you sure you want to delete this history item?'}
                onConfirm={handleConfirm}
                onCancel={() => setConfirmState({ isOpen: false, action: null, id: null })}
            />
        </div>
    )
}

export default HistoryTab
