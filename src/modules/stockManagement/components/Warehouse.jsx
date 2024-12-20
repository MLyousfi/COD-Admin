// Warehouse.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  GarageIcon,
  PlusSignIcon,
  PencilEdit01Icon,
  Delete01Icon,
  ArrowRight01Icon,
  Calculator01Icon,
  CallOutgoing01Icon,
  CustomerSupportIcon,
  Download01Icon,
  DropboxIcon,
  PrinterIcon,
  Settings02Icon,
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import StatusTabs from '../../shared/components/StatusTabs';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import Table from '../../shared/components/Table'; 
import CustomModal from '../../shared/components/modal'; 




const columns = [
  { key: "checkbox", label: "#" },
  { key: "warehouseCode", label: "Warehouse Code" },
  { key: "warehouseName", label: "Warehouse Name" },
  { key: "country", label: "Country" },
  { key: "quantity", label: "Quantity" },
  { key: "statut", label: "Statut" },
  { key: "options", label: "Options" },
];

const FirstMileWarehouse = () => {
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
      status:"active"

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
      status:"active"

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
      status:"active"
    },
    {
      key: 4,
      warehouseCode: 'WH-004',
      warehouseName: 'West Warehouse',
      country: 'Egypt',
      quantity: 250,
      statut: 'enabled',
      city: 'Cairo',
      description: 'Western region storage.',
      status:"active"
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
      status:"archived"

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
      status:"active"

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
      status:"archived"

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
      status:"active"

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
      status:"archived"

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
      status:"active"

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
      status:"active"

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
      status:"active"

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
      status:"active"

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
      status:"archived"

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
      status:"active"

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

  // Restore the original handleCheckboxChange function
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

    // Hide the message after 2 seconds
    setTimeout(() => {
      setShowSaveMessage(false);
    }, 5000);
  };

  const filteredProducts = products.filter((product) => {
    // Ensure product.status is a string and convert to lowercase
    const productStatus = typeof product.status === 'string' ? product.status.toLowerCase() : '';
    
    // Ensure activeView is in lowercase
    const currentView = activeView.toLowerCase();
  
    const statusMatch =
      currentView === 'active' ? productStatus === 'active' : productStatus === 'archived';
  
    // For 'statut', assuming it should match exactly. If case-insensitive is needed, apply similar logic.
    
  
    return statusMatch;
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
    <DashboardLayout title="Stock Management - Warehouses" icon={<GarageIcon className="text-info" />}>
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
           {/* Actions Dropdown */}
           <Dropdown>
              <DropdownTrigger>
                <Button
                  color="default"
                  className="rounded-full text-white bg-glb_red flex items-center"
                >
                  <PencilEdit01Icon size={18} className="mr-1" /> Actions
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="print">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <PrinterIcon size={15} /> Print
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="export">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Download01Icon size={15} /> Export
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="call-center">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <CustomerSupportIcon size={15} /> Call center
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="follow-up">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <CallOutgoing01Icon size={15} /> Follow up
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="shipping">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <DropboxIcon size={15} /> Shipping
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="general">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Settings02Icon size={15} /> General
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* StatusTabs */}
          <div className="order-2 md:order-1 w-full md:w-auto">
            <StatusTabs
              activeCount={products.filter(product => product.status === "active").length}
              archivedCount={products.filter(product => product.status === "archived").length}
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
              ? "Add New Warehouse" 
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
                {/* Row 1: Warehouse Name and Statut */}
                <div className="flex flex-col md:flex-row md:space-x-4">
                  {/* Warehouse Name */}
                  <div className="flex flex-col w-full md:w-1/2">
                    <div className="relative flex-1">
                      {/* Static Label */}
                      <label
                        htmlFor="warehouseName"
                        className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                          newWarehouse.warehouseName ? 'transform -translate-y-4 scale-90' : ''
                        }`}
                      >
                        Warehouse Name
                      </label>

                      {/* Input Field */}
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

                      {/* Custom Line */}
                      <div
                        className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                          newWarehouse.warehouseName
                            ? 'bg-[#0258E8]'
                            : isDarkMode
                            ? 'bg-gray-600'
                            : 'bg-gray-300'
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* Statut Select */}
                  <div className="flex flex-col w-full md:w-1/2 mt-6 md:mt-0">
                    <div className="relative flex-1">
                      {/* Static Label */}
                      <label
                        htmlFor="statut"
                        className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                          newWarehouse.statut ? 'transform -translate-y-4 scale-90' : ''
                        }`}
                      >
                        Statut
                      </label>

                      {/* Select Field */}
                      <select
                        id="statut"
                        name="statut"
                        value={newWarehouse.statut}
                        onChange={handleNewInputChange}
                        className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 appearance-none ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}
                        style={{
                          borderBottom: newWarehouse.statut ? '2px solid #0258E8' : isDarkMode ? '2px solid #4B5563' : '2px solid #D1D5DB',
                        }}
                      >
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                      </select>

                      {/* Dropdown Arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                            isModalOpen ? 'transform rotate-180' : ''
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Country and City */}
                <div className="flex flex-col md:flex-row md:space-x-4">
                  {/* Country Select */}
                  <div className="flex flex-col w-full md:w-1/2">
                    <div className="relative flex-1">
                      {/* Static Label */}
                      <label
                        htmlFor="country"
                        className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                          newWarehouse.country ? 'transform -translate-y-4 scale-90' : ''
                        }`}
                      >
                        Country
                      </label>

                      {/* Select Field */}
                      <select
                        id="country"
                        name="country"
                        value={newWarehouse.country}
                        onChange={handleNewInputChange}
                        className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 appearance-none ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}
                        style={{
                          borderBottom: newWarehouse.country ? '2px solid #0258E8' : isDarkMode ? '2px solid #4B5563' : '2px solid #D1D5DB',
                        }}
                      >
                        <option value=""></option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="UAE">UAE</option>
                        <option value="Kuwait">Kuwait</option>
                        {/* Add more countries as needed */}
                      </select>

                      {/* Dropdown Arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                            isModalOpen ? 'transform rotate-180' : ''
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* City Select */}
                  <div className="flex flex-col w-full md:w-1/2 mt-6 md:mt-0">
                    <div className="relative flex-1">
                      {/* Static Label */}
                      <label
                        htmlFor="city"
                        className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                          newWarehouse.city ? 'transform -translate-y-4 scale-90' : ''
                        }`}
                      >
                        City
                      </label>

                      {/* Select Field */}
                      <select
                        id="city"
                        name="city"
                        value={newWarehouse.city}
                        onChange={handleNewInputChange}
                        className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 appearance-none ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}
                        style={{
                          borderBottom: newWarehouse.city ? '2px solid #0258E8' : isDarkMode ? '2px solid #4B5563' : '2px solid #D1D5DB',
                        }}
                      >
                        <option value=""></option>
                        <option value="Riyadh">Riyadh</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Kuwait City">Kuwait City</option>
                        {/* Add more cities as needed */}
                      </select>

                      {/* Dropdown Arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                            isModalOpen ? 'transform rotate-180' : ''
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3: Description */}
                <div className="flex flex-col w-full">
                  <div className="relative flex-1">
                    {/* Static Label */}
                    <label
                      htmlFor="description"
                      className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                        newWarehouse.description ? 'transform -translate-y-4 scale-90' : ''
                      }`}
                    >
                      Description
                    </label>

                    {/* Textarea Field */}
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
                    />

                    {/* Custom Line */}
                    <div
                      className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                        newWarehouse.description
                          ? 'bg-[#0258E8]'
                          : isDarkMode
                          ? 'bg-gray-600'
                          : 'bg-gray-300'
                      }`}
                    ></div>
                  </div>
                </div>

                {/* === Buttons Section === */}
                <div className="flex justify-center space-x-4 mt-6">
                  <Button
                    color="primary"
                    onClick={handleAddWarehouse}
                    className="px-6 py-2 bg-info rounded-full"
                  >
                    Add Warehouse
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
                {/* Row 1: Warehouse Name and Statut */}
                <div className="flex flex-col md:flex-row md:space-x-4">
                  {/* Warehouse Name */}
                  <div className="flex flex-col w-full md:w-1/2">
                    <div className="relative flex-1">
                      {/* Static Label */}
                      <label
                        htmlFor="warehouseName"
                        className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                          editWarehouse.warehouseName ? 'transform -translate-y-4 scale-90' : ''
                        }`}
                      >
                        Warehouse Name
                      </label>

                      {/* Input Field */}
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

                      {/* Custom Line */}
                      <div
                        className={`absolute bottom-1 h-px w-full transition-colors duration-300 ${
                          editWarehouse.warehouseName
                            ? 'bg-[#0258E8]'
                            : isDarkMode
                            ? 'bg-gray-600'
                            : 'bg-gray-300'
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* Statut Select */}
                  <div className="flex flex-col w-full md:w-1/2 mt-6 md:mt-0">
                    <div className="relative flex-1">
                      {/* Static Label */}
                      <label
                        htmlFor="statut"
                        className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                          editWarehouse.statut ? 'transform -translate-y-4 scale-90' : ''
                        }`}
                      >
                        Statut
                      </label>

                      {/* Select Field */}
                      <select
                        id="statut"
                        name="statut"
                        value={editWarehouse.statut}
                        onChange={handleEditInputChange}
                        className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 appearance-none ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}
                        style={{
                          borderBottom: editWarehouse.statut ? '2px solid #0258E8' : isDarkMode ? '2px solid #4B5563' : '2px solid #D1D5DB',
                        }}
                      >
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                      </select>

                      {/* Dropdown Arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                            isModalOpen ? 'transform rotate-180' : ''
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Country and City */}
                <div className="flex flex-col md:flex-row md:space-x-4">
                  {/* Country Select */}
                  <div className="flex flex-col w-full md:w-1/2">
                    <div className="relative flex-1">
                      {/* Static Label */}
                      <label
                        htmlFor="country"
                        className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                          editWarehouse.country ? 'transform -translate-y-4 scale-90' : ''
                        }`}
                      >
                        Country
                      </label>

                      {/* Select Field */}
                      <select
                        id="country"
                        name="country"
                        value={editWarehouse.country}
                        onChange={handleEditInputChange}
                        className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 appearance-none ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}
                        style={{
                          borderBottom: editWarehouse.country ? '2px solid #0258E8' : isDarkMode ? '2px solid #4B5563' : '2px solid #D1D5DB',
                        }}
                      >
                        <option value="">Select Country</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="UAE">UAE</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Egypt">Egypt</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Oman">Oman</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Algeria">Algeria</option>
                        <option value="Libya">Libya</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Syria">Syria</option>
                        {/* Add more countries as needed */}
                      </select>

                      {/* Dropdown Arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                            isModalOpen ? 'transform rotate-180' : ''
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* City Select */}
                  <div className="flex flex-col w-full md:w-1/2 mt-6 md:mt-0">
                    <div className="relative flex-1">
                      {/* Static Label */}
                      <label
                        htmlFor="city"
                        className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                          editWarehouse.city ? 'transform -translate-y-4 scale-90' : ''
                        }`}
                      >
                        City
                      </label>

                      {/* Select Field */}
                      <select
                        id="city"
                        name="city"
                        value={editWarehouse.city}
                        onChange={handleEditInputChange}
                        className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 appearance-none ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}
                        style={{
                          borderBottom: editWarehouse.city ? '2px solid #0258E8' : isDarkMode ? '2px solid #4B5563' : '2px solid #D1D5DB',
                        }}
                      >
                        <option value="">Select City</option>
                        <option value="Riyadh">Riyadh</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Kuwait City">Kuwait City</option>
                        <option value="Cairo">Cairo</option>
                        <option value="Doha">Doha</option>
                        <option value="Manama">Manama</option>
                        <option value="Muscat">Muscat</option>
                        <option value="Beirut">Beirut</option>
                        <option value="Amman">Amman</option>
                        <option value="Casablanca">Casablanca</option>
                        <option value="Tunis">Tunis</option>
                        <option value="Algiers">Algiers</option>
                        <option value="Tripoli">Tripoli</option>
                        <option value="Baghdad">Baghdad</option>
                        <option value="Damascus">Damascus</option>
                        {/* Add more cities as needed */}
                      </select>

                      {/* Dropdown Arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                            isModalOpen ? 'transform rotate-180' : ''
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3: Description */}
                <div className="flex flex-col w-full">
                  <div className="relative flex-1">
                    {/* Static Label */}
                    <label
                      htmlFor="description"
                      className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                        editWarehouse.description ? 'transform -translate-y-4 scale-90' : ''
                      }`}
                    >
                      Description
                    </label>

                    {/* Textarea Field */}
                    <input
                      id="description"
                      name="description"
                      value={editWarehouse.description}
                      onChange={handleEditInputChange}
                      className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                      placeholder=""
                      rows={4}
                    />

                    {/* Custom Line */}
                    <div
                      className={`absolute bottom-1 h-px  w-full transition-colors duration-300 ${
                        editWarehouse.description
                          ? 'bg-[#0258E8]'
                          : isDarkMode
                          ? 'bg-gray-600'
                          : 'bg-gray-300'
                      }`}
                    ></div>
                  </div>
                </div>

                {/* === Save Confirmation Message === */}
                {showSaveMessage && (
                  <div className="text-center text-blue-500 mt-8">
                    Your data has been saved automatically
                  </div>
                )}

                
              </div>
              {/* === End of Edit Warehouse Form === */}
            </>
          ) : null}
        </CustomModal>
      </div>
    </DashboardLayout>
  );
};

export default FirstMileWarehouse;
