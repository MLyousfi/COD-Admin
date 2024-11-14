// ViewModal.jsx
import React, { useState } from 'react';
import { Button, Switch, Select, SelectItem } from "@nextui-org/react"; // Adjust imports based on your UI library
import { InformationCircleIcon, Upload02Icon } from "hugeicons-react"; // Ensure these icons exist

const ViewModal = ({ product, isDarkMode }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    defaultName: product.product || '',
    arabicName: product.arabicName || '',
    sku: product.sku || '',
    productType: product.type || '',
    category: product.category || '',
    hsCode: '',
    productLink: '',
    productVideo: '',
    shippingType: '',
    shippingBy: '',
    salePrice: '',
    declaredValue: '',
    weight: '',
    width: '',
    height: '',
    length: '',
    isTesting: false,
    enableChatbot: false,
    notes: '',
    productImage: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);

  };
  return (
    <div className="p-4">
      {/* Informations Button */}
      <div className="flex justify-left mb-6">
        <Button
          size="lg"
          className="space-x-0 text-black font-bold dark:text-white"
          style={{ border: 'none', backgroundColor: 'transparent' }}
        >
          <InformationCircleIcon size={20} />
          <span>Informations</span>
        </Button>
      </div>

      {/* Form Inputs */}
      <form className="space-y-6">
        {/* Row 1: Default Name, Arabic Name, SKU */}
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="w-full lg:w-1/3">
            <label htmlFor="defaultName" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Default Name</span>
            </label>
            <input
              type="text"
              id="defaultName"
              name="defaultName"
              value={formData.defaultName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#ffffff10] rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 text-sm"
              
            />
          </div>

          <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
            <label htmlFor="arabicName" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Arabic Name</span>
            </label>
            <input
              type="text"
              id="arabicName"
              name="arabicName"
              value={formData.arabicName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#ffffff10] rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 text-sm"
              
            />
          </div>

          <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
            <label htmlFor="sku" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">SKU</span>
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#ffffff10] rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 text-sm"
              
            />
          </div>
        </div>

        {/* Row 2: Product Type, Category, HS Code */}
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="w-full lg:w-1/3">
            <label htmlFor="productType" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Product Type</span>
            </label>
            <input
              type="text"
              id="productType"
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#ffffff10] rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 text-sm"
              
            />
          </div>

          <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
            <label htmlFor="category" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Category</span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#ffffff10] rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 text-sm"
              
            />
          </div>

          <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
            <label htmlFor="hsCode" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">HS Code</span>
            </label>
            <input
              type="text"
              id="hsCode"
              name="hsCode"
              value={formData.hsCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#ffffff10] rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 text-sm"
              
            />
          </div>
        </div>

        {/* Row 3: Product Link, Product Video, Shipping Type */}
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="w-full lg:w-1/3">
            <label htmlFor="productLink" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Product Link</span>
            </label>
            <Select
              id="productLink"
              name="productLink"
              value={formData.productLink}
              onChange={(value) => setFormData(prev => ({ ...prev, productLink: value }))}
              placeholder="Select a product link"
              classNames={{
                trigger: 'bg-transparent focus:border-blue-500 border border-gray-300 dark:border-[#ffffff10] rounded-lg ',
              }}
              
            >
              <SelectItem key="link1">Link 1</SelectItem>
              <SelectItem key="link2">Link 2</SelectItem>
              {/* Add more options as needed */}
            </Select>
          </div>

          <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
            <label htmlFor="productVideo" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Product Video</span>
            </label>
            <Select
              id="productVideo"
              name="productVideo"
              value={formData.productVideo}
              onChange={(value) => setFormData(prev => ({ ...prev, productVideo: value }))}
              placeholder="Select a product video"
              classNames={{
                trigger: 'bg-transparent focus:border-blue-500 border border-gray-300 dark:border-[#ffffff10] rounded-lg',
              }}
              
            >
              <SelectItem key="video1">Video 1</SelectItem>
              <SelectItem key="video2">Video 2</SelectItem>
              {/* Add more options as needed */}
            </Select>
          </div>

          <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
            <label htmlFor="shippingType" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Shipping Type</span>
            </label>
            <Select
              id="shippingType"
              name="shippingType"
              value={formData.shippingType}
              onChange={(value) => setFormData(prev => ({ ...prev, shippingType: value }))}
              placeholder="Select a shipping type"
              classNames={{
                trigger: 'bg-transparent focus:border-blue-500 border border-gray-300 dark:border-[#ffffff10] rounded-lg',
              }}
              
            >
              <SelectItem key="type1">Type 1</SelectItem>
              <SelectItem key="type2">Type 2</SelectItem>
              {/* Add more options as needed */}
            </Select>
          </div>
        </div>

        {/* Row 4: Shipping By, Sale Price (USD), Declared Value (USD) */}
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="w-full lg:w-1/3">
            <label htmlFor="shippingBy" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Shipping By</span>
            </label>
            <Select
              id="shippingBy"
              name="shippingBy"
              value={formData.shippingBy}
              onChange={(value) => setFormData(prev => ({ ...prev, shippingBy: value }))}
              placeholder="Select shipping method"
              classNames={{
                trigger: 'bg-transparent focus:border-blue-500 border border-gray-300 dark:border-[#ffffff10] rounded-lg',
              }}
              
            >
              <SelectItem key="ship1">Ship 1</SelectItem>
              <SelectItem key="ship2">Ship 2</SelectItem>
              {/* Add more options as needed */}
            </Select>
          </div>

          <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
            <label htmlFor="salePrice" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Sale Price (USD)</span>
            </label>
            <Select
              id="salePrice"
              name="salePrice"
              value={formData.salePrice}
              onChange={(value) => setFormData(prev => ({ ...prev, salePrice: value }))}
              placeholder="Select a sale price"
              classNames={{
                trigger: 'bg-transparent focus:border-blue-500 border border-gray-300 dark:border-[#ffffff10] rounded-lg',
              }}
              
            >
              <SelectItem key="price1">$10</SelectItem>
              <SelectItem key="price2">$20</SelectItem>
              {/* Add more options as needed */}
            </Select>
          </div>

          <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
            <label htmlFor="declaredValue" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Declared Value (USD)</span>
            </label>
            <Select
              id="declaredValue"
              name="declaredValue"
              value={formData.declaredValue}
              onChange={(value) => setFormData(prev => ({ ...prev, declaredValue: value }))}
              placeholder="Select a declared value"
              classNames={{
                trigger: 'bg-transparent focus:border-blue-500 border border-gray-300 dark:border-[#ffffff10] rounded-lg',
              }}
              
            >
              <SelectItem key="value1">$100</SelectItem>
              <SelectItem key="value2">$200</SelectItem>
              {/* Add more options as needed */}
            </Select>
          </div>
        </div>

        {/* Row 5: Weight (kg), Width (cm), Height (cm) */}
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="w-full lg:w-1/3">
            <label htmlFor="weight" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Weight (kg)</span>
            </label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#ffffff10] rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 text-sm"
              
            />
          </div>

          <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
            <label htmlFor="width" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Width (cm)</span>
            </label>
            <input
              type="text"
              id="width"
              name="width"
              value={formData.width}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#ffffff10] rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 text-sm"
              
            />
          </div>

          <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
            <label htmlFor="height" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Height (cm)</span>
            </label>
            <input
              type="text"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#ffffff10] rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 text-sm"
              
            />
          </div>
        </div>

        {/* Row 6: Length (cm) */}
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="w-full lg:w-1/3">
            <label htmlFor="length" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Length (cm)</span>
            </label>
            <input
              type="text"
              id="length"
              name="length"
              value={formData.length}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#ffffff10] rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 text-sm"
              
            />
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex flex-col space-y-4">
          {/* Toggle 1: Is this product for testing? */}
          <div className="flex items-center">
            <Switch
              id="isTesting"
              name="isTesting"
              checked={formData.isTesting}
              onChange={handleChange}
              color="primary"
              css={{
                '& .nextui-switch__thumb': {
                  backgroundColor: 'gray', // Sets the thumb color to gray
                },
                '& .nextui-switch__track': {
                  backgroundColor: isDarkMode ? '#4B5563' : '#D1D5DB', // Optional: Adjust track color based on theme
                },
              }}
            />
            <label htmlFor="isTesting" className="ml-2 text-sm text-gray-700 dark:text-white">
              Is this product for testing?
            </label>
          </div>

          {/* Toggle 2: Enable Chatbot */}
          <div className="flex items-center">
            <Switch
              id="enableChatbot"
              name="enableChatbot"
              checked={formData.enableChatbot}
              onChange={handleChange}
              color="primary"
              css={{
                '& .nextui-switch__thumb': {
                  backgroundColor: 'gray', // Sets the thumb color to gray
                },
                '& .nextui-switch__track': {
                  backgroundColor: isDarkMode ? '#4B5563' : '#D1D5DB', // Optional: Adjust track color based on theme
                },
              }}
            />
            <label htmlFor="enableChatbot" className="ml-2 text-sm text-gray-700 dark:text-white">
              Enable Chatbot
            </label>
          </div>
        </div>

        {/* Notes for Call Center */}
        <div className="flex flex-col">
          <label htmlFor="notes" className="block mb-1">
            <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Notes for Call Center</span>
          </label>
          <input
            type="text"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-[#ffffff10] rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            
          />
        </div>

      {/* Product's Image Input */}
<div className="flex flex-col">
  <label htmlFor="productImage" className="w-full lg:w-2/3 cursor-pointer">
    <div className="flex items-center px-3 py-2 border-b border-gray-300 dark:border-[#ffffff10] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500">
      <span className="text-sm text-gray-600 dark:text-[#FFFFFF30]">Select product's image</span>
      <Upload02Icon size={20} className="ml-auto text-gray-600" />
    </div>
    <input
      type="file"
      id="productImage"
      name="productImage"
      accept="image/*"
      onChange={handleChange}
      className="hidden"
      
    />
  </label>
</div>

        {/* Validate Button */}
        <div className="flex justify-center mt-8 space-x-3 ">
          <Button
            className="text-sm text-white bg-info rounded-full px-16 "
            size="md"
          >
            Validate
          </Button>
          <Button
            className="text-sm text-black dark:text-white border border-black dark:border-white bg-transparent rounded-full px-16"
            onClick={handleCloseModal}
            size="md"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ViewModal;
