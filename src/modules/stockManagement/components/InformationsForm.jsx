// InformationsForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Upload04Icon } from 'hugeicons-react'; // Import the upload icon
// Import Select and SelectItem from your UI library
// Replace the import path with the actual path based on your project setup
import { Select, SelectItem } from '@nextui-org/react'; // Adjust the import based on your Select component library

const InformationsForm = ({ isDarkMode }) => {
  // State for each input field
  const [productName, setProductName] = useState('');
  const [isProductNameFocused, setIsProductNameFocused] = useState(false);

  const [arabicName, setArabicName] = useState('');
  const [isArabicNameFocused, setIsArabicNameFocused] = useState(false);

  const [sku, setSku] = useState('');
  const [isSkuFocused, setIsSkuFocused] = useState(false);

  const [hsCode, setHsCode] = useState('');
  const [isHsCodeFocused, setIsHsCodeFocused] = useState(false);

  const [hsCode2, setHsCode2] = useState('');
  const [isHsCode2Focused, setIsHsCode2Focused] = useState(false);

  // State for dropdowns
  const [selectedProductType, setSelectedProductType] = useState('');
  // Removed custom open state since Select component manages its own state

  const [selectedCategory, setSelectedCategory] = useState('');
  // Removed custom open state since Select component manages its own state

  // State for new input fields
  const [productLink, setProductLink] = useState('');
  const [isProductLinkFocused, setIsProductLinkFocused] = useState(false);

  const [productVideo, setProductVideo] = useState('');
  const [isProductVideoFocused, setIsProductVideoFocused] = useState(false);

  const productTypeDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  const [shippingBy, setShippingBy] = useState('');
  const [isShippingByFocused, setIsShippingByFocused] = useState(false);

  const [weight, setWeight] = useState('');
  const [isWeightFocused, setIsWeightFocused] = useState(false);

  const [width, setWidth] = useState('');
  const [isWidthFocused, setIsWidthFocused] = useState(false);

  const [height, setHeight] = useState('');
  const [isHeightFocused, setIsHeightFocused] = useState(false);

  const [length, setLength] = useState('');
  const [isLengthFocused, setIsLengthFocused] = useState(false);

  // State for toggles
  const [isTestingProduct, setIsTestingProduct] = useState(false);
  const [isChatBotEnabled, setIsChatBotEnabled] = useState(false);

  // New state variables for the new inputs
  const [notesForCallCenter, setNotesForCallCenter] = useState('');
  const [isNotesFocused, setIsNotesFocused] = useState(false);

  const [productImage, setProductImage] = useState(null);
  const [productImageName, setProductImageName] = useState('');
  const [isProductImageFocused, setIsProductImageFocused] = useState(false);

  // Helper function to determine if a field is filled
  const isFilled = (value) => value && value.toString().trim() !== '';

  // Close dropdowns when clicking outside (No longer needed if Select manages its own state)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If using a Select component that manages its own open state, you might not need this
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle file input change
  const handleProductImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
      setProductImageName(e.target.files[0].name);
    } else {
      setProductImage(null);
      setProductImageName('');
    }
  };

  return (
    <form className="space-y-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-2xl">
      {/* Container to center all form elements */}
      <div className="flex flex-col space-y-6">
        {/* Row 1: Product Name and Arabic Name */}
        <div className="flex flex-col sm:flex-row sm:space-x-6 w-full">
          {/* Product Name Field */}
          <div className="relative flex-1">
            {/* Static Label */}
            <label
              htmlFor="productName"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isProductNameFocused || isFilled(productName)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              Product Name
            </label>

            {/* Input Field */}
            <input
              type="text"
              id="productName"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              onFocus={() => setIsProductNameFocused(true)}
              onBlur={() => setIsProductNameFocused(isFilled(productName))}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />

            {/* Custom Line */}
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled(productName)
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>

          {/* Arabic Name Field */}
          <div className="relative flex-1 mt-6 sm:mt-0">
            {/* Static Label */}
            <label
              htmlFor="arabicName"
              className={`absolute  top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isArabicNameFocused || isFilled(arabicName)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              Arabic Name
            </label>

            {/* Input Field */}
            <input
              type="text"
              id="arabicName"
              name="arabicName"
              value={arabicName}
              onChange={(e) => setArabicName(e.target.value)}
              onFocus={() => setIsArabicNameFocused(true)}
              onBlur={() => setIsArabicNameFocused(isFilled(arabicName))}
              className={`block w-full  pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />

            {/* Custom Line */}
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled(arabicName)
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>
        </div>

        {/* Row 2: SKU and HS Code */}
        <div className="flex flex-col sm:flex-row sm:space-x-6 w-full">
          {/* SKU Field */}
          <div className="relative flex-1">
            {/* Static Label */}
            <label
              htmlFor="sku"
              className={`absolute  top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isSkuFocused || isFilled(sku)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              SKU
            </label>

            {/* Input Field */}
            <input
              type="text"
              id="sku"
              name="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              onFocus={() => setIsSkuFocused(true)}
              onBlur={() => setIsSkuFocused(isFilled(sku))}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />

            {/* Custom Line */}
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled(sku)
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>

          {/* HS Code Field */}
          <div className="relative flex-1 mt-6 sm:mt-0">
            {/* Static Label */}
            <label
              htmlFor="hsCode"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isHsCodeFocused || isFilled(hsCode)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              HS Code
            </label>

            {/* Input Field */}
            <input
              type="text"
              id="hsCode"
              name="hsCode"
              value={hsCode}
              onChange={(e) => setHsCode(e.target.value)}
              onFocus={() => setIsHsCodeFocused(true)}
              onBlur={() => setIsHsCodeFocused(isFilled(hsCode))}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />

            {/* Custom Line */}
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled(hsCode)
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>
        </div>

        {/* Row 3: Dropdown - Select Product Type */}
        <div className="flex flex-col w-full">
          {/* Dropdown Container */}
          <div className="relative flex-1">
            {/* Static Label */}
            <label
              htmlFor="productType"
              className={`block text-sm text-gray-500 ${
                isFilled(selectedProductType) ? 'text-gray-700' : ''
              }`}
            >
              Select Product Type
            </label>

            {/* Select Component */}
            <Select
              id="productType"
              name="productType"
              value={selectedProductType}
              onValueChange={(value) => setSelectedProductType(value)}
              placeholder='Select a product type'

              classNames={{
                trigger:
                  'w-full bg-transparent  border-b border-gray-300 dark:border-[#ffffff60] rounded-none text-sm ' +
                  (isDarkMode ? 'text-white' : 'text-black'),
                content:
                  'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600  shadow-lg',
                item:
                  'px-4 py-2 text-sm cursor-pointer hover:text-[#0258E8] ' +
                  (isDarkMode ? 'text-gray-100' : 'text-gray-900'),
              }}
            >
              <SelectItem value="" disabled>
                Select Product Type
              </SelectItem>
              <SelectItem value="Sensitive product">Sensitive product</SelectItem>
              <SelectItem value="Product One">Product One</SelectItem>
              <SelectItem value="Product with Battery">Product with Battery</SelectItem>
              <SelectItem value="Pure battery">Pure battery</SelectItem>
              <SelectItem value="Power bank">Power bank</SelectItem>
            </Select>
          </div>
        </div>

        {/* Row 4: Dropdown - Select Category */}
        <div className="flex flex-col w-full">
          {/* Dropdown Container */}
          <div className="relative flex-1">
            {/* Static Label */}
            <label
              htmlFor="category"
              className={`block mb-1 text-sm text-gray-500 ${
                isFilled(selectedCategory) ? 'text-gray-700' : ''
              }`}
            >
              Select Category
            </label>

            {/* Select Component */}
            <Select
              id="category"
              name="category"
              value={selectedCategory}
             placeholder='Select a category'
              onValueChange={(value) => setSelectedCategory(value)}
              classNames={{
                trigger:
                  'w-full bg-transparent  border-b border-gray-300 rounded-none dark:border-[#ffffff60] text-sm ' +
                  (isDarkMode ? 'text-white' : 'text-black'),
                content:
                  'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600',
                item:
                  'px-4 py-2 text-sm cursor-pointer hover:text-[#0258E8] ' +
                  (isDarkMode ? 'text-gray-100' : 'text-gray-900'),
              }}
            >

              <SelectItem value="Category One">Category One</SelectItem>
              <SelectItem value="Category Two">Category Two</SelectItem>
              <SelectItem value="Category Three">Category Three</SelectItem>
              {/* Add more categories as needed */}
            </Select>
          </div>
        </div>

        {/* Row 5: Product Link */}
        <div className="flex flex-col w-full">
          <div className="relative flex-1">
            {/* Static Label */}
            <label
              htmlFor="productLink"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isProductLinkFocused || isFilled(productLink)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              Product Link
            </label>

            {/* Input Field */}
            <input
              type="text"
              id="productLink"
              name="productLink"
              value={productLink}
              onChange={(e) => setProductLink(e.target.value)}
              onFocus={() => setIsProductLinkFocused(true)}
              onBlur={() => setIsProductLinkFocused(isFilled(productLink))}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />

            {/* Custom Line */}
            <div
              className={`absolute  bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled(productLink)
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>
        </div>

        {/* Row 6: Product Video */}
        <div className="flex flex-col w-full">
          <div className="relative flex-1">
            {/* Static Label */}
            <label
              htmlFor="productVideo"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isProductVideoFocused || isFilled(productVideo)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              Product Video
            </label>

            {/* Input Field */}
            <input
              type="text"
              id="productVideo"
              name="productVideo"
              value={productVideo}
              onChange={(e) => setProductVideo(e.target.value)}
              onFocus={() => setIsProductVideoFocused(true)}
              onBlur={() => setIsProductVideoFocused(isFilled(productVideo))}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />

            {/* Custom Line */}
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled(productVideo)
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>
        </div>

        {/* Row 7: Shipping By and HS Code */}
        <div className="flex flex-col sm:flex-row sm:space-x-6 w-full">
          {/* Shipping By Field */}
          <div className="relative flex-1">
            <label
              htmlFor="shippingBy"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isShippingByFocused || isFilled(shippingBy)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              Shipping By
            </label>
            <input
              type="text"
              id="shippingBy"
              value={shippingBy}
              onChange={(e) => setShippingBy(e.target.value)}
              onFocus={() => setIsShippingByFocused(true)}
              onBlur={() => setIsShippingByFocused(isFilled(shippingBy))}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled(shippingBy)
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>

          {/* HS Code Field */}
          <div className="relative flex-1 mt-6 sm:mt-0">
            <label
              htmlFor="hsCode2"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isHsCode2Focused || isFilled(hsCode2)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              HS Code
            </label>
            <input
              type="text"
              id="hsCode2"
              name="hsCode2"
              value={hsCode2}
              onChange={(e) => setHsCode2(e.target.value)}
              onFocus={() => setIsHsCode2Focused(true)}
              onBlur={() => setIsHsCode2Focused(isFilled(hsCode2))}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled(hsCode2)
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>
        </div>

        {/* Row 8: Weight (Kg) and Width (Cm) */}
        <div className="flex flex-col sm:flex-row sm:space-x-6 w-full">
          {/* Weight (Kg) Field */}
          <div className="relative flex-1">
            <label
              htmlFor="weight"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isWeightFocused || isFilled(weight)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              Weight (Kg)
            </label>
            <input
              type="text"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onFocus={() => setIsWeightFocused(true)}
              onBlur={() => setIsWeightFocused(isFilled(weight))}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled(weight)
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>

          {/* Width (Cm) Field */}
          <div className="relative flex-1 mt-6 sm:mt-0">
            <label
              htmlFor="width"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isWidthFocused || isFilled(width)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              Width (Cm)
            </label>
            <input
              type="text"
              id="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              onFocus={() => setIsWidthFocused(true)}
              onBlur={() => setIsWidthFocused(isFilled(width))}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled(width)
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>
        </div>

        {/* Row 9: Height (Cm) and Length (Cm) */}
        <div className="flex flex-col sm:flex-row sm:space-x-6 w-full">
          {/* Height (Cm) Field */}
          <div className="relative flex-1">
            <label
              htmlFor="height"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isHeightFocused || isFilled(height)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              Height (Cm)
            </label>
            <input
              type="text"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              onFocus={() => setIsHeightFocused(true)}
              onBlur={() => setIsHeightFocused(isFilled(height))}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled(height)
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>

          {/* Length (Cm) Field */}
          <div className="relative flex-1 mt-6 sm:mt-0">
            <label
              htmlFor="length"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isLengthFocused || isFilled(length)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              Length (Cm)
            </label>
            <input
              type="text"
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              onFocus={() => setIsLengthFocused(true)}
              onBlur={() => setIsLengthFocused(isFilled(length))}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled(length)
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>
        </div>

        {/* Row 10: Toggle - Is the product for testing */}
        <div className="flex items-center justify-between w-full">
          <label
            className={`text-sm ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            Is the product for testing?
          </label>
          <label className="relative inline-flex items-center cursor-pointer ml-auto">
            <input
              type="checkbox"
              checked={isTestingProduct}
              onChange={() => setIsTestingProduct(!isTestingProduct)}
              className="sr-only peer"
            />
            <div
              className={`w-11 h-6 rounded-full peer-focus:outline-none transition-colors duration-300 ${
                isTestingProduct
                  ? 'bg-blue-600'
                  : isDarkMode
                  ? 'bg-[#D9D9D950]'
                  : 'bg-gray-300'
              }`}
            ></div>
            <span
              className={`absolute left-1 top-1 h-4 w-4 bg-white rounded-full transition-transform ${
                isTestingProduct ? 'transform translate-x-5' : ''
              }`}
            ></span>
          </label>
        </div>

        {/* Row 11: Toggle - Enable ChatBot */}
        <div className="flex items-center justify-between w-full">
          <label
            className={`text-sm ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            Enable ChatBot
          </label>
          <label className="relative inline-flex items-center cursor-pointer ml-auto">
            <input
              type="checkbox"
              checked={isChatBotEnabled}
              onChange={() => setIsChatBotEnabled(!isChatBotEnabled)}
              className="sr-only peer"
            />
            <div
              className={`w-11 h-6 rounded-full peer-focus:outline-none transition-colors duration-300 ${
                isChatBotEnabled
                  ? 'bg-blue-600'
                  : isDarkMode
                  ? 'bg-[#D9D9D950]'
                  : 'bg-gray-300'
              }`}
            ></div>
            <span
              className={`absolute left-1 top-1 h-4 w-4 bg-white rounded-full transition-transform ${
                isChatBotEnabled ? 'transform translate-x-5' : ''
              }`}
            ></span>
          </label>
        </div>

        {/* Row 12: Notes for Call Center */}
        <div className="flex flex-col w-full">
          <div className="relative flex-1">
            {/* Static Label */}
            <label
              htmlFor="notesForCallCenter"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isNotesFocused || isFilled(notesForCallCenter)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              Notes for Call Center
            </label>

            {/* Input Field */}
            <input
              type="text"
              id="notesForCallCenter"
              name="notesForCallCenter"
              value={notesForCallCenter}
              onChange={(e) => setNotesForCallCenter(e.target.value)}
              onFocus={() => setIsNotesFocused(true)}
              onBlur={() => setIsNotesFocused(isFilled(notesForCallCenter))}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />

            {/* Custom Line */}
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled(notesForCallCenter)
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>
        </div>

        {/* Row 13: Select Product's Image */}
        <div className="flex flex-col w-full">
          <div className="relative flex-1">
            {/* Static Label */}
            <label
              htmlFor="productImage"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isProductImageFocused || productImage
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              Select Product's Image
            </label>

            {/* File Input Field */}
            <div
              className={`flex items-center pt-6 pb-2 cursor-pointer ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              onClick={() => document.getElementById('productImage').click()}
            >
              <Upload04Icon className="ml-auto text-gray-500 dark:text-gray-500 " />
              <span>
                {productImageName ? productImageName : ''}
              </span>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              id="productImage"
              accept="image/*"
              onChange={handleProductImageChange}
              style={{ display: 'none' }}
              onFocus={() => setIsProductImageFocused(true)}
              onBlur={() => setIsProductImageFocused(!!productImage)}
            />

            {/* Custom Line */}
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                productImage
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InformationsForm;
