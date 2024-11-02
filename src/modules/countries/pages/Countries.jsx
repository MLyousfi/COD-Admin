// Countries.jsx
import React, { useState, useEffect } from 'react';
import { 
  PencilEdit01Icon, 
  PlusSignIcon, 
  Delete01Icon, 
  Logout02Icon, 
  EarthIcon 
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table';
import { rows } from '../../../core/utils/data5';
import Flag from 'react-world-flags';
import CustomModal from '../../stockManagement.jsx/components/modal'; // Adjust the path if necessary

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

const Countries = () => {
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for Create Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);     // State for Edit Modal
  const [currentCountry, setCurrentCountry] = useState(null);        // Country being edited

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

  const rowsPerPage = 10;

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

  // Handlers to open and close Create Modal
  const openCreateModal = () => {
    setCreateFormData({
      name: '',
      tags: '',
      countryCode: '',
      shipping: 'Yes',
    });
    setIsCreateModalOpen(true);
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

  // Handler to add a new country
  const handleCreateCountry = () => {
    const { name, tags, countryCode, shipping } = createFormData;

    // Simple validation
    if (!name.trim() || !tags.trim() || !countryCode.trim()) {
      alert("Please fill in all the required fields.");
      return;
    }

    const newCountry = {
      key: (products.length + 1).toString(),
      id: products.length + 1,
      name: name.trim(),
      slogan: "Sample Slogan", // Placeholder or dynamic
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
  const handleCheckboxChange = (keys, isRange = false) => {
    if (isRange && Array.isArray(keys)) {
      setSelectedRows(prevSelected => {
        const newSelected = new Set(prevSelected);
        keys.forEach(key => newSelected.add(key));
        return Array.from(newSelected);
      });
    } else {
      setSelectedRows(prevSelected => {
        const newSelected = new Set(prevSelected);
        if (newSelected.has(keys)) {
          newSelected.delete(keys);
        } else {
          newSelected.add(keys);
        }
        return Array.from(newSelected);
      });
    }
  };

  // Handler to delete a country
  const handleDelete = (key) => {
    setProducts(products.filter(product => product.key !== key));
  };

  // Handler for create input changes
  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for edit input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to determine if a field is filled
  const isFilled = (value) => value.trim() !== '';

  // Render cell content based on column key
  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={selectedRows.includes(item.key)}
            onChange={() => handleCheckboxChange(item.key)}
          />
        );
      case "slogan":
        return (
          <div className="flex items-center">
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
          <span className={`rounded-full px-2 py-1 ${item.shipping === "Yes" ? "bg-green-600 bg-opacity-20 text-green-600" : "bg-red-600 bg-opacity-20 text-red-600"}`}>
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
        return <span className="text-sm dark:text-white">{item[columnKey]}</span>;
    }
  };

  return (
    <DashboardLayout title="Countries" icon={<EarthIcon className="text-info" />}>
      <div className="p-4">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mb-4"> 
          <Button 
            color="default" 
            onClick={openCreateModal} 
            className="rounded-full flex items-center gap-2" 
            style={{ backgroundColor: '#0258E8', color: 'white' }}  
          >
            <PlusSignIcon size={18} /> New Country 
          </Button>
          <Button 
            color="default" 
            className="rounded-full flex items-center gap-2" 
            style={{ backgroundColor: '#ED0006', color: 'white' }} 
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
          rowsPerPage={rowsPerPage}  
          className="dark:bg-gray-800 dark:text-white" 
        />
      </div>

      {/* Custom Modal for Creating New Country */}
      <CustomModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title="informations"
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
                placeholder="Public key"
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
              className="bg-info text-white rounded-full px-4 py-2"
            >
              Create Country
            </Button>
            <Button
              onClick={closeCreateModal}
              variant="light"
              className="border border-[#00000050] dark:border-gray-300 rounded-full px-4 py-2"
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
        title="informations"
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
                placeholder="Public key"
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
              className="bg-info text-white rounded-full px-4 py-2"
            >
              Save Changes
            </Button>
            <Button
              onClick={closeEditModal}
              variant="light"
              className="border border-[#00000050] dark:border-gray-300 rounded-full px-4 py-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      </CustomModal>
    </DashboardLayout>
  );
};

export default Countries;
