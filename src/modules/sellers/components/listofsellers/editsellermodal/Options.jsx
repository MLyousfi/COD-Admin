// Options.jsx

import React, { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

const Options = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    statut: '',
    billing: '',
    accountManager: '',
    partner: '',
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
  const statutOptions = [
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
  ];

  const billingOptions = [
    { key: 'manually', label: 'Manually' },
    // Add more billing options as needed
  ];

  const accountManagerOptions = [
    { key: 'any', label: 'Any' },
    // Add more account manager options as needed
  ];

  const partnerOptions = [
    { key: 'codPowerGroup', label: 'COD Power Group' },
    // Add more partner options as needed
  ];

  return (
    <div className="flex-1 p-4 overflow-x-hidden">
      <div className="max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Billing */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-500">
              Billing
            </label>
            <Select
              selectedKeys={formData.billing ? [formData.billing] : []}
              onSelectionChange={(selected) => handleSelectChange('billing', selected)}
              placeholder="Select Billing"
              classNames={{
                trigger:
                  'w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-left',
                value: 'text-sm text-gray-700 dark:text-gray-300',
                popover: 'bg-white dark:bg-gray-800',
              }}
            >
              {billingOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Account Manager */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-500">
              Account Manager
            </label>
            <Select
              selectedKeys={formData.accountManager ? [formData.accountManager] : []}
              onSelectionChange={(selected) => handleSelectChange('accountManager', selected)}
              placeholder="Select Account Manager"
              classNames={{
                trigger:
                  'w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-left',
                value: 'text-sm text-gray-700 dark:text-gray-300',
                popover: 'bg-white dark:bg-gray-800',
              }}
            >
              {accountManagerOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Partner */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-500">
              Partner
            </label>
            <Select
              selectedKeys={formData.partner ? [formData.partner] : []}
              onSelectionChange={(selected) => handleSelectChange('partner', selected)}
              placeholder="Select Partner"
              classNames={{
                trigger:
                  'w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-left',
                value: 'text-sm text-gray-700 dark:text-gray-300',
                popover: 'bg-white dark:bg-gray-800',
              }}
            >
              {partnerOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-center mt-8 md:mt-36">
          <Button
            className="rounded-full font-bold px-16 py-2"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
            onClick={() => {
              // Handle Add action here
              console.log('Options Added:', formData);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Options;
