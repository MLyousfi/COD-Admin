// ListOfSellers.jsx

import React, { useState, useEffect, useMemo } from 'react';
import {
  PencilEdit01Icon,
  Delete01Icon,
  ArrowDown01Icon,
  Logout02Icon,
  UserMultipleIcon,
  Recycle03Icon,
  PrinterIcon,          
  PlusSignIcon,
  Download01Icon,
  ArrowRight01Icon,
  CustomerSupportIcon,
  CallOutgoing01Icon,
  DropboxIcon,
  Settings02Icon,

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

// Import Dropdown components from @nextui-org/dropdown
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

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

  // State for status filter
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Paid', 'Unpaid', 'Delivery'

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
    if (window.confirm("Are you sure you want to delete this seller?")) {
      setProducts(products.filter((product) => product.key !== key));
      setSelectedRows(selectedRows.filter((selectedKey) => selectedKey !== key));
    }
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
              aria-label="Logout Seller"
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
              aria-label="Edit Seller"
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

  // Menu Items for the edit modal
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

  // Filtered Products based on statusFilter
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const filter = statusFilter.toLowerCase();
      const statut = product.statut.toLowerCase();

      if (filter === 'all') return true;
      if (filter === 'paid') return statut === 'paid';
      if (filter === 'unpaid') return statut === 'unpaid';
      if (filter === 'deliveryAgain') return statut === 'deliveryAgain';
      return true;
    });
  }, [statusFilter, products]);

  return (
    <DashboardLayout
      title="Sellers - List of Sellers"
      icon={<UserMultipleIcon className="text-info" />}
    >
      <div className="p-4">
        {/* === Header Section === */}
        <div className="flex justify-end space-x-2 mb-4">
       
          {/* Action Buttons */}
          <div className="flex md:space-x-2 space-x-1 mt-4 md:mt-0">
            <Button
              color="default"
              onClick={handleNewSeller}
              className="rounded-full flex items-center space-x-0 px-4 py-2"
              style={{ backgroundColor: '#0258E8', color: 'white' }}
              aria-label="Add New Seller"
            >
              <PlusSignIcon size={18} className="flex-shrink-0" /> New Seller
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

               {/* Status Filter Dropdown */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                color="default"
                className="rounded-full flex items-center space-x-0 px-4 py-2 border dark:border-white border-black text-black"
                style={{
                  backgroundColor: 'transparent',
                  color: '#000',
                }}
                aria-label="Status Filter"
              >
                <span className="text-black dark:text-white">Status</span>
                <ArrowDown01Icon size={18} className="ml-1 text-black dark:text-white flex-shrink-0" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Status Filters">
              <DropdownItem key="All" onClick={() => setStatusFilter('All')}>
                All
              </DropdownItem>
              <DropdownItem key="Paid" onClick={() => setStatusFilter('Paid')}>
                Paid
              </DropdownItem>
              <DropdownItem key="Unpaid" onClick={() => setStatusFilter('Unpaid')}>
                Unpaid
              </DropdownItem>
              <DropdownItem key="Delivery again" onClick={() => setStatusFilter('deliveryAgain')}>
                Delivery Again
              </DropdownItem>
              {/* Add more status options as needed */}
            </DropdownMenu>
          </Dropdown>

          </div>
        </div>
        {/* === End of Header Section === */}

        {/* === Table Section === */}
        <Table
          columns={columns}
          data={filteredProducts}
          renderCell={renderCell}
          handleCheckboxChange={handleCheckboxChange}
          selectedRows={selectedRows}
          rowsPerPage={rowsPerPage}
          className="dark:bg-gray-800 dark:text-white"
        />
        {/* === End of Table Section === */}

        {/* === Custom Modal for Adding or Editing Seller === */}
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
                  // Add the new seller to the products list
                  setProducts((prev) => [
                    ...prev,
                    {
                      key: Date.now(), // Assuming a unique key
                      id: prev.length + 1,
                      partner: data.partner || 'Partner Name', // Replace with actual data
                      name: data.name,
                      store: data.store || 'Store Name', // Replace with actual data
                      phone: data.phone || '1234567890', // Replace with actual data
                      subscriptions: data.subscriptions || 'Subscription Info', // Replace with actual data
                      statut: data.statut || 'Paid', // Replace with actual data
                      billing: data.billing || 'Billing Info', // Replace with actual data
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
        {/* === End of Custom Modal === */}
      </div>
    </DashboardLayout>
  );
};

export default ListOfSellers;
