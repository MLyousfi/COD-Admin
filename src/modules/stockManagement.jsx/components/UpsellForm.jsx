// UpsellForm.jsx
import React, { useState } from 'react';
import { Button } from "@nextui-org/button";
import {
  PencilEdit01Icon,
  Delete01Icon,
  PlusSignIcon,
} from "hugeicons-react"; // Adjust the import if using a different icon library
import CustomModal from './modal'; // Adjust the path as necessary
import Table from './Table'; // Ensure the path is correct based on your project structure
import { Select, SelectItem } from '@nextui-org/react'; // Adjust the import based on your Select component library

const UpsellForm = ({ isDarkMode }) => {
  // Initial upsell entries state with required fields
  const [upsellEntries, setUpsellEntries] = useState([
    {
      key: 1,
      upsellName: 'Upsell A',
      quantityPaid: 150,
      quantityFree: 50,
      prices: [
        { id: 1, price: 100, currency: 'Saudi Riyal' },
      ],
    },
    {
      key: 2,
      upsellName: 'Upsell B',
      quantityPaid: 200,
      quantityFree: 80,
      prices: [
        { id: 1, price: 120, currency: 'USD' },
        { id: 2, price: 110, currency: 'EUR' },
      ],
    },
    {
      key: 3,
      upsellName: 'Upsell C',
      quantityPaid: 100,
      quantityFree: 30,
      prices: [],
    },
    // Add more example entries as needed
  ]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUpsellData, setNewUpsellData] = useState({
    upsellName: '',
    quantityPaid: '',
    quantityFree: '',
  });

  // State for managing focus in floating labels
  const [focusedInput, setFocusedInput] = useState(null); // To track which input is focused

  // State for managing dynamic price entries in the modal
  const [newPrices, setNewPrices] = useState([]);

  const rowsPerPage = 10;

  const columns = [
    { key: "upsellName", label: "Upsell Name" },
    { key: "quantityPaid", label: "Quantity Paid" },
    { key: "quantityFree", label: "Quantity Free" },
    { key: "options", label: "Options" },
  ];

  // Handle selection of rows (for bulk actions if needed)
  const handleCheckboxChange = (keys, isRange) => {
    if (isRange) {
      setSelectedRows(prevSelected => [
        ...new Set([...prevSelected, ...keys])
      ]);
    } else if (Array.isArray(keys)) {
      setSelectedRows(keys);
    } else {
      setSelectedRows(prevSelected =>
        prevSelected.includes(keys)
          ? prevSelected.filter(key => key !== keys)
          : [...prevSelected, keys]
      );
    }
  };

  // Save edited row
  const handleSave = (key) => {
    const entry = upsellEntries.find(entry => entry.key === key);
    if (!entry.upsellName || !entry.quantityPaid || !entry.quantityFree) {
      alert("All fields must be filled out.");
      return;
    }
    // Additional processing can be done here if needed
    setEditingKey(null);
  };

  // Delete a row
  const handleDelete = (key) => {
    setUpsellEntries(upsellEntries.filter(entry => entry.key !== key));
    setSelectedRows(selectedRows.filter(selectedKey => selectedKey !== key));
    // If the deleted row was being edited, exit edit mode
    if (editingKey === key) {
      setEditingKey(null);
    }
  };

  // Enter edit mode for a row
  const handleEdit = (key) => {
    setEditingKey(key);
  };

  // Handle changes in the table's editable inputs
  const handleInputChange = (e, field, key = null) => {
    if (key !== null) {
      setUpsellEntries(upsellEntries.map(entry =>
        entry.key === key ? { ...entry, [field]: e.target.value } : entry
      ));
    } else {
      // Handle changes in the modal's form inputs
      const { name, value } = e.target;
      setNewUpsellData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Open the modal
  const handleAddNewUpsell = () => {
    setIsModalOpen(true);
  };

  // Close the modal and reset form data
  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewUpsellData({
      upsellName: '',
      quantityPaid: '',
      quantityFree: '',
    });
    setNewPrices([]);
    setFocusedInput(null);
  };

  // Handle form input changes in the modal
  const handleNewUpsellChange = (e) => {
    const { name, value } = e.target;
    setNewUpsellData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to add a new upsell
  const handleNewUpsellSubmit = (e) => {
    e.preventDefault();

    const { upsellName, quantityPaid, quantityFree } = newUpsellData;

    // Basic validation
    if (!upsellName || !quantityPaid || !quantityFree) {
      alert("All fields are required.");
      return;
    }

    const newKey = upsellEntries.length ? Math.max(...upsellEntries.map(entry => entry.key)) + 1 : 1;
    const newEntry = {
      key: newKey,
      upsellName,
      quantityPaid: Number(quantityPaid),
      quantityFree: Number(quantityFree),
      prices: newPrices.map(price => ({
        id: Date.now() + Math.random(), // Simple unique ID
        price: Number(price.price),
        currency: price.currency,
      })),
    };
    setUpsellEntries([...upsellEntries, newEntry]);
    handleModalClose();
  };

  // Handle adding a new price entry
  const handleAddPrice = () => {
    setNewPrices([...newPrices, { id: Date.now(), price: '', currency: '' }]);
  };

  // Handle deleting a price entry
  const handleDeletePrice = (id) => {
    setNewPrices(newPrices.filter(price => price.id !== id));
  };

  // Handle changes in the price entries
  const handlePriceChange = (id, field, value) => {
    setNewPrices(newPrices.map(price =>
      price.id === id ? { ...price, [field]: value } : price
    ));
  };

  // Render table cells, handling editable fields
  const renderCell = (item, columnKey) => {
    if (editingKey === item.key && columnKey !== "options") {
      // Render editable inputs without borders and with short, centered blue underlines
      if (columnKey === "upsellName") {
        return (
          <div className="flex flex-col items-center w-full">
            <div className="relative w-full max-w-xs">
              {/* Floating Label */}
 

              {/* Input Field */}
              <input
                type="text"
                id={`upsellName-${item.key}`}
                name="upsellName"
                value={item.upsellName}
                onChange={(e) => handleInputChange(e, columnKey, item.key)}
                onFocus={() => setFocusedInput(`upsellName-${item.key}`)}
                onBlur={() => setFocusedInput(null)}
                className={`block w-full text-center text-sm bg-transparent focus:outline-none transition-colors duration-300  mb-1 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
                placeholder=" "
                required
              />

              {/* Custom Underline */}
              <div className="absolute bottom-0  left-1/2 transform -translate-x-1/2 h-0.5 w-24 bg-[#0258E8]"></div>
            </div>
          </div>
        );
      } else if (["quantityPaid", "quantityFree"].includes(columnKey)) {
        return (
          <div className="flex flex-col items-center w-full">
            <input
              type="text"
              value={item[columnKey]}
              onChange={(e) => handleInputChange(e, columnKey, item.key)}
              className={`block text-center text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              placeholder=" "
              required
            />
            {/* Custom Underline */}
            <div className="h-0.5 bg-[#0258E8] mt-1 w-24"></div>
          </div>
        );
      }
    }

    switch(columnKey){
      case "options":
        return (
          <div className="flex space-x-2 justify-center">
            {editingKey === item.key ? (
              // Only Delete button with transparent background during edit mode
              <Button
                variant="flat"
                size="sm"
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center flex-shrink-0 border border-gray-500 dark:border-white dark:text-white text-gray-900"
                style={{
                  backgroundColor: 'transparent',
                  padding: 0,
                  minWidth: '32px',
                  height: '32px',
                }}
                onClick={() => handleDelete(item.key)}
                aria-label="Delete Upsell"
              >
                <Delete01Icon size={14}  />
              </Button>
            ) : (
              <>
                {/* Edit Button */}
                <Button
                  variant="flat"
                  size="sm"
                  className="w-8 h-8 rounded-full p-0 flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: '#0258E8',
                    padding: 0,
                    minWidth: '32px',
                    height: '32px',
                  }}
                  onClick={() => handleEdit(item.key)}
                  aria-label="Edit Upsell"
                >
                  <PencilEdit01Icon size={14} style={{ color: 'white' }} />
                </Button>

                {/* Delete Button */}
                <Button
                  variant="flat"
                  size="sm"
                  className="w-8 h-8 rounded-full p-0 flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: '#ED0006',
                    padding: 0,
                    minWidth: '32px',
                    height: '32px',
                  }}
                  onClick={() => handleDelete(item.key)}
                  aria-label="Delete Upsell"
                >
                  <Delete01Icon size={14} style={{ color: 'white' }} />
                </Button>
              </>
            )}
          </div>
        );
      default:
        return (
          <span
            className={`text-sm ${
              isDarkMode ? 'text-white' : 'text-black'
            } block text-center`}
          >
            {item[columnKey]}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with New Upsell or Save Upsell Button */}
      <div className="flex justify-end">
        {editingKey !== null ? (
          <Button 
            color="default" 
            className="rounded-full flex items-center space-x-2 px-4 py-2 bg-transparent border border-black dark:border-white"
            onClick={() => handleSave(editingKey)} // Save the edited row
          >
            <span className="text-sm sm:text-base">Save Upsell</span>
          </Button>
        ) : (
          <Button 
            color="default" 
            className="rounded-full flex items-center space-x-2 px-4 py-2"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
            onClick={handleAddNewUpsell} // Open the modal
          >
            <PlusSignIcon size={18} className="flex-shrink-0" /> 
            <span className="text-sm sm:text-base">New Upsell</span>
          </Button>
        )}
      </div>
      
      {/* Upsells Table */}
      <Table
        columns={columns}
        data={upsellEntries}
        renderCell={renderCell}
        handleCheckboxChange={handleCheckboxChange}
        selectedRows={selectedRows}
        rowsPerPage={rowsPerPage}
        className="dark:bg-gray-800 dark:text-white"
      />

      {/* Add New Upsell Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="New Upsell" // Updated title
        isDarkMode={isDarkMode}
        width="600px" // Adjusted width as needed
      >
        {/* Upsell Form */}
        <form onSubmit={handleNewUpsellSubmit} className="space-y-6">
          {/* Upsell Name Input with Floating Label */}
          <div className="flex flex-col w-full">
            <div className="relative flex-1">
              {/* Floating Label */}
              <label
                htmlFor="upsellName"
                className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                  focusedInput === 'upsellName' || newUpsellData.upsellName
                    ? 'transform -translate-y-4 scale-90'
                    : ''
                }`}
              >
                Upsell Name
              </label>

              {/* Input Field */}
              <input
                type="text"
                id="upsellName"
                name="upsellName"
                value={newUpsellData.upsellName}
                onChange={handleNewUpsellChange}
                onFocus={() => setFocusedInput('upsellName')}
                onBlur={() => setFocusedInput(null)}
                className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
                placeholder=""
                required
              />

              {/* Custom Underline */}
              <div
                className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                  newUpsellData.upsellName
                    ? 'bg-[#0258E8]'
                    : isDarkMode
                    ? 'bg-gray-600'
                    : 'bg-gray-300'
                }`}
              ></div>
            </div>
          </div>

          {/* Quantity Paid Input with Border */}
          <div>
            <label htmlFor="quantityPaid" className="block mr-2">
              <span className="text-sm text-[#00000050] dark:text-gray-500">Quantity Paid</span>
              <input
                type="text"
                id="quantityPaid"
                name="quantityPaid"
                value={newUpsellData.quantityPaid}
                onChange={handleNewUpsellChange}
                className={`w-full mt-2 p-2 border ${
                  isDarkMode ? 'border-gray-600' : 'border-gray-300'
                } rounded-lg bg-transparent text-sm focus:outline-none focus:ring-0`}
                placeholder="Enter quantity paid"
                required
              />
            </label>
          </div>

          {/* Quantity Free Input with Border */}
          <div>
            <label htmlFor="quantityFree" className="block mr-2">
              <span className="text-sm text-[#00000050] dark:text-gray-500">Quantity Free</span>
              <input
                type="text"
                id="quantityFree"
                name="quantityFree"
                value={newUpsellData.quantityFree}
                onChange={handleNewUpsellChange}
                className={`w-full mt-2 p-2 border ${
                  isDarkMode ? 'border-gray-600' : 'border-gray-300'
                } rounded-lg bg-transparent text-sm focus:outline-none focus:ring-0`}
                placeholder="Enter quantity free"
                required
              />
            </label>
          </div>

          {/* New Price Button */}
          <div className="flex justify-end">
            <Button
              type="button"
              color="default"
              className="flex items-center space-x-0 px-3 py-1 rounded-full bg-info transition-colors"
              onClick={handleAddPrice}
            >
              <PlusSignIcon size={16} className="text-white"/>
              <span className="text-sm text-white">New Price</span>
            </Button>
          </div>

          {/* Prices Table */}
          <div className="mt-4">
            {/* Table Headers */}
            <div className="flex items-center border-b dark:border-gray-600 border-gray-300 text-sm pb-2">
              <div className="w-1/3 text-gray-600 dark:text-gray-400 flex justify-center">Price</div>
              <div className="w-1/3 text-gray-600 dark:text-gray-400 flex justify-center">Currency</div>
              <div className="w-1/3 text-gray-600 dark:text-gray-400 flex justify-center">Actions</div>
            </div>

            {/* Price Entries */}
            {newPrices.length > 0 ? (
              newPrices.map(priceEntry => (
                <div key={priceEntry.id} className="flex items-center mt-6">
                  {/* Price Input */}
                  <div className="w-1/3">
                    <input
                      type="text"
                      value={priceEntry.price}
                      onChange={(e) => handlePriceChange(priceEntry.id, 'price', e.target.value)}
                      className={`w-1/2 flex p-2 border ${
                        isDarkMode ? 'border-gray-600' : 'border-gray-300'
                      } rounded-lg mx-auto bg-transparent text-sm focus:outline-none`}
                      placeholder="Enter price"
                      required
                    />
                  </div>

                  {/* Currency Select */}
                  <div className="w-1/3 ml-2">
                    <Select
                      id={`currency-${priceEntry.id}`}
                      name={`currency-${priceEntry.id}`}
                      value={priceEntry.currency}
                      onValueChange={(value) => handlePriceChange(priceEntry.id, 'currency', value)}
                      placeholder="Select currency"
                      classNames={{
                        trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg',
                      }}
                      required
                    >
                      <SelectItem value="" disabled>Select Currency</SelectItem>
                      <SelectItem value="Saudi Riyal">Saudi Riyal</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      {/* Add more currencies as needed */}
                    </Select>
                  </div>

                  {/* Actions */}
                  <div className="w-1/3 ml-2 flex justify-center">
                    <button
                      type="button"
                      className="flex items-center justify-center bg-red-600 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                      onClick={() => handleDeletePrice(priceEntry.id)}
                      aria-label="Delete Price"
                    >
                      <Delete01Icon size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 mt-4">No prices added yet.</div>
            )}
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-center space-x-2 mt-6">
            <Button
              type="submit"
              style={{ backgroundColor: '#0258E8', color: 'white' }}
              className='rounded-full'
            >
              Validate
            </Button>
            <Button
              type="button"
              variant="flat"
              className='rounded-full bg-transparent border border-gray-500'
              onClick={handleModalClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default UpsellForm;
