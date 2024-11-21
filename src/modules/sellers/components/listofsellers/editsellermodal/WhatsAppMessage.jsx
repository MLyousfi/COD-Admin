// WhatsAppMessage.jsx

import React, { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

const WhatsAppMessage = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    statut: '',
    customStoreName: '',
    chatbot: '',
  });

  const handleSelectChange = (field, selected) => {
    const selectedValue = Array.from(selected)[0];
    setFormData({ ...formData, [field]: selectedValue });
  };

  // Options for Select Inputs
  const statutOptions = [
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
  ];

  const customStoreNameOptions = [
    { key: 'manually', label: 'Manually' },
    // Add more options as needed
  ];

  const chatbotOptions = [
    { key: 'enabled', label: 'Enabled' },
    { key: 'disabled', label: 'Disabled' },
  ];

  return (
    <div className="flex-1 p-4 overflow-x-hidden">
      <div className="max-w-full">
        {/* 1st Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Statut */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-500">
              Statut
            </label>
            <Select
              selectedKeys={formData.statut ? [formData.statut] : []}
              onSelectionChange={(selected) => handleSelectChange('statut', selected)}
              placeholder="Select Statut"
              classNames={{
                trigger:
                  'w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-left',
                value: 'text-sm text-gray-700 dark:text-gray-300',
                popover: 'bg-white dark:bg-gray-800',
              }}
            >
              {statutOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Custom Store Name */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-500">
              Custom Store Name
            </label>
            <Select
              selectedKeys={formData.customStoreName ? [formData.customStoreName] : []}
              onSelectionChange={(selected) => handleSelectChange('customStoreName', selected)}
              placeholder="Select Custom Store Name"
              classNames={{
                trigger:
                  'w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-left',
                value: 'text-sm text-gray-700 dark:text-gray-300',
                popover: 'bg-white dark:bg-gray-800',
              }}
            >
              {customStoreNameOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* 2nd Row */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
          {/* Chatbot */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-500">
              Chatbot
            </label>
            <Select
              selectedKeys={formData.chatbot ? [formData.chatbot] : []}
              onSelectionChange={(selected) => handleSelectChange('chatbot', selected)}
              placeholder="Select Chatbot"
              classNames={{
                trigger:
                  'w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-left',
                value: 'text-sm text-gray-700 dark:text-gray-300',
                popover: 'bg-white dark:bg-gray-800',
              }}
            >
              {chatbotOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-center mt-8 md:mt-28">
          <Button
            className="rounded-full font-bold px-16 py-2"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
            onClick={() => {
              // Handle Add action here
              console.log('WhatsApp Message Settings Added:', formData);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppMessage;
