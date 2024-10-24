import React, { useState } from 'react';
import { DeliveryTruck01Icon, PencilEdit01Icon, PlusSignIcon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Tabs, Tab } from "@nextui-org/tabs";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table'; 
import { rows } from '../../../core/utils/data2'; 
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineChevronDown } from 'react-icons/hi'; 
import { FaArrowsRotate, FaRegCircleCheck } from "react-icons/fa6";

const columns = [
  { key: "number", label: "N°" },  
  { key: "orderNumber", label: "N° Orders" },  
  { key: "createdAt", label: "Created At" },
  { key: "sentAt", label: "Sent At" },
  { key: "shippedAt", label: "Shipped At" },
  { key: "shoppingBy", label: "Shopping By" },
  { key: "statut", label: "Statut" },
  { key: "send", label: "Send" },
  { key: "options", label: "Actions" },
];

const FirstMileDashboard = () => {
  const [activeView, setActiveView] = useState('active'); 
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10; 

  const addNewProduct = () => {
    const newProduct = {
      key: products.length + 1,
      orderNumber: products.length + 1,
      createdAt: "2024-01-01",
      sentAt: "2024-01-05",
      shippedAt: "2024-01-10",
      shoppingBy: "John Doe",
      statut: "Delivery Again",
      send: "Shipped",
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
    ? products.filter(product => product.statut === "Delivery Again")
    : products.filter(product => product.status === "archived");

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "options":
        return (
          <div className="flex space-x-2 justify-center">
            <Button variant="flat" size="sm" className="w-8 h-8 rounded-full p-0 flex items-center justify-center" style={{ backgroundColor: ' #747d80  ', padding: 0, minWidth: '32px', height: '32px' }}>
              <AiOutlineEye size={14} style={{ color: 'white' }}/>
            </Button>

            <Button variant="flat" size="sm" className="w-8 h-8 rounded-full p-0 flex items-center justify-center" style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}>
              <AiOutlineEdit size={14} style={{ color: 'white' }} />
            </Button>

            <Button variant="flat" size="sm" className="w-8 h-8 rounded-full p-0 flex items-center justify-center" style={{ backgroundColor: '#ED0006', padding: 0, minWidth: '32px', height: '32px' }} onClick={() => handleDelete(item.key)}>
              <AiOutlineDelete size={14} style={{ color: 'white' }} />
            </Button>
          </div>
        );

      case "statut":
        return (
          <div className="flex items-center bg-[#4912a2] text-white px-2 py-1 rounded-full">
            <FaArrowsRotate size={16} className="mr-1" />
            {item.statut}
          </div>
        );

      case "send":
        return (
          <div className="flex items-center">
            <span className={item.send === "Shipped" ? "bg-[#147893] text-white px-2 py-1 rounded-full flex items-center" : "bg-[#14a944] text-white px-2 py-1 rounded-full flex items-center"}>
              <FaRegCircleCheck size={16} className="mr-1" />
              {item.send}
            </span>
          </div>
        );

      default:
        return <span className="text-sm dark:text-white">{item[columnKey]}</span>;
    }
  };

  return (
    <DashboardLayout title="Collects - List of Shipments" icon={<DeliveryTruck01Icon className="text-info" />}>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <Tabs 
            aria-label="Product Tabs" 
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
                  <Chip color="danger" size="sm" className="ml-2">{products.filter(p => p.statut === "Delivery Again").length}</Chip>
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
              <PlusSignIcon size={18} /> New Collect 
            </Button>
            <Button 
              color="default" 
              className="rounded-full" 
              style={{ backgroundColor: '#ED0006', color: 'white' }}
            >
              <PencilEdit01Icon size={18} style={{ color: 'white' }} /> Actions 
            </Button>
            <Button
  color="default"
  className="rounded-full flex items-center border transition-colors duration-200 dark:border-white border-black"
  style={{
    backgroundColor: 'transparent',
  }}
>
  <span className="text-black dark:text-white">Status</span>
  <HiOutlineChevronDown className="ml-1 text-black dark:text-white" />
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

export default FirstMileDashboard;
