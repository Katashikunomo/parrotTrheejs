// src/components/InstructionsModal.jsx
import React from 'react'

export default function InstructionsModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-center">Instrucciones de Uso</h2>

        <div className="space-y-4">
          {/* Controles de voz */}
          <div className="p-4 bg-gray-100 rounded-xl">
            <h3 className="font-semibold mb-2 text-black">🎤 Comandos de voz:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li><strong>volar</strong> → El loro empieza a volar y la cámara lo sigue.</li>
              <li><strong>parar</strong> → Detiene el vuelo y resetea la cámara.</li>
              <li><strong>cantar</strong> → El loro canta.</li>
              <li><strong>atacar</strong> → El loro lanza un ataque.</li>
            </ul>
          </div>

          {/* Comandos de teclado */}
          <div className="p-4 bg-gray-100 rounded-xl">
            <h3 className="font-semibold mb-2 text-black">⌨️ Comandos de teclado:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <kbd className="px-2 py-1 bg-white border rounded text-black">Espacio</kbd>
                <span className="text-gray-700 ">Volar</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="px-2 py-1 bg-white border rounded text-black">P</kbd>
                <span className="text-gray-700">Parar</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="px-2 py-1 bg-white border rounded text-black">C</kbd>
                <span className="text-gray-700">Cantar</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="px-2 py-1 bg-white border rounded text-black">A</kbd>
                <span className="text-gray-700">Atacar</span>
              </div>
            </div>
          </div>

          {/* Controles de cámara */}
          <div className="p-4 bg-gray-100 rounded-xl">
            <h3 className="font-semibold mb-2 text-black">🖱️ Control de cámara:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li><strong>Orbitar</strong>: click izquierdo + arrastrar.</li>
              <li><strong>Zoom</strong>: rueda del ratón.</li>
              <li><strong>Pan</strong>: rueda presionada + arrastrar.</li>
              <li><strong>Reset automático</strong>: usando "parar" (voz o tecla P).</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  )
}
