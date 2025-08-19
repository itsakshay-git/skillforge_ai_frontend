import React from "react";
import { AlertTriangle, X, CheckCircle } from "lucide-react";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    // Scroll to top when modal opens and prevent body scroll
    React.useEffect(() => {
        if (isOpen) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            // Restore body scroll when modal closes
            document.body.style.overflow = 'unset';
        }

        // Cleanup function
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto'
        }}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onCancel}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 9999,
                    pointerEvents: 'auto'
                }}
            />

            {/* Modal */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/20 max-w-md w-full p-6 animate-in fade-in-0 zoom-in-95 duration-300" style={{
                position: 'relative',
                zIndex: 10000,
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                        <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    </div>
                    <button
                        onClick={onCancel}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-200 hover:scale-110"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Message */}
                <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 transform hover:-translate-y-1"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Confirm</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
