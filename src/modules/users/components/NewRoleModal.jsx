// newrolemodal.jsx

import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from '@nextui-org/select';
import { motion } from 'framer-motion';
import CustomModal from '../../stockManagement.jsx/components/modal'; // Adjust the path as needed

const NewRoleModal = ({ isOpen, onClose }) => {
    const [roleName, setRoleName] = useState('');
    const [permissions, setPermissions] = useState({
        // Existing Permissions
        dashboard: false,
        funds: false,
        realRates: false,
        products: false,
        sponsoring: false,
        agents: false,
        callCenterDashboard: false,
        callCenterFunds: false,
        callCenterRealRates: false,
        orderManagementConsultation: false,
        orderManagementCreation: false,
        orderManagementModification: false,
        orderManagementDeletion: false,
        orderManagementChatBot: false,
        orderManagementConfirmedOrders: false,
        orderManagementScheduleOrders: false,
        orderActionsCallCenter: false,
        orderActionsFollowUp: false,
        orderActionsShipping: false,
        orderActionsGeneral: false,
        sellerManagementConsultation: false,
        sellerManagementCreation: false,
        sellerManagementModification: false,
        sellerManagementDeletion: false,
        sellerManagementSalesChannels: false,
        sellerManagementSubscription: false,
        sellerManagementFacebookBusiness: false,

        // New Permissions
        // Warehouse Management
        warehouseManagementConsultation: false,
        warehouseManagementCreation: false,
        warehouseManagementModification: false,
        warehouseManagementDeletion: false,

        // Accounting
        accountingAccounting: false,
        accountingExpenses: false,
        accountingReports: false,

        // Stock Management
        stockManagementConsultation: false,
        stockManagementCreation: false,
        stockManagementModification: false,
        stockManagementDeletion: false,

        // Countries
        countriesConsultation: false,
        countriesCreation: false,
        countriesModification: false,
        countriesDeletion: false,

        // User Management
        userManagementConsultation: false,
        userManagementCreation: false,
        userManagementModification: false,
        userManagementDeletion: false,
        userManagementAffiliate: false,
        userManagementLoginToOtherUsers: false,

        // Permission Management
        permissionManagementConsultation: false,
        permissionManagementCreation: false,
        permissionManagementModification: false,
        permissionManagementDeletion: false,

        // Shipping
        shippingShippingCosts: false,
        shippingCollects: false,

        // Currencies
        currenciesConsultation: false,
        currenciesCreation: false,
        currenciesModification: false,
        currenciesDeletion: false,

        // Banks
        banksConsultation: false,
        banksCreation: false,
        banksModification: false,
        banksDeletion: false,

        // Display
        displayTrackingNumber: false,
        displayShippingCompany: false,
        displayShippingHistory: false,
        displayWhatsappMessage: false,
        displayShippingPrice: false,
        displayWarehouse: false,
        displaySeller: false,
        displayAgents: false,
        displayFollowUp: false,

        // Partners
        partnersConsultation: false,
        partnersCreation: false,
        partnersModification: false,
        partnersDeletion: false,

        // Whatsapp Templates
        whatsappTemplatesConsultation: false,
        whatsappTemplatesCreation: false,
        whatsappTemplatesModification: false,
        whatsappTemplatesDeletion: false,

        // Notifications
        notificationsConfirmedWithoutCity: false,
        notificationsNoAnswerLate: false,
        notificationsScheduleTime: false,
        notificationsDuplicateTrackingNumber: false,

        // General
        generalFirstMile: false,
        generalIsAffiliate: false,
        generalTemplates: false,
    });

    const handlePermissionChange = (permissionKey) => {
        setPermissions(prev => ({
            ...prev,
            [permissionKey]: !prev[permissionKey]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Role Name:", roleName);
        console.log("Permissions:", permissions);
        onClose();
    };

    const [isDarkMode, setIsDarkMode] = useState(false);

    // Detect dark mode
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

      // Define all permission groups in the desired order
      const permissionGroups = [
        {
            title: 'Dashboard',
            permissions: ['Dashboard', 'Funds', 'Real Rates']
        },
        {
            title: 'Order Management',
            permissions: ['Consultation', 'Creation', 'Modification', 'Deletion', 'Chat Bot', 'Confirmed Orders', 'Schedule Orders']
        },
        {
            title: 'Warehouse Management',
            permissions: ['Consultation', 'Creation', 'Modification', 'Deletion']
        },
        {
            title: 'Countries',
            permissions: ['Consultation', 'Creation', 'Modification', 'Deletion']
        },
        {
            title: 'Shipping',
            permissions: ['Shipping Costs', 'Collects']
        },
        {
            title: 'Display',
            permissions: ['Tracking Number', 'Shipping Company', 'Shipping History', 'Whatsapp Message', 'Shipping Price', 'Warehouse', 'Seller', 'Agents', 'Follow Up']
        },
        {
            title: 'Statistics',
            permissions: ['Products', 'Funds', 'Sponsoring', 'Agents']
        },
        {
            title: 'Order Actions',
            permissions: ['Call Center', 'Follow Up', 'Shipping', 'General']
        },
        {
            title: 'Accounting',
            permissions: ['Accounting', 'Expenses', 'Reports']
        },
        {
            title: 'User Management',
            permissions: ['Consultation', 'Creation', 'Modification', 'Deletion', 'Affiliate', 'Login to Other Users']
        },
        {
            title: 'Currencies',
            permissions: ['Consultation', 'Creation', 'Modification', 'Deletion']
        },
        {
            title: 'Partners',
            permissions: ['Consultation', 'Creation', 'Modification', 'Deletion']
        },
        {
            title: 'Notifications',
            permissions: ['Confirmed Without City', 'No Answer Late', 'Schedule Time', 'Duplicate Tracking Number']
        },
        {
            title: 'Call Center',
            permissions: ['Dashboard', 'Funds', 'Real Rates']
        },
        {
            title: 'Seller Management',
            permissions: ['Consultation', 'Creation', 'Modification', 'Deletion', 'Sales Channels', 'Subscription', 'Facebook Business']
        },
        {
            title: 'Stock Management',
            permissions: ['Consultation', 'Creation', 'Modification', 'Deletion']
        },
        {
            title: 'Permission Management',
            permissions: ['Consultation', 'Creation', 'Modification', 'Deletion']
        },
        {
            title: 'Banks',
            permissions: ['Consultation', 'Creation', 'Modification', 'Deletion']
        },
        {
            title: 'Whatsapp Templates',
            permissions: ['Consultation', 'Creation', 'Modification', 'Deletion']
        },
        {
            title: 'General',
            permissions: ['First Mile', 'Is Affiliate', 'Templates']
        },
    ];

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            title="New Role"
            isDarkMode={isDarkMode}
            width="900px" 
        >
            <form onSubmit={handleSubmit} className="space-y-24">
                {/* Informations Section */}
                <div>
                    <h3 className="text-lg font-semibold mt-7 ">Informations</h3>
                    <div className="flex flex-col lg:flex-row my-2 justify-center ">
                        <div className="w-full lg:w-1/2 ">
                            <label htmlFor="roleName" className="block mr-2">
                                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Role Name</span>
                                <Select
                                    id="roleName"
                                    placeholder="Select a role"
                                    labelPlacement="outside"
                                    classNames={{
                                        trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg',
                                    }}
                                    value={roleName}
                                    onValueChange={(value) => setRoleName(value)}
                                    required
                                >
                                    <SelectItem key="super_admin">Super Admin</SelectItem>
                                    <SelectItem key="admin">Admin</SelectItem>
                                    <SelectItem key="editor">Editor</SelectItem>
                                    <SelectItem key="user">User</SelectItem>
                                    <SelectItem key="moderator">Moderator</SelectItem>
                                </Select>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Permissions Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-10">Permissions</h3>
                    <div className="columns-2 sm:columns-2 md:columns-3 gap-6 space-y-12">
                        {permissionGroups.map((group, idx) => (
                            <PermissionGroup
                                key={idx}
                                title={group.title}
                                permissions={group.permissions}
                                permissionsState={permissions}
                                handlePermissionChange={handlePermissionChange}
                            />
                        ))}
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="flex gap-4 justify-center md:justify-start md:pl-16">
                <Button type="submit" color="primary"
                    className='bg-info rounded-full px-10'
                    >
                        Save
                    </Button>
                    <Button type="button" color="default" onClick={onClose}
                    className='bg-transparent rounded-full border border-black dark:border-white text-black dark:text-white px-10 '

                    >
                        Back
                    </Button>
                </div>
            </form>
        </CustomModal>
    )
    };

    // PermissionGroup Component
    const PermissionGroup = ({ title, permissions, permissionsState, handlePermissionChange }) => {
        return (
            <div className="break-inside-avoid-column flex flex-col mb-6 justify-center">
<div className="pl-0 md:pl-16">
<h4 className="font-medium mb-4">{title}</h4>
                    <div className="space-y-2">
                        {permissions.map((perm, index) => {
                            // Generate a unique key by combining group title and permission label
                            const key = `${title.replace(/\s+/g, '')}${perm.replace(/\s+/g, '')}`;
                            return (
                                <CheckboxItem
                                    key={index}
                                    label={perm}
                                    checked={permissionsState[key]}
                                    onChange={() => handlePermissionChange(key)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    // CheckboxItem Component
    const CheckboxItem = ({ label, checked, onChange }) => {
        return (
            <motion.div
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className='flex items-center space-x-2 cursor-pointer'
                onClick={onChange}
            >
                <div className='w-5 h-5 rounded-md border border-[#00000050] dark:border-[#ffffff50] flex justify-center items-center'>
                    {checked && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className='w-3 h-3 rounded-sm bg-glb_blue'
                        />
                    )}
                </div>
                <span className="text-sm dark:text-white">{label}</span>
            </motion.div>
        );
    };

    export default NewRoleModal;