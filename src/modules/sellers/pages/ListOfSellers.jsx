// ListOfSellers.jsx
import React, { useState } from 'react';
import {
  DeliveryTruck01Icon,
  PencilEdit01Icon,
  PlusSignIcon,
  Delete01Icon,
  ArrowDown01Icon,
  Logout02Icon,
  UserMultipleIcon,
} from 'hugeicons-react';
import { Button } from '@nextui-org/button';
import DashboardLayout from '@shared/layouts/DashboardLayout.jsx';
import Table from '../../stockManagement.jsx/components/Table';
import { rows } from '../../../core/utils/data6';
import { Recycle03Icon } from 'hugeicons-react';
import CustomModal from '../../stockManagement.jsx/components/modal'; // Adjust the path as needed
import InformationsForm from './InformationForm'; // Import the new component
import Store from './Store'
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
  const isDarkMode = true; // Adjust based on your theme logic

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
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{
                backgroundColor: '#747d80',
                minWidth: '32px',
                height: '32px',
              }}
            >
              <Logout02Icon size={14} style={{ color: 'white' }} />
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
        <div className="flex justify-end space-x-4 mb-4">
          <Button
            color="default"
            onClick={addNewSeller}
            className="rounded-full"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
          >
            <PlusSignIcon size={18} /> New Seller
          </Button>
          <Button
            color="default"
            className="rounded-full"
            style={{ backgroundColor: '#ED0006', color: 'white' }}
          >
            <PencilEdit01Icon size={18} style={{ color: 'white' }} /> Actions
          </Button>
          <Button
            color="default"
            className="rounded-full flex items-center border transition-colors duration-200 dark:border-white border-black"
            style={{
              backgroundColor: 'transparent',
            }}
          >
            <span className="text-black dark:text-white">Status</span>
            <ArrowDown01Icon className="ml-1 text-black dark:text-white" />
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
            <div className="flex">
              {/* Left Menu */}
              <div className="w-1/4  p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => setActiveMenuItem(item)}
                        className={` text-sm w-full text-left px-2 rounded whitespace-nowrap hover:text-info ${
                          activeMenuItem === item
                            ? 'text-white'
                            : 'text-gray-500'
                        }`}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Content */}
              <div className="w-3/4 p-4">
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
