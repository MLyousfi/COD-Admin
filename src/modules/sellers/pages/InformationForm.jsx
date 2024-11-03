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

  const [focusState, setFocusState] = useState({
    name1: false,
    name2: false,
    name3: false,
    name4: false,
    phoneCountryCode1: false,
    phoneNumber1: false,
    phoneCountryCode2: false,
    phoneNumber2: false,
    email: false,
    password: false,
    address: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (field) => {
    setFocusState({ ...focusState, [field]: true });
  };

  const handleBlur = (field) => {
    setFocusState({
      ...focusState,
      [field]: formData[field] !== '',
    });
  };

  const isFilled = (field) => formData[field] !== '';

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
    <div className="flex-1 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name 1 */}
        <div className="relative">
          <label
            htmlFor="name1"
            className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.name1 || isFilled('name1') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            Name
          </label>
          <input
            type="text"
            id="name1"
            name="name1"
            value={formData.name1}
            onChange={handleInputChange}
            onFocus={() => handleFocus('name1')}
            onBlur={() => handleBlur('name1')}
            className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            placeholder=""
          />
          <div
            className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
              isFilled('name1')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>

        {/* Name 2 */}
        <div className="relative">
          <label
            htmlFor="name2"
            className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.name2 || isFilled('name2') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            Name
          </label>
          <input
            type="text"
            id="name2"
            name="name2"
            value={formData.name2}
            onChange={handleInputChange}
            onFocus={() => handleFocus('name2')}
            onBlur={() => handleBlur('name2')}
            className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            placeholder=""
          />
          <div
            className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
              isFilled('name2')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>

        {/* Name 3 */}
        <div className="relative">
          <label
            htmlFor="name3"
            className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.name3 || isFilled('name3') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            Name
          </label>
          <input
            type="text"
            id="name3"
            name="name3"
            value={formData.name3}
            onChange={handleInputChange}
            onFocus={() => handleFocus('name3')}
            onBlur={() => handleBlur('name3')}
            className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            placeholder=""
          />
          <div
            className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
              isFilled('name3')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>

        {/* Name 4 */}
        <div className="relative">
          <label
            htmlFor="name4"
            className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.name4 || isFilled('name4') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            Name
          </label>
          <input
            type="text"
            id="name4"
            name="name4"
            value={formData.name4}
            onChange={handleInputChange}
            onFocus={() => handleFocus('name4')}
            onBlur={() => handleBlur('name4')}
            className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            placeholder=""
          />
          <div
            className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
              isFilled('name4')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>

        {/* Phone Number 1 */}
        <div className="relative">
          <label
            htmlFor="phoneNumber1"
            className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.phoneNumber1 || isFilled('phoneNumber1') || isFilled('phoneCountryCode1')
                ? 'transform -translate-y-4 scale-90'
                : ''
            }`}
          >
            Phone Number 1
          </label>
          <div className="flex items-center px-4 pt-6 pb-2">
            {/* Country Code Selector with Flag */}
            <div className="flex items-center">
              {/* Flag Emoji */}
              <span className="text-xl mr-1">
                {
                  countryOptions.find(
                    (option) => option.code === formData.phoneCountryCode1
                  )?.flag || '🏳️'
                }
              </span>
              <select
                name="phoneCountryCode1"
                value={formData.phoneCountryCode1}
                onChange={handleInputChange}
                onFocus={() => handleFocus('phoneCountryCode1')}
                onBlur={() => handleBlur('phoneCountryCode1')}
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
              onFocus={() => handleFocus('phoneNumber1')}
              onBlur={() => handleBlur('phoneNumber1')}
              className={`flex-1 bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />
          </div>
          <div
            className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
              isFilled('phoneNumber1') || isFilled('phoneCountryCode1')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>

        {/* Phone Number 2 */}
        <div className="relative">
          <label
            htmlFor="phoneNumber2"
            className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.phoneNumber2 || isFilled('phoneNumber2') || isFilled('phoneCountryCode2')
                ? 'transform -translate-y-4 scale-90'
                : ''
            }`}
          >
            Phone Number 2
          </label>
          <div className="flex items-center px-4 pt-6 pb-2">
            {/* Country Code Selector with Flag */}
            <div className="flex items-center">
              {/* Flag Emoji */}
              <span className="text-xl mr-1">
                {
                  countryOptions.find(
                    (option) => option.code === formData.phoneCountryCode2
                  )?.flag || '🏳️'
                }
              </span>
              <select
                name="phoneCountryCode2"
                value={formData.phoneCountryCode2}
                onChange={handleInputChange}
                onFocus={() => handleFocus('phoneCountryCode2')}
                onBlur={() => handleBlur('phoneCountryCode2')}
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
              onFocus={() => handleFocus('phoneNumber2')}
              onBlur={() => handleBlur('phoneNumber2')}
              className={`flex-1 bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=""
            />
          </div>
          <div
            className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
              isFilled('phoneNumber2') || isFilled('phoneCountryCode2')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>

        {/* Email */}
        <div className="relative">
          <label
            htmlFor="email"
            className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
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
            className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            placeholder=""
          />
          <div
            className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
              isFilled('email')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>

        {/* Password */}
        <div className="relative">
          <label
            htmlFor="password"
            className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.password || isFilled('password')
                ? 'transform -translate-y-4 scale-90'
                : ''
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
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
            className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            placeholder=""
          />
          <div
            className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
              isFilled('password')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>

        {/* Address */}
        <div className="relative col-span-2">
          <label
            htmlFor="address"
            className={`absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
              focusState.address || isFilled('address') ? 'transform -translate-y-4 scale-90' : ''
            }`}
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            onFocus={() => handleFocus('address')}
            onBlur={() => handleBlur('address')}
            className={`block w-full px-4 pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            placeholder=""
          />
          <div
            className={`absolute left-4 bottom-1 h-px w-full transition-colors duration-300 ${
              isFilled('address')
                ? 'bg-[#0258E8]'
                : isDarkMode
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
          ></div>
        </div>
      </div>

      {/* New Section: List of Store */}
      <div className="mt-5">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-600' : 'text-black'}`}>
          List of Store:
        </h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stores.map((store, index) => (
            <div
              key={index}
              className="bg-gray-200 dark:bg-[#FFFFFF05] text-gray-500 text-sm text-center py-2 rounded-full"
            >
              {store}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InformationsForm;
