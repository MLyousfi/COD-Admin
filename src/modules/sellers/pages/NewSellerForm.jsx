// NewSellerForm.jsx

import React, { useState } from 'react';
import { Button } from '@nextui-org/button';
import { ArrowDown01Icon,Upload02Icon } from 'hugeicons-react';

// Sample country options. You can expand this list as needed.
const countryOptions = [
  { code: 'US', flag: '🇺🇸' },
  { code: 'GB', flag: '🇬🇧' },
  { code: 'CA', flag: '🇨🇦' },
  { code: 'AU', flag: '🇦🇺' },
];

// Define color options with name and hex code
const colorOptions = [
  { name: 'Red', hex: '#FF0000' },
  { name: 'Green', hex: '#00FF00' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Orange', hex: '#FFA500' },
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
];

const NewSellerForm = ({ onSubmit, isDarkMode,onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    slogan: '',
    phoneNumber1: '',
    phoneCountryCode1: 'US', 
    email: '',
    website: '',
    tawkUrl: '',
    primaryColor: '', 
    secondaryColor: '',
  });

  const [focusState, setFocusState] = useState({
    name: false,
    type: false,
    slogan: false,
    phoneNumber1: false,
    email: false,
    website: false,
    tawkUrl: false,
    primaryColor: false, // New focus state
    secondaryColor: false, // New focus state
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };
  const handleFocus = (field) => {
    setFocusState((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocusState((prev) => ({ ...prev, [field]: false }));
  };

  const isFilled = (field) => formData[field].trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('New Seller Data:', formData);
    // Call the onSubmit prop if provided
    if (onSubmit) onSubmit(formData);
    // Optionally, reset the form
    setFormData({
      name: '',
      type: '',
      slogan: '',
      phoneNumber1: '',
      phoneCountryCode1: 'US',
      email: '',
      website: '',
      tawkUrl: '',
      primaryColor: '',
      secondaryColor: '',
    });
    setFocusState({
      name: false,
      type: false,
      slogan: false,
      phoneNumber1: false,
      email: false,
      website: false,
      tawkUrl: false,
      primaryColor: false,
      secondaryColor: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
    <div>
        <h2 className="text-lg font-semibold mb-4 mt-6">Informations</h2>
      {/* First Row: Name and Type */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0 mt-6">
        {/* Name Input */}
        <div className="relative flex-1">
          <label
            htmlFor="name"
            className={`absolute top-4 left-0 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.name || isFilled('name') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onFocus={() => handleFocus('name')}
            onBlur={() => handleBlur('name')}
            className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
              isDarkMode
                ? 'text-white border-gray-600 focus:border-[#0258E8]'
                : 'text-black border-gray-300 focus:border-[#0258E8]'
            }`}
            placeholder=""
            required
          />
          <div
            className={`absolute bottom-1 left-0 h-px w-full transition-colors duration-300 ${
              isFilled('name')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>

        {/* Type Select */}
        <div className="relative flex-1">
          <label
            htmlFor="type"
            className={`absolute top-4 left-0 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.type || isFilled('type') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            Type*
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            onFocus={() => handleFocus('type')}
            onBlur={() => handleBlur('type')}
            className={`block w-full pt-6 pb-2 text-sm bg-transparent  appearance-none focus:outline-none transition-colors duration-300 ${
              isDarkMode
                ? 'text-white border-gray-600 focus:border-[#0258E8]'
                : 'text-black border-gray-300 focus:border-[#0258E8]'
            }`}
            required
          >
            <option value="" disabled hidden></option>
            <option value="Type1">Type1</option>
            <option value="Type2">Type2</option>
            <option value="Type3">Type3</option>
            {/* Add more options as needed */}
          </select>
          <ArrowDown01Icon
            size={18}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 pointer-events-none ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          />
          <div
            className={`absolute bottom-1 left-0 h-px w-full transition-colors duration-300 ${
              isFilled('type')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>
      </div>

      {/* Second Row: Slogan and Phone Number */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0 mt-6">
        {/* Slogan Input */}
        <div className="relative flex-1">
          <label
            htmlFor="slogan"
            className={`absolute top-4 left-0 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.slogan || isFilled('slogan') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            Slogan
          </label>
          <input
            type="text"
            id="slogan"
            name="slogan"
            value={formData.slogan}
            onChange={handleInputChange}
            onFocus={() => handleFocus('slogan')}
            onBlur={() => handleBlur('slogan')}
            className={`block w-full pt-6 pb-2 text-sm bg-transparent  focus:outline-none transition-colors duration-300 ${
              isDarkMode
                ? 'text-white border-gray-600 focus:border-[#0258E8]'
                : 'text-black border-gray-300 focus:border-[#0258E8]'
            }`}
            placeholder=""
            required
          />
          <div
            className={`absolute bottom-1 left-0 h-px w-full transition-colors duration-300 ${
              isFilled('slogan')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>

        {/* Phone Number Input */}
        <div className="relative flex-1">
          <label
            htmlFor="phoneNumber1"
            className={`absolute top-2 left-0 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.phoneNumber1 || isFilled('phoneNumber1') ? 'transform -translate-y-2 scale-90' : ''
            }`}
          >
            Phone Number
          </label>
          <div
            className={`flex items-center pt-6 pb-2 bg-transparent  transition-colors duration-300 ${
              isFilled('phoneNumber1')
                ? 'border-[#0258E8]'
                : isDarkMode
                ? 'border-gray-600'
                : 'border-gray-300'
            }`}
          >
            {/* Country Code Selector with Flag */}
            <div className="flex items-center">
              {/* Flag Emoji */}
              <span className="text-xl mr-1">
                {countryOptions.find(
                  (option) => option.code === formData.phoneCountryCode1
                )?.flag || '🏳️'}
              </span>
              <select
                name="phoneCountryCode1"
                value={formData.phoneCountryCode1}
                onChange={handleInputChange}
                onFocus={() => handleFocus('phoneNumber1')}
                onBlur={() => handleBlur('phoneNumber1')}
                className={`bg-transparent focus:outline-none transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-black'
                } text-sm`}
              >
                {countryOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.code}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Phone Number Input */}
            <input
              type="text"
              id="phoneNumber1"
              name="phoneNumber1"
              value={formData.phoneNumber1}
              onChange={handleInputChange}
              onFocus={() => handleFocus('phoneNumber1')}
              onBlur={() => handleBlur('phoneNumber1')}
              className={`flex-1 bg-transparent focus:outline-none transition-colors ml-4 duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              } text-sm`}
              placeholder="Phone Number"
              required
            />
          </div>
          <div
            className={`absolute bottom-1 left-0 h-px w-full transition-colors duration-300 ${
              isFilled('phoneNumber1')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>
      </div>

      {/* Third Row: Email and Website */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0 mt-6">
        {/* Email Input */}
        <div className="relative flex-1">
          <label
            htmlFor="email"
            className={`absolute top-4 left-0 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.email || isFilled('email') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            className={`block w-full pt-6 pb-2 text-sm bg-transparent  focus:outline-none transition-colors duration-300 ${
              isDarkMode
                ? 'text-white border-gray-600 focus:border-[#0258E8]'
                : 'text-black border-gray-300 focus:border-[#0258E8]'
            }`}
            placeholder=""
            required
          />
          <div
            className={`absolute bottom-1 left-0 h-px w-full transition-colors duration-300 ${
              isFilled('email')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>

        {/* Website Input */}
        <div className="relative flex-1">
          <label
            htmlFor="website"
            className={`absolute top-4 left-0 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.website || isFilled('website') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            onFocus={() => handleFocus('website')}
            onBlur={() => handleBlur('website')}
            className={`block w-full pt-6 pb-2 text-sm bg-transparent  focus:outline-none transition-colors duration-300 ${
              isDarkMode
                ? 'text-white border-gray-600 focus:border-[#0258E8]'
                : 'text-black border-gray-300 focus:border-[#0258E8]'
            }`}
            placeholder=""
            required
          />
          <div
            className={`absolute bottom-1 left-0 h-px w-full transition-colors duration-300 ${
              isFilled('website')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>
      </div>

      {/* Fourth Row: Tawk.to URL */}
      <div className="flex flex-col mt-6">
        {/* Tawk.to URL Input */}
        <div className="relative flex-1 md:w-1/2 w-full">
          <label
            htmlFor="tawkUrl"
            className={`absolute top-4 left-0 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.tawkUrl || isFilled('tawkUrl') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            Tawk.to URL
          </label>
          <input
            type="url"
            id="tawkUrl"
            name="tawkUrl"
            value={formData.tawkUrl}
            onChange={handleInputChange}
            onFocus={() => handleFocus('tawkUrl')}
            onBlur={() => handleBlur('tawkUrl')}
            className={`block w-full  pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
              isDarkMode
                ? 'text-white border-gray-600 focus:border-[#0258E8]'
                : 'text-black border-gray-300 focus:border-[#0258E8]'
            }`}
            placeholder=""
            required
          />
          <div
            className={`absolute bottom-1 left-0 h-px w-full transition-colors duration-300 ${
              isFilled('tawkUrl')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>
      </div>

        {/* Fifth Row: Primary and Secondary Color */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0 mt-8">
        {/* Primary Color Select */}
        <div className="relative flex-1">
          <label
            htmlFor="primaryColor"
            className={`block text-sm ${
              isDarkMode ? 'text-gray-500' : 'text-gray-500'
            } mb-1`}
          >
            Primary Color
          </label>
          <div className="relative">
            <select
              id="primaryColor"
              name="primaryColor"
              value={formData.primaryColor}
              onChange={handleInputChange}
              onFocus={() => handleFocus('primaryColor')}
              onBlur={() => handleBlur('primaryColor')}
              className={`block w-full px-3 py-2 text-sm bg-transparent border rounded-lg appearance-none focus:outline-none transition-colors duration-300 pr-12 ${
                isDarkMode
                  ? 'text-white border-gray-600 focus:border-[#0258E8]'
                  : 'text-black border-gray-300 focus:border-[#0258E8]'
              }`}
              required
            >
              <option value="" disabled hidden>
                Select Primary Color
              </option>
              {colorOptions.map((color) => (
                <option key={color.hex} value={color.hex}>
                  {color.name}
                </option>
              ))}
            </select>
            {/* Color Square */}
            {formData.primaryColor && (
              <div
                className="absolute right-8 top-1/2 transform -translate-y-1/2 w-8 h-5 border rounded"
                style={{ backgroundColor: formData.primaryColor }}
              ></div>
            )}
            {/* Arrow Icon */}
            <ArrowDown01Icon
              size={18}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            />
          </div>
        </div>

        {/* Secondary Color Select */}
        <div className="relative flex-1">
          <label
            htmlFor="secondaryColor"
            className={`block text-sm  ${
              isDarkMode ? 'text-gray-500' : 'text-gray-500'
            } mb-1`}
          >
            Secondary Color
          </label>
          <div className="relative">
            <select
              id="secondaryColor"
              name="secondaryColor"
              value={formData.secondaryColor}
              onChange={handleInputChange}
              onFocus={() => handleFocus('secondaryColor')}
              onBlur={() => handleBlur('secondaryColor')}
              className={`block w-full px-3 py-2 text-sm bg-transparent border rounded-lg appearance-none focus:outline-none transition-colors duration-300 pr-12 ${
                isDarkMode
                  ? 'text-white border-gray-600 focus:border-[#0258E8]'
                  : 'text-black border-gray-300 focus:border-[#0258E8]'
              }`}
              required
            >
              <option value="" disabled hidden>
                Select Secondary Color
              </option>
              {colorOptions.map((color) => (
                <option key={color.hex} value={color.hex}>
                  {color.name}
                </option>
              ))}
            </select>
            {/* Color Square */}
            {formData.secondaryColor && (
              <div
                className="absolute right-8 top-1/2 transform -translate-y-1/2 w-8 h-5 border rounded"
                style={{ backgroundColor: formData.secondaryColor }}
              ></div>
            )}
            {/* Arrow Icon */}
            <ArrowDown01Icon
              size={18}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            />
          </div>
        </div>
      </div>
      </div>

 {/* Images Section */}
 <div>
        <h2 className="text-lg font-semibold mb-8 mt-10">Images</h2>
        {/* First Row: Logo and White Logo */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0 mb-6">
          {/* Logo Upload */}
          <div className="w-full">
            <label htmlFor="logo" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Logo</span>
            </label>
            <div
              className={`flex items-center border border-gray-300 dark:border-[#ffffff10] rounded-lg px-3 py-2 mt-1 ${
                isDarkMode ? "bg-transparent" : "bg-transparent"
              }`}
            >
              <input
                type="file"
                id="logo"
                name="logo"
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="logo"
                className="flex-1 cursor-pointer text-gray-500 dark:text-gray-400"
              >
                {formData.logo ? formData.logo.name : "Choose a logo"}
              </label>
              <Upload02Icon size={18} className="dark:text-gray-700 text-gray-500 mr-2" />
              <span className="dark:text-gray-700 text-gray-500 cursor-pointer">Browse</span>
            </div>
          </div>

          {/* White Logo Upload */}
          <div className="w-full">
            <label htmlFor="whiteLogo" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">White Logo</span>
            </label>
            <div
              className={`flex items-center border border-gray-300 dark:border-[#ffffff10] rounded-lg px-3 py-2 mt-1 ${
                isDarkMode ? "bg-transparent" : "bg-transparent"
              }`}
            >
              <input
                type="file"
                id="whiteLogo"
                name="whiteLogo"
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="whiteLogo"
                className="flex-1 cursor-pointer text-gray-500 dark:text-gray-400"
              >
                {formData.whiteLogo ? formData.whiteLogo.name : "Choose a logo"}
              </label>
              <Upload02Icon size={18} className="dark:text-gray-700 text-gray-500 mr-2" />
              <span className="dark:text-gray-700 text-gray-500 cursor-pointer">Browse</span>
            </div>
          </div>
        </div>

        {/* Second Row: Background Image and Favicon */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0 mb-6">
          {/* Background Image Upload */}
          <div className="w-full">
            <label htmlFor="backgroundImage" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Background Image</span>
            </label>
            <div
              className={`flex items-center border border-gray-300 dark:border-[#ffffff10] rounded-lg px-3 py-2 mt-1 ${
                isDarkMode ? "bg-transparent" : "bg-transparent"
              }`}
            >
              <input
                type="file"
                id="backgroundImage"
                name="backgroundImage"
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="backgroundImage"
                className="flex-1 cursor-pointer text-gray-500 dark:text-gray-400"
              >
                {formData.backgroundImage ? formData.backgroundImage.name : "Choose a logo"}
              </label>
              <Upload02Icon size={18} className="dark:text-gray-700 text-gray-500 mr-2" />
              <span className="dark:text-gray-700 text-gray-500 cursor-pointer">Browse</span>
            </div>
          </div>

          {/* Favicon Upload */}
          <div className="w-full">
            <label htmlFor="favicon" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Favicon</span>
            </label>
            <div
              className={`flex items-center border border-gray-300 dark:border-[#ffffff10] rounded-lg px-3 py-2 mt-1 ${
                isDarkMode ? "bg-transparent" : "bg-transparent"
              }`}
            >
              <input
                type="file"
                id="favicon"
                name="favicon"
                accept="image/png, image/jpeg, image/svg+xml, image/x-icon"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="favicon"
                className="flex-1 cursor-pointer text-gray-500 dark:text-gray-400"
              >
                {formData.favicon ? formData.favicon.name : "Choose a logo"}
              </label>
              <Upload02Icon size={18} className="dark:text-gray-700 text-gray-500 mr-2" />
              <span className="dark:text-gray-700 text-gray-500 cursor-pointer">Browse</span>
            </div>
          </div>
        </div>

        {/* Third Row: Loader (GIF) and Extra Image */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0 mb-24">
         {/* Favicon 2 */}
         <div className="w-full">
            <label htmlFor="favicon2" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Favicon</span>
            </label>
            <div
              className={`flex items-center border border-gray-300 dark:border-[#ffffff10] rounded-lg px-3 py-2 mt-1 ${
                isDarkMode ? "bg-transparent" : "bg-transparent"
              }`}
            >
              <input
                type="file"
                id="favicon2"
                name="favicon2"
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="favicon2"
                className="flex-1 cursor-pointer text-gray-500 dark:text-gray-400"
              >
                {formData.favicon2 ? formData.favicon2.name : "Choose a logo"}
              </label>
              <Upload02Icon size={18} className="dark:text-gray-700 text-gray-500 mr-2" />
              <span className="dark:text-gray-700 text-gray-500 cursor-pointer">Browse</span>
            </div>
          </div>
        
        
          {/* Loader (GIF) Upload */}
          <div className="w-full">
            <label htmlFor="loader" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Loader (GIF)</span>
            </label>
            <div
              className={`flex items-center border border-gray-300 dark:border-[#ffffff10] rounded-lg px-3 py-2 mt-1 ${
                isDarkMode ? "bg-transparent" : "bg-transparent"
              }`}
            >
              <input
                type="file"
                id="loader"
                name="loader"
                accept="image/gif"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="loader"
                className="flex-1 cursor-pointer text-gray-500 dark:text-gray-400"
              >
                {formData.loader ? formData.loader.name : "Choose a logo"}
              </label>
              <Upload02Icon size={18} className="dark:text-gray-700 text-gray-500 mr-2" />
              <span className="dark:text-gray-700 text-gray-500 cursor-pointer">Browse</span>
            </div>
          </div>

         
        </div>
      </div>



 {/* Action Buttons */}
<div className="flex justify-center space-x-4">
  {/* Add Button */}
  <Button
    type="submit"
    color="primary"
    className="px-6 py-2 rounded-full bg-info px-12"
  >
    Add
  </Button>

  {/* Cancel Button */}
  <Button
    type="button"
    className="px-6 py-2 rounded-full bg-transparent border border-black dark:border-white text-black dark:text-white px-9"
    onClick={onClose}
    >
    Cancel
  </Button>
</div>

    </form>
  );
};

export default NewSellerForm;
