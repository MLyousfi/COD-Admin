// Warehouse.jsx
import React, { useState, useEffect } from 'react';
import {
  DeliveryBox01Icon,
  PlusSignIcon,
  PencilEdit01Icon,
  Delete01Icon,
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import StatusTabs from '../../shared/components/StatusTabs';

import Table from '../../shared/components/Table'; 
import CustomModal from '../../shared/components/modal'; 

// Import Select components from @nextui-org/react
import { Select, SelectItem } from '@nextui-org/select';

const columns = [
  { key: "checkbox", label: "#" },
  { key: "warehouseCode", label: "Warehouse Code" },
  { key: "warehouseName", label: "Warehouse Name" },
  { key: "country", label: "Country" },
  { key: "quantity", label: "Quantity" },
  { key: "statut", label: "Statut" },
  { key: "options", label: "Options" },
];

const Warehouse = () => {
  const [activeView, setActiveView] = useState('active');
  const [products, setProducts] = useState([
    {
      key: 1,
      warehouseCode: 'WH-001',
      warehouseName: 'Main Warehouse',
      country: 'Saudi Arabia',
      quantity: 150,
      statut: 'enabled',
      city: 'Riyadh',
      description: 'Primary storage facility.',
    },
    {
      key: 2,
      warehouseCode: 'WH-002',
      warehouseName: 'Secondary Warehouse',
      country: 'UAE',
      quantity: 200,
      statut: 'disabled',
      city: 'Dubai',
      description: 'Secondary storage facility.',
    },
    {
      key: 3,
      warehouseCode: 'WH-003',
      warehouseName: 'East Warehouse',
      country: 'Kuwait',
      quantity: 100,
      statut: 'enabled',
      city: 'Kuwait City',
      description: 'Eastern region storage.',
    },
    // Additional Sample Rows
    {
      key: 4,
      warehouseCode: 'WH-004',
      warehouseName: 'West Warehouse',
      country: 'Egypt',
      quantity: 250,
      statut: 'enabled',
      city: 'Cairo',
      description: 'Western region storage.',
    },
    {
      key: 5,
      warehouseCode: 'WH-005',
      warehouseName: 'North Warehouse',
      country: 'Qatar',
      quantity: 180,
      statut: 'disabled',
      city: 'Doha',
      description: 'Northern region storage.',
    },
    {
      key: 6,
      warehouseCode: 'WH-006',
      warehouseName: 'South Warehouse',
      country: 'Bahrain',
      quantity: 220,
      statut: 'enabled',
      city: 'Manama',
      description: 'Southern region storage.',
    },
    {
      key: 7,
      warehouseCode: 'WH-007',
      warehouseName: 'Central Warehouse',
      country: 'Oman',
      quantity: 300,
      statut: 'disabled',
      city: 'Muscat',
      description: 'Central storage facility.',
    },
    {
      key: 8,
      warehouseCode: 'WH-008',
      warehouseName: 'Old Warehouse',
      country: 'Lebanon',
      quantity: 90,
      statut: 'disabled',
      city: 'Beirut',
      description: 'Old storage facility.',
    },
    {
      key: 9,
      warehouseCode: 'WH-009',
      warehouseName: 'New Warehouse 2',
      country: 'Jordan',
      quantity: 160,
      statut: 'enabled',
      city: 'Amman',
      description: 'New storage facility 2.',
    },
    {
      key: 10,
      warehouseCode: 'WH-010',
      warehouseName: 'Temporary Warehouse',
      country: 'Morocco',
      quantity: 75,
      statut: 'enabled',
      city: 'Casablanca',
      description: 'Temporary storage facility.',
    },
    {
      key: 11,
      warehouseCode: 'WH-011',
      warehouseName: 'Overflow Warehouse',
      country: 'Tunisia',
      quantity: 130,
      statut: 'disabled',
      city: 'Tunis',
      description: 'Overflow storage.',
    },
    {
      key: 12,
      warehouseCode: 'WH-012',
      warehouseName: 'Backup Warehouse',
      country: 'Algeria',
      quantity: 210,
      statut: 'enabled',
      city: 'Algiers',
      description: 'Backup storage facility.',
    },
    {
      key: 13,
      warehouseCode: 'WH-013',
      warehouseName: 'Logistics Warehouse',
      country: 'Libya',
      quantity: 95,
      statut: 'disabled',
      city: 'Tripoli',
      description: 'Logistics storage.',
    },
    {
      key: 14,
      warehouseCode: 'WH-014',
      warehouseName: 'Retail Warehouse',
      country: 'Iraq',
      quantity: 175,
      statut: 'enabled',
      city: 'Baghdad',
      description: 'Retail storage facility.',
    },
    {
      key: 15,
      warehouseCode: 'WH-015',
      warehouseName: 'Export Warehouse',
      country: 'Syria',
      quantity: 140,
      statut: 'disabled',
      city: 'Damascus',
      description: 'Handles export operations.',
    },
  ]);
  
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalView, setModalView] = useState('warehouses');
  const [modalType, setModalType] = useState(null); // 'view', 'new', or 'edit'
  const [activeNewProductSection, setActiveNewProductSection] = useState('informations'); // 'informations', 'stocks', 'salesPrice', 'upsell'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const rowsPerPage = 10;

  // State for adding a new warehouse
  const [newWarehouse, setNewWarehouse] = useState({
    warehouseName: '',
    statut: 'enabled',
    country: '',
    city: '',
    description: '',
  });

  // State for editing a warehouse
  const [editWarehouse, setEditWarehouse] = useState(null);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

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

  // Handle checkbox changes
  const handleCheckboxChange = (keys, isRange) => {
    if (isRange) {
      // Add all keys in the range
      setSelectedRows((prevSelected) => {
        const newSelection = [...prevSelected];
        keys.forEach((key) => {
          if (!newSelection.includes(key)) {
            newSelection.push(key);
          }
        });
        return newSelection;
      });
    } else if (Array.isArray(keys)) {
      // Select all or unselect all
      setSelectedRows(keys);
    } else {
      // Toggle single selection
      setSelectedRows((prevSelected) =>
        prevSelected.includes(keys)
          ? prevSelected.filter((key) => key !== keys)
          : [...prevSelected, keys]
      );
    }
  };

  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this warehouse?")) {
      setProducts(products.filter(entry => entry.key !== key));
      setSelectedRows(selectedRows.filter(selectedKey => selectedKey !== key));
    }
  };

  const handleEdit = (key) => {
    const product = products.find((p) => p.key === key);
    if (product) {
      setSelectedProduct(product);
      setEditWarehouse({ ...product }); // Create a copy for editing
      setModalType('edit');
      setIsModalOpen(true);
    }
  };

  const handleOpenNewProductModal = () => {
    setModalType('new');
    setActiveNewProductSection('informations'); // Default to 'informations' when opening new product modal
    setNewWarehouse({
      warehouseName: '',
      statut: 'enabled',
      country: '',
      city: '',
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setModalType(null);
    setEditWarehouse(null);
    setShowSaveMessage(false);
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewWarehouse(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddWarehouse = () => {
    // Simple validation
    if (!newWarehouse.warehouseName || !newWarehouse.country || !newWarehouse.city) {
      alert("Please fill in all required fields.");
      return;
    }

    const newProduct = {
      key: products.length + 1,
      warehouseCode: `WH-${String(products.length + 1).padStart(3, '0')}`,
      warehouseName: newWarehouse.warehouseName,
      country: newWarehouse.country,
      city: newWarehouse.city,
      quantity: 0,
      statut: newWarehouse.statut,
      description: newWarehouse.description,
    };

    setProducts([...products, newProduct]);
    handleCloseModal();
  };

  // Handle input changes for editing
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditWarehouse((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update the product in the products list
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.key === editWarehouse.key ? { ...product, [name]: value } : product
      )
    );

    // Show the save message
    setShowSaveMessage(true);

    // Hide the message after 5 seconds
    setTimeout(() => {
      setShowSaveMessage(false);
    }, 5000);
  };

  const filteredProducts = products.filter(product => {
    if (activeView === 'active') return product.statut === 'enabled';
    if (activeView === 'archived') return product.statut === 'disabled';
    return true;
  });

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={selectedRows.includes(item.key)}
            onChange={() => handleCheckboxChange(item.key)}
            className={`form-checkbox h-5 w-5 ${
              isDarkMode ? 'text-white bg-gray-700 border-gray-600' : 'text-blue-600 bg-white border-gray-300'
            }`}
          />
        );
      
      case "options":
        return (
          <div className="flex space-x-2 justify-center">
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
              onClick={() => handleEdit(item.key)}
              aria-label="Edit Warehouse"
            >
              <PencilEdit01Icon size={17} style={{ color: 'white' }} />
            </Button>
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#ED0006', padding: 0, minWidth: '32px', height: '32px' }}
              onClick={() => handleDelete(item.key)}
              aria-label="Delete Warehouse"
            >
              <Delete01Icon size={16} style={{ color: 'white' }} />
            </Button>
          </div>
        );

      case "statut":
        return (
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              item.statut === 'enabled'
                ? 'text-[#16A34E] bg-[#00FF6620]'
                : 'text-[#ED0006] bg-[#ED000620]'
            }`}
          >
            {item.statut.charAt(0).toUpperCase() + item.statut.slice(1)}
          </span>
        );

      default:
        return <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>{item[columnKey]}</span>;
    }
  };

  return (
    <DashboardLayout title="First Mile - Warehouse" icon={<DeliveryBox01Icon className="text-info" />}>
      <div className="p-2 md:p-4">
        {/* === Updated Flex Container === */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          {/* Buttons Container */}
          <div className="order-1 md:order-2 flex gap-2 flex-wrap w-full md:w-auto justify-end">
            <Button 
              color="default" 
              onClick={handleOpenNewProductModal} // Updated to open modal
              className="rounded-full flex items-center space-x-2 px-4 py-2"
              style={{ backgroundColor: '#0258E8', color: 'white' }}  
            >
              <PlusSignIcon size={18} className="flex-shrink-0" /> 
              <span className="text-sm sm:text-base">New Warehouse</span>
            </Button>
            <Button
              color="default"
              className="rounded-full flex items-center space-x-2 px-4 py-2"
              style={{ backgroundColor: '#ED0006', color: 'white' }}
            >
              <PencilEdit01Icon size={18} className="flex-shrink-0" /> 
              <span className="text-sm sm:text-base">Actions</span>
            </Button>
          </div>

          {/* StatusTabs */}
          <div className="order-2 md:order-1 w-full md:w-auto">
            <StatusTabs
              activeCount={products.filter(product => product.statut === "enabled").length}
              archivedCount={products.filter(product => product.statut === "disabled").length}
              selectedTab={activeView}
              onTabChange={setActiveView}
            />
          </div>
        </div>
        {/* === End of Updated Flex Container === */}

        <Table
          columns={columns}
          data={filteredProducts}
          renderCell={renderCell}
          handleCheckboxChange={handleCheckboxChange}
          selectedRows={selectedRows}
          rowsPerPage={rowsPerPage}
          className="dark:bg-gray-800 dark:text-white"
        />

        {/* Custom Modal Component */}
        <CustomModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={
            modalType === 'new'
              ? "New Warehouse" 
              : modalType === 'edit' && selectedProduct
              ? `Edit Warehouse - ${selectedProduct.warehouseName}`
              : "Warehouse Details"
          }
          isDarkMode={isDarkMode}
          width='800px'
        >
          {modalType === 'view' ? (
            /* Existing Modal Content for Viewing Warehouse */
            <>
              {/* Warehouse Details */}
              <div className="space-y-4">
                <p><strong>Warehouse Code:</strong> {selectedProduct.warehouseCode}</p>
                <p><strong>Warehouse Name:</strong> {selectedProduct.warehouseName}</p>
                <p><strong>Country:</strong> {selectedProduct.country}</p>
                <p><strong>City:</strong> {selectedProduct.city}</p>
                <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
                <p><strong>Statut:</strong> {selectedProduct.statut}</p>
                <p><strong>Description:</strong> {selectedProduct.description}</p>
              </div>
            </>
          ) : modalType === 'new' ? (
            /* New Warehouse Modal Content */
            <>
              {/* === Add New Warehouse Form === */}
              <div className="space-y-6 mt-10">
                {/* Row 1: Warehouse Name */}
                <div className="flex flex-col w-full">
                  <label htmlFor="warehouseName" className="block relative">
                    <input
                      type="text"
                      id="warehouseName"
                      name="warehouseName"
                      value={newWarehouse.warehouseName}
                      onChange={handleNewInputChange}
                      className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                      placeholder=""
                    />
                    <label
                      htmlFor="warehouseName"
                      className={`absolute top-4 left-0 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                        newWarehouse.warehouseName ? 'transform -translate-y-4 scale-90' : ''
                      }`}
                    >
                      Warehouse Name
                    </label>
                    {/* Custom Line */}
                    <div
                      className={`absolute bottom-1 left-0 h-px w-full transition-colors duration-300 ${
                        newWarehouse.warehouseName
                          ? 'bg-[#0258E8]'
                          : isDarkMode
                          ? 'bg-gray-600'
                          : 'bg-gray-300'
                      }`}
                    ></div>
                  </label>
                </div>

                {/* Row 2: Statut and Country */}
                <div className="flex flex-col lg:flex-row lg:space-x-4 w-full">
                  {/* Statut Select */}
                  <div className="w-full lg:w-1/2">
                    <label htmlFor="statut" className="block mt-4 lg:mt-0">
                      <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Statut</span>
                      <Select
                        id="statut"
                        placeholder="Select statut"
                        labelPlacement="outside"
                        value={newWarehouse.statut}
                        onChange={(value) => setNewWarehouse(prev => ({ ...prev, statut: value }))}
                        classNames={{
                          trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg',
                        }}
                      >
                        <SelectItem key="enabled">Enabled</SelectItem>
                        <SelectItem key="disabled">Disabled</SelectItem>
                      </Select>
                    </label>
                  </div>

                  {/* Country Select */}
                  <div className="w-full lg:w-1/2">
                    <label htmlFor="country" className="block mt-4 lg:mt-0">
                      <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Country</span>
                      <Select
                        id="country"
                        placeholder="Select country"
                        labelPlacement="outside"
                        value={newWarehouse.country}
                        onChange={(value) => setNewWarehouse(prev => ({ ...prev, country: value }))}
                        classNames={{
                          trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg',
                        }}
                      >
                        <SelectItem key="">Select Country</SelectItem>
                        <SelectItem key="Saudi Arabia">Saudi Arabia</SelectItem>
                        <SelectItem key="UAE">UAE</SelectItem>
                        <SelectItem key="Kuwait">Kuwait</SelectItem>
                        <SelectItem key="Egypt">Egypt</SelectItem>
                        <SelectItem key="Qatar">Qatar</SelectItem>
                        <SelectItem key="Bahrain">Bahrain</SelectItem>
                        <SelectItem key="Oman">Oman</SelectItem>
                        <SelectItem key="Lebanon">Lebanon</SelectItem>
                        <SelectItem key="Jordan">Jordan</SelectItem>
                        <SelectItem key="Morocco">Morocco</SelectItem>
                        <SelectItem key="Tunisia">Tunisia</SelectItem>
                        <SelectItem key="Algeria">Algeria</SelectItem>
                        <SelectItem key="Libya">Libya</SelectItem>
                        <SelectItem key="Iraq">Iraq</SelectItem>
                        <SelectItem key="Syria">Syria</SelectItem>
                        {/* Add more countries as needed */}
                      </Select>
                    </label>
                  </div>
                </div>

                {/* Row 3: City */}
                <div className="flex flex-col lg:flex-row lg:space-x-4 w-full">
                  {/* City Select */}
                  <div className="w-full lg:w-1/2">
                    <label htmlFor="city" className="block mt-4 lg:mt-0">
                      <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">City</span>
                      <Select
                        id="city"
                        placeholder="Select city"
                        labelPlacement="outside"
                        value={newWarehouse.city}
                        onChange={(value) => setNewWarehouse(prev => ({ ...prev, city: value }))}
                        classNames={{
                          trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg',
                        }}
                      >
                        <SelectItem key="">Select City</SelectItem>
                        <SelectItem key="Riyadh">Riyadh</SelectItem>
                        <SelectItem key="Dubai">Dubai</SelectItem>
                        <SelectItem key="Kuwait City">Kuwait City</SelectItem>
                        <SelectItem key="Cairo">Cairo</SelectItem>
                        <SelectItem key="Doha">Doha</SelectItem>
                        <SelectItem key="Manama">Manama</SelectItem>
                        <SelectItem key="Muscat">Muscat</SelectItem>
                        <SelectItem key="Beirut">Beirut</SelectItem>
                        <SelectItem key="Amman">Amman</SelectItem>
                        <SelectItem key="Casablanca">Casablanca</SelectItem>
                        <SelectItem key="Tunis">Tunis</SelectItem>
                        <SelectItem key="Algiers">Algiers</SelectItem>
                        <SelectItem key="Tripoli">Tripoli</SelectItem>
                        <SelectItem key="Baghdad">Baghdad</SelectItem>
                        <SelectItem key="Damascus">Damascus</SelectItem>
                        {/* Add more cities as needed */}
                      </Select>
                    </label>
                  </div>
                </div>

                {/* Row 4: Description */}
                <div className="flex flex-col w-full">
                  <label htmlFor="description" className="block relative">
                    <input
                      id="description"
                      name="description"
                      value={newWarehouse.description}
                      onChange={handleNewInputChange}
                      className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                      placeholder=""
                      rows={4}
                    ></input>
                    <label
                      htmlFor="description"
                      className={`absolute top-4 left-0 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                        newWarehouse.description ? 'transform -translate-y-4 scale-90' : ''
                      }`}
                    >
                      Description
                    </label>
                    {/* Custom Line */}
                    <div
                      className={`absolute bottom-1 left-0 h-px w-full transition-colors duration-300 ${
                        newWarehouse.description
                          ? 'bg-[#0258E8]'
                          : isDarkMode
                          ? 'bg-gray-600'
                          : 'bg-gray-300'
                      }`}
                    ></div>
                  </label>
                </div>

                {/* === Buttons Section === */}
                <div className="flex justify-center space-x-4 mt-6">
                  <Button
                    color="primary"
                    onClick={handleAddWarehouse}
                    className="px-6 py-2 bg-info rounded-full"
                  >
                    Validate
                  </Button>
                  <Button
                    color="secondary"
                    onClick={handleCloseModal}
                    className="px-6 py-2 rounded-full bg-transparent border dark:text-white text-black dark:border-white border-black"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
              {/* === End of Add New Warehouse Form === */}
            </>
          ) : modalType === 'edit' && editWarehouse ? (
            /* Edit Warehouse Modal Content */
            <>
              {/* === Edit Warehouse Form === */}
              <div className="space-y-6 mt-10">
                {/* Row 1: Warehouse Name */}
                <div className="flex flex-col w-full">
                  <label htmlFor="warehouseName" className="block relative">
                    <input
                      type="text"
                      id="warehouseName"
                      name="warehouseName"
                      value={editWarehouse.warehouseName}
                      onChange={handleEditInputChange}
                      className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                      placeholder=""
                    />
                    <label
                      htmlFor="warehouseName"
                      className={`absolute top-4 left-0 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                        editWarehouse.warehouseName ? 'transform -translate-y-4 scale-90' : ''
                      }`}
                    >
                      Warehouse Name *
                    </label>
                    {/* Custom Line */}
                    <div
                      className={`absolute bottom-1 left-0 h-px w-full transition-colors duration-300 ${
                        editWarehouse.warehouseName
                          ? 'bg-[#0258E8]'
                          : isDarkMode
                          ? 'bg-gray-600'
                          : 'bg-gray-300'
                      }`}
                    ></div>
                  </label>
                </div>

                {/* Row 2: Statut and Country */}
                <div className="flex flex-col lg:flex-row lg:space-x-4 w-full">
                  {/* Statut Select */}
                  <div className="w-full lg:w-1/2">
                    <label htmlFor="statut" className="block mt-4 lg:mt-0">
                      <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Statut *</span>
                      <Select
                        id="statut"
                        placeholder="Select statut"
                        labelPlacement="outside"
                        value={editWarehouse.statut}
                        onChange={(value) => setEditWarehouse(prev => ({ ...prev, statut: value }))}
                        classNames={{
                          trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg',
                        }}
                      >
                        <SelectItem key="enabled">Enabled</SelectItem>
                        <SelectItem key="disabled">Disabled</SelectItem>
                      </Select>
                    </label>
                  </div>

                  {/* Country Select */}
                  <div className="w-full lg:w-1/2">
                    <label htmlFor="country" className="block mt-4 lg:mt-0">
                      <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Country *</span>
                      <Select
                        id="country"
                        placeholder="Select country"
                        labelPlacement="outside"
                        value={editWarehouse.country}
                        onChange={(value) => setEditWarehouse(prev => ({ ...prev, country: value }))}
                        classNames={{
                          trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg',
                        }}
                      >
                        <SelectItem key="">Select Country</SelectItem>
                        <SelectItem key="Saudi Arabia">Saudi Arabia</SelectItem>
                        <SelectItem key="UAE">UAE</SelectItem>
                        <SelectItem key="Kuwait">Kuwait</SelectItem>
                        <SelectItem key="Egypt">Egypt</SelectItem>
                        <SelectItem key="Qatar">Qatar</SelectItem>
                        <SelectItem key="Bahrain">Bahrain</SelectItem>
                        <SelectItem key="Oman">Oman</SelectItem>
                        <SelectItem key="Lebanon">Lebanon</SelectItem>
                        <SelectItem key="Jordan">Jordan</SelectItem>
                        <SelectItem key="Morocco">Morocco</SelectItem>
                        <SelectItem key="Tunisia">Tunisia</SelectItem>
                        <SelectItem key="Algeria">Algeria</SelectItem>
                        <SelectItem key="Libya">Libya</SelectItem>
                        <SelectItem key="Iraq">Iraq</SelectItem>
                        <SelectItem key="Syria">Syria</SelectItem>
                        {/* Add more countries as needed */}
                      </Select>
                    </label>
                  </div>
                </div>

                {/* Row 3: City */}
                <div className="flex flex-col lg:flex-row lg:space-x-4 w-full">
                  {/* City Select */}
                  <div className="w-full lg:w-1/2">
                    <label htmlFor="city" className="block mt-4 lg:mt-0">
                      <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">City *</span>
                      <Select
                        id="city"
                        placeholder="Select city"
                        labelPlacement="outside"
                        value={editWarehouse.city}
                        onChange={(value) => setEditWarehouse(prev => ({ ...prev, city: value }))}
                        classNames={{
                          trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg',
                        }}
                      >
                        <SelectItem key="">Select City</SelectItem>
                        <SelectItem key="Riyadh">Riyadh</SelectItem>
                        <SelectItem key="Dubai">Dubai</SelectItem>
                        <SelectItem key="Kuwait City">Kuwait City</SelectItem>
                        <SelectItem key="Cairo">Cairo</SelectItem>
                        <SelectItem key="Doha">Doha</SelectItem>
                        <SelectItem key="Manama">Manama</SelectItem>
                        <SelectItem key="Muscat">Muscat</SelectItem>
                        <SelectItem key="Beirut">Beirut</SelectItem>
                        <SelectItem key="Amman">Amman</SelectItem>
                        <SelectItem key="Casablanca">Casablanca</SelectItem>
                        <SelectItem key="Tunis">Tunis</SelectItem>
                        <SelectItem key="Algiers">Algiers</SelectItem>
                        <SelectItem key="Tripoli">Tripoli</SelectItem>
                        <SelectItem key="Baghdad">Baghdad</SelectItem>
                        <SelectItem key="Damascus">Damascus</SelectItem>
                        {/* Add more cities as needed */}
                      </Select>
                    </label>
                  </div>
                </div>

                {/* Row 4: Description */}
                <div className="flex flex-col w-full">
                  <label htmlFor="description" className="block relative">
                    <textarea
                      id="description"
                      name="description"
                      value={editWarehouse.description}
                      onChange={handleEditInputChange}
                      className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                      placeholder=""
                      rows={4}
                    ></textarea>
                    <label
                      htmlFor="description"
                      className={`absolute top-4 left-0 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                        editWarehouse.description ? 'transform -translate-y-4 scale-90' : ''
                      }`}
                    >
                      Description
                    </label>
                    {/* Custom Line */}
                    <div
                      className={`absolute bottom-1 left-0 h-px w-full transition-colors duration-300 ${
                        editWarehouse.description
                          ? 'bg-[#0258E8]'
                          : isDarkMode
                          ? 'bg-gray-600'
                          : 'bg-gray-300'
                      }`}
                    ></div>
                  </label>
                </div>

                {/* === Save Confirmation Message === */}
                {showSaveMessage && (
                  <div className="text-center text-blue-500 mt-8">
                    Your data has been saved automatically
                  </div>
                )}

                {/* === Buttons Section === */}
                <div className="flex justify-center space-x-4 mt-6">
                  <Button
                    color="primary"
                    onClick={handleCloseModal}
                    className="px-6 py-2 bg-info rounded-full"
                  >
                    Save Changes
                  </Button>
                  <Button
                    color="secondary"
                    onClick={handleCloseModal}
                    className="px-6 py-2 rounded-full bg-transparent border dark:text-white text-black dark:border-white border-black"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
              {/* === End of Edit Warehouse Form === */}
            </>
          ) : null}
        </CustomModal>
      </div>
    </DashboardLayout>
  );
};

export default Warehouse;
