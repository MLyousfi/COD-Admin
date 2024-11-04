// SellersInvoices.jsx
import React, { useEffect, useState } from 'react';
import { InvoiceIcon, PencilEdit01Icon, PlusSignIcon, EyeIcon, Delete01Icon, DollarSquareIcon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table';
import StatusTabs from '../../shared/components/StatusTabs';

import { useThemeProvider } from '../../../core/providers/ThemeContext';
import CustomModal from '../../stockManagement.jsx/components/modal'; // Adjust the import path accordingly
import { Select, SelectItem } from "@nextui-org/select";

const rows = [
    { key: 1, name: 'Tech Solutions Inc.' },
    { key: 2, name: 'Global Ventures LLC' },
    { key: 3, name: 'Innovatech Ltd.' },
    { key: 4, name: 'Pioneer Corp' },
    { key: 5, name: 'Green Energy Co.' },
    { key: 6, name: 'Skyline Networks' },
    { key: 7, name: 'Blue Ocean Industries' },
    { key: 8, name: 'Fusion Tech' },
    { key: 9, name: 'Sunrise Solutions' },
    { key: 10, name: 'Peak Performance' },
    { key: 11, name: 'NexGen Enterprises' },
    { key: 12, name: 'Visionary Minds' },
    { key: 13, name: 'Smart Innovations' },
    { key: 14, name: 'Synergy Systems' },
    { key: 15, name: 'Bright Future Holdings' },
    { key: 16, name: 'Prime Logistics' },
    { key: 17, name: 'Infinity Labs' },
    { key: 18, name: 'Apex Global' },
    { key: 19, name: 'Velocity Partners' },
    { key: 20, name: 'Summit Technologies' },
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

export default ShippingCompanies;
