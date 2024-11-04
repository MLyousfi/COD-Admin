import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DeliveryTruck01Icon,
  PencilEdit01Icon,
  PlusSignIcon,
  Delete01Icon,
  EyeIcon,
  CheckmarkCircle01Icon,
  Recycle03Icon,
  ArrowDown01Icon,
} from 'hugeicons-react';
import { Button } from '@nextui-org/button';
import DashboardLayout from '@shared/layouts/DashboardLayout.jsx';
import Table from '../../stockManagement.jsx/components/Table';
import StatusTabs from '../../shared/components/StatusTabs';
import { rows } from '../../../core/utils/data2';
import CustomModal from '../../stockManagement.jsx/components/modal'; // Adjust the import path accordingly
import { Select, SelectItem } from '@nextui-org/select'; // Ensure you have the Select components imported

// Define options for Select components
const collectionNoOptions = [
  { key: 'COL001', label: 'COL001' },
  { key: 'COL002', label: 'COL002' },
  { key: 'COL003', label: 'COL003' },
  { key: 'COL004', label: 'COL004' },
  // Add more as needed
];

const shippedByOptions = [
  { key: 'DHL', label: 'DHL' },
  { key: 'FedEx', label: 'FedEx' },
  { key: 'UPS', label: 'UPS' },
  { key: 'USPS', label: 'USPS' },
  // Add more as needed
];

const dueDateOptions = [
  { key: 'Today', label: 'Today' },
  { key: 'Tomorrow', label: 'Tomorrow' },
  { key: 'This Week', label: 'This Week' },
  { key: 'Next Week', label: 'Next Week' },
  { key: 'This Month', label: 'This Month' },
  // Add more as needed
];

const columns = [
  { key: 'number', label: 'N°' },
  { key: 'orderNumber', label: 'N° Orders' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'sentAt', label: 'Sent At' },
  { key: 'shippedAt', label: 'Shipped At' },
  { key: 'shoppingBy', label: 'Shopping By' },
  { key: 'statut', label: 'Status' },
  { key: 'send', label: 'Send' },
  { key: 'options', label: 'Actions' },
];

const ListOfShipments = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('active');
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const rowsPerPage = 10;

  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // States for Modal Select Inputs
  const [collectionNo, setCollectionNo] = useState('');
  const [statut, setStatut] = useState('');
  const [shippedBy, setShippedBy] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addNewProduct = () => {
    navigate('/collects/new-collect');
  };

  const handleCheckboxChange = (key) => {
    if (selectedRows.includes(key)) {
      setSelectedRows(selectedRows.filter((selectedKey) => selectedKey !== key));
    } else {
      setSelectedRows([...selectedRows, key]);
    }
  };
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

  const [activeView, setActiveView] = useState('active');

  const handleDelete = (key) => {
    setProducts(products.filter((product) => product.key !== key));
  };

  const filteredProducts =
    selectedTab === 'active'
      ? products.filter((product) => product.status === 'active')
      : products.filter((product) => product.status === 'archived');

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case 'statut':
        return (
          <div className="flex items-center">
            <span className="bg-[#5902E843] text-black dark:text-white px-2 py-1 rounded-full flex items-center">
              <Recycle03Icon size={16} className="mr-1" />
              <span className="whitespace-nowrap">{item.statut.trim()}</span>
            </span>
          </div>
        );

      case 'send':
        return (
          <div className="flex items-center">
            <span
              className={
                item.send === 'Shipped'
                  ? 'bg-[#00E0FF30] text-black dark:text-white px-2 py-1 rounded-full flex items-center'
                  : 'bg-[#00FF2930] text-black dark:text-white px-2 py-1 rounded-full flex items-center'
              }
            >
              <CheckmarkCircle01Icon size={16} className="mr-1" />
              {item.send}
            </span>
          </div>
        );

      case 'options':
        return (
          <div className="flex space-x-2 justify-center">
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center bg-[#00000020] dark:bg-[#FFFFFF20]"
              style={{ padding: 0, minWidth: '32px', height: '32px' }}
            >
              <EyeIcon size={16} />
            </Button>

            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
            >
              <PencilEdit01Icon size={16} style={{ color: 'white' }} />
            </Button>

            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#ED0006', padding: 0, minWidth: '32px', height: '32px' }}
              onClick={() => handleDelete(item.key)}
            >
              <Delete01Icon size={16} style={{ color: 'white' }} />
            </Button>
          </div>
        );

      default:
        return <span className="text-sm dark:text-white">{item[columnKey]}</span>;
    }
  };

  // Handle Ctrl+K to open the modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Ctrl + K is pressed
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search/filter logic here
    const filtered = rows.filter((product) => {
      return (
        (collectionNo ? product.collectionNo === collectionNo : true) &&
        (statut && statut !== 'All' ? product.statut === statut : true) &&
        (shippedBy ? product.shippedBy === shippedBy : true) &&
        (dueDate ? product.dueDate === dueDate : true)
      );
    });
    setProducts(filtered);
    setIsModalOpen(false);
  };

  // Handle Cancel - Reset filters and close modal
  const handleCancel = () => {
    setCollectionNo('');
    setStatut('');
    setShippedBy('');
    setDueDate('');
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout title="Collects - List of Shipments" icon={<DeliveryTruck01Icon className="text-info" />}>
      <div className="pr-2 pl-1 md:p-4">
        <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row">
          <StatusTabs
            activeCount={products.filter((product) => product.status === 'active').length}
            archivedCount={products.filter((product) => product.status === 'archived').length}
            selectedTab={activeView}
            onTabChange={setActiveView}
          />

          <div className="flex justify-center space-x-1 mb-4">
            <Button
              color="default"
              onClick={addNewProduct}
              className="rounded-full"
              style={{ backgroundColor: '#0258E8', color: 'white' }}
            >
              <PlusSignIcon size={18} /> New Collect
            </Button>
            <Button color="default" className="rounded-full" style={{ backgroundColor: '#ED0006', color: 'white' }}>
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
        </div>

        <Table
          columns={columns}
          data={filteredProducts}
          renderCell={renderCell}
          handleCheckboxChange={handleCheckboxChange}
          selectedRows={selectedRows}
          rowsPerPage={rowsPerPage}
          className="dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Render the CustomModal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title="Search"
        isDarkMode={isDarkMode}
        width="600px" // Optional: customize the width if needed
      >
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Collection No Select */}
          <div className="w-full">
            <label htmlFor="collection-no" className="block mb-1">
            </label>
            <Select
              selectedKeys={collectionNo ? [collectionNo] : []}
              id="collection-no"
              placeholder="Select Collection No"
              labelPlacement="outside"
              classNames={{
                value: "dark:!text-[#ffffff85] !text-[#00000085]",
                trigger: 'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
              }}
              onSelectionChange={(keys) => setCollectionNo(keys[0])}
            >
              {collectionNoOptions.map(option => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Statut Select */}
          <div className="w-full">
            <label htmlFor="statut" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Statut</span>
            </label>
            <Select
              selectedKeys={statut ? [statut] : []}
              id="statut"
              placeholder="All"
              labelPlacement="outside"
              classNames={{
                value: "dark:!text-[#ffffff85] !text-[#00000085]",
                trigger: 'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
              }}
              onSelectionChange={(keys) => setStatut(keys[0])}
            >
              <SelectItem key="All">All</SelectItem>
              <SelectItem key="Active">Active</SelectItem>
              <SelectItem key="Archived">Archived</SelectItem>
              {/* Add more options if needed */}
            </Select>
          </div>

          {/* Shipped By Select */}
          <div className="w-full">
            <label htmlFor="shipped-by" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Shipped By</span>
            </label>
            <Select
              selectedKeys={shippedBy ? [shippedBy] : []}
              id="shipped-by"
              placeholder="All"
              labelPlacement="outside"
              classNames={{
                value: "dark:!text-[#ffffff85] !text-[#00000085]",
                trigger: 'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
              }}
              onSelectionChange={(keys) => setShippedBy(keys[0])}
            >
              {shippedByOptions.map(option => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Due Date Select (No Borders) */}
          <div className="w-full flex items-center">
            <label htmlFor="due-date" className="block mb-1">
            </label>
            <Select
              selectedKeys={dueDate ? [dueDate] : []}
              id="due-date"
              placeholder="Due Date"
              labelPlacement="outside"
              classNames={{
                value: "dark:!text-[#ffffff] !text-[#00000085]",
                trigger: 'bg-transparent mt-2 focus:border-none border-none rounded-lg', // No border
              }}
              onSelectionChange={(keys) => setDueDate(keys[0])}
            >
              {dueDateOptions.map(option => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-center space-x-4 rounded-full">
            <Button type="submit" color="primary" className='rounded-full'>
              Search Now
            </Button>
            <Button
              type="button"
              color="default"
              variant="flat"
              className="rounded-full bg-transparent border border-black dark:border-white text-black dark:text-white hover:bg-transparent"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CustomModal>
    </DashboardLayout>
  );
};

export default ListOfShipments;
