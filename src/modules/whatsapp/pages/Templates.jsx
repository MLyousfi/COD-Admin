import React, { useState } from 'react';
import { Home01Icon, PencilEdit01Icon, PlusSignIcon, EyeIcon, Delete01Icon, WhatsappIcon, Logout02Icon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table'; 
import { rows } from '../../../core/utils/data4'; 

const columns = [
  { key: "checkbox", label: "#" }, 
  { key: "title", label: "Title" }, 
  { key: "alias", label: "Alias" },
  { key: "type", label: "Type" },
  { key: "statut", label: "Statut" },
  { key: "account", label: "Account" },
  { key: "options", label: "Actions" },
];

const Templates = () => {
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10; 

  const addNewTemplate = () => {
    const newTemplate = {
      key: products.length + 1,
      title: "New Template",
      alias: "new-template",
      type: "Type 1",
      statut: "Enabled", 
      account: "Account 1",
    };
    setProducts([...products, newTemplate]);
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
      case "statut":
        return (
            <span className={`rounded-full text-white px-2 py-1 ${item.statut === "Enabled" ? 'bg-[#bf099b]' : 'bg-[#6a0ea2]'}`}>
            {item.statut}
          </span>
          
        );
      case "options":
        return (
          <div className="flex space-x-2 justify-center">
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#747d80', minWidth: '32px', height: '32px' }}
            >
              <EyeIcon size={14} style={{ color: 'white' }} />
            </Button>
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#0258E8', minWidth: '32px', height: '32px' }}
            >
              <Logout02Icon size={14} style={{ color: 'white' }} />
            </Button>
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#ED0006', minWidth: '32px', height: '32px' }}
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
    <DashboardLayout title="Whatsapp - Templates" icon={<WhatsappIcon className="text-info" />}>
      <div className="p-4">
        <div className="flex justify-end space-x-4 mb-4"> 
          <Button 
            color="default" 
            onClick={addNewTemplate} 
            className="rounded-full" 
            style={{ backgroundColor: '#0258E8', color: 'white' }}  
          >
            <PlusSignIcon size={18} /> New Template 
          </Button>
          <Button 
            color="default" 
            className="rounded-full" 
            style={{ backgroundColor: '#ED0006', color: 'white' }} 
          >
            <PencilEdit01Icon size={18} style={{ color: 'white' }} /> Actions 
          </Button>
        </div>

        <Table 
          columns={columns} 
          data={products}  
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

export default Templates;
