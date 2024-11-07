// StockForm.jsx
import React, { useState } from 'react';
import { Button } from "@nextui-org/button";
import {
  PencilEdit01Icon,
  Delete01Icon,
  PlusSignIcon,
  InformationCircleIcon
} from "hugeicons-react";
import CustomModal from './modal'; // Adjust the path as necessary
import Table from './Table'; // Ensure the path is correct based on your project structure
import { Select, SelectItem } from '@nextui-org/react'; // Adjust the import based on your Select component library

const StockForm = ({ isDarkMode }) => {
  // Extended stock data with additional fields
  const [stockEntries, setStockEntries] = useState([
    {
      key: 1,
      warehouse: 'Warehouse A',
      totalQty: 150,
      sku: 'SKU-001',
      delivered: 50,
      statut: 'Available',
      updatedQty: 100,
    },
    {
      key: 2,
      warehouse: 'Warehouse B',
      totalQty: 200,
      sku: 'SKU-002',
      delivered: 80,
      statut: 'Pending',
      updatedQty: 120,
    },
    {
      key: 3,
      warehouse: 'Warehouse C',
      totalQty: 100,
      sku: 'SKU-003',
      delivered: 30,
      statut: 'Out of Stock',
      updatedQty: 70,
    },
    // Add more example entries as needed
  ]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStockData, setNewStockData] = useState({
    warehouse: '',
    totalQty: '',
    sku: '',
    delivered: '',
    statut: 'Available',
    updatedQty: '',
  });

  // State for managing focus in comment input
  const [focusedRow, setFocusedRow] = useState(null); // To track which row's comment input is focused

  const rowsPerPage = 10;

  const columns = [
    { key: "warehouse", label: "Warehouse" },
    { key: "totalQty", label: "Total QTY" },
    { key: "sku", label: "SKU" },
    { key: "delivered", label: "Delivered" },
    { key: "statut", label: "Statut" },
    { key: "updatedQty", label: "Updated QTY" },
    { key: "options", label: "Options" },
  ];

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

  const handleSave = (key) => {
    setEditingKey(null);
  };

  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this stock entry?")) {
      setStockEntries(stockEntries.filter(entry => entry.key !== key));
    }
  };

  const handleEdit = (key) => {
    setEditingKey(key);
  };

  const handleInputChange = (e, field, key = null) => {
    if (key !== null) {
      setStockEntries(stockEntries.map(entry =>
        entry.key === key ? { ...entry, [field]: e.target.value } : entry
      ));
    }
  };

  const handleAddNewStock = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewStockData({
      warehouse: '',
      totalQty: '',
      sku: '',
      delivered: '',
      statut: 'Available',
      updatedQty: '',
      comment: '',
    });
    setFocusedRow(null);
  };

  const handleNewStockChange = (e) => {
    const { name, value } = e.target;
    setNewStockData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewStockSubmit = (e) => {
    e.preventDefault();



    const newKey = stockEntries.length ? Math.max(...stockEntries.map(entry => entry.key)) + 1 : 1;
    const newEntry = {
      key: newKey,
      warehouse,
      statut,
      comment: newStockData.comment,
      totalQty: Number(totalQty) || 0,
      sku,
      delivered: Number(delivered) || 0,
      updatedQty: Number(updatedQty) || 0,
    };
    setStockEntries([...stockEntries, newEntry]);
    handleModalClose();
  };

  const renderCell = (item, columnKey) => {
    if (editingKey === item.key && columnKey !== "options") {
      // Determine input type based on the column
      if (columnKey === "warehouse" || columnKey === "statut") {
        return (
          <Select
            id={columnKey}
            value={item[columnKey]}
            onValueChange={(value) => handleInputChange({ target: { value } }, columnKey, item.key)}
            classNames={{
              trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg',
            }}
          >
            {columnKey === "warehouse" && (
              <>
                <SelectItem key="Warehouse A" value="Warehouse A">Warehouse A</SelectItem>
                <SelectItem key="Warehouse B" value="Warehouse B">Warehouse B</SelectItem>
                <SelectItem key="Warehouse C" value="Warehouse C">Warehouse C</SelectItem>
                {/* Add more options as needed */}
              </>
            )}
            {columnKey === "statut" && (
              <>
                <SelectItem key="Available" value="Available">Available</SelectItem>
                <SelectItem key="Pending" value="Pending">Pending</SelectItem>
                <SelectItem key="Out of Stock" value="Out of Stock">Out of Stock</SelectItem>
              </>
            )}
          </Select>
        );
      } else if (["totalQty", "delivered", "updatedQty"].includes(columnKey)) {
        return (
          <input
            type="number"
            value={item[columnKey]}
            onChange={(e) => handleInputChange(e, columnKey, item.key)}
            className={`w-full p-2 border ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            } rounded bg-transparent text-sm ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          />
        );
      } else if (columnKey === "sku") {
        return (
          <input
            type="text"
            value={item[columnKey]}
            onChange={(e) => handleInputChange(e, columnKey, item.key)}
            className={`w-full p-2 border ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            } rounded bg-transparent text-sm ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          />
        );
      } else if (columnKey === "comment") {
        return (
          <div className="flex flex-col w-full">
            <div className="relative flex-1">
              {/* Static Label */}
              <label
                htmlFor={`comment-${item.key}`}
                className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                  focusedRow === item.key || item.comment
                    ? 'transform -translate-y-4 scale-90'
                    : ''
                }`}
              >
                Comment
              </label>

              {/* Input Field */}
              <input
                type="text"
                id={`comment-${item.key}`}
                name="comment"
                value={item.comment}
                onChange={(e) => handleInputChange(e, columnKey, item.key)}
                onFocus={() => setFocusedRow(item.key)}
                onBlur={() => setFocusedRow(null)}
                className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
                placeholder=""
              />

              {/* Custom Line */}
              <div
                className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                  item.comment
                    ? 'bg-[#0258E8]'
                    : isDarkMode
                    ? 'bg-gray-600'
                    : 'bg-gray-300'
                }`}
              ></div>
            </div>
          </div>
        );
      }
    }

    switch(columnKey){
      case "options":
        return (
          <div className="flex space-x-2 justify-center">
            {editingKey === item.key ? (
              <Button
                variant="flat"
                size="sm"
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#28a745', padding: 0, minWidth: '32px', height: '32px' }}
                onClick={() => handleSave(item.key)}
              >
                <span className="text-white text-xs">Save</span>
              </Button>
            ) : (
              <Button
                variant="flat"
                size="sm"
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
                onClick={() => handleEdit(item.key)}
              >
                <PencilEdit01Icon size={14} style={{ color: 'white' }} />
              </Button>
            )}
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#ED0006', padding: 0, minWidth: '32px', height: '32px' }}
              onClick={() => handleDelete(item.key)}
            >
              <Delete01Icon size={14} style={{ color: 'white' }} />
            </Button>
          </div>
        );
      default:
        return <span className="text-sm dark:text-white">{item[columnKey]}</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with New Stock Button */}
      <div className="flex justify-end">
        <Button 
          color="default" 
          className="rounded-full flex items-center space-x-2 px-4 py-2"
          style={{ backgroundColor: '#0258E8', color: 'white' }}
          onClick={handleAddNewStock}
        >
          <PlusSignIcon size={18} className="flex-shrink-0" /> 
          <span className="text-sm sm:text-base">New Stock</span>
        </Button>
      </div>
      
      {/* Stocks Table */}
      <Table
        columns={columns}
        data={stockEntries}
        renderCell={renderCell}
        handleCheckboxChange={handleCheckboxChange}
        selectedRows={selectedRows}
        rowsPerPage={rowsPerPage}
        className="dark:bg-gray-800 dark:text-white"
      />

<CustomModal
  isOpen={isModalOpen}
  onClose={handleModalClose}
  title="Add New Stock"
  isDarkMode={isDarkMode}
  width="700px" // Adjusted width to accommodate more fields
>
  {/* Information Button */}
  <div className="flex justify-end mb-4">
    <button
      type="button"
      className="flex items-center text-white text-sm mt-7 bg-info rounded-full p-2 hover:bg-blue-600 transition-colors"
      aria-label="Information"
    >
      <InformationCircleIcon className="h-5 w-5 mr-2" /> Informations
    </button>
  </div>

  {/* Existing Form */}
  <form onSubmit={handleNewStockSubmit} className="space-y-6">
    {/* Warehouse Select */}
    <div>
      <label htmlFor="warehouse" className="block mr-2">
        <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Warehouse</span>
        <Select
          id="warehouse"
          name="warehouse"
          value={newStockData.warehouse}
          onValueChange={(value) => setNewStockData(prev => ({ ...prev, warehouse: value }))}
          placeholder="Select a warehouse"
          labelPlacement="outside"
          classNames={{
            trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg',
          }}
          required
        >
          <SelectItem value="" disabled>Select Warehouse</SelectItem>
          <SelectItem value="Warehouse A">Warehouse A</SelectItem>
          <SelectItem value="Warehouse B">Warehouse B</SelectItem>
          <SelectItem value="Warehouse C">Warehouse C</SelectItem>
          {/* Add more options as needed */}
        </Select>
      </label>
    </div>

          {/* Statut Select */}
          <div>
            <label htmlFor="statut" className="block mr-2">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Statut</span>
              <Select
                id="statut"
                name="statut"
                value={newStockData.statut}
                onValueChange={(value) => setNewStockData(prev => ({ ...prev, statut: value }))}
                placeholder="Select a statut"
                labelPlacement="outside"
                classNames={{
                  trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg',
                }}
                required
              >
                <SelectItem value="" disabled>Select Statut</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                {/* Add more options as needed */}
              </Select>
            </label>
          </div>

          

          {/* Comment Input */}
          <div className="flex flex-col w-full">
            <div className="relative flex-1">
              {/* Static Label */}
              <label
                htmlFor="comment"
                className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                  focusedRow || newStockData.comment
                    ? 'transform -translate-y-4 scale-90'
                    : ''
                }`}
              >
                Comment
              </label>

              {/* Input Field */}
              <input
                type="text"
                id="comment"
                name="comment"
                value={newStockData.comment}
                onChange={handleNewStockChange}
                onFocus={() => setFocusedRow(true)}
                onBlur={() => setFocusedRow(false)}
                className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
                placeholder=""
              />

              {/* Custom Line */}
              <div
                className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                  newStockData.comment
                    ? 'bg-[#0258E8]'
                    : isDarkMode
                    ? 'bg-gray-600'
                    : 'bg-gray-300'
                }`}
              ></div>
            </div>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-center space-x-2">
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

export default StockForm;
