"use client";

export default function ConfirmationModal({ isOpen, title, message, confirmText, cancelText, onConfirm, onCancel, isDangerous = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 max-w-sm w-full mx-4 shadow-2xl animate-scaleIn">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`text-5xl rounded-full w-16 h-16 flex items-center justify-center ${isDangerous ? 'bg-red-500/20' : 'bg-cyan-500/20'}`}>
            {isDangerous ? '⚠️' : '❓'}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-3 animate-slideInDown">
          {title}
        </h2>

        {/* Message */}
        <p className="text-slate-300 text-center mb-8 animate-slideInDown" style={{ animationDelay: "0.1s" }}>
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 animate-slideInUp">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-slate-800 text-slate-300 font-semibold rounded-lg hover:bg-slate-700 transition-all duration-300 border border-slate-700 hover:border-slate-600"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-3 font-semibold rounded-lg transition-all duration-300 text-white ${
              isDangerous
                ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/20'
                : 'bg-cyan-600 hover:bg-cyan-700 shadow-lg shadow-cyan-500/20'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
