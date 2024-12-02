import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import {

    CustomerService01Icon,
    Edit01Icon,
    Logout03Icon,
    PrinterIcon,
    PencilEdit01Icon,
    ArrowRight01Icon,
    CallOutgoing01Icon,
    CustomerSupportIcon,
    Download01Icon,
    DropboxIcon,
    Settings02Icon,
} from "hugeicons-react";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../shared/components/Table";
import StatusTabs from "../../shared/components/StatusTabs";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

const rows = [
    { key: 1, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" ,status:"active"},
    { key: 2, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun",status:"active" },
    { key: 3, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Affiliate Marketer", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun",status:"active" },
    { key: 4, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Logistics", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" ,status:"active"},
    { key: 5, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" ,status:"active"},
    { key: 6, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" ,status:"active"},
    { key: 7, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun",status:"active" },
    { key: 8, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun",status:"archived" },
    { key: 9, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" ,status:"archived"},
    { key: 10, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" ,status:"active"}

];

const columns = [
    {
        key: "name",
        label: "Name",
    },
    {
        key: "email",
        label: "Email",
    },
    {
        key: "role",
        label: "Role",
    },
    {
        key: "workingTime",
        label: "Working Time",
    },
    {
        key: "actions",
        label: "Actions",
    },

];

export default function MyAgent() {

    const [selectionBehavior, setSelectionBehavior] = useState("toggle");

    const [selectedRows, setSelectedRows] = useState([]);
    const rowsPerPage = 10;
    const [products, setProducts] = useState(rows);

    const handleCheckboxChange = (key) => {
        if (selectedRows.includes(key)) {
            setSelectedRows(selectedRows.filter((selectedKey) => selectedKey !== key));
        } else {
            setSelectedRows([...selectedRows, key]);
        }
    };
    const [selectedTab, setSelectedTab] = useState('active');

    const renderCell = useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {

            case "name":
                return (
                    <span>{item.name}</span>
                );
            case "email":
                return (
                    <span>{item.email}</span>
                );
            case "role":
                return (
                    <span>{item.role}</span>
                );
            case "workingTime":
                return (
                    <span>{item.workingTime}</span>
                );

            case "actions":
                return (
                    <div className="flex space-x-2 justify-center">
                        <Button
                            variant="flat"
                            size="sm"
                            className="w-7 h-7 rounded-full p-0 flex items-center justify-center"
                            style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
                        >
                            <Logout03Icon size={14} style={{ color: 'white' }} />
                        </Button>

                        <Button
                            variant="flat"
                            size="sm"
                            className="w-7 h-7 rounded-full p-0 flex items-center justify-center"
                            style={{ backgroundColor: '#ED0006', padding: 0, minWidth: '32px', height: '32px' }}
                            onClick={() => handleDelete(item.key)} 
                        >
                            <Edit01Icon size={14} style={{ color: 'white' }} />
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const classNames = useMemo(
        () => ({
            wrapper: ["min-w-full", "bg-black"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider", "text-center"],
            td: [
                "text-center",
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );
    const filteredProducts = selectedTab.toLowerCase() === 'active'
    ? products.filter(product => product.status && product.status.toLowerCase() === "active")
    : products.filter(product => product.status && product.status.toLowerCase() === "archived");
    return (
        <>
            <DashboardLayout title="Call Center Manager - My Agents" icon={<CustomerService01Icon className="text-info" />}
            >
                <div className="p-2 md:p-4">{/**here ---|> responsv */}
                    <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row">{/**here ---|> responsv */}
                        <StatusTabs
                                activeCount={rows.filter(row => row.status === "active").length}
                                archivedCount={rows.filter(row => row.status === "archived").length}
                            selectedTab={selectedTab}
                            onTabChange={setSelectedTab}
                        />

                        {/*Tab content*/}

                        <div className="flex gap-2 flex-wrap items-center self-end"> {/**here ---|> responsv */}
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
                    <Table
                        columns={columns}
                        data={filteredProducts}  // Pass filtered products based on the view
                        renderCell={renderCell}
                        handleCheckboxChange={handleCheckboxChange}
                        selectedRows={selectedRows} 
                        rowsPerPage={rowsPerPage} 
                        className="dark:bg-gray-800 dark:text-white" 
                    />
                </div>


            </DashboardLayout>
        </>
    )
}