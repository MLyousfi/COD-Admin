// VATClearance.jsx

import React, { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

const VATClearance = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    calculationType: '',
    declaredValue: false,
    deductedValue: false,
  });

  const handleSelectChange = (selected) => {
    const selectedValue = Array.from(selected)[0];
    setFormData({ ...formData, calculationType: selectedValue });
  };

  const toggleButton = (button) => {
    setFormData({ ...formData, [button]: !formData[button] });
  };

  // Options for Select Inputs
  const calculationTypeOptions = [
    { key: 'percentage', label: 'Percentage' },
    // Add more options as needed
  ];

  return (
    <div className="flex-1 p-4 overflow-x-hidden">
      <div className="max-w-full">
        {/* 1st Row */}
        <div className="grid grid-cols-1 mb-4">
          {/* Calculation Type */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-500">
              Calculation Type
            </label>
            <Select
              selectedKeys={formData.calculationType ? [formData.calculationType] : []}
              onSelectionChange={handleSelectChange}
              placeholder="Select Calculation Type"
              classNames={{
                trigger:
                  'w-full md:w-1/2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-left',
                value: 'text-sm text-gray-700 dark:text-gray-300',
                popover: 'bg-white dark:bg-gray-800',
              }}
            >
              {calculationTypeOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* 2nd Row */}
        <div className="flex space-x-4 mb-4">
          {/* Declared Value Button */}
          <div className="flex flex-col items-left">
            <label className="mb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
              Declared Value
            </label>
            <Button
              onClick={() => toggleButton('declaredValue')}
              className={`rounded-full text-[13px] font-bold px-4 py-2 ${
                formData.declaredValue
                  ? 'bg-info text-white'
                  : 'bg-gray-200 text-black dark:bg-[#FFFFFF10] dark:text-white'
              }`}
            >
              Declared Value
            </Button>
          </div>

          {/* Deducted Value Button */}
          <div className="flex flex-col items-left">
            <label className="mb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
              Deducted Value
            </label>
            <Button
              onClick={() => toggleButton('deductedValue')}
              className={`rounded-full text-[13px] font-bold px-4 py-2 ${
                formData.deductedValue
                  ? 'bg-info text-white'
                  : 'bg-gray-200 text-black dark:bg-[#FFFFFF10] dark:text-white'
              }`}
            >
              Deducted Value
            </Button>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-center mt-8 md:mt-28">
          <Button
            className="rounded-full font-bold px-16 py-2"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
            onClick={() => {
              // Handle Add action here
              console.log('VAT & Clearance Settings Added:', formData);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VATClearance;
