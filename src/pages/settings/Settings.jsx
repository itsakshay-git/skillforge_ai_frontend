import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AuthModal from '@/components/auth/AuthModal'
import SettingsTabs from '@/components/Settings/SettingsTabs'
import ChangePasswordTab from '@/components/Settings/ChangePasswordTab'
import HistoryTab from '@/components/Settings/HistoryTab'
import { useUserHistory } from '@/hooks/useUserHistory'
import { User, Mail } from 'lucide-react'

const Settings = () => {
    const { user, logout, isAuthenticated } = useAuth()
    const [activeTab, setActiveTab] = useState('changePassword')

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        deleteHistoryItem,
        clearHistory
    } = useUserHistory(3)

    if (!isAuthenticated) {
        return (
            <div className="p-6 max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">You are not logged in</h2>
                <AuthModal />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* User Card */}
            <div className="flex flex-col items-center text-center bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
                {/* Avatar */}
                <div className="w-20 h-20 mt-5 rounded-full bg-gray-100 flex items-center justify-center mb-4 border border-gray-300">
                    <User className="w-10 h-10 text-gray-500" />
                </div>

                {/* Name */}
                <div className="flex items-center space-x-2 mb-1">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-lg font-semibold text-gray-800">
                        {user?.username || 'N/A'}
                    </span>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-2 text-gray-600 mb-4">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{user?.email || 'N/A'}</span>
                </div>

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>

            {/* Tabs */}
            <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'changePassword' && <ChangePasswordTab />}
                {activeTab === 'history' && (
                    <HistoryTab
                        loading={isLoading}
                        error={isError ? error.message : null}
                        historyData={data?.pages.flatMap(page => page.data) || []}
                        hasMore={hasNextPage}
                        onLoadMore={fetchNextPage}
                        loadingMore={isFetchingNextPage}
                        onDelete={deleteHistoryItem.mutateAsync}
                        onClear={clearHistory.mutateAsync}
                    />
                )}
            </div>
        </div>
    )
}

export default Settings
