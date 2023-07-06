import React from 'react';

const Modal = ({ isOpen, onClose, winner }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white rounded-lg p-6 relative z-10">
        {/* Contenido del modal */}
        <h1 className="text-3xl font-bold text-center mb-4 text-green-500">¡Ganador!</h1>
        <p className="text-lg text-center">El ganador del juego es {winner}</p>
        <button
          className="mt-4 px-4 py-2 bg-amber-600 text-white rounded hover:bg-blue-600 "
          onClick={onClose}
          style={{ zIndex: 20 }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
