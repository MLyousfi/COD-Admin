// NewPixelForm.jsx

import React, { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/select';
import { Button } from '@nextui-org/button';

const NewPixelForm = ({ sellers, onSubmit, isDarkMode, onCancel }) => {
  const [formData, setFormData] = useState({
    seller: '',
    name: '',
    pixelId: '',
    token: '',
  });

  const handleSelectChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation if necessary
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Information Section */}
      <div className="space-y-4">
        {/* First Row: Select Input */}
        <div className="w-full mt-8">
          <label className="block mb-2 text-[16px] text-[#00000050] dark:text-[#FFFFFF30]">
            Informations
          </label>
          <Select
            selectedKeys={formData.seller ? [formData.seller] : []}
            onSelectionChange={(keys) => handleSelectChange('seller', keys[0])}
            placeholder="List of Sellers"
            classNames={{
              trigger: 'w-full bg-transparent border border-gray-300 dark:border-[#ffffff30]',
              content: 'bg-transparent border border-gray-300 dark:border-gray-600',
            }}
            isClearable
            required
          >
            {sellers.map((seller) => (
              <SelectItem key={seller.key}>{seller.label}</SelectItem>
            ))}
          </Select>
        </div>

        {/* Second Row: Simple Input */}
        <div className="w-full">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 dark:border-[#ffffff30] rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none"
            required
          />
        </div>

        {/* Third Row: Simple Input with Pixel ID Placeholder */}
        <div className="w-full">
          <input
            type="text"
            name="pixelId"
            value={formData.pixelId}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 dark:border-[#ffffff30] rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none"
            placeholder="Pixel ID"
            required
          />
        </div>

        {/* Fourth Row: Simple Input named Token* with Token as Placeholder */}
        <div className="w-full">
          <label className="block mb-2 text-[16px] text-[#00000050] dark:text-[#FFFFFF30]">
            Token*
          </label>
          <input
            type="text"
            name="token"
            value={formData.token}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 dark:border-[#ffffff30] rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none"
            placeholder="Token"
            required
          />
        </div>
      </div>

      {/* Buttons at the Bottom */}
      <div
  style={{ marginTop: '60px' }} 
  className="w-full flex justify-center space-x-2 mt-6"
>
        <Button type="submit" color="primary" className="rounded-full px-8">
          Create Pixel
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          color="primary"
          className="rounded-full px-11 bg-transparent border border-black dark:border-white text-black dark:text-white"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NewPixelForm;
