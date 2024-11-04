// ListOfSellers.jsx
import React, { useState,useEffect } from 'react';
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
import Table from '../../stockManagement.jsx/components/Table';
import { rows } from '../../../core/utils/data6';
import CustomModal from '../../stockManagement.jsx/components/modal'; // Adjust the path as needed
import InformationsForm from './InformationForm'; // Import the updated component
import Store from './Store';
import Subscription from './Subscription';

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

  const addNewSeller = () => {
    const newSeller = {
      key: products.length + 1,
      id: products.length + 1,
      partner: 'New Partner',
      name: 'John Doe',
      store: 'Sample Store',
      phone: '123-456-7890',
      subscriptions: 'Basic',
      statut: 'Delivery Again',
      billing: '$500',
    };
    setProducts([...products, newSeller]);
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
              <Logout02Icon size={14} className='text-black dark:text-white' />
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
    'Services',
    'Cost & VAT',
    'Whatsapp Message',
    'Follow up',
    'Api Token',
    'Permissions',
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
            onClick={addNewSeller}
            className="rounded-full"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
          >
            <PlusSignIcon size={18} className="flex-shrink-0" />  New Seller
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
            <span className="text-black dark:text-white ">Status</span>
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

        {/* Custom Modal for Editing Seller */}
        {selectedSeller && (
          <CustomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={`Edit Seller - ${selectedSeller.id}`}
            isDarkMode={isDarkMode}
            width="800px"
          >
            <div className="flex flex-col md:flex-row">
              {/* Menu Section */}
              <div className="w-full md:w-1/4 p-4">
                {/* Flex container with wrapping */}
                <div className="flex flex-row flex-wrap md:flex-col gap-1">
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
                        hover:underline 
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
          </CustomModal>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ListOfSellers;
