import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { MultiplicationSignIcon } from "hugeicons-react";

const CustomModal = ({
  isOpen,
  onClose,
  title,
  isDarkMode,
  children,
  width, // Custom width prop
}) => {
  const [modalWidth, setModalWidth] = useState(width || '600px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setModalWidth('95%');
      } else {
        setModalWidth(width || '600px');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial width

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '15px',
      width: modalWidth,
      maxHeight: '90vh',
      overflowY: 'auto',
      backgroundColor: isDarkMode ? '#0C0B0C' : '#FFFFFF',
      color: isDarkMode ? '#FFFFFF' : '#000000',
      border: isDarkMode ? '1px solid #FFFFFF10' : '1px solid #00000010',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1000,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="flex flex-col h-full">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
          <button
            onClick={onClose}
            className={`hover:text-gray-400 focus:outline-none ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            aria-label="Close Modal"
          >
            <MultiplicationSignIcon size={20} />
          </button>
        </div>

        {/* Separator Line */}
        <hr
          className={
            isDarkMode
              ? 'w-full mb-2 border-gray-800'
              : 'w-full mb-2 border-gray-200'
          }
        />

        {/* Modal Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
