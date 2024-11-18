// InformationSection.jsx
import React, { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react'; // Adjust the import path based on your UI library

const InformationSection = ({ formData, setFormData, isDarkMode }) => {
  // State to manage focus for floating labels (can be removed if not needed)
  const [focused, setFocused] = useState({
    name: false,
    countryCode: false,
    country: false,
    tags: false,
  });

  // Helper function to determine if a field is filled
  const isFilled = (value) => value && value.trim().length > 0;

  // Handle input focus
  const handleFocus = (field) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  // Handle input blur
  const handleBlur = (field) => {
    setFocused((prev) => ({ ...prev, [field]: isFilled(formData[field]) }));
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Row 1: Country Name and Country Code */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 w-full">
        {/* Country Name Field */}
        <div className="relative flex-1">
          <label
            htmlFor="countryName"
            className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focused.name || isFilled(formData.name)
                ? 'transform -translate-y-4 scale-90'
                : ''
            }`}
          >
            Country
          </label>
          <input
            type="text"
            id="countryName"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onFocus={() => handleFocus('name')}
            onBlur={() => handleBlur('name')}
            className={`block w-full pt-6 pb-2 text-sm bg-transparent border-b ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            } focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
            placeholder=""
          />
          <div
            className={`absolute bottom-0 left-0 h-px w-full transition-colors duration-300 ${
              isFilled(formData.name)
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>

        {/* Country Code Field */}
        <div className="relative flex-1 mt-6 sm:mt-0">
          <label
            htmlFor="countryCode"
            className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focused.countryCode || isFilled(formData.countryCode)
                ? 'transform -translate-y-4 scale-90'
                : ''
            }`}
          >
            Country Code
          </label>
          <input
            type="text"
            id="countryCode"
            name="countryCode"
            value={formData.countryCode}
            onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
            onFocus={() => handleFocus('countryCode')}
            onBlur={() => handleBlur('countryCode')}
            className={`block w-full pt-6 pb-2 text-sm bg-transparent border-b ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            } focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
            placeholder=""
          />
          <div
            className={`absolute bottom-0 left-0 h-px w-full transition-colors duration-300 ${
              isFilled(formData.countryCode)
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>
      </div>

      {/* Row 2: country Select (Updated Design) */}
      <div className="md:w-1/2">
        <label htmlFor="country" className="block mb-1">
          <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Country</span>
          <Select
            id="country"
            placeholder="No"
            labelPlacement="outside"
            value={formData.country}
            onChange={(value) => setFormData({ ...formData, country: value })}
            classNames={{
              trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg mt-1',
              content: 'bg-white dark:bg-gray-700',
            }}
          >
            <SelectItem key="Yes">Yes</SelectItem>
            <SelectItem key="No">No</SelectItem>
          </Select>
        </label>
      </div>

      {/* Row 3: Tags Input */}
      <div className="relative w-full">
        <label
          htmlFor="tags"
          className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
            focused.tags || isFilled(formData.tags)
              ? 'transform -translate-y-4 scale-90'
              : ''
          }`}
        >
          Tags
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          onFocus={() => handleFocus('tags')}
          onBlur={() => handleBlur('tags')}
          className={`block w-full pt-6 pb-2 text-sm bg-transparent border-b ${
            isDarkMode ? 'border-gray-600' : 'border-gray-300'
          } focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
          placeholder=""
        />
        <div
          className={`absolute bottom-0 left-0 h-px w-full transition-colors duration-300 ${
            isFilled(formData.tags)
              ? 'bg-[#0258E8]'
              : isDarkMode
              ? 'bg-gray-600'
              : 'bg-gray-300'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default InformationSection;
