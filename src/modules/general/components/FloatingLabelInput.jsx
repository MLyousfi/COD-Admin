// FloatingLabelInput.jsx
import React, { useState } from 'react';

const FloatingLabelInput = ({ id, label, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const isFilled = value.trim() !== '';

  return (
    <div className="relative flex-1">
      {/* Label */}
      <label
        htmlFor={id}
        className={`absolute top-4 left-0 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
          isFocused || isFilled ? 'transform -translate-y-4 scale-90 text-blue-500' : ''
        }`}
      >
        {label}
      </label>

      {/* Input */}
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 text-black dark:text-white"
        placeholder=""
      />

      {/* Underline */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 w-full transition-colors duration-300 ${
          isFocused || isFilled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      ></div>
    </div>
  );
};

export default FloatingLabelInput;
