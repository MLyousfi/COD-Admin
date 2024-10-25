import React, { useState } from 'react';
import {  PencilEdit01Icon, PlusSignIcon, Delete01Icon, WhatsappIcon, Logout02Icon, EarthIcon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table';
import { rows } from '../../../core/utils/data5';
import Flag from 'react-world-flags';

const columns = [
  { key: "checkbox", label: "#" },
  { key: "id", label: "Id" },
  { key: "name", label: "Name" },
  { key: "slogan", label: "Slogan" },
  { key: "shipping", label: "Shipping" },
  { key: "tags", label: "Tags" },
  { key: "options", label: "Actions" },
];

const countryCodeMap = {
    "United States": "US",
    "Canada": "CA",
    "Japan": "JP",
    "Germany": "DE",
    "Brazil": "BR",
    "Australia": "AU",
    "India": "IN",
    "China": "CN",
    "France": "FR",
    "Italy": "IT",
    "United Kingdom": "GB",
    "South Korea": "KR",
    "Mexico": "MX",
    "Russia": "RU",
    "South Africa": "ZA",
    "Argentina": "AR",
    "Saudi Arabia": "SA",
    "Turkey": "TR",
    "Netherlands": "NL",
    "Switzerland": "CH",
    // Add other countries as needed
  };
  
const Countries = () => {
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;

  const addNewCountry = () => {
    const newCountry = {
      key: products.length + 1,
      id: products.length + 1,
      name: "New Country",
      slogan: "Sample Country",
      shipping: "Yes",
      tags: "New",
    };
    setProducts([...products, newCountry]);
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
      case "slogan":
        return (
          <div className="flex items-center">
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginRight: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Flag
                code={countryCodeMap[item.name]}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span className="font-bold">{item.name}</span>
          </div>
        );
        case "shipping":
            return (
              <span className={`rounded-full px-2 py-1 ${item.shipping === "Yes" ? "bg-green-600 bg-opacity-20 text-green-600" : "bg-red-600 bg-opacity-20 text-red-600"}`}>
                {item.shipping}
              </span>
            );
          
      case "options":
        return (
          <div className="flex space-x-2 justify-center">
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
    <DashboardLayout title="Countries" icon={<EarthIcon className="text-info" />}>
      <div className="p-4">
        <div className="flex justify-end space-x-4 mb-4"> 
          <Button 
            color="default" 
            onClick={addNewCountry} 
            className="rounded-full" 
            style={{ backgroundColor: '#0258E8', color: 'white' }}  
          >
            <PlusSignIcon size={18} /> New Country 
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

export default Countries;
