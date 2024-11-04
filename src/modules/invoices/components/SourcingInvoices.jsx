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
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table';
import StatusTabs from '../../shared/components/StatusTabs';
import { rows } from '../../../core/utils/data8'; 
import { useThemeProvider } from '../../../core/providers/ThemeContext';
import CustomModal from '../../stockManagement.jsx/components/modal'; 
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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInvoiceData, setNewInvoiceData] = useState({
    seller: '',
    remitted: '',
  });

  const sellers = [
    { key: 'seller1', label: 'Seller One' },
    { key: 'seller2', label: 'Seller Two' },
  ];

  const orders = [
    { key: 'order1', label: 'Order One' },
    { key: 'order2', label: 'Order Two' },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewInvoiceData({ seller: '', remitted: '' });
  };

  const handleCreateInvoice = () => {
    if (!newInvoiceData.seller || !newInvoiceData.remitted) {
      alert("Please select both 'Informations' and 'Remitted'.");
      return;
    }

    const newKey = products.length + 1;
    const newProduct = {
      key: newKey,
      invoiceNumber: `INV-${newKey}`,
      seller: newInvoiceData.seller,
      date: new Date().toLocaleDateString(),
      product: "Sample Product",
      type: "Sample Type",
      qty: 10,
      totalCharges: "$1000",
      soCost: "$700",
      soMargin: "$300",
      shCost: "$500",
      shMargin: "$500",
      statut: "Pending",
      paymentStatut: "Unpaid",
      verified: false,
      status: "active",
    };
    setProducts([...products, newProduct]);
    handleCloseModal();
  };

  const handleSelectChange = (key, value) => {
    setNewInvoiceData(prev => ({
      ...prev,
      [key]: value,
    }));
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

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="New Invoice"
        isDarkMode={currentTheme === "dark"}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">
                Seller
              </label>
              <Select
                selectedKeys={newInvoiceData.seller ? [newInvoiceData.seller] : []}
                onSelectionChange={(keys) => handleSelectChange('seller', keys)}
                placeholder="Select Seller"
                classNames={{
                  trigger: 'w-full bg-transparent border border-gray-300 dark:border-gray-600',
                  content: 'bg-transparent border border-gray-300 dark:border-gray-600',
                }}
              >
                {sellers.map((seller) => (
                  <SelectItem key={seller.key}>{seller.label}</SelectItem>
                ))}
              </Select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">
                Remitted
              </label>
              <Select
                selectedKeys={newInvoiceData.remitted ? [newInvoiceData.remitted] : []}
                onSelectionChange={(keys) => handleSelectChange('remitted', keys)}
                placeholder="All Orders"
                classNames={{
                  trigger: 'w-full bg-transparent border border-gray-300 dark:border-gray-600',
                  content: 'bg-transparent border border-gray-300 dark:border-gray-600',
                }}
              >
                {orders.map((order) => (
                  <SelectItem key={order.key}>{order.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300 dark:border-gray-600" />

        <div className="flex justify-center gap-4">
          <Button
            className="bg-info text-white rounded-full px-4 py-2"
            onClick={handleCreateInvoice}
          >
            Create Invoice
          </Button>
          <Button
            variant="light"
            className="border border-[#00000050] dark:border-gray-300 rounded-full px-4 py-2"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </div>
      </CustomModal>
    </DashboardLayout>
  );
};

export default SourcingInvoices;
