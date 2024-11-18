// NewCurrencyModal.jsx
import React, { useState, useEffect } from 'react';
import CustomModal from '../../stockManagement.jsx/components/modal'; 
import { Button } from "@nextui-org/button";

const NewCurrencyModal = ({ isOpen, onClose, onSave, editedCurrency }) => {
  const [formData, setFormData] = useState({
    currencyName: '',
    currencyCode: '',
    equalInUSD: '',
    equalInUSDShipping: '',
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Populate form data when editing
  useEffect(() => {
    if (editedCurrency) {
      setFormData({
        currencyName: editedCurrency.currencyName || '',
        currencyCode: editedCurrency.currencyCode || '',
        equalInUSD: editedCurrency.equalInUSD || '',
        equalInUSDShipping: editedCurrency.equalInUSDShipping || '',
      });
    } else {
      setFormData({
        currencyName: '',
        currencyCode: '',
        equalInUSD: '',
        equalInUSDShipping: '',
      });
    }
  }, [editedCurrency]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const darkMode = document.documentElement.classList.contains('dark');
      setIsDarkMode(darkMode);
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !formData.currencyName ||
      !formData.currencyCode ||
      !formData.equalInUSD ||
      (!editedCurrency && !formData.equalInUSDShipping) // Require shipping field only in create mode
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    onSave(formData);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={editedCurrency ? "Edit Currency" : "New Currency"}
      isDarkMode={isDarkMode}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 mt-4">
          {/* Currency Name Input */}
          <div>
            <label
              htmlFor="currencyName"
              className="block text-sm text-gray-500 mb-1"
            >
              Country Name *
            </label>
            <input
              type="text"
              id="currencyName"
              name="currencyName"
              value={formData.currencyName}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-[#ffffff20] rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
              placeholder="Country Name"
              required
            />
          </div>

          {/* Currency Code Input */}
          <div>
            <label
              htmlFor="currencyCode"
              className="block text-sm text-gray-500 mb-1"
            >
              Country Code *
            </label>
            <input
              type="text"
              id="currencyCode"
              name="currencyCode"
              value={formData.currencyCode}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-[#ffffff20] rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
              placeholder="Country Code"
              required
            />
          </div>

          {/* Equal in USD Input */}
          <div>
            <label
              htmlFor="equalInUSD"
              className="block text-sm text-gray-500 mb-1"
            >
              Equal in USD
            </label>
            <input
              type="text"
              id="equalInUSD"
              name="equalInUSD"
              value={formData.equalInUSD}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-[#ffffff20] rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
              placeholder="0"
              required
            />
          </div>

          {/* Conditionally Rendered: Equal in USD (Shipping Company) Input */}
          {!editedCurrency && (
            <div>
              <label
                htmlFor="equalInUSDShipping"
                className="block text-sm text-gray-500 mb-1"
              >
                Equal in USD (Shipping Company) *
              </label>
              <input
                type="text"
                id="equalInUSDShipping"
                name="equalInUSDShipping"
                value={formData.equalInUSDShipping}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-[#ffffff20] rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                placeholder="0"
                required={!editedCurrency} // Make it required only in create mode
              />
            </div>
          )}
        </div>

        {/* Horizontal Line After Last Input */}
        <hr className="my-8 border-gray-300 dark:border-gray-900" />

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <Button
            type="submit"
            color="success"
            className="w-32 rounded-full bg-info text-white"
          >
            {editedCurrency ? "Update Currency" : "Create Currency"}
          </Button>
          <Button
            type="button"
            color="error"
            className="w-32 border rounded-full border-black dark:border-white text-black dark:text-white"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default NewCurrencyModal;
