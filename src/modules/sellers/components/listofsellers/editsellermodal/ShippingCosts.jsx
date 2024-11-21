// ShippingCosts.jsx

import React, { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

const ShippingCosts = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    shippingType: '',
    returnFees: false,
    fulfillment: false,
  });

  const handleSelectChange = (field, selected) => {
    const selectedValue = Array.from(selected)[0];
    setFormData({ ...formData, [field]: selectedValue });
  };

  const toggleButton = (button) => {
    setFormData({ ...formData, [button]: !formData[button] });
  };

  // Options for Select Inputs
  const shippingTypeOptions = [
    { key: 'standard', label: 'Standard' },
    { key: 'express', label: 'Express' },
    { key: 'overnight', label: 'Overnight' },
    // Add more shipping type options as needed
  ];

  return (
    <div className="flex-1 p-4 overflow-x-hidden">
      <div className="max-w-full">
        <div className="grid grid-cols-1 gap-4">
          {/* Shipping Type */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-500">
              Shipping Type
            </label>
            <Select
              selectedKeys={formData.shippingType ? [formData.shippingType] : []}
              onSelectionChange={(selected) => handleSelectChange('shippingType', selected)}
              placeholder="Select Shipping Type"
              classNames={{
                trigger:
                  'w-full md:w-1/2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-left',
                value: 'text-sm text-gray-700 dark:text-gray-300',
                popover: 'bg-white dark:bg-gray-800',
              }}
            >
              {shippingTypeOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Buttons with Labels */}
          <div className="grid grid-cols-2 gap-4 md:flex md:space-x-4 md:gap-0">
            {/* Return Fees Button with Label */}
            <div className="flex flex-col items-left">
              <label className="mb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
                Return Fees
              </label>
              <Button
                onClick={() => toggleButton('returnFees')}
                className={`w-full md:w-auto rounded-full text-[13px] font-bold px-4 py-2 ${
                  formData.returnFees
                    ? 'bg-info text-white'
                    : 'bg-gray-200 text-black dark:bg-[#FFFFFF10] dark:text-white'
                }`}
              >
                Return Fees
              </Button>
            </div>

            {/* Fulfillment Button with Label */}
            <div className="flex flex-col items-left">
              <label className="mb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
                Fulfillment
              </label>
              <Button
                onClick={() => toggleButton('fulfillment')}
                className={`w-full md:w-auto rounded-full text-[13px] font-bold px-4 py-2 ${
                  formData.fulfillment
                    ? 'bg-info text-white'
                    : 'bg-gray-200 text-black dark:bg-[#FFFFFF10] dark:text-white'
                }`}
              >
                Fulfillment
              </Button>
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-center mt-20 md:mt-36">
          <Button
            className="rounded-full font-bold px-16 py-2"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
            onClick={() => {
              // Handle Add action here
              console.log('Shipping Costs Added:', formData);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShippingCosts;
