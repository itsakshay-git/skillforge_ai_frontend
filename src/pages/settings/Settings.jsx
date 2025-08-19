import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AuthModal from '@/components/auth/AuthModal'
import ChangePasswordTab from '@/components/Settings/ChangePasswordTab'
import HistoryTab from '@/components/Settings/HistoryTab'
import ConfirmModal from '@/components/models/ConfirmModal'
import { useUserHistory } from '@/hooks/useUserHistory'
import { User, Mail, LogOut, Settings as SettingsIcon, Clock, Key } from 'lucide-react'
import toast from 'react-hot-toast'

const Settings = () => {
    const { user, logout, isAuthenticated } = useAuth()
    const [activeTab, setActiveTab] = useState('changePassword')
    const [confirmModalState, setConfirmModalState] = useState({ isOpen: false, action: null, id: null })

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

    const handleShowConfirmModal = (modalState) => {
        setConfirmModalState(modalState)
    }

    const handleConfirmModal = async () => {
        try {
            if (confirmModalState.action === 'delete') {
                await deleteHistoryItem.mutateAsync(confirmModalState.id)
                toast.success('History item deleted successfully')
            } else if (confirmModalState.action === 'clear') {
                await clearHistory.mutateAsync()
                toast.success('All history cleared successfully')
            }
        } catch (error) {
            toast.error('Operation failed. Please try again.')
        }
        setConfirmModalState({ isOpen: false, action: null, id: null })
    }

    const handleCancelModal = () => {
        setConfirmModalState({ isOpen: false, action: null, id: null })
    }

    if (!isAuthenticated) {
        return (
            <div className="p-6 max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">You are not logged in</h2>
                <AuthModal />
            </div>
        )
    }

    return (
        <div className="p-4 space-y-4">
            <div className="max-w-6xl mx-auto space-y-4">
                {/* User Profile Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg border border-white/30 p-6">
                    <div className="flex flex-col items-center text-center">
                        {/* Avatar */}
                        <div className="relative mb-4">
                            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-slate-400 to-gray-500 flex items-center justify-center shadow-md">
                                <User className="w-10 h-10 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full border-2 border-white shadow-md"></div>
                        </div>

                        {/* User Info */}
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 text-slate-400">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className="text-lg font-semibold text-gray-800">
                                    {user?.username || 'N/A'}
                                </span>
                            </div>

                            <div className="flex items-center justify-center gap-2 text-gray-500">
                                <Mail className="w-4 h-4 text-slate-400" />
                                <span className="text-sm">{user?.email || 'N/A'}</span>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-md mb-4">
                            <div className="w-2 h-2 bg-gradient-to-r from-slate-400 to-gray-500 rounded-full"></div>
                            <span className="text-slate-600 font-medium text-xs">Premium User</span>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={logout}
                            className="group flex items-center gap-2 bg-gradient-to-r from-slate-400 to-gray-500 hover:from-slate-500 hover:to-gray-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 hover:shadow-md hover:shadow-slate-500/20 transform hover:-translate-y-0.5"
                        >
                            <LogOut className="w-4 h-4 group-hover:rotate-6 transition-transform duration-200" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>

                {/* Settings Navigation & Content */}
                <div className="space-y-4">
                    {/* Settings Navigation Tabs */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg border border-white/30 p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-7 h-7 bg-gradient-to-br from-slate-400 to-gray-500 rounded-md flex items-center justify-center">
                                <SettingsIcon className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-800">Settings</h3>
                        </div>

                        <nav className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveTab('changePassword')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md text-left transition-all duration-200 group ${activeTab === 'changePassword'
                                    ? 'bg-gradient-to-r from-slate-400 to-gray-500 text-white shadow-md shadow-slate-400/20 transform scale-102'
                                    : 'text-gray-600 hover:bg-white/50 hover:text-gray-800 hover:shadow-sm hover:scale-102'
                                    }`}
                            >
                                <Key className={`w-4 h-4 transition-all duration-200 ${activeTab === 'changePassword'
                                    ? 'text-white'
                                    : 'text-slate-400 group-hover:text-slate-500'
                                    }`} />
                                <span className="font-medium text-sm">Change Password</span>
                                {activeTab === 'changePassword' && (
                                    <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                )}
                            </button>

                            <button
                                onClick={() => setActiveTab('history')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md text-left transition-all duration-200 group ${activeTab === 'history'
                                    ? 'bg-gradient-to-r from-slate-400 to-gray-500 text-white shadow-md shadow-slate-400/20 transform scale-102'
                                    : 'text-gray-600 hover:bg-white/50 hover:text-gray-800 hover:shadow-sm hover:scale-102'
                                    }`}
                            >
                                <Clock className={`w-4 h-4 transition-all duration-200 ${activeTab === 'history'
                                    ? 'text-white'
                                    : 'text-slate-400 group-hover:text-slate-500'
                                    }`} />
                                <span className="font-medium text-sm">Usage History</span>
                                {activeTab === 'history' && (
                                    <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                )}
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg border border-white/30 p-5">
                        {activeTab === 'changePassword' && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-md flex items-center justify-center shadow-md">
                                        <Key className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
                                        <p className="text-xs text-gray-500">Update your account password for enhanced security</p>
                                    </div>
                                </div>
                                <ChangePasswordTab />
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-md flex items-center justify-center shadow-md">
                                        <Clock className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800">Usage History</h2>
                                        <p className="text-xs text-gray-500">Track your AI tool usage and activity history</p>
                                    </div>
                                </div>
                                <HistoryTab
                                    loading={isLoading}
                                    error={isError ? error.message : null}
                                    historyData={data?.pages.flatMap(page => page.data) || []}
                                    hasMore={hasNextPage}
                                    onLoadMore={fetchNextPage}
                                    loadingMore={isFetchingNextPage}
                                    onDelete={deleteHistoryItem.mutateAsync}
                                    onClear={clearHistory.mutateAsync}
                                    onShowConfirmModal={handleShowConfirmModal}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Confirmation Modal - Rendered at top level */}
            <ConfirmModal
                isOpen={confirmModalState.isOpen}
                title={confirmModalState.action === 'clear' ? 'Clear All History' : 'Delete History Item'}
                message={confirmModalState.action === 'clear'
                    ? 'Are you sure you want to clear all history? This action cannot be undone.'
                    : 'Are you sure you want to delete this history item?'}
                onConfirm={handleConfirmModal}
                onCancel={handleCancelModal}
            />
        </div>
    )
}

export default Settings
