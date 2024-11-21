// NewSalesChannelForm.jsx

import React, { useState, useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/select';
import { Upload05Icon } from 'hugeicons-react';
import { Button } from '@nextui-org/button';

const NewSalesChannelForm = ({
  sellers,
  onSubmit,
  isDarkMode,
  onCancel,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    seller: initialData?.source || '',
    information: initialData?.name || '',
    excelFile: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        seller: initialData.source || '',
        information: initialData.name || '',
        excelFile: null,
      });
    }
  }, [initialData]);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      excelFile: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation if necessary
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* First Row: Select Input */}
      <div className="w-full mt-8">
        <label className="block mb-2 text-sm text-[#00000050] dark:text-[#FFFFFF30]">
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
          name="information"
          value={formData.information}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 dark:border-[#ffffff30] rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none"
          placeholder="Amount"
          required
        />
      </div>

      {/* Third Row: Upload Excel File */}
      <div className="w-full">
        <label htmlFor="excelFile" className="block mb-1">
          <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Upload Excel File*</span>
        </label>
        <div
          className={`flex items-center border border-gray-300 dark:border-[#ffffff30] rounded-lg px-3 py-2 mt-1 ${
            isDarkMode ? 'bg-transparent' : 'bg-transparent'
          }`}
        >
          <input
            type="file"
            id="excelFile"
            name="excelFile"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileChange}
            className="hidden"
            required={!initialData} // Required if adding new; optional if editing
          />
          <label
            htmlFor="excelFile"
            className="flex-1 cursor-pointer text-gray-500 dark:text-gray-400"
          >
            {formData.excelFile ? formData.excelFile.name : 'Select or Browse Excel file'}
          </label>
          <Upload05Icon size={23} className="dark:text-gray-700 text-gray-500 mr-2" />
          <span className="dark:text-info text-info cursor-pointer">Upload File</span>
        </div>
      </div>

     {/* Submit Buttons */}
     <div
  style={{ marginTop: '80px' }} 
  className="w-full flex justify-center space-x-2 mt-6"
>
        <Button type="submit" color="primary" className="rounded-full px-14">
          Save
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

export default NewSalesChannelForm;
