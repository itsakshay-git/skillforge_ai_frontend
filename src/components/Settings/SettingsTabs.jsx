import React from 'react'
import { Lock, History } from 'lucide-react'

const SettingsTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'changePassword', label: 'Change Password', icon: Lock },
        { id: 'history', label: 'History', icon: History }
    ]

    return (
        <div className="mb-6">
            <nav className="flex justify-center item-center space-x-2 bg-gray-100 p-1 rounded-lg">
                {tabs.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 
              ${activeTab === id
                                ? 'bg-white shadow-sm text-blue-600'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-200'
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{label}</span>
                    </button>
                ))}
            </nav>
        </div>
    )
}

export default SettingsTabs
