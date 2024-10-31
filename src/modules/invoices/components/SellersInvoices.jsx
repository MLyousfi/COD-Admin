// SellersInvoices.jsx
import React, { useState } from 'react';
import { InvoiceIcon, PencilEdit01Icon, PlusSignIcon, EyeIcon, Delete01Icon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table';
import StatusTabs from '../../shared/components/StatusTabs';
import { rows } from '../../../core/utils/data3';
import { useThemeProvider } from '../../../core/providers/ThemeContext';


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

  const addNewProduct = () => {
    const newProduct = {
      key: products.length + 1,
      invoiceNumber: `INV-${products.length + 1}`,
      store: "New Store",
      totalRemittance: "$1000",
      netRemittance: "$900",
      totalCharges: "$100",
      statut: "Unpaid",
      date: "09/08/2024 - 19:01",
      verified: false,
      status: "active",
    };
    setProducts([...products, newProduct]);
  };

  const handleCheckboxChange = (keys, isRange = false) => {
    if (isRange && Array.isArray(keys)) {
      setSelectedRows(prevSelected => {
        const newSelected = new Set(prevSelected);
        keys.forEach(key => newSelected.add(key));
        return Array.from(newSelected);
      });
    } else {
      setSelectedRows(prevSelected => {
        const newSelected = new Set(prevSelected);
        if (newSelected.has(keys)) {
          newSelected.delete(keys);
        } else {
          newSelected.add(keys);
        }
        return Array.from(newSelected);
      });
    }
  };


  const handleDelete = (key) => {
    setProducts(products.filter(product => product.key !== key));
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
          Unpaid: currentTheme === "dark" ? "#FFD60020" : "#FFD60030",
          Refund: currentTheme === "dark" ? "#FF000020" : "#FF000020",
          Paid: currentTheme === "dark" ? "#12F04320" : "#12F04330",
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
            <Button variant="flat" size="sm" className="w-8 h-8 rounded-full p-0 flex items-center justify-center" style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}>
              <EyeIcon size={14} style={{ color: 'white' }} />
            </Button>

            <Button variant="flat" size="sm" className="w-8 h-8 rounded-full p-0 flex items-center justify-center" style={{ backgroundColor: '#ED0006', padding: 0, minWidth: '32px', height: '32px' }} onClick={() => handleDelete(item.key)}>
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
      <div className="p-2 md:p-4">{/**here ---|> responsv */}
        <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row">{/**here ---|> responsv */}
          <StatusTabs
            activeCount={products.filter(product => product.status === "active").length}
            archivedCount={products.filter(product => product.status === "archived").length}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />

          <div className="flex gap-2 flex-wrap items-center"> {/**here ---|> responsv */}
            <Button
              color="default"
              onClick={addNewProduct}
              className="rounded-full"
              style={{ backgroundColor: '#0258E8', color: 'white' }}
            >
              <PlusSignIcon size={18} /> New Invoice
            </Button>
            <Button
              color="default"
              className="rounded-full"
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
    </DashboardLayout>
  );
};

export default SellersInvoices;
