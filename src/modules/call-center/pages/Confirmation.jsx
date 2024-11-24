// Confirmation.jsx

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import {
  ArrowDown01Icon,
  Calling02Icon,
  CustomerService01Icon,
  PencilEdit01Icon,
  ArrowUpDownIcon,
  UserIcon,
  Cancel01Icon,
  Search01Icon,
  FilterIcon,
  CommandIcon,
} from "hugeicons-react";
import StatusTabs from '../../shared/components/StatusTabs';
import Table from "../../stockManagement.jsx/components/Table";
import { motion } from 'framer-motion';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { agentNames } from "../../../core/utils/shared.data";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import CustomModal from '../../stockManagement.jsx/components/modal';
import { Code } from '@nextui-org/code';
import DetailedOrderModal from "../components/DetailedOrderModal";
import { DatePicker } from "@nextui-org/react";

const rows = [
  {
    key: "1",
    orderNum: "CSABDS",
    subNum: "JDHSKDHD",
    store: "Store 1",
    product: "Product X",
    productId: "123456789",
    name: "John Doe",
    country: "Saudi Arabia",
    price: "12.564 SAR",
    agent: "Alice Smith",
    status: "active",
  },
  {
    key: "2",
    orderNum: "DSACAS",
    subNum: "AKSKDHJS",
    store: "Store 2",
    product: "Product Y",
    productId: "987654321",
    name: "Jane Smith",
    country: "United Arab Emirates",
    price: "15.324 AED",
    agent: "Bob Johnson",
    status: "archived",
  },
  {
    key: "3",
    orderNum: "CSSHDS",
    subNum: "JDHSKDHD",
    store: "Store 1",
    product: "Product X",
    productId: "123456789",
    name: "John Doe",
    country: "Saudi Arabia",
    price: "12.564 SAR",
    agent: "Alice Smith",
    status: "active",
  },
  {
    key: "4",
    orderNum: "CSAHDS",
    subNum: "JDHSKDHD",
    store: "Store 1",
    product: "Product X",
    productId: "123456789",
    name: "John Doe",
    country: "Saudi Arabia",
    price: "11.564 SAR",
    agent: "Alice Smith",
    status: "active",
  },
  {
    key: "5",
    orderNum: "CSABSHDS",
    subNum: "JDHSKDHD",
    store: "Store 1",
    product: "Product X",
    productId: "123456789",
    name: "John Doe",
    country: "Saudi Arabia",
    price: "12.564 SAR",
    agent: "Alice Smith",
    status: "active",
  },
  {
    key: "6",
    orderNum: "CSABSHDS",
    subNum: "JDHSKDHD",
    store: "Store 1",
    product: "Product X",
    productId: "123456789",
    name: "John Doe",
    country: "Saudi Arabia",
    price: "12.564 SAR",
    agent: "Alice Smith",
    status: "archived",
  },
];

const columns = [
  { key: "checkbox", label: "#" },
  { key: "orderNum", label: "Order Number" },
  { key: "store", label: "Store" },
  { key: "product", label: "Product" },
  { key: "name", label: "Name" },
  { key: "country", label: "Country" },
  { key: "price", label: "Price" },
  { key: "agent", label: "Agent" },
  { key: "status", label: "Status" },
];

const Confirmation = () => {
  const [selectedTab, setSelectedTab] = useState('active');
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;
  const [callTab, setCallTab] = useState('Call');
  const [sortAscending, setSortAscending] = useState(true);

  // State variables for modals
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // State variables for search inputs
  const [orderNumber, setOrderNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [date, setDate] = useState('');
  const [seller, setSeller] = useState(''); // Added Seller State
  const [product, setProduct] = useState('');
  const [fromCountry, setFromCountry] = useState('');
  const [toCountry, setToCountry] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([1, 3]);

  // State variables for Order Details Modal
  const [isDetailedOrderModalOpen, setIsDetailedOrderModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Options for Select components
  const orderStatusOptions = [
    { key: 'All', label: 'All' },
    { key: 'Pending', label: 'Pending' },
    { key: 'Confirmed', label: 'Confirmed' },
    // Add more as needed
  ];

  const dateOptions = [
    { key: 'Today', label: 'Today' },
    { key: 'Yesterday', label: 'Yesterday' },
    { key: 'Last 7 Days', label: 'Last 7 Days' },
    // Add more as needed
  ];

  const sellerOptions = [
    { key: 'Seller1', label: 'Seller1' },
    { key: 'Seller2', label: 'Seller2' },
    // Add more as needed
  ];

  const productOptions = [
    { key: 'Product1', label: 'Product1' },
    { key: 'Product2', label: 'Product2' },
    // Add more as needed
  ];

  const countryOptions = [
    { key: 'All Countries', label: 'All Countries' },
    { key: 'Saudi Arabia', label: 'Saudi Arabia' },
    { key: 'United Arab Emirates', label: 'United Arab Emirates' },
    // Add more as needed
  ];

  // Options for checkboxes
  const options = [
    { key: 1, label: 'Highest Priority (Confirmation)' },
    { key: 2, label: 'Highest Priority (Follow up)' },
    { key: 3, label: 'Orders locked' },
    { key: 4, label: 'Confirmed without city' },
  ];

  // State variables for dark mode detection
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Original data
  const [allRows, setAllRows] = useState(rows);
  const [filteredRows, setFilteredRows] = useState(rows);

  // Handle dark mode detection
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

  // Handle Ctrl+K to toggle search modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCheckboxChange = (keys, isRange) => {
    // ... your existing handleCheckboxChange logic
  };

  const filteredTabRows = filteredRows.filter(row => row.status.toLowerCase() === selectedTab.toLowerCase());

  const sortedRows = [...filteredTabRows].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
    const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));

    return sortAscending ? priceA - priceB : priceB - priceA;
  });

  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
  };

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "orderNum":
        return (
          <div>
            <p>{item.orderNum}</p>
            <Button 
              onClick={() => openDetailedOrderModal(item)} 
              className="bg-transparent p-0 m-0 cursor-pointer text-blue-500"
            >
              ({item.subNum})
            </Button>
          </div>
        );
      case "product":
        return (
          <div>
            <p>{item.product}</p>
            <span className="text-dark_selected">(SKU: {item.productId})</span>
          </div>
        );
      default:
        return <span>{cellValue}</span>;
    }
  }, []);

  const toggleSelectOption = useCallback((key) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(key)) {
        return prevSelectedOptions.filter(itemKey => itemKey !== key);
      } else {
        return [...prevSelectedOptions, key];
      }
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = allRows.filter((row) => {
      const matchesOrderNumber = orderNumber
        ? row.orderNum.toLowerCase().includes(orderNumber.toLowerCase())
        : true;
      const matchesPhoneNumber = phoneNumber
        ? row.subNum.toLowerCase().includes(phoneNumber.toLowerCase())
        : true;
      const matchesFullName = fullName
        ? row.name.toLowerCase().includes(fullName.toLowerCase())
        : true;
      const matchesOrderStatus = orderStatus && orderStatus !== 'All'
        ? row.status.toLowerCase() === orderStatus.toLowerCase()
        : true;
      const matchesSeller = seller
        ? row.agent.toLowerCase().includes(seller.toLowerCase())
        : true;
      // Add more matching logic for other fields as needed

      return matchesOrderNumber && matchesPhoneNumber && matchesFullName && matchesOrderStatus && matchesSeller;
    });

    setFilteredRows(filtered);
    setIsSearchModalOpen(false);
  };

  const handleCancel = () => {
    setOrderNumber('');
    setPhoneNumber('');
    setFullName('');
    setOrderStatus('');
    setDate('');
    setSeller(''); // Reset Seller
    setProduct('');
    setFromCountry('');
    setToCountry('');
    setSelectedOptions([1, 3]);
    setFilteredRows(allRows);
    setIsSearchModalOpen(false);
  };

  const openDetailedOrderModal = (order) => {
    setSelectedOrderDetails(order);
    setIsDetailedOrderModalOpen(true);
  };

  return (
    <>
      <DashboardLayout
        title="Call Center - Confirmation"
        icon={<CustomerService01Icon className="text-info" />}
        additionalContent={
          <div className="flex justify-evenly gap-2 items-center px-4 rounded-full bg-[#0258E810]">
            {['Call', 'Whatsapp'].map((t, idx) => (
              <motion.div
                whileTap={{ scale: 0.8 }}
                key={idx}
                className={`flex justify-center items-center p-2 cursor-pointer ${callTab === t ? 'font-bold text-[#0258E8]' : 'font-normal text-black dark:text-white'}`}
                onClick={() => setCallTab(t)}
              >
                {t}
              </motion.div>
            ))}
          </div>
        }
      >
        {/* Small Screen: Search and Filter Icons on Top */}
        <div className="flex space-x-2 justify-center mb-4">
          <div className="flex space-x-2 md:hidden mb-4">
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
              onClick={() => setIsSearchModalOpen(true)} // Open search modal on click
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

        <div className="p-2 md:p-4">
          <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row">
            <StatusTabs
              activeCount={allRows.filter(row => row.status.toLowerCase() === "active").length}
              archivedCount={allRows.filter(row => row.status.toLowerCase() === "archived").length}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
            />

            <div className="flex gap-1 items-center self-end">
              <Button color="default" className="rounded-full bg-info text-white">
                <Calling02Icon size={18} /> <h6 className="text-[12px] md:text-sm">Start Call</h6>
              </Button>

              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="rounded-full text-sm md:text-lg">
                    <h6 className="text-[12px] md:text-sm">List of Agents</h6> <ArrowDown01Icon size={16} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  {agentNames.map((i) => (
                    <DropdownItem key={i}>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <UserIcon size={15} /> {i}
                        </div>
                      </div>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button color="default" className="rounded-full bg-danger text-white text-sm md:text-lg">
                <PencilEdit01Icon size={18} /> <h6 className="text-[12px] md:text-sm">Actions</h6>
              </Button>
            </div>
          </div>

          <Table
            columns={columns.map(col =>
              col.key === "price"
                ? {
                  ...col,
                  label: (
                    <div className="flex justify-center items-center">
                      {col.label}
                      <ArrowUpDownIcon
                        size={15}
                        onClick={toggleSortOrder}
                        className="ml-1 cursor-pointer text-gray-400 hover:text-blue-500"
                      />
                    </div>
                  )
                }
                : col
            )}
            data={sortedRows}
            renderCell={renderCell}
            handleCheckboxChange={handleCheckboxChange}
            selectedRows={selectedRows}
            rowsPerPage={rowsPerPage}
            className="dark:bg-gray-800 dark:text-white"
          />
        </div>
      </DashboardLayout>

      {/* Order Details Modal */}
      <DetailedOrderModal 
        modalOpen={isDetailedOrderModalOpen} 
        Order={selectedOrderDetails} 
        setModalOpen={setIsDetailedOrderModalOpen} 
      />

      {/* Render the Search Modal */}
      <CustomModal
        isOpen={isSearchModalOpen}
        onClose={handleCancel}
        title="Search"
        isDarkMode={isDarkMode}
        width="600px"
      >
        <form onSubmit={handleSearch}>
          {/* Input Fields */}
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <Input
                type="text"
                variant="underlined"
                color="primary"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                label="Order Number"
                classNames={{
                  label: ['!text-[#00000050] dark:!text-[#FFFFFF30]'],
                }}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <Input
                type="text"
                variant="underlined"
                color="primary"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                label="Phone Number"
                classNames={{
                  label: ['!text-[#00000050] dark:!text-[#FFFFFF30]'],
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-8 lg:flex-row mt-6">
            <div className="w-full lg:w-1/2">
              <Input
                type="text"
                variant="underlined"
                color="primary"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
                classNames={{
                  label: ['!text-[#00000050] dark:!text-[#FFFFFF30]'],
                }}
              />
            </div>
          </div>

          {/* Select Dropdowns */}
          <div className="flex flex-col gap-8 lg:flex-row mt-6">
            <div className="w-full lg:w-1/2">
              <label htmlFor="orders-status" className="block mr-2">
                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">
                  Orders Status
                </span>
                <Select
                  selectedKeys={orderStatus ? [orderStatus] : []}
                  id="orders-status"
                  placeholder="Select an option"
                  labelPlacement="outside"
                  classNames={{
                    value: 'dark:!text-[#ffffff85] !text-[#00000085]',
                    trigger:
                      'bg-transparent mt-2 focus:border-dark_selected dark:bg-transparent border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
                  }}
                  onSelectionChange={(keys) => setOrderStatus(keys.currentKey)}
                >
                  {orderStatusOptions.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                  ))}
                </Select>
              </label>
            </div>
            <div className="md:w-1/2 w-full md:mt-1">
            <label htmlFor="date" className="block mr-2">
                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Date</span>
                <div key={"bordered"} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <DatePicker 
                    classNames={{
                      value: " dark:!text-[#ffffff85] !text-[#00000085] ",
                      inputWrapper: 'bg-transparent !rounded-lg !mt-2 focus:border-dark_selected dark:bg-transparent border border-[#00000030] dark:border-[#ffffff10] rounded-lg ',
                    }} 
                    variant={"bordered"} 
                    selected={date}
                    onChange={(newDate) => setDate(newDate)}
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Added Seller and Product Row */}
          <div className="flex flex-col gap-8 lg:flex-row mt-6">
            <div className="w-full lg:w-1/2">
              <label htmlFor="seller" className="block mr-2">
                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">
                  Seller
                </span>
                <Select
                  selectedKeys={seller ? [seller] : []}
                  id="seller"
                  placeholder="Select a seller"
                  labelPlacement="outside"
                  classNames={{
                    value: 'dark:!text-[#ffffff85] !text-[#00000085]',
                    trigger:
                      'bg-transparent mt-2 focus:border-dark_selected dark:bg-transparent border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
                  }}
                  onSelectionChange={(keys) => setSeller(keys.currentKey)}
                >
                  {sellerOptions.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                  ))}
                </Select>
              </label>
            </div>
            <div className="w-full lg:w-1/2">
              <label htmlFor="product" className="block mr-2">
                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">
                  Product
                </span>
                <Select
                  selectedKeys={product ? [product] : []}
                  id="product"
                  placeholder="Select a product"
                  labelPlacement="outside"
                  classNames={{
                    value: 'dark:!text-[#ffffff85] !text-[#00000085]',
                    trigger:
                      'bg-transparent mt-2 focus:border-dark_selected dark:bg-transparent border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
                  }}
                  onSelectionChange={(keys) => setProduct(keys.currentKey)}
                >
                  {productOptions.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                  ))}
                </Select>
              </label>
            </div>
          </div>

          {/* Updated From and To Row with Transparent Backgrounds */}
          <div className="flex flex-col gap-8 lg:flex-row mt-6">
            <div className="w-full lg:w-1/2">
              <label htmlFor="from" className="block mr-2">
                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">
                  From
                </span>
                <Select
                  selectedKeys={fromCountry ? [fromCountry] : []}
                  id="from"
                  placeholder="Select a country"
                  labelPlacement="outside"
                  classNames={{
                    value: 'dark:!text-[#ffffff85] !text-[#00000085]',
                    trigger:
                      'bg-transparent mt-2 focus:border-dark_selected dark:bg-transparent border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
                  }}
                  onSelectionChange={(keys) => setFromCountry(keys.currentKey)}
                >
                  {countryOptions.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                  ))}
                </Select>
              </label>
            </div>
            <div className="w-full lg:w-1/2">
              <label htmlFor="to" className="block mr-2">
                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">
                  To
                </span>
                <Select
                  selectedKeys={toCountry ? [toCountry] : []}
                  id="to"
                  placeholder="Select a country"
                  labelPlacement="outside"
                  classNames={{
                    value: 'dark:!text-[#ffffff85] !text-[#00000085]',
                    trigger:
                      'bg-transparent mt-2 focus:border-dark_selected dark:bg-transparent border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
                  }}
                  onSelectionChange={(keys) => setToCountry(keys.currentKey)}
                >
                  {countryOptions.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                  ))}
                </Select>
              </label>
            </div>
          </div>

          {/* Options Selection */}
          <div className="flex flex-col gap-8 lg:flex-row mt-6">
            <div className="w-full">
              <label htmlFor="options" className="block mr-2">
                <div className="flex flex-col gap-1">
                  {options.map((i) => (
                    <div
                      key={i.key}
                      onClick={() => toggleSelectOption(i.key)}
                      className="py-1 cursor-pointer flex justify-start items-center gap-2 w-full"
                    >
                      <motion.div
                        initial={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.1 }}
                      >
                        <div className="w-5 h-5 rounded-md border border-[#00000050] dark:border-[#ffffff50] flex justify-center items-center">
                          {selectedOptions.includes(i.key) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              transition={{ type: 'spring', stiffness: 100 }}
                              animate={{ scale: 1 }}
                              className="w-3.5 h-3.5 rounded-sm bg-glb_blue"
                            ></motion.div>
                          )}
                        </div>
                      </motion.div>
                      <h4
                        className={
                          selectedOptions.includes(i.key)
                            ? 'text-[#000000] dark:text-[#ffffff]'
                            : 'text-[#00000030] dark:text-[#ffffff30]'
                        }
                      >
                        {i.label}
                      </h4>
                    </div>
                  ))}
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-t-gray-200 dark:border-t-[#ffffff10] flex flex-row justify-center items-center gap-4">
            <Button type="submit" className="rounded-full bg-blue-600 text-white px-4 py-2">
              <Search01Icon /> Search Now
            </Button>
            <Button
              type="button"
              className="rounded-full bg-gray-200 dark:bg-base_card px-4 py-2"
              onClick={handleCancel}
            >
              <Cancel01Icon size={16} /> Cancel
            </Button>
          </div>
        </form>
      </CustomModal>
    </>
  );
};

export default Confirmation;
