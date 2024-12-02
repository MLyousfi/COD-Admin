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
  Search01Icon,
  FilterIcon,
  CommandIcon,
  ArrowRight01Icon,
  Calculator01Icon,
  CallOutgoing01Icon,
  CustomerSupportIcon,
  Download01Icon,
  DropboxIcon,
  PrinterIcon,
  Settings02Icon,
} from 'hugeicons-react'; 
import { Button } from '@nextui-org/button';
import DashboardLayout from '@shared/layouts/DashboardLayout.jsx';
import Table from '../../shared/components/Table';
import StatusTabs from '../../shared/components/StatusTabs';
import { rows } from '../../../core/utils/data2';
import CustomModal from '../../shared/components/modal'; 
import { Select, SelectItem } from '@nextui-org/select';
import { Input } from '@nextui-org/input';
import { Code } from '@nextui-org/code';
import FilterModal from './FilterModal'; 
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

const collectionNoOptions = [
  { key: 'COL001', label: 'COL001' },
  { key: 'COL002', label: 'COL002' },
  { key: 'COL003', label: 'COL003' },
  { key: 'COL004', label: 'COL004' },
];

const shippedByOptions = [
  { key: 'DHL', label: 'DHL' },
  { key: 'FedEx', label: 'FedEx' },
  { key: 'UPS', label: 'UPS' },
  { key: 'USPS', label: 'USPS' },
];

const dueDateOptions = [
  { key: 'Today', label: 'Today' },
  { key: 'Tomorrow', label: 'Tomorrow' },
  { key: 'This Week', label: 'This Week' },
  { key: 'Next Week', label: 'Next Week' },
  { key: 'This Month', label: 'This Month' },
];

const columns = [
  { key: 'number', label: 'N°' },
  { key: 'orderNumber', label: 'N° Orders' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'sentAt', label: 'Sent At' },
  { key: 'shippedAt', label: 'Shipped At' },
  { key: 'shippingBy', label: 'Shipping By' }, // Corrected typo from 'shoppingBy' to 'shippingBy'
  { key: 'statut', label: 'Status' },
  { key: 'send', label: 'Send' },
  { key: 'options', label: 'Actions' },
];

const ListOfShipments = () => {
  const navigate = useNavigate();
  // Removed selectedTab
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const rowsPerPage = 10;

  // State for CustomModal (Search Modal)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for FilterModal
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // States for Modal Select Inputs
  const [collectionNo, setCollectionNo] = useState('');
  const [statut, setStatut] = useState('');
  const [shippedBy, setShippedBy] = useState('');
  const [dueDate, setDueDate] = useState('');

  // State for Status Dropdown Filter
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

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

  const filteredProducts = products.filter((product) => {
    // Ensure product.status is a string and convert to lowercase
    const productStatus = typeof product.status === 'string' ? product.status.toLowerCase() : '';
    
    // Ensure activeView is in lowercase
    const currentView = activeView.toLowerCase();
  
    const statusMatch =
      currentView === 'active' ? productStatus === 'active' : productStatus === 'archived';
  
    // For 'statut', assuming it should match exactly. If case-insensitive is needed, apply similar logic.
    const statutMatch =
      selectedStatusFilter === 'All' ? true : product.statut === selectedStatusFilter;
  
    return statusMatch && statutMatch;
  });
  

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

  // Handle Ctrl+K to open the search modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Ctrl + K is pressed
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
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
    <DashboardLayout
      title="Collects - List of Shipments"
      icon={<DeliveryTruck01Icon className="text-info" />}
      filterModalComponent={<FilterModal />}
    >
      <div className="pr-2 pl-1 md:p-4">
        {/* Small Screen: Search and Filter Icons on Top */}
        <div className="flex space-x-2 justify-center mb-4">
          {/* Small Screen: Search and Filter Icons */}
          <div className="flex space-x-2 md:hidden mb-4">
            {/* Use md:hidden to show only on small screens */}
            <Input
              className="w-full"
              placeholder="Search"
              classNames={{
                inputWrapper: 'bg-gray-100 dark:bg-neutral-800 rounded-full',
              }}
              endContent={
                <Code className="flex flex-row justify-center pl-0">
                  &nbsp; <CommandIcon className="mr-1" size={16} /> + k
                </Code>
              }
              startContent={<Search01Icon size={24} />}
              onClick={() => setIsModalOpen(true)} // Open search modal on click
            />

            <Button
              isIconOnly
              className="dark:text-white text-black rounded-full bg-gray-100 dark:bg-neutral-800"
              onClick={() => setIsFilterModalOpen(true)} // Open FilterModal on click
            >
              <FilterIcon size={18} />
            </Button>
          </div>
        </div>

        {/* Desktop and Medium Screens: Status Tabs on the Left, Buttons on the Right */}
        <div className="flex justify-between items-center mb-4">
          {/* Status Tabs on the left for medium and larger screens */}
          <div className="hidden md:flex">
            <StatusTabs
              activeCount={products.filter((product) => product.status === 'active').length}
              archivedCount={products.filter((product) => product.status === 'archived').length}
              selectedTab={activeView}
              onTabChange={(tab) => {
                setActiveView(tab);
                setSelectedStatusFilter('All'); // Optional: Reset status filter when changing tabs
              }}
            />
          </div>

          <div className="flex space-x-1 justify-center px-2 md:px-4 ml-auto">
            <Button
              color="default"
              onClick={addNewProduct}
              className="rounded-full flex items-center px-3 py-1 text-sm md:px-4 md:py-2"
              style={{ backgroundColor: '#0258E8', color: 'white' }}
            >
              <PlusSignIcon size={16} className="mr-1" /> New Collect
            </Button>

            {/* Actions Dropdown */}
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

            {/* Status Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  color="default"
                  className="rounded-full flex items-center px-3 py-1 text-sm md:px-4 md:py-2 border"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: isDarkMode ? '#ffffff' : '#000000',
                    color: isDarkMode ? '#ffffff' : '#000000',
                  }}
                >
                  <span className="mr-1">Status</span>
                  <ArrowDown01Icon size={16} className="ml-1" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Status Filters">
                <DropdownItem key="All" onClick={() => setSelectedStatusFilter('All')}>
                  All
                </DropdownItem>
                <DropdownItem key="Paid" onClick={() => setSelectedStatusFilter('Paid')}>
                  Paid
                </DropdownItem>
                <DropdownItem key="Unpaid" onClick={() => setSelectedStatusFilter('Unpaid')}>
                  Unpaid
                </DropdownItem>
                <DropdownItem key="Delivery Again" onClick={() => setSelectedStatusFilter('Delivery Again')}>
                  Delivery Again
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* Status Tabs for small screens */}
        <div className="md:hidden ml-4 mb-4">
          <StatusTabs
            activeCount={products.filter((product) => product.status === 'active').length}
            archivedCount={products.filter((product) => product.status === 'archived').length}
            selectedTab={activeView}
            onTabChange={(tab) => {
              setActiveView(tab);
              setSelectedStatusFilter('All'); // Optional: Reset status filter when changing tabs
            }}
          />
        </div>

        {/* Table Component */}
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

      {/* Render the CustomModal (Search Modal) */}
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
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Collection No</span>
            </label>
            <Select
              selectedKeys={collectionNo ? [collectionNo] : []}
              id="collection-no"
              placeholder="Select Collection No"
              labelPlacement="outside"
              classNames={{
                value: 'dark:!text-[#ffffff85] !text-[#00000085]',
                trigger:
                  'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
              }}
              onSelectionChange={(keys) => setCollectionNo(keys.currentKey)}
            >
              {collectionNoOptions.map((option) => (
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
                value: 'dark:!text-[#ffffff85] !text-[#00000085]',
                trigger:
                  'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
              }}
              onSelectionChange={(keys) => setStatut(keys.currentKey)}
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
                value: 'dark:!text-[#ffffff85] !text-[#00000085]',
                trigger:
                  'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
              }}
              onSelectionChange={(keys) => setShippedBy(keys.currentKey)}
            >
              {shippedByOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Due Date Select (No Borders) */}
          <div className="w-full flex items-center">
            <Select
              selectedKeys={dueDate ? [dueDate] : []}
              id="due-date"
              placeholder="Due Date"
              labelPlacement="outside"
              classNames={{
                value: 'dark:!text-[#ffffff] !text-[#00000085]',
                trigger: 'bg-transparent mt-2 focus:border-none border-none rounded-lg', // No border
              }}
              onSelectionChange={(keys) => setDueDate(keys.currentKey)}
            >
              {dueDateOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-center space-x-4 rounded-full">
            <Button type="submit" color="primary" className="rounded-full">
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

      {/* Render the FilterModal */}
      <FilterModal
        id="filter-modal"
        modalOpen={isFilterModalOpen}
        setModalOpen={setIsFilterModalOpen}
      />
    </DashboardLayout>
  );
};

export default ListOfShipments;
