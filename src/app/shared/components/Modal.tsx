import React, { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  title: string;
  onClose: () => void;
};

const Modal = ({ children, title, onClose }: ModalProps) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
    <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-sm w-full mx-4 transform transition-all duration-300 scale-95 hover:scale-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-yellow-400">{title}</h2>
        <button
          className="text-gray-400 hover:text-white text-2xl"
          data-testid="close-icon"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      <div>{children}</div>
    </div>
  </div>
);

export default Modal;
