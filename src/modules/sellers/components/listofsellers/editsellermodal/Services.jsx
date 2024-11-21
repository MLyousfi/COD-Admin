// Services.jsx

import React, { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

const Services = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    callCenter: '',
    shipping: '',
  });

  const handleSelectChange = (field, selected) => {
    const selectedValue = Array.from(selected)[0];
    setFormData({ ...formData, [field]: selectedValue });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Options for Select Inputs
  const callCenterOptions = [
    { key: 'enabled', label: 'Enabled' },
    { key: 'disabled', label: 'Disabled' },
    // Add more call center options as needed
  ];

  const shippingOptions = [
    { key: 'manually', label: 'Manually' },
    { key: 'automatically', label: 'Automatically' },
    // Add more shipping options as needed
  ];

  return (
    <div className="flex-1 p-4 overflow-x-hidden">
      <div className="max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Call Center */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-500">
              Call Center
            </label>
            <Select
              selectedKeys={formData.callCenter ? [formData.callCenter] : []}
              onSelectionChange={(selected) => handleSelectChange('callCenter', selected)}
              placeholder="Select Call Center"
              classNames={{
                trigger:
                  'w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-left',
                value: 'text-sm text-gray-700 dark:text-gray-300',
                popover: 'bg-white dark:bg-gray-800',
              }}
            >
              {callCenterOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Shipping */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-500">
              Shipping
            </label>
            <Select
              selectedKeys={formData.shipping ? [formData.shipping] : []}
              onSelectionChange={(selected) => handleSelectChange('shipping', selected)}
              placeholder="Select Shipping"
              classNames={{
                trigger:
                  'w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-left',
                value: 'text-sm text-gray-700 dark:text-gray-300',
                popover: 'bg-white dark:bg-gray-800',
              }}
            >
              {shippingOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-center mt-24 md:mt-36">
          <Button
            className="rounded-full font-bold px-16 py-2"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
            onClick={() => {
              // Handle Add action here
              console.log('Services Added:', formData);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;
