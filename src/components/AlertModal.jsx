/* src/components/AlertModal.jsx */
import React from 'react'

export default function AlertModal({ title, message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 text-black">{title}</h2>
        <p className="mb-6 text-black">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Entendido
        </button>
      </div>
    </div>
  )
}
