// SalesChannels.jsx

import React, { useState, useEffect } from 'react';
import {
  PencilEdit01Icon,
  PlusSignIcon,
  Delete01Icon,
  ArrowDown01Icon,
  UserMultipleIcon,
  Recycle03Icon,
  Upload02Icon,
} from 'hugeicons-react';
import { Button } from '@nextui-org/button';
import DashboardLayout from '@shared/layouts/DashboardLayout.jsx';
import Table from '../../shared/components/Table';
import { rows } from '../../../core/utils/data11';
import CustomModal from '../../shared/components/modal';
import NewSalesChannelForm from '../components/saleschannels/NewSalesChannelForm';

// Updated columns array
const columns = [
  { key: 'source', label: 'Source' },
  { key: 'sellerId', label: 'Seller ID' },
  { key: 'name', label: 'Name' },
  { key: 'importNow', label: 'Import Now' },
  { key: 'lastImportedLine', label: 'Last Imported Line' },
  { key: 'lastImportedDate', label: 'Last Imported Date' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'actions', label: 'Actions' },
];

const SalesChannels = () => {
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState('Informations');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // New State to determine modal type: 'add', 'edit', 'newSalesChannel', or 'editSalesChannel'
  const [modalType, setModalType] = useState('edit');

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
    setSelectedSeller(null); // Clear any selected seller
    setActiveMenuItem('Informations'); // Reset to 'Informations' tab
    setModalType('newSalesChannel'); // Set modal type to 'newSalesChannel'
    setIsModalOpen(true); // Open the modal
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

  const handleEdit = (seller) => {
    setSelectedSeller(seller);
    setActiveMenuItem('Informations');
    setModalType('editSalesChannel'); // Set modal type to 'editSalesChannel'
    setIsModalOpen(true);
  };

  // Handle submission of the new sales channel form
  const handleNewSalesChannelSubmit = (data) => {
    // Process the submitted data
    console.log('New Sales Channel Data:', data);

    // Example: Add the new sales channel to the products list
    setProducts((prev) => [
      ...prev,
      {
        key: Date.now(), // Assuming a unique key
        source: data.seller, // Replace with actual data if available
        sellerId: `S${Date.now()}`, // Replace with actual data if available
        name: data.information,
        importNow: false, // Default value or based on data
        lastImportedLine: 'N/A',
        lastImportedDate: 'N/A',
        createdAt: new Date().toISOString().split('T')[0], // Current date
        // Add other necessary fields...
      },
    ]);

    // Close the modal
    setIsModalOpen(false);
  };

  // Handle submission of the edit sales channel form
  const handleEditSalesChannelSubmit = (data) => {
    // Process the submitted data
    console.log('Edit Sales Channel Data:', data);

    // Update the existing sales channel in the products list
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.key === selectedSeller.key
          ? {
              ...product,
              source: data.seller,
              name: data.information,
              // Update other fields as necessary
            }
          : product
      )
    );

    // Close the modal
    setIsModalOpen(false);
  };

  // Updated renderCell function
  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case 'importNow':
        return (
          <div className="flex justify-center">
            <Recycle03Icon size={16} className="text-yellow-500" />
          </div>
        );

      case 'actions':
        return (
          <div className="flex space-x-2 justify-center">
            {/* Edit Button */}
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{
                backgroundColor: '#0258E8',
                minWidth: '32px',
                height: '32px',
              }}
              onClick={() => handleEdit(item)}
              aria-label="Edit Seller"
            >
              <PencilEdit01Icon size={14} style={{ color: 'white' }} />
            </Button>

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
              aria-label="Delete Seller"
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
      title="Sellers - Sales Channels"
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
            <PlusSignIcon size={18} className="flex-shrink-0" /> New Sales Channel
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

        {/* Custom Modal for Adding or Editing Seller/Sales Channel */}
        {isModalOpen && (
          <CustomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={
              modalType === 'newSalesChannel'
                ? 'New Sales Channel'
                : modalType === 'editSalesChannel'
                ? 'Edit Sales Channel'
                : modalType === 'add'
                ? 'New Seller'
                : `Edit Seller - ${selectedSeller?.id || ''}`
            }
            isDarkMode={isDarkMode}
            width="800px"
          >
            {(modalType === 'newSalesChannel' || modalType === 'editSalesChannel') ? (
              <NewSalesChannelForm
                sellers={sellers}
                onSubmit={
                  modalType === 'newSalesChannel'
                    ? handleNewSalesChannelSubmit
                    : handleEditSalesChannelSubmit
                }
                isDarkMode={isDarkMode}
                initialData={modalType === 'editSalesChannel' ? selectedSeller : null}
                onCancel={() => setIsModalOpen(false)}
              />
            ) : modalType === 'add' ? (
              // Existing code for 'add' modalType
              <div>New Seller Form</div>
            ) : (
              <div>Other Modal Content</div>
            )}
          </CustomModal>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SalesChannels;
