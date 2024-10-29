// CustomModal.jsx
import React from 'react';
import Modal from 'react-modal';
import { MultiplicationSignIcon } from "hugeicons-react";

// Define custom styles for React Modal based on the current theme
const getCustomStyles = (isDarkMode) => ({
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '15px',
    width: '800px',
    maxHeight: '80vh',
    overflow: 'hidden',
    backgroundColor: isDarkMode ? '#0C0B0C' : '#FFFFFF',
    color: isDarkMode ? '#FFFFFF' : '#000000',
    border: isDarkMode ? '1px solid #FFFFFF10' : '1px solid #00000010',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
  },
});

const CustomModal = ({
  isOpen,
  onClose,
  title,
  isDarkMode,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={getCustomStyles(isDarkMode)}
      contentLabel={title}
      ariaHideApp={false} 
    >
      <div className="flex flex-col h-full">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className={`hover:text-gray-400 focus:outline-none ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            aria-label="Close Modal"
          >
            <MultiplicationSignIcon size={25} />
          </button>
        </div>

        {/* Separator Line */}
        <hr className={isDarkMode ? 'w-full mb-8 border-gray-800' : 'w-full mb-8 border-gray-200'} />

        {/* Modal Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
