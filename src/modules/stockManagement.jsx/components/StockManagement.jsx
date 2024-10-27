import React, { useState } from 'react';
import { GarageIcon, PlusSignIcon, PencilEdit01Icon, EyeIcon, Delete01Icon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import StatusTabs from '../../shared/components/StatusTabs';
import Table from './Table'; 
import { rows } from '../../../core/utils/data'; 

const columns = [
  { key: "checkbox", label: "#" }, 
  { key: "store", label: "Store" },
  { key: "product", label: "Product" },
  { key: "arabicName", label: "Arabic Name" },
  { key: "sku", label: "SKU" },
  { key: "type", label: "Type" },
  { key: "category", label: "Category" },
  { key: "options", label: "Options" },
];

const StockManagement = () => {
  const [activeView, setActiveView] = useState('active'); 
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10; 

  const addNewProduct = () => {
    const newProduct = {
      key: products.length + 1,
      store: "New Store",
      product: "New Product",
      arabicName: "عجين جديد",
      sku: "SKU-NEW",
      type: "New Type",
      category: "New Category",
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
      case "options":
        return (
          <div className="flex space-x-2 justify-center">
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#9e9a9a', padding: 0, minWidth: '32px', height: '32px' }}
            >
              <EyeIcon size={14} />
            </Button>

            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
            >
              <PencilEdit01Icon size={14} style={{ color: 'white' }} />
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
    <DashboardLayout title="Stock Management - List of Products" icon={<GarageIcon className="text-info" />}>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <StatusTabs 
            activeCount={products.filter(product => product.status === "active").length}
            archivedCount={products.filter(product => product.status === "archived").length}
            selectedTab={activeView}
            onTabChange={setActiveView}
          />

          <div className="space-x-4">
            <Button 
              color="default" 
              onClick={addNewProduct} 
              className="rounded-full" 
              style={{ backgroundColor: '#0258E8', color: 'white' }}  
            >
              <PlusSignIcon size={18} /> New Product 
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

export default StockManagement;
