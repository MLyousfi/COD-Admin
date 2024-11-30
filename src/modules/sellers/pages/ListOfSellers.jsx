// ListOfSellers.jsx

import React, { useState, useEffect } from 'react';
import {
  PencilEdit01Icon,
  PlusSignIcon,
  Delete01Icon,
  ArrowDown01Icon,
  Logout02Icon,
  UserMultipleIcon,
  Recycle03Icon,
} from 'hugeicons-react';
import { Button } from '@nextui-org/button';
import DashboardLayout from '@shared/layouts/DashboardLayout.jsx';
import Table from '../../shared/components/Table';
import { rows } from '../../../core/utils/data6';
import CustomModal from '../../shared/components/modal'; // Adjust the path as needed
import InformationsForm from '../components/listofsellers/editsellermodal/InformationForm';
import Store from '../components/listofsellers/editsellermodal/Store';
import Subscription from '../components/listofsellers/editsellermodal/Subscription';
import RegisteredBusiness from '../components/listofsellers/editsellermodal/RegisteredBusiness';
import Services from '../components/listofsellers/editsellermodal/Services';
import ShippingCosts from '../components/listofsellers/editsellermodal/ShippingCosts';
import Options from '../components/listofsellers/editsellermodal/Options';
import CallCenterFees from '../components/listofsellers/editsellermodal/CallCenterFees';
import WhatsAppMessage from '../components/listofsellers/editsellermodal/WhatsAppMessage';
import VATClearance from '../components/listofsellers/editsellermodal/VATClearance';
import NewSellerForm from '../components/listofsellers/newsellermodal/NewSellerForm'; // Import the new form component

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'partner', label: 'Partner' },
  { key: 'name', label: 'Name' },
  { key: 'store', label: 'Store' },
  { key: 'phone', label: 'Phone' },
  { key: 'subscriptions', label: 'Subscriptions' },
  { key: 'statut', label: 'Statut' },
  { key: 'billing', label: 'Billing' },
  { key: 'options', label: 'Actions' },
];

const ListOfSellers = () => {
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState('Informations');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // New State to determine modal type: 'add' or 'edit'
  const [modalType, setModalType] = useState('edit');

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
    setModalType('add'); // Set modal type to 'add'
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
    setModalType('edit'); // Set modal type to 'edit'
    setIsModalOpen(true);
  };

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case 'statut':
        return (
          <div className="inline-flex items-center bg-[#4912a2] text-white px-2 py-1 rounded-full">
            <Recycle03Icon size={16} className="mr-1" />
            <span>{item.statut.trim()}</span>
          </div>
        );

      case 'options':
        return (
          <div className="flex space-x-2 justify-center">
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center bg-[#00000020] dark:bg-[#FFFFFF20]"
              style={{
                minWidth: '32px',
                height: '32px',
              }}
            >
              <Logout02Icon size={14} className="text-black dark:text-white" />
            </Button>
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
            >
              <PencilEdit01Icon size={14} style={{ color: 'white' }} />
            </Button>
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
            >
              <Delete01Icon size={14} style={{ color: 'white' }} />
            </Button>
          </div>
        );

      default:
        return <span className="text-sm dark:text-white">{item[columnKey]}</span>;
    }
  };

  // Menu Items
  const menuItems = [
    'Informations',
    'Store',
    'Subscription',
    'Registered Business',
    'Options',
    'Services',
    'Shipping Costs',
    'Call Center Fees',
    'WhatsApp Message',
    'VAT & Clearance',
    'COD Fees',
    'Follow up',
  ];

  // Render Content Based on Active Menu Item
  const renderContent = () => {
    switch (activeMenuItem) {
      case 'Informations':
        return <InformationsForm isDarkMode={isDarkMode} />;
      case 'Store':
        return <Store isDarkMode={isDarkMode} />;
      case 'Subscription':
        return <Subscription isDarkMode={isDarkMode} />;
      case 'Registered Business':
        return <RegisteredBusiness isDarkMode={isDarkMode} />;
      case 'Options':
        return <Options isDarkMode={isDarkMode} />;
      case 'Services':
        return <Services isDarkMode={isDarkMode} />;
      case 'Shipping Costs':
        return <ShippingCosts isDarkMode={isDarkMode} />;
      case 'Call Center Fees':
        return <CallCenterFees isDarkMode={isDarkMode} />;
      case 'WhatsApp Message':
        return <WhatsAppMessage isDarkMode={isDarkMode} />;
      case 'VAT & Clearance':
        return <VATClearance isDarkMode={isDarkMode} />;
      // Add more cases as needed
      default:
        return <div className="p-4">Content for {activeMenuItem}</div>;
    }
  };

  return (
    <DashboardLayout
      title="Sellers - List of Sellers"
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
            <PlusSignIcon size={18} className="flex-shrink-0" /> New Seller
          </Button>
          <Button
            color="default"
            className="rounded-full flex items-center space-x-2 px-4 py-2"
            style={{ backgroundColor: '#ED0006', color: 'white' }}
          >
            <PencilEdit01Icon size={18} className="flex-shrink-0" />
            <span className="text-sm sm:text-base">Actions</span>
          </Button>
          <Button
            color="default"
            className="rounded-full flex items-center border transition-colors duration-200 dark:border-white border-black"
            style={{
              backgroundColor: 'transparent',
            }}
          >
            <span className="text-black dark:text-white">Status</span>
            <ArrowDown01Icon size={18} className="ml-1 text-black dark:text-white flex-shrink-0" />
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

        {/* Custom Modal for Adding or Editing Seller */}
        {isModalOpen && (
          <CustomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={modalType === 'add' ? 'New Seller' : `Edit Seller - ${selectedSeller.id}`}
            isDarkMode={isDarkMode}
            width="800px"
          >
            {modalType === 'add' ? (
              <NewSellerForm
                onSubmit={(data) => {
                  // Handle the new seller data
                  console.log('Submitting new seller:', data);
                  // You can add the new seller to the products list or perform an API call here
                  setProducts((prev) => [
                    ...prev,
                    {
                      key: Date.now(), // Assuming a unique key
                      id: prev.length + 1,
                      partner: 'Partner Name', // Replace with actual data
                      name: data.name,
                      store: 'Store Name', // Replace with actual data
                      phone: '1234567890', // Replace with actual data
                      subscriptions: 'Subscription Info', // Replace with actual data
                      statut: 'Active', // Replace with actual data
                      billing: 'Billing Info', // Replace with actual data
                    },
                  ]);
                  // Close the modal
                  setIsModalOpen(false);
                }}
                isDarkMode={isDarkMode}
              />
            ) : (
              <div className="flex flex-col md:flex-row">
                {/* Menu Section */}
                <div className="w-full md:w-1/4 p-4">
                  <div className="flex flex-row flex-wrap md:flex-col font-medium gap-1">
                    {menuItems.map((item) => (
                      <button
                        key={item}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the click from affecting parent elements
                          setActiveMenuItem(item);
                        }}
                        className={`text-sm text-left px-1.5 
                          ${
                            activeMenuItem === item
                              ? 'dark:text-white text-black'
                              : 'dark:text-gray-600 text-gray-400'
                          } 
                          dark:hover:text-white
                          hover:text-black 
                          cursor-pointer`}
                        aria-label={`Navigate to ${item}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-3/4 p-4">
                  {renderContent()}
                </div>
              </div>
            )}
          </CustomModal>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ListOfSellers;
