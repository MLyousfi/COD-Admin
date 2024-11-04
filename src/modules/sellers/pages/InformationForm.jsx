// InformationsForm.jsx

import React, { useState } from 'react';

const InformationsForm = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name1: '',
    name2: '',
    name3: '',
    name4: '',
    phoneCountryCode1: '+1',
    phoneNumber1: '',
    phoneCountryCode2: '+1',
    phoneNumber2: '',
    email: '',
    password: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Mapping of country codes to country names and flags
  const countryOptions = [
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+44', country: 'GB', flag: '🇬🇧' },
    { code: '+212', country: 'MA', flag: '🇲🇦' },
    // Add more country options as needed
  ];

  // Array of stores
  const stores = Array.from({ length: 20 }, (_, index) => `Store ${index + 1}`);

  return (
    <div className="flex-1 p-4 overflow-x-hidden">
      <div className="max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name 1 */}
          <div className="relative">
            <label
              htmlFor="name1"
              className={`absolute top-4  text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                formData.name1 !== '' ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              Name 1
            </label>
            <input
              type="text"
              id="name1"
              name="name1"
              value={formData.name1}
              onChange={handleInputChange}
              className={`block w-full  pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 border-b ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${
                formData.name1 !== ''
                  ? 'border-blue-500' // Updated to use standard Tailwind color
                  : ''
              }`}
              placeholder=""
            />
          
          </div>

          {/* Name 2 */}
          <div className="relative">
            <label
              htmlFor="name2"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                formData.name2 !== '' ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              Name 2
            </label>
            <input
              type="text"
              id="name2"
              name="name2"
              value={formData.name2}
              onChange={handleInputChange}
              className={`block w-full  pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 border-b ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${
                formData.name2 !== ''
                  ? 'border-blue-500' // Updated to use standard Tailwind color
                  : ''
              }`}
              placeholder=""
            />

          </div>

          {/* Name 3 */}
          <div className="relative">
            <label
              htmlFor="name3"
              className={`absolute top-4  text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                formData.name3 !== '' ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              Name 3
            </label>
            <input
              type="text"
              id="name3"
              name="name3"
              value={formData.name3}
              onChange={handleInputChange}
              className={`block w-full  pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 border-b ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${
                formData.name3 !== ''
                  ? 'border-blue-500' // Updated to use standard Tailwind color
                  : ''
              }`}
              placeholder=""
            />
            
          </div>

          {/* Name 4 */}
          <div className="relative">
            <label
              htmlFor="name4"
              className={`absolute top-4  text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                formData.name4 !== '' ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              Name 4
            </label>
            <input
              type="text"
              id="name4"
              name="name4"
              value={formData.name4}
              onChange={handleInputChange}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 border-b ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${
                formData.name4 !== ''
                  ? 'border-blue-500' // Updated to use standard Tailwind color
                  : ''
              }`}
              placeholder=""
            />
        
          </div>

          {/* Phone Number 1 */}
<div className="relative">

  <div
    className={`flex items-center pt-3 pb-2 bg-transparent border-b transition-colors duration-300 ${
      formData.phoneNumber1 !== ''
        ? 'border-blue-500'
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
        className={`bg-transparent focus:outline-none transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        {countryOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.code}
          </option>
        ))}
      </select>
    </div>
    {/* Separator Line */}
    <div
      className={`h-6 w-px mx-4 ${
        isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
      }`}
    ></div>
    {/* Phone Number Input */}
    <input
      type="text"
      id="phoneNumber1"
      name="phoneNumber1"
      value={formData.phoneNumber1}
      onChange={handleInputChange}
      className={`flex-1 bg-transparent focus:outline-none transition-colors duration-300 ${
        isDarkMode ? 'text-white' : 'text-black'
      } placeholder-gray-600 text-sm`}
      placeholder="Phone Number"
    />
  </div>
</div>

{/* Phone Number 2 */}
<div className="relative">

  <div
    className={`flex items-center pt-3 pb-2 bg-transparent border-b transition-colors duration-300 ${
      formData.phoneNumber2 !== ''
        ? 'border-blue-500'
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
          (option) => option.code === formData.phoneCountryCode2
        )?.flag || '🏳️'}
      </span>
      <select
        name="phoneCountryCode2"
        value={formData.phoneCountryCode2}
        onChange={handleInputChange}
        className={`bg-transparent focus:outline-none transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        {countryOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.code}
          </option>
        ))}
      </select>
    </div>
    {/* Separator Line */}
    <div
      className={`h-6 w-px mx-4 ${
        isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
      }`}
    ></div>
    {/* Phone Number Input */}
    <input
      type="text"
      id="phoneNumber2"
      name="phoneNumber2"
      value={formData.phoneNumber2}
      onChange={handleInputChange}
      className={`flex-1 bg-transparent focus:outline-none transition-colors duration-300 ${
        isDarkMode ? 'text-white' : 'text-black'
      } placeholder-gray-600 text-sm`}
      placeholder="Phone Number"
    />
  </div>
</div>



          {/* Email */}
          <div className="relative">
            <label
              htmlFor="email"
              className={`absolute top-4  text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                formData.email !== '' ? 'transform -translate-y-4 scale-90' : ''
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
              className={`block w-full  pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 border-b ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${
                formData.email !== ''
                  ? 'border-blue-500' // Updated to use standard Tailwind color
                  : ''
              }`}
              placeholder=""
            />
            
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className={`absolute top-4  text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                formData.password !== '' ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`block w-full  pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 border-b ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${
                formData.password !== ''
                  ? 'border-blue-500' // Updated to use standard Tailwind color
                  : ''
              }`}
              placeholder=""
            />
            
          </div>

          {/* Address - Spanning Full Row on Large Screens */}
          <div className="relative col-span-1 md:col-span-2">
            <label
              htmlFor="address"
              className={`absolute top-4  text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                formData.address !== '' ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 border-b ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${
                formData.address !== ''
                  ? 'border-blue-500' // Updated to use standard Tailwind color
                  : ''
              }`}
              placeholder=""
            ></input>
            
          </div>
        </div>

        {/* List of Stores */}
        <div className="mt-5">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`}>
            List of Stores:
          </h2>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stores.map((store, index) => (
              <div
                key={index}
                className="text-gray-500 dark:bg-[#FFFFFF05] bg-[#00000015] text-sm text-center py-2 px-4 rounded-full break-words"
              >
                {store}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationsForm;
