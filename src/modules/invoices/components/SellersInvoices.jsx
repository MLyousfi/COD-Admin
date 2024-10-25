import React, { useState } from 'react';
import { DeliveryTruck01Icon, PencilEdit01Icon, PlusSignIcon, EyeIcon, Delete01Icon ,InvoiceIcon} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Tabs, Tab } from "@nextui-org/tabs";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table'; 
import { rows } from '../../../core/utils/data3'; 

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
  const [activeView, setActiveView] = useState('active'); 
  const [products, setProducts] = useState(rows); 
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;

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

  const handleCheckboxChange = (key) => {
    if (selectedRows.includes(key)) {
      setSelectedRows(selectedRows.filter((selectedKey) => selectedKey !== key));
    } else {
      setSelectedRows([...selectedRows, key]);
    }
  };

  const handleDelete = (key) => {
    setProducts(products.filter(product => product.key !== key));
  };

  const filteredProducts = activeView === 'active' 
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
          "Unpaid": "#9fa20b",
          "Refund": "#b7100a",  
          "Paid": "#197007",    
        };
      
        return (
          <div
            className="flex items-center justify-center px-2 py-1 rounded-full"
            style={{ backgroundColor: statutColor[item.statut], color: 'white', minWidth: '80px' }}
          >
            {item.statut}
          </div>
        );

      case "date":
        return <span>{item.date}</span>;

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
              <EyeIcon size={14} style={{ color: 'white' }}/>
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
      <div className="p-4">
        {/* Tabs for Active and Archived */}
        <div className="flex justify-between mb-4">
          <Tabs 
            aria-label="Invoice Tabs" 
            color="primary" 
            variant="underlined" 
            selectedKey={activeView} 
            onSelectionChange={(key) => setActiveView(key)}
          >
            <Tab
              key="active"
              title={
                <div className="flex items-center">
                  <strong className="text-black dark:text-white">Active</strong>
                  <Chip color="danger" size="sm" className="ml-2">{products.filter(p => p.status === "active").length}</Chip>
                </div>
              }
            />
            <Tab
              key="archived"
              title={
                <div className="flex items-center">
                  <strong className="text-black dark:text-white">Archived</strong>
                  <Chip color="default" size="sm" className="ml-2">{products.filter(p => p.status === "archived").length}</Chip>
                </div>
              }
            />
          </Tabs>

          <div className="flex space-x-4 items-center"> 
            <Button 
              color="default" 
              onClick={addNewProduct} 
              className="rounded-full" 
              style={{ backgroundColor: '#0258E8', color: 'white' }}
            >
              <PlusSignIcon size={18} /> New Invoice 
            </Button>
            {/* Actions Button */}
            <Button 
              color="default" 
              className="rounded-full" 
              style={{ backgroundColor: '#ED0006', color: 'white' }}
            >
              <PencilEdit01Icon size={18} /> Actions
            </Button>
          </div>
        </div>

        {/* Use the Generalized Table Component */}
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
