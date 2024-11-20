// RegisteredBusiness.jsx

import React, { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

const RegisteredBusiness = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    legalName: '',
    companyEmail: '',
    rc: '',
    taxIdentificationNumber: '',
    cnss: '',
    ice: '',
    professionalTax: '',
    bank: '',
    bankId: '',
    swiftCode: '',
    bankAddress: '',
  });

  const [focusState, setFocusState] = useState({
    legalName: false,
    companyEmail: false,
    rc: false,
    taxIdentificationNumber: false,
    cnss: false,
    ice: false,
    professionalTax: false,
    bankId: false,
    swiftCode: false,
    bankAddress: false,
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

  const handleSelectChange = (selected) => {
    const selectedValue = Array.from(selected)[0];
    setFormData({ ...formData, bank: selectedValue });
  };

  return (
    <div className="flex-1 px-4 overflow-x-hidden">
      <div className="max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Legal Name */}
          <div className="relative">
            <label
              htmlFor="legalName"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                focusState.legalName || isFilled('legalName') ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              Legal Name
            </label>
            <input
              type="text"
              id="legalName"
              name="legalName"
              value={formData.legalName}
              onChange={handleInputChange}
              onFocus={() => handleFocus('legalName')}
              onBlur={() => handleBlur('legalName')}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${isFilled('legalName') ? 'border-blue-500' : ''}`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled('legalName')
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>

          {/* Company Email */}
          <div className="relative">
            <label
              htmlFor="companyEmail"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                focusState.companyEmail || isFilled('companyEmail') ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              Company Email
            </label>
            <input
              type="email"
              id="companyEmail"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleInputChange}
              onFocus={() => handleFocus('companyEmail')}
              onBlur={() => handleBlur('companyEmail')}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300  ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${isFilled('companyEmail') ? 'border-blue-500' : ''}`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled('companyEmail')
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>

          {/* RC */}
          <div className="relative">
            <label
              htmlFor="rc"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                focusState.rc || isFilled('rc') ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              RC
            </label>
            <input
              type="text"
              id="rc"
              name="rc"
              value={formData.rc}
              onChange={handleInputChange}
              onFocus={() => handleFocus('rc')}
              onBlur={() => handleBlur('rc')}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${isFilled('rc') ? 'border-blue-500' : ''}`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled('rc')
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>

          {/* Tax Identification Number */}
          <div className="relative">
            <label
              htmlFor="taxIdentificationNumber"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                focusState.taxIdentificationNumber || isFilled('taxIdentificationNumber') ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              Tax Identification Number
            </label>
            <input
              type="text"
              id="taxIdentificationNumber"
              name="taxIdentificationNumber"
              value={formData.taxIdentificationNumber}
              onChange={handleInputChange}
              onFocus={() => handleFocus('taxIdentificationNumber')}
              onBlur={() => handleBlur('taxIdentificationNumber')}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300  ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${isFilled('taxIdentificationNumber') ? 'border-blue-500' : ''}`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled('taxIdentificationNumber')
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>

          {/* CNSS */}
          <div className="relative">
            <label
              htmlFor="cnss"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                focusState.cnss || isFilled('cnss') ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              CNSS
            </label>
            <input
              type="text"
              id="cnss"
              name="cnss"
              value={formData.cnss}
              onChange={handleInputChange}
              onFocus={() => handleFocus('cnss')}
              onBlur={() => handleBlur('cnss')}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300  ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${isFilled('cnss') ? 'border-blue-500' : ''}`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled('cnss')
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>

          {/* ICE */}
          <div className="relative">
            <label
              htmlFor="ice"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                focusState.ice || isFilled('ice') ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              ICE
            </label>
            <input
              type="text"
              id="ice"
              name="ice"
              value={formData.ice}
              onChange={handleInputChange}
              onFocus={() => handleFocus('ice')}
              onBlur={() => handleBlur('ice')}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${isFilled('ice') ? 'border-blue-500' : ''}`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled('ice')
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>

          {/* Professional Tax */}
          <div className="relative md:col-span-2">
            <label
              htmlFor="professionalTax"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                focusState.professionalTax || isFilled('professionalTax') ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              Professional Tax
            </label>
            <input
              type="text"
              id="professionalTax"
              name="professionalTax"
              value={formData.professionalTax}
              onChange={handleInputChange}
              onFocus={() => handleFocus('professionalTax')}
              onBlur={() => handleBlur('professionalTax')}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300  ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${isFilled('professionalTax') ? 'border-blue-500' : ''}`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full md:w-1/2  transition-colors duration-300 ${
                isFilled('professionalTax')
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>

          {/* Bank */}
          <div className="relative md:col-span-2">
            <label className="block mb-2 text-sm  text-gray-500 dark:text-gray-500">
              Bank
            </label>
            <Select
              selectedKeys={formData.bank ? [formData.bank] : []}
              onSelectionChange={handleSelectChange}
              placeholder="Select Bank"
              classNames={{
                trigger:
                  'w-full bg-transparent md:w-1/2 border border-gray-300 dark:border-gray-600 rounded-lg text-left',
                value: 'text-sm text-gray-700 dark:text-gray-300',
                popover: 'bg-white dark:bg-gray-800',
              }}
            >
              <SelectItem key="Arabe Bank">Arabe Bank</SelectItem>
              {/* Add more bank options as needed */}
            </Select>
          </div>

          {/* Bank ID */}
          <div className="relative">
            <label
              htmlFor="bankId"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                focusState.bankId || isFilled('bankId') ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              Bank ID
            </label>
            <input
              type="text"
              id="bankId"
              name="bankId"
              value={formData.bankId}
              onChange={handleInputChange}
              onFocus={() => handleFocus('bankId')}
              onBlur={() => handleBlur('bankId')}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300  ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${isFilled('bankId') ? 'border-blue-500' : ''}`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled('bankId')
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>

          {/* Swift Code */}
          <div className="relative">
            <label
              htmlFor="swiftCode"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                focusState.swiftCode || isFilled('swiftCode') ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              Swift Code
            </label>
            <input
              type="text"
              id="swiftCode"
              name="swiftCode"
              value={formData.swiftCode}
              onChange={handleInputChange}
              onFocus={() => handleFocus('swiftCode')}
              onBlur={() => handleBlur('swiftCode')}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${isFilled('swiftCode') ? 'border-blue-500' : ''}`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled('swiftCode')
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>

          {/* Bank Address */}
          <div className="relative md:col-span-2">
            <label
              htmlFor="bankAddress"
              className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                focusState.bankAddress || isFilled('bankAddress') ? 'transform -translate-y-4 scale-90' : ''
              }`}
            >
              Bank Address
            </label>
            <input
              type="text"
              id="bankAddress"
              name="bankAddress"
              value={formData.bankAddress}
              onChange={handleInputChange}
              onFocus={() => handleFocus('bankAddress')}
              onBlur={() => handleBlur('bankAddress')}
              className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${isFilled('bankAddress') ? 'border-blue-500' : ''}`}
              placeholder=""
            />
            <div
              className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                isFilled('bankAddress')
                  ? 'bg-[#0258E8]'
                  : isDarkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-center mt-8">
          <Button
            className="rounded-full font-bold px-16 py-2"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
            onClick={() => {
              // Handle Add action here
              console.log('Registered Business Added:', formData);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisteredBusiness;
