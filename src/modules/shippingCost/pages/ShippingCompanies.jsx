// SellersInvoices.jsx
import React, { useEffect, useState } from 'react';
import { InvoiceIcon, PencilEdit01Icon, PlusSignIcon, EyeIcon, Delete01Icon, DollarSquareIcon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../shared/components/Table';
import StatusTabs from '../../shared/components/StatusTabs';

import { useThemeProvider } from '../../../core/providers/ThemeContext';
import CustomModal from '../../shared/components/modal'; // Adjust the import path accordingly
import { Select, SelectItem } from "@nextui-org/select";

const rows = [
    { key: 1, name: 'Tech Solutions Inc.',status:"active" },
    { key: 2, name: 'Global Ventures LLC',status:"active" },
    { key: 3, name: 'Innovatech Ltd.',status:"active" },
    { key: 4, name: 'Pioneer Corp',status:"active" },
    { key: 5, name: 'Green Energy Co.',status:"active" },
    { key: 6, name: 'Skyline Networks',status:"active" },
    { key: 7, name: 'Blue Ocean Industries',status:"active" },
    { key: 8, name: 'Fusion Tech',status:"active" },
    { key: 9, name: 'Sunrise Solutions',status:"archived" },
    { key: 10, name: 'Peak Performance' ,status:"archived"},
    { key: 11, name: 'NexGen Enterprises',status:"archived" },
    { key: 12, name: 'Visionary Minds',status:"active" },
    { key: 13, name: 'Smart Innovations',status:"archived" },
    { key: 14, name: 'Synergy Systems' ,status:"archived"},
    { key: 15, name: 'Bright Future Holdings',status:"active" },
    { key: 16, name: 'Prime Logistics',status:"active" },
    { key: 17, name: 'Infinity Labs' ,status:"active"},
    { key: 18, name: 'Apex Global' ,status:"active"},
    { key: 19, name: 'Velocity Partners',status:"archived" },
    { key: 20, name: 'Summit Technologies' ,status:"archived"},
];


const columns = [
    { key: "checkbox", label: "#", w: 'w-[5%]' },
    { key: "key", label: "ID", w: 'w-[10%]' },
    { key: "name", label: "Name", w: 'w-[65%] min-w-[300px]' },
    { key: "options", label: "Actions", w: 'w-[20%]' },
];

const ShippingCompanies = () => {
    const [selectedTab, setSelectedTab] = useState('active');
    const [products, setProducts] = useState(rows);
    const [selectedRows, setSelectedRows] = useState([]);
    const rowsPerPage = 10;
    const [editting, setEditting] = useState({
        key: null,
        value: ''
    })
    const [activeView, setActiveView] = useState('active');


    const updateEditting = (property, newValue) => {
        setEditting(prevState => ({
            ...prevState,
            [property]: newValue
        }));
    };

    const { currentTheme } = useThemeProvider();



    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewInvoiceData({ seller: '', remitted: '' });
    };



    const handleSelectChange = (key, value) => {
        setNewInvoiceData(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleCheckboxChange = (keys, isRange) => {
        if (isRange) {
          // Add all keys in the range
          setSelectedRows((prevSelected) => {
            const newSelection = [...prevSelected];
            keys.forEach((key) => {
              if (!newSelection.includes(key)) {
                newSelection.push(key);
              }
            });
            return newSelection;
          });
        } else if (Array.isArray(keys)) {
          // Select all or unselect all
          setSelectedRows(keys);
        } else {
          // Toggle single selection
          setSelectedRows((prevSelected) =>
            prevSelected.includes(keys)
              ? prevSelected.filter((key) => key !== keys)
              : [...prevSelected, keys]
          );
        }
      };



      const filteredProducts = products.filter((product) => {
        // Ensure product.status is a string and convert to lowercase
        const productStatus = typeof product.status === 'string' ? product.status.toLowerCase() : '';
        
        // Ensure activeView is in lowercase
        const currentView = activeView.toLowerCase();
      
        const statusMatch =
          currentView === 'active' ? productStatus === 'active' : productStatus === 'archived';
      
        // For 'statut', assuming it should match exactly. If case-insensitive is needed, apply similar logic.
        
      
        return statusMatch;
      });
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


            case "name":
                if (editting.key === item.key) {
                    return <input type='text' className='caret-glb_blue bg-transparent outline-none text-black dark:text-white' value={editting.value} onChange={(e) => updateEditting('value', e.target.value)} />
                }
                else {
                    return <span className="text-sm  text-left w-full  dark:text-white">{item[columnKey]}</span>
                }

            case "options":
                if (editting.key === item.key) {
                    return (<div className="flex space-x-2  justify-center">
                        <Button onClick={() => { updateEditting('key', null); updateEditting('value', '') }} variant="flat"
                            className=" rounded-full px-2 text-lg py-0 bg-glb_blue_opacity text-glb_blue flex items-center justify-center"
                        >
                            Save
                        </Button>

                        <Button variant="flat" className="px-2 text-lg py-0 bg-glb_red_opacity text-glb_red rounded-full flex items-center justify-center">
                            Delete
                        </Button>
                    </div>)
                } else {
                    return (
                        <div className="flex space-x-2  justify-center">
                            <Button onClick={() => { updateEditting('key', item.key); updateEditting('value', item.name + ' ') }} variant="flat" size="sm" className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                                style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}>
                                <PencilEdit01Icon size={14} style={{ color: 'white' }} />
                            </Button>

                            <Button variant="flat" size="sm" className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                                style={{ backgroundColor: '#ED0006', padding: 0, minWidth: '32px', height: '32px' }} >
                                <Delete01Icon size={14} style={{ color: 'white' }} />
                            </Button>
                        </div>
                    );
                }


            default:
                return <span className="text-sm dark:text-white">{item[columnKey]}</span>;
        }
    };

    return (
        <DashboardLayout title="Shipping Costs - Shipping Companies" icon={<DollarSquareIcon className="text-info" />}>
            <div className="p-2 md:p-4">
                <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row">
                    <StatusTabs
                        activeCount={products.filter(product => product.status === "active").length}
                        archivedCount={products.filter(product => product.status === "archived").length}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                    />

                    {/* Updated Buttons Container */}
                    <div className="flex gap-2 flex-wrap items-center w-full md:w-auto justify-end md:justify-start">
                        <Button
                            color="default"
                            // onClick={handleOpenModal}
                            className="rounded-full flex items-center gap-2"
                            style={{ backgroundColor: '#0258E8', color: 'white' }}
                        >
                            <PlusSignIcon size={18} /> Create New
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

export default ShippingCompanies;
