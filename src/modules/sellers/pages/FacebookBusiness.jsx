// FacebookBusiness.jsx

import React, { useState, useEffect } from 'react';
import {
  Delete01Icon,
  ArrowDown01Icon,
  UserMultipleIcon,
  Recycle03Icon,
  Upload02Icon,
  PlusSignIcon,
  PencilEdit01Icon, 
} from 'hugeicons-react';
import { Button } from '@nextui-org/button';
import DashboardLayout from '@shared/layouts/DashboardLayout.jsx';
import Table from '../../stockManagement.jsx/components/Table';
import { rows } from '../../../core/utils/data12';
import CustomModal from '../../stockManagement.jsx/components/modal';
import NewPixelForm from '../components/facebookbusiness/NewPixelForm';

// Updated columns array
const columns = [
  { key: 'sellerId', label: 'Seller ID' },
  { key: 'name', label: 'Name' },
  { key: 'store', label: 'Store' },
  { key: 'totalSuccessful', label: 'Total Successful' },
  { key: 'totalFailed', label: 'Total Failed' },
  { key: 'actions', label: 'Actions' },
];

const FacebookBusiness = () => {
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sample sellers data; replace with actual data or fetch from API
  const [sellers, setSellers] = useState([
    { key: 'seller1', label: 'Seller One' },
    { key: 'seller2', label: 'Seller Two' },
    { key: 'seller3', label: 'Seller Three' },
  ]);

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

  const handleNewSeller = () => {
    // Open the modal for adding a new pixel
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (key) => {
    setSelectedRows(
      selectedRows.includes(key)
        ? selectedRows.filter((k) => k !== key)
        : [...selectedRows, key]
    );
  };

  const handleDelete = (key) => {
    setProducts(products.filter((product) => product.key !== key));
  };

  // Handle submission of the new pixel form
  const handleNewPixelSubmit = (data) => {
    // Process the submitted data
    console.log('New Pixel Data:', data);

    // Example: Add the new pixel to the products list
    setProducts((prev) => [
      ...prev,
      {
        key: Date.now(), // Assuming a unique key
        sellerId: `S${Date.now()}`, // Replace with actual data if available
        name: data.name,
        store: data.store,
        totalSuccessful: data.totalSuccessful || 0,
        totalFailed: data.totalFailed || 0,
        // Add other necessary fields...
      },
    ]);

    // Close the modal
    setIsModalOpen(false);
  };

  // Updated renderCell function
  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case 'actions':
        return (
          <div className="flex space-x-2 justify-center">
            {/* Delete Button */}
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{
                backgroundColor: '#ED0006',
                minWidth: '32px',
                height: '32px',
              }}
              onClick={() => handleDelete(item.key)}
              aria-label="Delete Pixel"
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
    <DashboardLayout
      title="Sellers - Pixel Management"
      icon={<UserMultipleIcon className="text-info" />}
    >
      <div className="p-4">
        <div className="flex justify-end space-x-2 mb-4">
          <Button
            color="default"
            onClick={handleNewSeller}
            className="rounded-full"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
          >
            <PlusSignIcon size={18} className="flex-shrink-0" /> New Pixel
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

        <Table
          columns={columns}
          data={products}
          renderCell={renderCell}
          handleCheckboxChange={handleCheckboxChange}
          selectedRows={selectedRows}
          rowsPerPage={rowsPerPage}
          className="dark:bg-gray-800 dark:text-white"
        />

        {/* Custom Modal for Adding New Pixel */}
        {isModalOpen && (
          <CustomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="New Pixel"
            isDarkMode={isDarkMode}
            width="800px"
          >
            {/* Replace this with your actual form component for adding a new pixel */}
            <NewPixelForm
              sellers={sellers}
              onSubmit={handleNewPixelSubmit}
              isDarkMode={isDarkMode}
              onCancel={() => setIsModalOpen(false)}
            />
          </CustomModal>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FacebookBusiness;
