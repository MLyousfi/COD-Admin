// Countries.jsx
import React, { useState, useEffect } from 'react';
import { 
  PencilEdit01Icon, 
  PlusSignIcon, 
  Delete01Icon, 
  EarthIcon,
  Download02Icon,
  ArrowLeft01Icon, 
  ArrowRight01Icon
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table';
import { rows } from '../../../core/utils/data5';
import Flag from 'react-world-flags';
import CustomModal from '../../stockManagement.jsx/components/modal'; 

// Define ICON_SIZE constant
const ICON_SIZE = 16;

const columns = [
  { key: "checkbox", label: "#" },
  { key: "id", label: "Id" },
  { key: "name", label: "Name" },
  { key: "slogan", label: "Slogan" },
  { key: "shipping", label: "Shipping" },
  { key: "tags", label: "Tags" },
  { key: "options", label: "Actions" },
];

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
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);     
  const [isNewCountryModalOpen, setIsNewCountryModalOpen] = useState(false); 
  const [currentCountry, setCurrentCountry] = useState(null);        

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
      name: '',
      tags: '',
      countryCode: '',
      shipping: 'Yes',
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
    setCurrentPage(1); 
  };

  const closeNewCountryModal = () => {
    setIsNewCountryModalOpen(false);
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
  const handleCheckboxChange = (key) => {
    setSelectedRows(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(key)) {
        newSelected.delete(key);
      } else {
        newSelected.add(key);
      }
      return Array.from(newSelected);
    });
  };

  // Handler to delete a country
  const handleDelete = (key) => {
    setProducts(products.filter(product => product.key !== key));
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
      : (isEven ? '#00000010' : '#00000008'); 
    return (
      <tr key={city.id} style={{ backgroundColor: bgColor }}>
        <td className="px-4 py-2 text-xs">{city.cityCode}</td>
        <td className="px-4 py-2 text-xs">{city.destCode}</td>
        <td className="px-4 py-2 text-xs">{city.province}</td>
        <td className="px-4 py-2 text-xs">{city.name}</td>
        <td className="px-4 py-2 text-xs">{city.arabicName}</td>
        <td className="px-4 py-2 text-xs">{city.zipCode}</td>
        <td className="px-4 py-2 text-xs flex justify-center">
          <span className={`rounded-full px-2 py-1 text-xs  ${city.available === 'Yes' ? 'bg-green-600 bg-opacity-20 text-green-600' : 'bg-red-600 bg-opacity-20 text-red-600'}`}>
            {city.available}
          </span>
        </td>
      </tr>
    );
  };

  const currentCities = React.useMemo(() => {
    return cities.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  }, [cities, currentPage, rowsPerPage]);

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
                className={`block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
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
                className={`block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
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
                className={`block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
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
                className={`block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
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
                className={`block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
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
                className={`block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
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
                className={`block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
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
                className={`block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
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
              Create Country
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

      {/* New Country Modal */}
      <CustomModal
        isOpen={isNewCountryModalOpen}
        onClose={closeNewCountryModal}
        title={`New Country`} 
        isDarkMode={isDarkMode}
      >
        {/* Modal Header with Import Button and Informations */}
        <div className="flex justify-between items-center mb-4">
          {/* Left Side: Informations */}
          <div className="flex flex-col">
            <p className="text-gray-500 text-xs whitespace-nowrap">Informations</p> 
            <p className="text-black dark:text-white text-sm whitespace-nowrap">List of Cities</p> 
          </div>

          {/* Right Side: Import Button */}
          <Button 
            variant="outline"
            color="info"
            className="flex items-center gap-2 bg-info rounded-full text-xs text-white" 
            size="sm"
            onClick={() => alert('Import functionality to be implemented')}
          >
            <Download02Icon size={16} />
            Import
          </Button>
        </div>

       

        {/* Cities Table */}
        <div className="overflow-x-auto">
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
                  <td colSpan={7} className="text-center  text-xs py-4">No cities available.</td>
                </tr>
              ) : (
                currentCities.map((city, index) => renderCityRow(city, index))
              )}
            </tbody>
          </table>
        </div>

        {/* Always Render Pagination Controls */}
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
              className={`px-3 py-1 text-sm ${currentPage === index + 1
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
      </CustomModal>
    </DashboardLayout>
  );
};

export default Countries;
