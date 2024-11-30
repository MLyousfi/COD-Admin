// roles.jsx

import React, { useState, useEffect } from 'react';
import { PencilEdit01Icon, PlusSignIcon, Delete01Icon, UserIcon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../shared/components/Table';
import EditUserModal from '../components/EditUserModal';
import NewRoleModal from '../components/NewRoleModal'; // Adjust the path as needed

const rows = [
    // ... (Your existing rows data)
    {
        key: 1,
        name: 'Amine Mghari',
        email: "amine@codpowergroup.com",
        role: "Super Admin",
        company: "COD Power Group",
    },
    {
        key: 2,
        name: 'Sara El Amrani',
        email: "sara@codpowergroup.com",
        role: "Admin",
        company: "COD Power Group",
    },
    {
        key: 3,
        name: 'Mohamed Boushaki',
        email: "mohamed@codpowergroup.com",
        role: "Editor",
        company: "COD Power Group",
    },
    {
        key: 4,
        name: 'Fatima Zahra',
        email: "fatima@codpowergroup.com",
        role: "User",
        company: "COD Power Group",
    },
    {
        key: 5,
        name: 'Youssef Alami',
        email: "youssef@codpowergroup.com",
        role: "User",
        company: "COD Power Group",
    },
    {
        key: 6,
        name: 'Nadia Sidiqi',
        email: "nadia@codpowergroup.com",
        role: "User",
        company: "COD Power Group",
    },
    {
        key: 7,
        name: 'Khalid Cherkaoui',
        email: "khalid@codpowergroup.com",
        role: "User",
        company: "COD Power Group",
    },
    {
        key: 8,
        name: 'Rachid Kachouri',
        email: "rachid@codpowergroup.com",
        role: "Moderator",
        company: "COD Power Group",
    },
    {
        key: 9,
        name: 'Laila Ait Ahmed',
        email: "laila@codpowergroup.com",
        role: "Admin",
        company: "COD Power Group",
    },
    {
        key: 10,
        name: 'Samir Bouzidi',
        email: "samir@codpowergroup.com",
        role: "Super Admin",
        company: "COD Power Group",
    },
    // SMSA Records
    {
        key: 11,
        name: 'Ali Najib',
        email: "ali@smsa.com",
        role: "User",
        company: "SMSA",
    },
    {
        key: 12,
        name: 'Mona Ait Saleh',
        email: "mona@smsa.com",
        role: "Admin",
        company: "SMSA",
    },
    {
        key: 13,
        name: 'Tariq Hakam',
        email: "tariq@smsa.com",
        role: "Editor",
        company: "SMSA",
    },
    {
        key: 14,
        name: 'Layla Haddad',
        email: "layla@smsa.com",
        role: "User",
        company: "SMSA",
    },
    {
        key: 15,
        name: 'Omar Bouchaib',
        email: "omar@smsa.com",
        role: "User",
        company: "SMSA",
    },
    {
        key: 16,
        name: 'Nour El Hadi',
        email: "nour@smsa.com",
        role: "User",
        company: "SMSA",
    },
    {
        key: 17,
        name: 'Hassan Jebari',
        email: "hassan@smsa.com",
        role: "Moderator",
        company: "SMSA",
    },
    {
        key: 18,
        name: 'Zara Al Fassi',
        email: "zara@smsa.com",
        role: "Admin",
        company: "SMSA",
    },
    {
        key: 19,
        name: 'Yassir Alami',
        email: "yassir@smsa.com",
        role: "Super Admin",
        company: "SMSA",
    },
    {
        key: 20,
        name: 'Huda Tarik',
        email: "huda@smsa.com",
        role: "User",
        company: "SMSA",
    },
    // DHL Records
    {
        key: 21,
        name: 'Ziad Karimi',
        email: "ziad@dhl.com",
        role: "User",
        company: "DHL",
    },
    {
        key: 22,
        name: 'Samira Benali',
        email: "samira@dhl.com",
        role: "Admin",
        company: "DHL",
    },
    {
        key: 23,
        name: 'Karim Rachid',
        email: "karim@dhl.com",
        role: "Editor",
        company: "DHL",
    },
    {
        key: 24,
        name: 'Siham El Ouardi',
        email: "siham@dhl.com",
        role: "User",
        company: "DHL",
    },
    {
        key: 25,
        name: 'Mohammed Boukhari',
        email: "mohammed@dhl.com",
        role: "User",
        company: "DHL",
    },
    {
        key: 26,
        name: 'Kenza El Idrissi',
        email: "kenza@dhl.com",
        role: "User",
        company: "DHL",
    },
    {
        key: 27,
        name: 'Sofia Amari',
        email: "sofia@dhl.com",
        role: "Moderator",
        company: "DHL",
    },
    {
        key: 28,
        name: 'Walid Azzedine',
        email: "walid@dhl.com",
        role: "Admin",
        company: "DHL",
    },
    {
        key: 29,
        name: 'Khalil Nasri',
        email: "khalil@dhl.com",
        role: "Super Admin",
        company: "DHL",
    },
    {
        key: 30,
        name: 'Ranya Sidqi',
        email: "ranya@dhl.com",
        role: "User",
        company: "DHL",
    },
];

const columns = [
    { key: "role", label: "Role", w: 'w-[80%]' },
    { key: "actions", label: "Actions", w: 'w-[20%]' },
];

const Roles = () => {

    const [openEditModal, setOpenEditModal] = useState(false);
    const [openNewRoleModal, setOpenNewRoleModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const companies = [...new Set(rows.map(row => row.company))];
    const [selectedCompany, setSelectedCompany] = useState(companies[0]);
    const rowsPerPage = 10;
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            const darkMode = document.documentElement.classList.contains('dark');
            setIsDarkMode(darkMode);
        };

        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    // Handle checkbox toggle
    const handleCheckboxChange = (key) => {
        if (selectedRows.includes(key)) {
            setSelectedRows(selectedRows.filter((selectedKey) => selectedKey !== key));
        } else {
            setSelectedRows([...selectedRows, key]);
        }
    };

    // Function to render cells dynamically
    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case "actions":
                return (
                    <div className="flex space-x-2 justify-center">
                        {/* Edit Button */}
                        <Button
                            variant="flat"
                            size="sm"
                            className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                            style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
                            onClick={() => setOpenEditModal(true)} // Open Edit Modal
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
        <DashboardLayout title="Users - Roles" icon={<UserIcon className="text-info" />}>
            <div className="p-2 md:p-4">
                {/* Tabs for Active and Archived */}
                <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row">
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                        {companies && companies.length > 0 && companies.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedCompany(companies[index])}
                                className={`py-2 cursor-pointer text-sm px-6 rounded-full text-white dark:text-white ${selectedCompany === item ? 'bg-[#0258E8]' : 'bg-[#0256e83d]'}`}
                            >
                                {item}
                            </div>
                        ))}
                    </div>

                    {/* New Role and Actions Buttons */}
                    <div className="flex gap-2 flex-wrap items-center self-end">
                        <Button
                            onClick={() => setOpenNewRoleModal(true)}
                            color="default"
                            className="rounded-full flex items-center gap-1"
                            style={{ backgroundColor: '#0258E8', color: 'white' }}
                        >
                            <PlusSignIcon size={18} /> New Role
                        </Button>
                        <Button
                            color="default"
                            className="rounded-full flex items-center gap-1"
                            style={{ backgroundColor: '#ED0006', color: 'white' }}
                        >
                            <PencilEdit01Icon size={18} style={{ color: 'white' }} /> Actions
                        </Button>
                    </div>
                </div>

                {/* Use the Generalized Table Component */}
                <Table
                    columns={columns}
                    data={rows.filter(r => r.company === selectedCompany)}  // Pass filtered data based on the view
                    renderCell={renderCell}
                    handleCheckboxChange={handleCheckboxChange}
                    selectedRows={selectedRows} // Pass selected rows state
                    rowsPerPage={rowsPerPage}  // Pass rows per page
                    className="dark:bg-gray-800 dark:text-white" // Dark mode support
                />
            </div>

            {/* Edit User Modal */}
            <EditUserModal modalOpen={openEditModal} setModalOpen={setOpenEditModal} id={1} />

            {/* New Role Modal */}
            <NewRoleModal isOpen={openNewRoleModal} onClose={() => setOpenNewRoleModal(false)} />
        </DashboardLayout>
    );
};

export default Roles;
