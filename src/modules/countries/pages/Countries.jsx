// Countries.jsx
import React, { useState, useEffect } from 'react';
import { 
  PencilEdit01Icon, 
  PlusSignIcon, 
  Delete01Icon, 
  EarthIcon,
  Download02Icon,
  ArrowLeft01Icon, 
  ArrowRight01Icon,
  CloudUploadIcon,
  GoogleIcon,
  MultiplicationSignIcon,
  DocumentAttachmentIcon
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table';
import { rows } from '../../../core/utils/data5';
import Flag from 'react-world-flags';
import CustomModal from '../../stockManagement.jsx/components/modal'; 
import InformationSection from '../components/InformationSection';

// Define ICON_SIZE constant
const ICON_SIZE = 16;

// Define columns for the Countries Table
const columns = [
  { key: "checkbox", label: "#" },
  { key: "id", label: "Id" },
  { key: "name", label: "Name" },
  { key: "slogan", label: "Slogan" },
  { key: "shipping", label: "Shipping" },
  { key: "tags", label: "Tags" },
  { key: "options", label: "Actions" },
];

// Mapping of country names to country codes
const countryCodeMap = {
  "United States": "US",
  "Canada": "CA",
  "Japan": "JP",
  "Germany": "DE",
  "Brazil": "BR",
  "Australia": "AU",
  "India": "IN",
  "China": "CN",
  "France": "FR",
  "Italy": "IT",
  "United Kingdom": "GB",
  "South Korea": "KR",
  "Mexico": "MX",
  "Russia": "RU",
  "South Africa": "ZA",
  "Argentina": "AR",
  "Saudi Arabia": "SA",
  "Turkey": "TR",
  "Netherlands": "NL",
  "Switzerland": "CH",
};

// Sample Cities Data
const sampleCities = [
  { id: 1, cityCode: 'C001', destCode: 'D001', province: 'Aldayeen', name: 'Alskhama', arabicName: 'مدينة واحدة', zipCode: '12345', available: 'Yes' },
  { id: 2, cityCode: 'C002', destCode: 'D002', province: 'Aldayeen', name: 'Alskhama', arabicName: 'مدينة اثنين', zipCode: '23456', available: 'No' },
  { id: 3, cityCode: 'C003', destCode: 'D003', province: 'Aldayeen', name: 'Alskhama', arabicName: 'مدينة ثلاثة', zipCode: '34567', available: 'Yes' },
  { id: 4, cityCode: 'C004', destCode: 'D004', province: 'Aldayeen', name: 'Alskhama', arabicName: 'مدينة أربعة', zipCode: '45678', available: 'Yes' },
  { id: 5, cityCode: 'C005', destCode: 'D005', province: 'Aldayeen', name: 'Alskhama', arabicName: 'مدينة خمسة', zipCode: '56789', available: 'No' },
];

const Countries = () => {
  // State Variables
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);     
  const [isNewCountryModalOpen, setIsNewCountryModalOpen] = useState(false); 
  const [currentCountry, setCurrentCountry] = useState(null);        

  // New State Variable for Import Modal
  const [isImportModalOpen, setIsImportModalOpen] = useState(false); // <--- Added

  // Separate form data for Create and Edit
  const [createFormData, setCreateFormData] = useState({
    name: '',
    tags: '',
    countryCode: '',
    shipping: 'Yes',
  });

  const [editFormData, setEditFormData] = useState({
    name: '',
    tags: '',
    countryCode: '',
    shipping: 'Yes',
  });

  // State for Cities in New Country Modal
  const [cities, setCities] = useState(sampleCities);

  // Pagination States for Cities Table
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Fixed rows per page

  // State for Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // State Variable for Active Tab in New Country Modal
  const [activeTab, setActiveTab] = useState('information'); // 'information' or 'cities'

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

  // Pagination Logic for Cities Table
  const totalPages = Math.ceil(cities.length / rowsPerPage);
  const enablePagination = true; // Always enable pagination

  useEffect(() => {
    console.log("Total Pages:", totalPages);
    console.log("Enable Pagination:", enablePagination);
  }, [totalPages, enablePagination]);

  // Handlers to open and close Create Modal
  const openCreateModal = () => {
    setCreateFormData({
      name: '',
      tags: '',
      countryCode: '',
      shipping: 'Yes',
    });
    setIsCreateModalOpen(true);
    setCurrentPage(1); 
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setCreateFormData({
      name: '',
      tags: '',
      countryCode: '',
      shipping: 'Yes',
    });
  };

  // Handlers to open and close Edit Modal
  const openEditModal = (country) => {
    console.log('Editing Country:', country); 
    setCurrentCountry(country);
    setEditFormData({
      name: country.name || '',
      tags: country.tags || '',
      countryCode: country.countryCode || '',
      shipping: country.shipping || 'Yes',
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentCountry(null);
    setEditFormData({
      name: '',
      tags: '',
      countryCode: '',
      shipping: 'Yes',
    });
  };

  // Handlers to open and close New Country Modal
  const openNewCountryModal = () => {
    setIsNewCountryModalOpen(true);
    setActiveTab('information'); // Default to 'information' tab
    setCurrentPage(1); 
  };

  const closeNewCountryModal = () => {
    setIsNewCountryModalOpen(false);
    setActiveTab('information'); // Reset to 'information' tab
    // Reset form data if needed
    setCreateFormData({
      name: '',
      tags: '',
      countryCode: '',
      shipping: 'Yes',
    });
  };

  // New Handlers to open and close Import Modal
  const openImportModal = () => {
    setIsImportModalOpen(true);
  };

  const closeImportModal = () => {
    setIsImportModalOpen(false);
  };

  // Function to switch tabs
  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const handleCreateCountry = () => {
    const { name, tags, countryCode, shipping } = createFormData;

    if (!name.trim() || !tags.trim() || !countryCode.trim()) {
      alert("Please fill in all the required fields.");
      return;
    }

    const newCountry = {
      key: (products.length + 1).toString(),
      id: products.length + 1,
      name: name.trim(),
      slogan: "Sample Slogan", 
      shipping,
      tags: tags.trim(),
      countryCode: countryCode.trim(),
    };

    setProducts([...products, newCountry]);
    closeCreateModal();
  };

  // Handler to update an existing country
  const handleUpdateCountry = () => {
    const { name, tags, countryCode, shipping } = editFormData;

    // Simple validation
    if (!name.trim() || !tags.trim() || !countryCode.trim()) {
      alert("Please fill in all the required fields.");
      return;
    }

    const updatedCountries = products.map((country) => {
      if (country.key === currentCountry.key) {
        return {
          ...country,
          name: name.trim(),
          tags: tags.trim(),
          countryCode: countryCode.trim(),
          shipping,
        };
      }
      return country;
    });

    setProducts(updatedCountries);
    closeEditModal();
  };

  // Handlers for checkbox selection
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

  // Handlers for create input changes
  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handlers for edit input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for specific page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={selectedRows.includes(item.key)}
            onChange={() => handleCheckboxChange(item.key)}
            className="h-4 w-4"
          />
        );
      case "slogan":
        return (
          <div className="flex items-center text-xs whitespace-nowrap"> 
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginRight: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Flag
                code={countryCodeMap[item.name]}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span className="font-bold">{item.name}</span>
          </div>
        );
      case "shipping":
        return (
          <span className={`rounded-full px-2 py-1 text-xs ${item.shipping === "Yes" ? "bg-green-600 bg-opacity-20 text-green-600" : "bg-red-600 bg-opacity-20 text-red-600"}`}>
            {item.shipping}
          </span>
        );
      case "options":
        return (
          <div className="flex space-x-2 justify-center">
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#0258E8', minWidth: '32px', height: '32px' }}
              onClick={() => openEditModal(item)}
              aria-label={`Edit ${item.name}`}
            >
              <PencilEdit01Icon size={14} style={{ color: 'white' }} />
            </Button>
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#ED0006', minWidth: '32px', height: '32px' }}
              onClick={() => handleDelete(item.key)}
              aria-label={`Delete ${item.name}`}
            >
              <Delete01Icon size={14} style={{ color: 'white' }} />
            </Button>
          </div>
        );
      default:
        return <span className="text-xs dark:text-white">{item[columnKey]}</span>;
    }
  };

  const renderCityRow = (city, index) => {
    const isEven = index % 2 === 0;
    const bgColor = isDarkMode 
      ? (isEven ? '#FFFFFF02' : '#FFFFFF08') 
      : (isEven ? '#00000008' : '#00000002'); 
    return (
      <tr key={city.id} style={{ backgroundColor: bgColor }}>
        <td className="px-4 py-2 text-xs">{city.cityCode}</td>
        <td className="px-4 py-2 text-xs">{city.destCode}</td>
        <td className="px-4 py-2 text-xs">{city.province}</td>
        <td className="px-4 py-2 text-xs">{city.name}</td>
        <td className="px-4 py-2 text-xs">{city.arabicName}</td>
        <td className="px-4 py-2 text-xs">{city.zipCode}</td>
        <td className="px-4 py-2 text-xs flex justify-center">
          <span className={`rounded-full px-2 py-1 text-xs ${city.available === 'Yes' ? 'bg-green-600 bg-opacity-20 text-green-600' : 'bg-red-600 bg-opacity-20 text-red-600'}`}>
            {city.available}
          </span>
        </td>
      </tr>
    );
  };

  const currentCities = React.useMemo(() => {
    return cities.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  }, [cities, currentPage, rowsPerPage]);

  // Placeholder for delete functionality
  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      setProducts(products.filter(country => country.key !== key));
    }
  };

  return (
    <DashboardLayout title="Countries" icon={<EarthIcon className="text-info" />}>
      <div className="p-4">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mb-4"> 
          <Button 
            color="default" 
            className="rounded-full flex items-center gap-2" 
            style={{ backgroundColor: '#0258E8', color: 'white' }}  
            onClick={openNewCountryModal} 
          >
            <PlusSignIcon size={18} /> New Country 
          </Button>
          <Button 
            color="default" 
            className="rounded-full flex items-center gap-2" 
            style={{ backgroundColor: '#ED0006', color: 'white' }} 
            onClick={() => alert('Actions functionality to be implemented')} 
          >
            <PencilEdit01Icon size={18} style={{ color: 'white' }} /> Actions 
          </Button>
        </div>

        {/* Countries Table */}
        <Table 
          columns={columns} 
          data={products}  
          renderCell={renderCell} 
          handleCheckboxChange={handleCheckboxChange}
          selectedRows={selectedRows} 
          rowsPerPage={10}  
          className="dark:bg-gray-800 dark:text-white text-xs" 
        />
      </div>

      {/* Custom Modal for Creating New Country */}
      <CustomModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title="Add New Country" 
        isDarkMode={isDarkMode}
      >
        <div className="flex flex-col">
          {/* Form Inputs */}
          <div className="flex flex-col gap-4">
            {/* Country Name Input */}
            <div>
              <label
                htmlFor="create-name"
                className="block text-sm text-gray-500 mb-1"
              >
                Country Name
              </label>
              <input
                type="text"
                id="create-name"
                name="name"
                value={createFormData.name}
                onChange={handleCreateInputChange}
                className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                placeholder="Enter country name"
              />
            </div>

            {/* Tags Input */}
            <div>
              <label
                htmlFor="create-tags"
                className="block text-sm text-gray-500 mb-1"
              >
                Tags
              </label>
              <input
                type="text"
                id="create-tags"
                name="tags"
                value={createFormData.tags}
                onChange={handleCreateInputChange}
                className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                placeholder="Public key"
              />
            </div>

            {/* Country Code Input */}
            <div>
              <label
                htmlFor="create-countryCode"
                className="block text-sm text-gray-500 mb-1"
              >
                Country Code
              </label>
              <input
                type="text"
                id="create-countryCode"
                name="countryCode"
                value={createFormData.countryCode}
                onChange={handleCreateInputChange}
                className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                placeholder="Country code (e.g., US)"
              />
            </div>

            {/* Shipping Dropdown */}
            <div>
              <label
                htmlFor="create-shipping"
                className="block text-sm text-gray-500 mb-1"
              >
                Shipping
              </label>
              <select
                id="create-shipping"
                name="shipping"
                value={createFormData.shipping}
                onChange={handleCreateInputChange}
                className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* Separator Line */}
          <hr className="my-6 border-gray-300 dark:border-gray-600" />

          {/* Modal Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleCreateCountry}
              className="bg-info text-white rounded-full px-4 py-2 text-sm"
            >
              Create Country
            </Button>
            <Button
              onClick={closeCreateModal}
              variant="light"
              className="border border-[#00000050] dark:border-gray-300 rounded-full px-4 py-2 text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </CustomModal>

      {/* Custom Modal for Editing Country */}
      <CustomModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Country" 
        isDarkMode={isDarkMode}
      >
        <div className="flex flex-col">
          {/* Form Inputs */}
          <div className="flex flex-col gap-4">
            {/* Country Name Input */}
            <div>
              <label
                htmlFor="edit-name"
                className="block text-sm text-gray-500 mb-1"
              >
                Country Name
              </label>
              <input
                type="text"
                id="edit-name"
                name="name"
                value={editFormData.name}
                onChange={handleEditInputChange}
                className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                placeholder="Enter country name"
              />
            </div>

            {/* Tags Input */}
            <div>
              <label
                htmlFor="edit-tags"
                className="block text-sm text-gray-500 mb-1"
              >
                Tags
              </label>
              <input
                type="text"
                id="edit-tags"
                name="tags"
                value={editFormData.tags}
                onChange={handleEditInputChange}
                className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                placeholder="Public key"
              />
            </div>

            {/* Country Code Input */}
            <div>
              <label
                htmlFor="edit-countryCode"
                className="block text-sm text-gray-500 mb-1"
              >
                Country Code
              </label>
              <input
                type="text"
                id="edit-countryCode"
                name="countryCode"
                value={editFormData.countryCode}
                onChange={handleEditInputChange}
                className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                placeholder="Country code (e.g., US)"
              />
            </div>

            {/* Shipping Dropdown */}
            <div>
              <label
                htmlFor="edit-shipping"
                className="block text-sm text-gray-500 mb-1"
              >
                Shipping
              </label>
              <select
                id="edit-shipping"
                name="shipping"
                value={editFormData.shipping}
                onChange={handleEditInputChange}
                className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* Separator Line */}
          <hr className="my-6 border-gray-300 dark:border-gray-600" />

          {/* Modal Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleUpdateCountry}
              className="bg-info text-white rounded-full px-4 py-2 text-sm"
            >
              Update Country
            </Button>
            <Button
              onClick={closeEditModal}
              variant="light"
              className="border border-[#00000050] dark:border-gray-300 rounded-full px-4 py-2 text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </CustomModal>

      {/* New Country Modal with Updated Layout */}
      <CustomModal
        isOpen={isNewCountryModalOpen}
        onClose={closeNewCountryModal}
        title="New Country" 
        isDarkMode={isDarkMode}
        width={'800px'}
      >
        {/* Modal Content with Conditional Layout */}
        <div className="flex flex-col h-full">
          {activeTab === 'information' ? (
            // Layout for Informations Tab
            <div className="flex flex-col md:flex-row h-full">
              {/* Left Side: Vertical Tabs (Full Width on Mobile, 1/5 on Desktop) */}
              <div className="flex flex-row md:flex-col md:space-y-2 md:space-x-0 w-2/3 mt-8 md:w-1/5 mb-4 md:mb-0 md:mr-16">
                {/* Informations Tab */}
                <button
                  onClick={() => switchTab('information')}
                  className={`text-sm font-medium py-2 rounded ${
                    activeTab === 'information'
                      ? 'bg-transparent dark:text-white text-black '
                      : 'text-gray-500 dark:text-gray-700 hover:text-black dark:hover:text-white'
                  } flex-1 md:flex-none`}
                  aria-label="Informations Tab"
                >
                  Informations
                </button>

                {/* List of Cities Tab */}
                <button
                  onClick={() => switchTab('cities')}
                  className={`text-sm font-medium px-4 py-2 rounded ${
                    activeTab === 'cities'
                      ? 'bg-transparent dark:text-white text-black'
                      : 'text-gray-500 dark:text-gray-700 hover:text-black dark:hover:text-white'
                  } flex-1 md:flex-none`}
                  aria-label="List of Cities Tab"
                >
                  List of Cities
                </button>
              </div>

              {/* Right Side: InformationSection (Full Width on Mobile, 4/5 on Desktop) */}
              <div className="flex-1 p-4 overflow-auto">
                <InformationSection 
                  formData={createFormData} 
                  setFormData={setCreateFormData} 
                  isDarkMode={isDarkMode} 
                />
              </div>
            </div>
          ) : (
            // Layout for List of Cities Tab
            <div className="flex flex-col h-full">
              {/* Menu Row: Informations and List of Cities buttons on left, Import button on right */}
              <div className="flex flex-col sm:flex-row items-center justify-betwen mt-8 space-y-4 sm:space-y-0 mr-auto">
                {/* Left Group: Informations and List of Cities buttons */}
                <div className="flex md:flex-col  ">
                  <button
                    onClick={() => switchTab('information')}
                    className={`text-sm font-medium px-4 py-2 rounde ${
                      activeTab === 'information'
                        ? 'bg-transparent dark:text-white text-black '
                        : 'text-gray-500 dark:text-gray-700 hover:text-black dark:hover:text-white'
                    }`}
                    aria-label="Informations Tab"
                  >
                    Informations
                  </button>

                  <button
                    onClick={() => switchTab('cities')}
                    className={`text-sm font-medium px-4 py-2 rounded    ${
                      activeTab === 'cities'
                        ? 'bg-transparent dark:text-white text-black'
                        : 'text-gray-500 dark:text-gray-700 hover:text-black dark:hover:text-white'
                    }`}
                    aria-label="List of Cities Tab"
                  >
                    List of Cities
                  </button>
                </div>
                </div>
<div>
                {/* Right Group: Import Button */}
                <Button 
                  variant="outline"
                  color="info"
                  className="flex items-center gap-2 bg-info rounded-full text-sm text-white ml-auto mb-8 md:mt-0 mt-8" 
                  size="sm"
                  onClick={openImportModal}
                  aria-label="Import Button"
                >
                  <Download02Icon size={16} />
                  Import
                </Button>
              </div>

              {/* Cities Table */}
              <div className="overflow-x-auto flex-1 mt-4">
                <table className="min-w-full table-auto text-xs">
                  <thead>
                    <tr className="bg-[#00000020] dark:bg-[#FFFFFF05] text-black dark:text-white"> 
                      <th className="px-4 py-2 whitespace-nowrap ">City Code</th> 
                      <th className="px-4 py-2 whitespace-nowrap ">Dest Code</th>
                      <th className="px-4 py-2 whitespace-nowrap ">Province</th>
                      <th className="px-4 py-2 whitespace-nowrap ">Name</th>
                      <th className="px-4 py-2 whitespace-nowrap ">Arabic Name</th>
                      <th className="px-4 py-2 whitespace-nowrap ">Zip Code</th>
                      <th className="px-4 py-2 whitespace-nowrap  ">Available</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cities.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center text-xs py-4">No cities available.</td>
                      </tr>
                    ) : (
                      currentCities.map((city, index) => renderCityRow(city, index))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="pagination-container flex justify-center items-center my-4 space-x-2">
                <button
                  aria-label="Previous Page"
                  className="px-3 py-1 bg-gray-200 dark:bg-[#1a1a1a] dark:text-white rounded flex items-center space-x-1 text-sm hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <ArrowLeft01Icon size={ICON_SIZE} /> <span>Previous</span>
                </button>

                {/* Page Number Buttons */}
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    aria-label={`Page ${index + 1}`}
                    className={`px-3 py-1 text-sm ${
                      currentPage === index + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 dark:text-white'
                    } rounded hover:bg-blue-400`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  aria-label="Next Page"
                  className="px-3 py-1 bg-gray-200 dark:bg-[#1a1a1a] dark:text-white rounded flex items-center space-x-1 text-sm hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <span>Next</span> <ArrowRight01Icon size={ICON_SIZE} />
                </button>
              </div>
            </div>
          )}
        </div>
      </CustomModal>

      {/* New Import Modal */}
      <CustomModal
        isOpen={isImportModalOpen}
        onClose={closeImportModal}
        title="Importing your sheet file by drag or upload"
        isDarkMode={isDarkMode}
        width={'800px'}
      >
        <div className="flex flex-col items-center justify-center p-2">
          {/* New Section: Text and Button */}
          <div className="w-full flex justify-between items-center mb-4">
            {/* Left Side: Descriptive Text */}
            <p className="text-gray-600 text-sm">Select relevant document to complete your computer</p>

            {/* Right Side: Document Attachment Button */}
            <Button
              variant="link"
              color="info"
              className="text-blue-500 flex items-center gap-2"
              onClick={() => alert('Document attachment functionality to be implemented')}
              aria-label="Attach Document"
            >
              <DocumentAttachmentIcon size={16} /> {/* <--- Document Attachment Icon */}
              Get Sheet Model
            </Button>
          </div>

          {/* Drag and Drop Area or Upload Button */}
          <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center mb-3">
            {/* Cloud Upload Icon */}
            <CloudUploadIcon size={60} className="text-gray-400 mb-1" />

            {/* Main Text */}
            <p className="dark:text-white text-black text-center text-xl mb-2">Select file or drag and drop here</p>

            {/* Sub Text */}
            <p className="text-gray-400 text-sm text-center mb-4">Excel, Google sheet, file size no more than 10MB</p>

            {/* Upload Button */}
            <Button 
              variant="outline" 
              color="info" 
              className="mt-2 bg-info rounded-full flex items-center gap-2 text-white" // Added border
              onClick={() => document.getElementById('import-file-input').click()}
              aria-label="Select File Button"
            >
              Select file from here
            </Button>
            <input
              type="file"
              id="import-file-input"
              accept=".xlsx,.csv"
              className="hidden"
              onChange={(e) => {
                // Handle file upload here
                const file = e.target.files[0];
                if (file) {
                  console.log('File selected:', file);
                  // Implement your file processing logic here
                  alert(`File "${file.name}" selected. Implement upload functionality.`);
                  closeImportModal();
                }
              }}
            />
          </div>

          {/* New Elements: Descriptive Text and Buttons */}
          <p className="text-gray-500 text-sm text-center mt-1">Or connect with Google Sheet or Shopify store :</p>

          {/* Continue with Google Button */}
          <Button
            variant="outline"
            color="info"
            className="mt-2 rounded-full flex items-center gap-2 border border-gray-600"
            onClick={() => alert('Continue with Google functionality to be implemented')}
            aria-label="Continue with Google"
          >
            <GoogleIcon size={20} className="text-blue-500" /> {/* <--- Google Icon */}
            Continue with Google
          </Button>

          {/* Close Button */}
          <Button
            variant="flat"
            color="error"
            className="mt-2 rounded-full flex items-center gap-2 text-white bg-[#ff0000]"
            onClick={closeImportModal}
            aria-label="Close Import Modal"
          >
            <MultiplicationSignIcon size={16} className="text-white" /> {/* <--- Cross Icon */}
            Close
          </Button>
        </div>
      </CustomModal>
    </DashboardLayout>
  );
};

export default Countries;
