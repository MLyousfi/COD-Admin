// Store.jsx

import React, { useState } from 'react';
import { Button } from '@nextui-org/button'; 

const Store = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    storeName: '',
    website: '',
  });

  const [focusState, setFocusState] = useState({
    storeName: false,
    website: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (field) => {
    setFocusState({ ...focusState, [field]: true });
  };

  const handleBlur = (field) => {
    setFocusState({
      ...focusState,
      [field]: formData[field] !== '',
    });
  };

  const isFilled = (field) => formData[field] !== '';

  return (
    <div className="flex-1 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Store Name */}
        <div className="relative">
          <label
            htmlFor="storeName"
            className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.storeName || isFilled('storeName') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            Store Name
          </label>
          <input
            type="text"
            id="storeName"
            name="storeName"
            value={formData.storeName}
            onChange={handleInputChange}
            onFocus={() => handleFocus('storeName')}
            onBlur={() => handleBlur('storeName')}
            className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            placeholder=""
          />
          <div
            className={`absolute  bottom-1 h-px w-full transition-colors duration-300 ${
              isFilled('storeName')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>

        {/* Website */}
        <div className="relative">
          <label
            htmlFor="website"
            className={`absolute  top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.website || isFilled('website') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            Website
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            onFocus={() => handleFocus('website')}
            onBlur={() => handleBlur('website')}
            className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            placeholder=""
          />
          <div
            className={`absolute  bottom-1 h-px w-full transition-colors duration-300 ${
              isFilled('website')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-center mt-60">
        <Button
          className="rounded-full font-bold px-16 py-2"
          style={{ backgroundColor: '#0258E8', color: 'white' }}
          onClick={() => {
            // Handle Add action here
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default Store;
