// Banks.jsx
import React, { useState } from 'react';
import { PencilEdit01Icon, PlusSignIcon, Delete01Icon, Settings02Icon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../shared/components/Table';
import StatusTabs from '../../shared/components/StatusTabs';
import NewBankModal from '../components/NewBankModal';

const columns = [
    { key: "checkbox", label: "#", w: 'w-[5%]' },
    { key: "name", label: "Name", w: 'w-[20%]' },
    { key: "phoneNumber", label: "Phone Numder", w: 'w-[20%]' },
    { key: "website", label: "Website", w: 'w-[20%]' },
    { key: "email", label: "Email", w: 'w-[30%]' },
    { key: "options", label: "Actions", w: 'w-[5%]' },
];

const rows = [
    {
        key: 1,
        name: "Partner One",
        phoneNumber: "+32 472-123456",
        website: "www.partnerone.com",
        email: "contact@partnerone.com"
    },
    {
        key: 2,
        name: "Partner Two",
        phoneNumber: "+32 472-654321",
        website: "www.partnertwo.com",
        email: "info@partnertwo.com"
    },
    {
        key: 3,
        name: "Partner Three",
        phoneNumber: "+32 472-987654",
        website: "www.partnerthree.com",
        email: "support@partnerthree.com"
    },
    {
        key: 4,
        name: "Partner Four",
        phoneNumber: "+32 472-456789",
        website: "www.partnerfour.com",
        email: "hello@partnerfour.com"
    },
    {
        key: 5,
        name: "Partner Five",
        phoneNumber: "+32 472-789123",
        website: "www.partnerfive.com",
        email: "contact@partnerfive.com"
    },
    {
        key: 6,
        name: "Partner Six",
        phoneNumber: "+32 472-321987",
        website: "www.partnersix.com",
        email: "info@partnersix.com"
    },
    {
        key: 7,
        name: "Partner Seven",
        phoneNumber: "+32 472-654987",
        website: "www.partnerseven.com",
        email: "support@partnerseven.com"
    },
    {
        key: 8,
        name: "Partner Eight",
        phoneNumber: "+32 472-456123",
        website: "www.partnereight.com",
        email: "hello@partnereight.com"
    },
    {
        key: 9,
        name: "Partner Nine",
        phoneNumber: "+32 472-789456",
        website: "www.partnernine.com",
        email: "contact@partnernine.com"
    },
    {
        key: 10,
        name: "Partner Ten",
        phoneNumber: "+32 472-321654",
        website: "www.partnerten.com",
        email: "info@partnerten.com"
    },
    {
        key: 11,
        name: "Partner Eleven",
        phoneNumber: "+32 472-654321",
        website: "www.partnereleven.com",
        email: "support@partnereleven.com"
    },
    {
        key: 12,
        name: "Partner Twelve",
        phoneNumber: "+32 472-456987",
        website: "www.partnertwelve.com",
        email: "hello@partnertwelve.com"
    }
];


const Partners = () => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedTab, setSelectedTab] = useState('active');
    const [products, setProducts] = useState(rows);
    const [selectedRows, setSelectedRows] = useState([]);
    const rowsPerPage = 10;
    const [editedBank, setEditedBank] = useState(null)

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
                        // Call handleDelete with the item's key
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
        <DashboardLayout title="General - Partners" icon={<Settings02Icon className="text-info" />}>
            <div className="p-2 md:p-4">{/**here ---|> responsv */}
                <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row">{/**here ---|> responsv */}
                    <StatusTabs
                        activeCount={10928}
                        archivedCount={10}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                    />

                    <div className="flex gap-2 flex-wrap justify-end items-center self-end"> {/**here ---|> responsv */}
                        <Button
                            color="default"
                            onClick={() => { setEditedBank(null); setOpenModal(true) }}
                            className="rounded-full"
                            style={{ backgroundColor: '#0258E8', color: 'white' }}
                        >
                            <PlusSignIcon size={18} /> New Theme
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
                    data={rows}  // Pass filtered products based on the view
                    renderCell={renderCell}
                    handleCheckboxChange={handleCheckboxChange}
                    selectedRows={selectedRows} // Pass selected rows state
                    rowsPerPage={rowsPerPage}  // Pass rows per page
                    className="dark:bg-gray-800 dark:text-white" // Dark mode support
                />
            </div>
            <NewBankModal modalOpen={openModal} setModalOpen={setOpenModal} editedBank={editedBank} id={1} />
        </DashboardLayout>
    );
};

export default Partners;
