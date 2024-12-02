// SellersInvoices.jsx
import React, { useState, useEffect } from 'react';
import { InvoiceIcon, PencilEdit01Icon, PlusSignIcon, EyeIcon, Delete01Icon,
  PrinterIcon, 
  Download01Icon,
  CustomerSupportIcon,
  ArrowRight01Icon,
  CallOutgoing01Icon,
  DropboxIcon,
  Settings02Icon
 } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../shared/components/Table';
import StatusTabs from '../../shared/components/StatusTabs';
import { rows } from '../../../core/utils/data3';
import { useThemeProvider } from '../../../core/providers/ThemeContext';
import CustomModal from '../../shared/components/modal'; // Adjust the import path accordingly
import { Select, SelectItem } from "@nextui-org/select";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

const columns = [
  { key: "checkbox", label: "#" },
  { key: "invoiceNumber", label: "Invoice N°" },
  { key: "store", label: "Store" },
  { key: "totalRemittance", label: "Total Remittance" },
  { key: "netRemittance", label: "Net Remittance" },
  { key: "totalCharges", label: "Total Charges" },
  { key: "statut", label: "Statut" },
  { key: "date", label: "Date" },
  { key: "verified", label: "Verified" },
  { key: "options", label: "Actions" },
];

const SellersInvoices = () => {
  const [selectedTab, setSelectedTab] = useState('active');
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;

  const { currentTheme } = useThemeProvider();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInvoiceData, setNewInvoiceData] = useState({
    seller: '',
    remitted: '',
  });

  // Sample data for dropdowns
  const sellers = [
    { key: 'seller1', label: 'Seller One' },
    { key: 'seller2', label: 'Seller Two' },
    // Add more sellers as needed
  ];

  const orders = [
    { key: 'order1', label: 'Order One' },
    { key: 'order2', label: 'Order Two' },
    // Add more orders as needed
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
      // Optional: Add validation message
      alert("Please select both 'Informations' and 'Remitted'.");
      return;
    }

    const newKey = products.length + 1;
    const newProduct = {
      key: newKey,
      invoiceNumber: `INV-${newKey}`,
      store: newInvoiceData.seller || "New Store",
      totalRemittance: "$1,000",
      netRemittance: "$900",
      totalCharges: "$100",
      statut: "Unpaid",
      date: new Date().toLocaleDateString(),
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

  const handleCheckboxChange = (key) => {
    if (selectedRows.includes(key)) {
      setSelectedRows(selectedRows.filter(selectedKey => selectedKey !== key));
    } else {
      setSelectedRows([...selectedRows, key]);
    }
  };

  const handleDelete = (key) => {
    setProducts(products.filter(product => product.key !== key));
  };

  const filteredProducts = selectedTab.toLowerCase() === 'active'
    ? products.filter(product => product.status && product.status.toLowerCase() === "active")
    : products.filter(product => product.status && product.status.toLowerCase() === "archived");

  // Debugging: Log the filtered products
  useEffect(() => {
    console.log("Selected Tab:", selectedTab);
    console.log("Total Products:", products.length);
    console.log("Filtered Products:", filteredProducts.length);
    console.log("Filtered Products List:", filteredProducts);
  }, [selectedTab, products, filteredProducts]);

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
          Unpaid: currentTheme === "dark" ? "#FFD60020" : "#FFD60030",
          Refund: currentTheme === "dark" ? "#FF000020" : "#FF000020",
          Paid: currentTheme === "dark" ? "#12F04320" : "#12F04330",
        };

        return (
          <div
            className="flex items-center justify-center px-2 py-1 rounded-full text-black dark:text-white"
            style={{
              backgroundColor: statutColor[item.statut] || "#CCCCCC",
              minWidth: '80px',
            }}
          >
            {item.statut}
          </div>
        );

      case "verified":
        return (
          <input
            type="checkbox"
            checked={item.verified}
            onChange={() => {
              setProducts(products.map(p => p.key === item.key ? { ...p, verified: !p.verified } : p));
            }}
          />
        );

      case "options":
        return (
          <div className="flex space-x-2 justify-center">
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
            >
              <EyeIcon size={14} style={{ color: 'white' }} />
            </Button>

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
    <DashboardLayout title="Invoices - Seller Invoices" icon={<InvoiceIcon className="text-info" />}>
      <div className="p-2 md:p-4">
        <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row">
          <StatusTabs
            activeCount={products.filter(product => product.status && product.status.toLowerCase() === "active").length}
            archivedCount={products.filter(product => product.status && product.status.toLowerCase() === "archived").length}
            selectedTab={selectedTab}
            onTabChange={(tab) => {
              setSelectedTab(tab);
              // Optional: Reset selectedRows when changing tabs
              setSelectedRows([]);
            }}
          />

          {/* Updated Buttons Container */}
          <div className="flex gap-2 flex-wrap items-center w-full md:w-auto justify-end md:justify-start">
            <Button
              color="default"
              onClick={handleOpenModal}
              className="rounded-full flex items-center gap-2"
              style={{ backgroundColor: '#0258E8', color: 'white' }}
            >
              <PlusSignIcon size={18} /> New Invoice
            </Button>
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

      {/* Custom Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="New Invoice"
        isDarkMode={currentTheme === "dark"}
        width='600px'
      >
        {/* Modal Content */}
        <div className="flex flex-col gap-6">
          {/* Dropdowns */}
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">
                Informations
              </label>
              <Select
                selectedKeys={newInvoiceData.seller ? [newInvoiceData.seller] : []}
                onSelectionChange={(keys) => handleSelectChange('seller', keys)}
                placeholder="List of Sellers"
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
                  trigger: 'w-full bg-transparent border border-gray-300 dark:border-gray-600 mb-8',
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

        {/* Separator Line */}
        <hr className="my-6 border-gray-300 dark:border-gray-600" />

        {/* Action Buttons */}
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

export default SellersInvoices;
