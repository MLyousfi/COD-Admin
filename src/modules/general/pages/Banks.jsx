// Banks.jsx
import React, { useState } from 'react';
import { PencilEdit01Icon, PlusSignIcon, Delete01Icon, Settings02Icon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table';
import StatusTabs from '../../shared/components/StatusTabs';  
import { rows } from '../../../core/utils/data7';

const columns = [
  { key: "checkbox", label: "#" },
  { key: "bankName", label: "Bank Name" },
  { key: "options", label: "Actions" },
];

const Banks = () => {
  const [selectedTab, setSelectedTab] = useState('active');
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;

  const addNewProduct = () => {
    const newProduct = {
      key: products.length + 1,
      bankName: "New Bank",
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

  const filteredProducts = selectedTab === 'active'
    ? products.filter(product => product.status === "active")
    : products.filter(product => product.status === "archived");

  return (
    <DashboardLayout title="General - Bank" icon={<Settings02Icon className="text-info" />}>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <StatusTabs
            activeCount={products.filter(product => product.status === "active").length}
            archivedCount={products.filter(product => product.status === "archived").length}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />

          <div className="space-x-4">
            <Button
              color="default"
              onClick={addNewProduct}
              className="rounded-full"
              style={{ backgroundColor: '#0258E8', color: 'white' }}
            >
              <PlusSignIcon size={18} /> New Bank
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
          renderCell={(item, columnKey) => {
            switch (columnKey) {
              case "checkbox":
                return (
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.key)}
                    onChange={() => handleCheckboxChange(item.key)}
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
          }}
          handleCheckboxChange={handleCheckboxChange}
          selectedRows={selectedRows}
          rowsPerPage={rowsPerPage}
          className="dark:bg-gray-800 dark:text-white"
        />
      </div>
    </DashboardLayout>
  );
};

export default Banks;
