// Subscription.jsx

import React, { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react'; 
import { Button } from '@nextui-org/button';

const Subscription = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    statut: '',
    from: '',
    to: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selected) => {
    const selectedValue = Array.from(selected)[0];
    setFormData({ ...formData, statut: selectedValue });
  };

  const [focusState, setFocusState] = useState({
    from: false,
    to: false,

  });
  const isFilled = (field) => formData[field] !== '';

  return (
    <div className="flex-1 p-4">
      <div className="flex flex-col gap-6">
        {/* Statut Dropdown */}
        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">
            Statut
          </label>
          <Select
            selectedKeys={formData.statut ? [formData.statut] : []}
            onSelectionChange={handleSelectChange}
            placeholder="Select Statut"
            classNames={{
              trigger:
                'w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-left',
              value: 'text-sm text-gray-700 dark:text-gray-300',
              popover: 'bg-white dark:bg-gray-800',
            }}
          >
            <SelectItem key="inactive">Inactive</SelectItem>
            <SelectItem key="active">Active</SelectItem>
          </Select>
        </div>

        {/* from */}
        <div className="relative col-span-2">
          <label
            htmlFor="from"
            className={`absolute  top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.address || isFilled('from') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            From
          </label>
          <input
            type="text"
            id="from"
            name="from"
            value={formData.address}
            onChange={handleInputChange}
            onFocus={() => handleFocus('from')}
            onBlur={() => handleBlur('from')}
            className={`block w-full  pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            placeholder=""
          />
          <div
            className={`absolute  bottom-1 h-px w-full transition-colors duration-300 ${
              isFilled('from')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>


            {/* to */}
            <div className="relative col-span-2">
          <label
            htmlFor="to"
            className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.address || isFilled('to') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            To
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value={formData.address}
            onChange={handleInputChange}
            onFocus={() => handleFocus('to')}
            onBlur={() => handleBlur('to')}
            className={`block w-full  pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            placeholder=""
          />
          <div
            className={`absolute  bottom-1 h-px w-full transition-colors duration-300 ${
              isFilled('to')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>
      </div>
            {/* Add Button */}
            <div className="flex justify-center mt-[70px]">
        <Button
          className="rounded-full px-6 py-2"
          style={{ backgroundColor: '#0258E8', color: 'white' }}
          onClick={() => {
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default Subscription;
