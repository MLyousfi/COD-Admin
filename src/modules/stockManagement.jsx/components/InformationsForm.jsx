// InformationsForm.jsx
import React, { useState, useEffect, useRef } from 'react';

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
  const [isProductTypeOpen, setIsProductTypeOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

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

  // Helper function to determine if a field is filled
  const isFilled = (value) => value.trim() !== '';

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        productTypeDropdownRef.current &&
        !productTypeDropdownRef.current.contains(event.target)
      ) {
        setIsProductTypeOpen(false);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
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
              className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />

            {/* Custom Line */}
            <div
              className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
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
              className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
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
              className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />

            {/* Custom Line */}
            <div
              className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
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
              className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
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
              className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />

            {/* Custom Line */}
            <div
              className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
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
              className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
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
              className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />

            {/* Custom Line */}
            <div
              className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
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
          <div className="relative flex-1" ref={productTypeDropdownRef}>
            {/* Static Label */}
            <label
              htmlFor="productType"
              className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isProductTypeOpen || isFilled(selectedProductType)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              Select Product Type
            </label>

            {/* Dropdown Selector */}
            <div
              className={`block w-full pt-6 pb-2 text-sm bg-transparent border-b-2 focus:outline-none transition-colors duration-300 cursor-pointer flex justify-between items-center ${
                isFilled(selectedProductType)
                  ? 'border-[#0258E8]'
                  : isDarkMode
                  ? 'border-gray-600'
                  : 'border-gray-300'
              }`}
              onClick={() => setIsProductTypeOpen(!isProductTypeOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsProductTypeOpen(!isProductTypeOpen);
                } else if (e.key === 'Escape') {
                  setIsProductTypeOpen(false);
                }
              }}
              role="button"
              aria-haspopup="listbox"
              aria-expanded={isProductTypeOpen}
              tabIndex={0}
            >
              <span
                className={
                  selectedProductType
                    ? 'text-black dark:text-white'
                    : 'text-gray-500'
                }
              >
                {selectedProductType || ''}
              </span>
              {/* Arrow Icon */}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  isProductTypeOpen ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown Options */}
            {isProductTypeOpen && (
              <ul
                className={`mt-2 w-full px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto`}
                role="listbox"
                aria-labelledby="productType"
              >
                <li
                  className={`px-4 py-2 text-sm ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  } hover:text-[#0258E8] cursor-pointer`}
                  onClick={() => {
                    setSelectedProductType('Sensitive product');
                    setIsProductTypeOpen(false);
                  }}
                  role="option"
                  aria-selected={selectedProductType === 'Sensitive product'}
                >
                  Sensitive product
                </li>
                <li
                  className={`px-4 py-2 text-sm ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  } hover:text-[#0258E8] cursor-pointer`}
                  onClick={() => {
                    setSelectedProductType('Product One');
                    setIsProductTypeOpen(false);
                  }}
                  role="option"
                  aria-selected={selectedProductType === 'Product One'}
                >
                  Product One
                </li>
                <li
                  className={`px-4 py-2 text-sm ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  } hover:text-[#0258E8] cursor-pointer`}
                  onClick={() => {
                    setSelectedProductType('Product with Battery');
                    setIsProductTypeOpen(false);
                  }}
                  role="option"
                  aria-selected={selectedProductType === 'Product with Battery'}
                >
                  Product with Battery
                </li>
                <li
                  className={`px-4 py-2 text-sm ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  } hover:text-[#0258E8] cursor-pointer`}
                  onClick={() => {
                    setSelectedProductType('Pure battery');
                    setIsProductTypeOpen(false);
                  }}
                  role="option"
                  aria-selected={selectedProductType === 'Pure battery'}
                >
                  Pure battery
                </li>
                <li
                  className={`px-4 py-2 text-sm ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  } hover:text-[#0258E8] cursor-pointer`}
                  onClick={() => {
                    setSelectedProductType('Power bank');
                    setIsProductTypeOpen(false);
                  }}
                  role="option"
                  aria-selected={selectedProductType === 'Power bank'}
                >
                  Power bank
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Row 4: Dropdown - Select Category */}
        <div className="flex flex-col w-full">
          {/* Dropdown Container */}
          <div className="relative flex-1" ref={categoryDropdownRef}>
            {/* Static Label */}
            <label
              htmlFor="category"
              className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                isCategoryOpen || isFilled(selectedCategory)
                  ? 'transform -translate-y-4 scale-90'
                  : ''
              }`}
            >
              Select Category
            </label>

            {/* Dropdown Selector */}
            <div
              className={`block w-full pt-6 pb-2 text-sm bg-transparent border-b-2 focus:outline-none transition-colors duration-300 cursor-pointer flex justify-between items-center ${
                isFilled(selectedCategory)
                  ? 'border-[#0258E8]'
                  : isDarkMode
                  ? 'border-gray-600'
                  : 'border-gray-300'
              }`}
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsCategoryOpen(!isCategoryOpen);
                } else if (e.key === 'Escape') {
                  setIsCategoryOpen(false);
                }
              }}
              role="button"
              aria-haspopup="listbox"
              aria-expanded={isCategoryOpen}
              tabIndex={0}
            >
              <span
                className={
                  selectedCategory
                    ? 'text-black dark:text-white'
                    : 'text-gray-500'
                }
              >
                {selectedCategory || ''}
              </span>
              {/* Arrow Icon */}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  isCategoryOpen ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown Options */}
            {isCategoryOpen && (
              <ul
                className={`mt-2 w-full px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto`}
                role="listbox"
                aria-labelledby="category"
              >
                <li
                  className={`px-4 py-2 text-sm hover:text-[#0258E8] cursor-pointer ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}
                  onClick={() => {
                    setSelectedCategory('Category One');
                    setIsCategoryOpen(false);
                  }}
                  role="option"
                  aria-selected={selectedCategory === 'Category One'}
                >
                  Category One
                </li>
                <li
                  className={`px-4 py-2 text-sm hover:text-[#0258E8] cursor-pointer ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}
                  onClick={() => {
                    setSelectedCategory('Category Two');
                    setIsCategoryOpen(false);
                  }}
                  role="option"
                  aria-selected={selectedCategory === 'Category Two'}
                >
                  Category Two
                </li>
                <li
                  className={`px-4 py-2 text-sm hover:text-[#0258E8] cursor-pointer ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}
                  onClick={() => {
                    setSelectedCategory('Category Three');
                    setIsCategoryOpen(false);
                  }}
                  role="option"
                  aria-selected={selectedCategory === 'Category Three'}
                >
                  Category Three
                </li>
                {/* Add more categories as needed */}
              </ul>
            )}
          </div>
        </div>

        {/* Row 5: Product Link */}
        <div className="flex flex-col w-full">
          <div className="relative flex-1">
            {/* Static Label */}
            <label
              htmlFor="productLink"
              className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
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
              className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />

            {/* Custom Line */}
            <div
              className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
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
              className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
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
              className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />

            {/* Custom Line */}
            <div
              className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
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
              className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
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
              className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />
            <div
              className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
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
              className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
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
              className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />
            <div
              className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
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
              className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
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
              className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />
            <div
              className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
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
              className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
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
              className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />
            <div
              className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
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
              className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
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
              className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />
            <div
              className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
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
              className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
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
              className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />
            <div
              className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
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
          <label className={`text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Is the product for testing
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
          <label className={`text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
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
      </div>
    </form>
  );
};

export default InformationsForm;
