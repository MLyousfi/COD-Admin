import React, { useState } from 'react';
import { Home01Icon, PencilEdit01Icon, PlusSignIcon, Delete01Icon, Setting06Icon, Settings02Icon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Tabs, Tab } from "@nextui-org/tabs";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table';
import { rows } from '../../../core/utils/data7';

const columns = [
  { key: "checkbox", label: "#" },
  { key: "bankName", label: "Bank Name" },
  { key: "options", label: "Actions" },
];

const Banks = () => {
  const [selectedTab, setSelectedTab] = useState('photos');

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
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
      case "options":
        return (
          <div className="flex space-x-2 justify-center">
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
    <DashboardLayout title="General - Bank" icon={<Settings02Icon className="text-info" />}>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <Tabs
            aria-label="Options"
            color="primary"
            variant="underlined"
            classNames={{
              tabList: "gap-6 w-full relative rounded-none p-0 border-b bg-transparent border-b-transparent",
              cursor: "w-full bg-info",
              tab: "max-w-fit px-0 h-12 text-red-500",
              tabContent: "group-data-[selected=true]:text-info text-gray-600"
            }}
            onTabChange={handleTabChange} // Attach the tab change handler
          >
            <Tab
              key="photos"
              title={
                <div className="flex items-center space-x-2">
                  <strong>Active</strong>
                  <Chip color={selectedTab === 'photos' ? "danger" : "default"} size="sm">12345</Chip>
                </div>
              }
            />

            <Tab
              key="music"
              title={
                <div className="flex items-center space-x-2">
                  <strong>Archived</strong>
                  <Chip color={selectedTab === 'music' ? "danger" : "default"} size="sm" className="text-gray-400">12345</Chip>
                </div>
              }
            />
          </Tabs>

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
          data={rows}
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

export default Banks;
