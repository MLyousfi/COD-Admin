import React, { useState } from 'react';
import { Home01Icon, PencilEdit01Icon, PlusSignIcon , EyeIcon, Delete01Icon} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Tabs, Tab } from "@nextui-org/tabs";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
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
  
    // Handle checkbox toggle
    const handleCheckboxChange = (key) => {
      if (selectedRows.includes(key)) {
        setSelectedRows(selectedRows.filter((selectedKey) => selectedKey !== key));
      } else {
        setSelectedRows([...selectedRows, key]);
      }
    };
  
    // Function to delete a product
    const handleDelete = (key) => {
      setProducts(products.filter(product => product.key !== key));
    };
  
    // Filter products based on the current view (active or archived)
    const filteredProducts = activeView === 'active' 
      ? products.filter(product => product.status === "active")
      : products.filter(product => product.status === "archived");
  
    // Function to render cells dynamically
    const renderCell = (item, columnKey) => {
      switch (columnKey) {
        case "options":
          return (
            <div className="flex space-x-2 justify-center">
              {/* View Button */}
              <Button
                variant="flat"
                size="sm"
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                style={{ backgroundColor: '#9e9a9a ', padding: 0, minWidth: '32px', height: '32px' }}
              >
                <EyeIcon size={14} />
              </Button>
  
              {/* Edit Button */}
              <Button
                variant="flat"
                size="sm"
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
              >
                <PencilEdit01Icon size={14} style={{ color: 'white' }} />
              </Button>
  
              {/* Delete Button */}
              <Button
                variant="flat"
                size="sm"
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                style={{ backgroundColor: '#ED0006', padding: 0, minWidth: '32px', height: '32px' }}
                onClick={() => handleDelete(item.key)} // Call handleDelete with the item's key
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
    <DashboardLayout title="Stock Management - List of Products" icon={<Home01Icon className="text-info" />}>
      <div className="p-4">
        {/* Tabs for Active and Archived */}
        <div className="flex justify-between mb-4">
        <Tabs 
  aria-label="Product Tabs" 
  color="primary" 
  variant="underlined" 
  selectedKey={activeView} // Control the selected tab based on state
  onSelectionChange={(key) => setActiveView(key)} // Update view based on tab selection
>
  <Tab
    key="active"
    title={
      <div className="flex items-center">
        <strong className="text-black dark:text-white">Active</strong> {/* Ensure "Active" is white in dark mode */}
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


          {/* New Product and Actions Buttons */}
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

        {/* Use the Generalized Table Component */}
        <Table 
          columns={columns} 
          data={filteredProducts}  // Pass filtered products based on the view
          renderCell={renderCell} 
          handleCheckboxChange={handleCheckboxChange}
          selectedRows={selectedRows} // Pass selected rows state
          rowsPerPage={rowsPerPage}  // Pass rows per page
          className="dark:bg-gray-800 dark:text-white" // Dark mode support
        />
      </div>
    </DashboardLayout>
  );
};

export default StockManagement;
