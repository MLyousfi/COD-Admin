import React, { useState } from 'react';
import {
  InvoiceIcon,
  PencilEdit01Icon,
  PlusSignIcon,
  EyeIcon,
  Delete01Icon,
  PrinterIcon,
  TableIcon,
  PackageIcon,
  Settings02Icon,
  Upload02Icon,
} from "hugeicons-react"; // Ensure all icons are correctly imported
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../shared/components/Table';
import StatusTabs from '../../shared/components/StatusTabs';
import { rows } from '../../../core/utils/data8'; 
import { useThemeProvider } from '../../../core/providers/ThemeContext';
import CustomModal from '../../shared/components/modal'; 
import { Select, SelectItem } from "@nextui-org/select";
import { Menu, MenuItem } from "@nextui-org/menu";

const columns = [
  { key: "checkbox", label: "#" },
  { key: "invoiceNumber", label: "Invoice N°" },
  { key: "seller", label: "Seller" },
  { key: "date", label: "Date" },
  { key: "product", label: "Product" },
  { key: "type", label: "Type" },
  { key: "qty", label: "QTY" },
  { key: "totalCharges", label: "Total Charges" },
  { key: "soCost", label: "SO Cost" },
  { key: "soMargin", label: "SO Margin" },
  { key: "shCost", label: "SH Cost" },
  { key: "shMargin", label: "SH Margin" },
  { key: "statut", label: "Statut" },
  { key: "paymentStatut", label: "Payments Statut" },
  { key: "options", label: "Actions" },
];

const SourcingInvoices = () => {
  const [selectedTab, setSelectedTab] = useState('active');
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null); // State to manage dropdown visibility
  const rowsPerPage = 10;
  const { currentTheme } = useThemeProvider();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // Confirmation modal state

  const [newInvoiceData, setNewInvoiceData] = useState({
    seller1: '',
    seller2: '',
    otherCustomer: '',
    date: '',
    sourcingTab: '',
    statut: '',
    photo: null,
  });

  const sellers1 = [
    { key: 'seller1a', label: 'Seller One A' },
    { key: 'seller1b', label: 'Seller One B' },
  ];

  const sellers2 = [
    { key: 'seller2a', label: 'Seller Two A' },
    { key: 'seller2b', label: 'Seller Two B' },
  ];

  const otherCustomers = [
    { key: 'customer1', label: 'Customer One' },
    { key: 'customer2', label: 'Customer Two' },
  ];

  const sourcingTabs = [
    { key: 'sourcing1', label: 'Sourcing One' },
    { key: 'sourcing2', label: 'Sourcing Two' },
  ];

  const statuts = [
    { key: 'pending', label: 'Pending' },
    { key: 'paid', label: 'Paid' }, 
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewInvoiceData({
      seller1: '',
      seller2: '',
      otherCustomer: '',
      date: '',
      sourcingTab: '',
      statut: '',
      photo: null,
    });
  };

  const handleCreateInvoice = () => {
    const { seller1, seller2, otherCustomer, date, sourcingTab, statut, photo } = newInvoiceData;

    // Validate required fields
    if (!seller1 || !seller2 || !otherCustomer || !date || !sourcingTab || !statut) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Check if the status is 'paid'
    if (statut === 'paid') {
      setIsConfirmationOpen(true);
    } else {
      // Proceed to save the invoice directly
      saveInvoice();
    }
  };

  // Function to save the invoice
  const saveInvoice = () => {
    const { seller1, seller2, otherCustomer, date, sourcingTab, statut, photo } = newInvoiceData;

    const newKey = products.length + 1;
    const newProduct = {
      key: newKey,
      invoiceNumber: `INV-${newKey}`,
      seller: `${seller1}, ${seller2}`,
      otherCustomer,
      date,
      sourcingTab,
      statut,
      product: "Sample Product",
      type: "Sample Type",
      qty: 10,
      totalCharges: "$1000",
      soCost: "$700",
      soMargin: "$300",
      shCost: "$500",
      shMargin: "$500",
      paymentStatut: statut === 'paid' ? "Paid" : "Unpaid",
      verified: false,
      status: "active",
      photo, // Handle photo as needed
    };
    setProducts([...products, newProduct]);
    handleCloseModal();
  };

  const handleSelectChange = (key, value) => {
    // Check if 'value' is a Set (from Select components) or a string (from date input)
    if (value instanceof Set) {
      const selectedValue = Array.from(value)[0] || '';
      setNewInvoiceData(prev => ({
        ...prev,
        [key]: selectedValue,
      }));
    } else {
      // Assume it's a string (from date input)
      setNewInvoiceData(prev => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleCheckboxChange = (keys, isRange) => {
    if (isRange) {
      // Add all keys in the range
      setSelectedRows((prevSelected) => {
        const newSelection = [...prevSelected];
        keys.forEach((key) => {
          if (!newSelection.includes(key)) {
            newSelection.push(key);
          }
        });
        return newSelection;
      });
    } else if (Array.isArray(keys)) {
      // Select all or unselect all
      setSelectedRows(keys);
    } else {
      // Toggle single selection
      setSelectedRows((prevSelected) =>
        prevSelected.includes(keys)
          ? prevSelected.filter((key) => key !== keys)
          : [...prevSelected, keys]
      );
    }
  };

  const handleDelete = (key) => {
    setProducts(products.filter(product => product.key !== key));
  };

  const toggleDropdown = (key) => {
    setIsDropdownOpen(isDropdownOpen === key ? null : key);
  };

  const filteredProducts = selectedTab === 'active'
    ? products.filter(product => product.status === "active")
    : products.filter(product => product.status === "archived");

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

      case "statut":
        const statutColor = {
          Pending: currentTheme === "dark" ? "#FFD60020" : "#FFD60030",
          Paid: currentTheme === "dark" ? "#4CAF5020" : "#4CAF5030",
        };

        return (
          <div
            className="flex items-center justify-center px-2 py-1 rounded-full text-black dark:text-white"
            style={{
              backgroundColor: statutColor[item.statut],
              minWidth: '80px',
            }}
          >
            {item.statut}
          </div>
        );

      case "options":
        return (
          <div className="flex space-x-2 justify-center items-center relative">
            {/* Printer Icon Button */}
            <div className="relative">
              <Button
                variant="flat"
                size="sm"
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center border border-[#000000] dark:border-[#FFFFFF]"
                style={{ backgroundColor: 'transparent', padding: 0, minWidth: '32px', height: '32px' }}
                onClick={() => toggleDropdown(item.key)}
              >
                <PrinterIcon size={16} className="text-[#000000] dark:text-[#FFFFFF]" />
              </Button>
              {isDropdownOpen === item.key && (
                <Menu
                  className="absolute mt-2 z-50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg"
                  style={{ minWidth: '200px', left: 'auto', right: 0 }}
                  onClose={() => setIsDropdownOpen(null)}
                >
                  <MenuItem onClick={() => {/* handle click */}}>
                    <div className="flex items-center">
                      <PrinterIcon size={14} className="mr-2" />
                      <span>Client Invoice</span>
                    </div>
                  </MenuItem>

                  <MenuItem onClick={() => {/* handle click */}}>
                    <div className="flex items-center">
                      <TableIcon size={14} className="mr-2" />
                      <span>Sourcing Invoice</span>
                    </div>
                  </MenuItem>

                  <MenuItem onClick={() => {/* handle click */}}>
                    <div className="flex items-center">
                      <PackageIcon size={14} className="mr-2" />
                      <span>DDP Shipping Provider</span>
                    </div>
                  </MenuItem>

                  <MenuItem onClick={() => {/* handle click */}}>
                    <div className="flex items-center">
                      <Settings02Icon size={14} className="mr-2" />
                      <span>General Report</span>
                    </div>
                  </MenuItem>
                </Menu>
              )}
            </div>

            {/* View Icon Button */}
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
            >
              <EyeIcon size={14} style={{ color: 'white' }} />
            </Button>

            {/* Delete Icon Button */}
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#ED0006', padding: 0, minWidth: '32px', height: '32px' }}
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

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewInvoiceData(prev => ({
        ...prev,
        photo: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  return (
    <DashboardLayout title="Invoices - Sourcing Invoices" icon={<InvoiceIcon className="text-info" />}>
      <div className="p-2 md:p-4">
        <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row">
          <StatusTabs
            activeCount={products.filter(product => product.status === "active").length}
            archivedCount={products.filter(product => product.status === "archived").length}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />

          <div className="flex gap-2 flex-wrap items-center w-full md:w-auto justify-end md:justify-start">
            <Button
              color="default"
              onClick={handleOpenModal}
              className="rounded-full flex items-center gap-2"
              style={{ backgroundColor: '#0258E8', color: 'white' }}
            >
              <PlusSignIcon size={18} /> New Invoice
            </Button>
            <Button
              color="default"
              className="rounded-full flex items-center gap-2"
              style={{ backgroundColor: '#ED0006', color: 'white' }}
            >
              <PencilEdit01Icon size={18} style={{ color: 'white' }} /> Actions
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

      {/* New Invoice Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="New Invoice"
        isDarkMode={currentTheme === "dark"}
      >
        <div className="flex flex-col gap-6">
          {/* First Row: Seller 1 and Seller 2 */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Seller 1 */}
            <div className="w-full md:w-1/2">
              <label htmlFor="seller1" className="block mt-6 text-sm font-medium text-[#00000050] dark:text-gray-500">
                Seller 1
              </label>
              <Select
                id="seller1"
                selectionMode="single"
                selectedKeys={newInvoiceData.seller1 ? [newInvoiceData.seller1] : []}
                onSelectionChange={(keys) => handleSelectChange('seller1', keys)}
                placeholder="Select Seller 1"
                classNames={{
                  trigger: `
                    w-full 
                    bg-transparent 
                    border-b 
                    ${newInvoiceData.seller1 ? 'border-blue-300 dark:border-blue-500' : 'border-gray-300 dark:border-gray-600'} 
                    focus:border-blue-500 
                    focus:ring-0 
                    rounded-none
                  `,
                  content: `
                    bg-white 
                    dark:bg-gray-800 
                    border-none 
                    shadow-md 
                    rounded-md
                  `,
                }}
                aria-label="Select Seller 1"
              >
                {sellers1.map((seller) => (
                  <SelectItem key={seller.key}>{seller.label}</SelectItem>
                ))}
              </Select>
            </div>

            {/* Seller 2 */}
            <div className="w-full md:w-1/2">
              <label htmlFor="seller2" className="block mt-6 text-sm font-medium text-[#00000050] dark:text-gray-500">
                Seller 2
              </label>
              <Select
                id="seller2"
                selectionMode="single"
                selectedKeys={newInvoiceData.seller2 ? [newInvoiceData.seller2] : []}
                onSelectionChange={(keys) => handleSelectChange('seller2', keys)}
                placeholder="Select Seller 2"
                classNames={{
                  trigger: `
                    w-full 
                    bg-transparent 
                    border-b 
                    ${newInvoiceData.seller2 ? 'border-blue-300 dark:border-blue-500' : 'border-gray-300 dark:border-gray-600'} 
                    focus:border-blue-500 
                    focus:ring-0 
                    rounded-none
                  `,
                  content: `
                    bg-white 
                    dark:bg-gray-800 
                    border-none 
                    shadow-md 
                    rounded-md
                  `,
                }}
                aria-label="Select Seller 2"
              >
                {sellers2.map((seller) => (
                  <SelectItem key={seller.key}>{seller.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Second Row: Other Customer and Date */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Other Customer */}
            <div className="w-full md:w-1/2">
              <label htmlFor="otherCustomer" className="block mt-6 text-sm font-medium text-[#00000050] dark:text-gray-500">
                Other Customer
              </label>
              <Select
                id="otherCustomer"
                selectionMode="single"
                selectedKeys={newInvoiceData.otherCustomer ? [newInvoiceData.otherCustomer] : []}
                onSelectionChange={(keys) => handleSelectChange('otherCustomer', keys)}
                placeholder="Select Other Customer"
                classNames={{
                  trigger: `
                    w-full 
                    bg-transparent 
                    border-b 
                    ${newInvoiceData.otherCustomer ? 'border-blue-300 dark:border-blue-500' : 'border-gray-300 dark:border-gray-600'} 
                    focus:border-blue-500 
                    focus:ring-0 
                    rounded-none
                  `,
                  content: `
                    bg-white 
                    dark:bg-gray-800 
                    border-none 
                    shadow-md 
                    rounded-md
                  `,
                }}
                aria-label="Select Other Customer"
              >
                {otherCustomers.map((customer) => (
                  <SelectItem key={customer.key}>{customer.label}</SelectItem>
                ))}
              </Select>
            </div>

            {/* Date */}
            <div className="w-full md:w-1/2 relative">
              <label htmlFor="invoiceDate" className="block mt-6 text-sm font-medium text-[#00000050] dark:text-gray-500">
                Date
              </label>
              <div className="relative">
                <input
                  id="invoiceDate"
                  type="date"
                  value={newInvoiceData.date}
                  onChange={(e) => handleSelectChange('date', e.target.value)}
                  className={`w-full px-3 py-2 border-b ${
                    newInvoiceData.date
                      ? 'border-blue-300 dark:border-blue-500'
                      : 'border-gray-300 dark:border-gray-600'
                  } ${
                    currentTheme === 'dark' ? 'bg-transparent text-white' : 'bg-white text-black'
                  } rounded-none focus:outline-none focus:border-blue-500`}
                />
               
              </div>
            </div>
          </div>

          {/* Third Row: Sourcing Tab and Statut */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Sourcing Tab */}
            <div className="w-full md:w-1/2">
              <label htmlFor="sourcingTab" className="block mt-6 text-sm font-medium text-[#00000050] dark:text-gray-500">
                Sourcing Tab
              </label>
              <Select
                id="sourcingTab"
                selectionMode="single"
                selectedKeys={newInvoiceData.sourcingTab ? [newInvoiceData.sourcingTab] : []}
                onSelectionChange={(keys) => handleSelectChange('sourcingTab', keys)}
                placeholder="Select Sourcing Tab"
                classNames={{
                  trigger: `
                    w-full 
                    bg-transparent 
                    border-b 
                    ${newInvoiceData.sourcingTab ? 'border-blue-300 dark:border-blue-500' : 'border-gray-300 dark:border-gray-600'} 
                    focus:border-blue-500 
                    focus:ring-0 
                    rounded-none
                  `,
                  content: `
                    bg-white 
                    dark:bg-gray-800 
                    border-none 
                    shadow-md 
                    rounded-md
                  `,
                }}
                aria-label="Select Sourcing Tab"
              >
                {sourcingTabs.map((tab) => (
                  <SelectItem key={tab.key}>{tab.label}</SelectItem>
                ))}
              </Select>
            </div>

            {/* Statut */}
            <div className="w-full md:w-1/2">
              <label htmlFor="statut" className="block mt-6 text-sm font-medium text-[#00000050] dark:text-gray-500">
                Statut
              </label>
              <Select
                id="statut"
                selectionMode="single"
                selectedKeys={newInvoiceData.statut ? [newInvoiceData.statut] : []}
                onSelectionChange={(keys) => handleSelectChange('statut', keys)}
                placeholder="Select Statut"
                classNames={{
                  trigger: `
                    w-full 
                    bg-transparent 
                    border-b 
                    ${newInvoiceData.statut ? 'border-blue-300 dark:border-blue-500' : 'border-gray-300 dark:border-gray-600'} 
                    focus:border-blue-500 
                    focus:ring-0 
                    rounded-none
                  `,
                  content: `
                    bg-white 
                    dark:bg-gray-800 
                    border-none 
                    shadow-md 
                    rounded-md
                  `,
                }}
                aria-label="Select Statut"
              >
                {statuts.map((statut) => (
                  <SelectItem key={statut.key}>{statut.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* RMB to USD Conversion Rate */}
          <div className="text-left text-sm text-gray-700 dark:text-gray-300 mt-8 font-bold mb-4">
            1 RMB to USD : 0.14
          </div>

          {/* Photo Upload */}
          <div className="flex flex-col">
            <label htmlFor="invoicePhoto" className="w-full lg:w-full cursor-pointer">
              <div className="flex items-center px-3 py-2 border-b border-gray-300 dark:border-[#ffffff10] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span className="text-sm text-gray-600 dark:text-[#FFFFFF30]">Choose a photo</span>
                <Upload02Icon size={20} className="ml-auto text-gray-600" />
              </div>
              <input
                type="file"
                id="invoicePhoto"
                name="invoicePhoto"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
            {newInvoiceData.photo && (
              <img src={newInvoiceData.photo} alt="Invoice" className="mt-2 w-full h-48 object-cover rounded-md" />
            )}
          </div>

          {/* Separator Line */}
          <hr className="my-6 border-gray-300 dark:border-gray-600" />

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              className="bg-info text-white rounded-full px-4 py-2"
              onClick={handleCreateInvoice}
            >
              Save Invoice
            </Button>
            <Button
              variant="light"
              className="border border-[#00000050] dark:border-gray-300 rounded-full px-4 py-2"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </div>
        </div>
      </CustomModal>

      {/* Confirmation Modal */}
      <CustomModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        isDarkMode={currentTheme === "dark"}
        hideSeparator={true}
        width={'450px'}
      >
        <div className="flex flex-col items-center p-6">
          <p className="text-center text-xl text-gray-700 dark:text-gray-300 mb-6 font-bold">
            Are you sure you want to mark this invoice as paid?
          </p>
          <div className="flex gap-2">
            <Button
              className="bg-info text-white rounded-full px-12 py-2 "
              onClick={() => {
                saveInvoice();
                setIsConfirmationOpen(false);
              }}
            >
              Yes
            </Button>
            <Button
              variant="light"
              className="border border-black dark:border-white rounded-full px-12 py-2"
              onClick={() => setIsConfirmationOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      </CustomModal>
    </DashboardLayout>
  );
};

export default SourcingInvoices;
