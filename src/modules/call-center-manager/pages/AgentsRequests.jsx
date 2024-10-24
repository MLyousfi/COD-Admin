import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import {
    ArrowDown01Icon,
    ArrowLeft02Icon,
    ArrowRight02Icon,
    Calling02Icon,
    CustomerService01Icon,
    Edit01Icon,
    Logout03Icon,
    PencilEdit01Icon
} from "hugeicons-react";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import { useCallback, useMemo, useState } from "react";
// import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Link } from "react-router-dom";
import Table from "../../stockManagement.jsx/components/Table";

const rows = [
    { key: 1, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" },
    { key: 2, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" },
    { key: 3, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Affiliate Marketer", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" },
    { key: 4, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Logistics", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" },
    { key: 5, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" },
    { key: 6, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" },
    { key: 7, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" },
    { key: 8, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" },
    { key: 9, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" },
    { key: 10, name: "Amine M'ghari", email: "amine@codpowergroup.com", role: "Operators", workingTime: "Mon, Tue, Wed, Thur, Fri, Sat, Sun" }

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

export default function AgentsRequests() {

    const [selectionBehavior, setSelectionBehavior] = useState("toggle");

    const [selectedRows, setSelectedRows] = useState([]);
    const rowsPerPage = 10;

    const handleCheckboxChange = (key) => {
        if (selectedRows.includes(key)) {
            setSelectedRows(selectedRows.filter((selectedKey) => selectedKey !== key));
        } else {
            setSelectedRows([...selectedRows, key]);
        }
    };
    const [currentPage, setCurrentPage] = useState(1);

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
                            onClick={() => handleDelete(item.key)} // Call handleDelete with the item's key
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
                // changing the rows border radius
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
    return (
        <>
            <DashboardLayout title="Call Center Manager - Agents Requests" icon={<CustomerService01Icon className="text-info" />}
            >
                <div>
                    {/*Tabs*/}
                    <div className="flex flex-row justify-between items-center gap-4 px-12">
                        <Tabs aria-label="Options"
                            color="primary"
                            variant="underlined"
                            classNames={{
                                tabList: "gap-6 w-full relative rounded-none p-0 border-b bg-transparent border-b-transparent",
                                cursor: "w-full bg-info",
                                tab: "max-w-fit px-0 h-12 text-red-500",
                                tabContent: "group-data-[selected=true]:text-info text-gray-600"
                            }}>
                            <Tab
                                key="photos"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <strong>Active</strong>
                                        <Chip color="danger" size="sm">10</Chip>
                                    </div>
                                }
                            />

                            <Tab
                                key="music"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <strong>Archived</strong>
                                        <Chip color="default" size="sm" className="text-gray-400">10928</Chip>
                                    </div>
                                }
                            />
                        </Tabs>

                        {/*Tab content*/}

                        <div className="flex flex-row gap-2">

                            <Button color="default" className="rounded-full bg-danger">
                                <PencilEdit01Icon size={18} /> Actions
                            </Button>
                        </div>
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

            </DashboardLayout>
        </>
    )
}