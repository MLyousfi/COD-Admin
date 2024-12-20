import React, { useState } from 'react';
import { Home01Icon, PencilEdit01Icon, PlusSignIcon, EyeIcon, Delete01Icon,
    PrinterIcon, 
    Download01Icon,
    CustomerSupportIcon,
    ArrowRight01Icon,
    CallOutgoing01Icon,
    DropboxIcon,
    Settings02Icon
 } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../shared/components/Table';
import NewAffiliateModal from '../components/NewAffiliateModal';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger ,
    
} from "@nextui-org/dropdown";

const rows = [
    {
        key: 1,
        email: "amine@codpowergroup.com",
        role: "Super Admin",
        affiliate: "Affiliate 0001",
        affiliateTo: "Affiliate 0002"
    },
    {
        key: 2,
        email: "yasmine@codpowergroup.com",
        role: "Admin",
        affiliate: "Affiliate 0002",
        affiliateTo: "Affiliate 0001"
    },
    {
        key: 3,
        email: "omar@codpowergroup.com",
        role: "Manager",
        affiliate: "Affiliate 0003",
        affiliateTo: "Affiliate 0002"
    },
    {
        key: 4,
        email: "sara@codpowergroup.com",
        role: "User",
        affiliate: "Affiliate 0004",
        affiliateTo: "Affiliate 0003"
    },
    {
        key: 5,
        email: "khalid@codpowergroup.com",
        role: "Admin",
        affiliate: "Affiliate 0005",
        affiliateTo: "Affiliate 0003"
    },
    {
        key: 6,
        email: "fatima@codpowergroup.com",
        role: "Super Admin",
        affiliate: "Affiliate 0006",
        affiliateTo: "Affiliate 0005"
    },
    {
        key: 7,
        email: "samy@codpowergroup.com",
        role: "User",
        affiliate: "Affiliate 0007",
        affiliateTo: "Affiliate 0001"
    },
    {
        key: 8,
        email: "layla@codpowergroup.com",
        role: "Manager",
        affiliate: "Affiliate 0008",
        affiliateTo: "Affiliate 0007"
    },
    {
        key: 9,
        email: "adil@codpowergroup.com",
        role: "Admin",
        affiliate: "Affiliate 0009",
        affiliateTo: "Affiliate 0008"
    },
    {
        key: 10,
        email: "mona@codpowergroup.com",
        role: "User",
        affiliate: "Affiliate 0010",
        affiliateTo: "Affiliate 0009"
    },
    {
        key: 11,
        email: "hamza@codpowergroup.com",
        role: "Super Admin",
        affiliate: "Affiliate 0011",
        affiliateTo: "Affiliate 0005"
    },
    {
        key: 12,
        email: "yasmina@codpowergroup.com",
        role: "Admin",
        affiliate: "Affiliate 0012",
        affiliateTo: "Affiliate 0006"
    },
    {
        key: 13,
        email: "mehdi@codpowergroup.com",
        role: "Manager",
        affiliate: "Affiliate 0013",
        affiliateTo: "Affiliate 0007"
    },
    {
        key: 14,
        email: "zineb@codpowergroup.com",
        role: "User",
        affiliate: "Affiliate 0014",
        affiliateTo: "Affiliate 0012"
    },
    {
        key: 15,
        email: "faycal@codpowergroup.com",
        role: "Admin",
        affiliate: "Affiliate 0015",
        affiliateTo: "Affiliate 0011"
    },
    {
        key: 16,
        email: "najwa@codpowergroup.com",
        role: "Manager",
        affiliate: "Affiliate 0016",
        affiliateTo: "Affiliate 0013"
    },
    {
        key: 17,
        email: "rachid@codpowergroup.com",
        role: "User",
        affiliate: "Affiliate 0017",
        affiliateTo: "Affiliate 0006"
    },
    {
        key: 18,
        email: "salma@codpowergroup.com",
        role: "Super Admin",
        affiliate: "Affiliate 0018",
        affiliateTo: "Affiliate 0015"
    },
    {
        key: 19,
        email: "mohamed@codpowergroup.com",
        role: "Admin",
        affiliate: "Affiliate 0019",
        affiliateTo: "Affiliate 0010"
    },
    {
        key: 20,
        email: "amira@codpowergroup.com",
        role: "User",
        affiliate: "Affiliate 0020",
        affiliateTo: "Affiliate 0016"
    }
];

const columns = [
    { key: "checkbox", label: "#" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "affiliate", label: "Affiliate" },
    { key: "affiliateTo", label: "Affiliate To" },
    { key: "actions", label: "Actions" },
];

const ListOfAffiliate = () => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
    const rowsPerPage = 13;



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





    // Function to render cells dynamically
    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case "actions":
                return (
                    <div className="flex space-x-2 justify-center">
                        {/* View Button */}
                        <Button
                            variant="flat"
                            size="sm"
                            className="w-8 h-8 bg-[#00000020] dark:bg-[#ffffff20] rounded-full p-0 flex items-center justify-center"
                            style={{ padding: 0, minWidth: '32px', height: '32px' }}
                        >
                            <EyeIcon size={14} />
                        </Button>

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
        <DashboardLayout title="Affiliate" icon={<Home01Icon className="text-info" />}>
            <div className="pr-5">
                {/* Tabs for Active and Archived */}
                <div className="flex justify-end mb-4">



                    {/* New Product and Actions Buttons */}
                    <div className="order-1 md:order-2 flex flex-row gap-2 w-full md:w-auto justify-end">
                        <Button
                            onClick={() => setOpenModal(true)}
                            color="default"
                            className="rounded-full"
                            style={{ backgroundColor: '#0258E8', color: 'white' }}
                        >
                            <PlusSignIcon size={18} /> New Affiliate
                        </Button>
                                   {/* Actions Dropdown */}
           <Dropdown>
              <DropdownTrigger>
                <Button
                  color="default"
                  className="rounded-full text-white bg-glb_red flex items-center"
                >
                  <PencilEdit01Icon size={18} className="mr-1" /> Actions
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="print">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <PrinterIcon size={15} /> Print
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="export">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Download01Icon size={15} /> Export
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="call-center">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <CustomerSupportIcon size={15} /> Call center
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="follow-up">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <CallOutgoing01Icon size={15} /> Follow up
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="shipping">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <DropboxIcon size={15} /> Shipping
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="general">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Settings02Icon size={15} /> General
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
                    </div>
                </div>

                {/* Use the Generalized Table Component */}
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
            <NewAffiliateModal modalOpen={openModal} setModalOpen={setOpenModal} id={1} />
        </DashboardLayout>
    );
};

export default ListOfAffiliate;
