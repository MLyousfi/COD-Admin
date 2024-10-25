import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import {
    ArrowDown01Icon,
    ArrowLeft02Icon,
    ArrowRight02Icon,
    Calling02Icon,
    CustomerService01Icon,
    PencilEdit01Icon
} from "hugeicons-react";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../stockManagement.jsx/components/Table";

const rows = [
    {
        key: "1",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "Confirmed at 09/09/2024",
    },
    {
        key: "2",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "Confirmed at 09/09/2024",
    },
    {
        key: "3",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "Confirmed at 09/09/2024",
    },
    {
        key: "4",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "Confirmed at 09/09/2024",
    },
    {
        key: "5",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "Confirmed at 09/09/2024",
    },
    {
        key: "6",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "Confirmed at 09/09/2024",
    },
];

const columns = [
    { key: "checkbox", label: "#" },
    {
        key: "orderNum",
        label: "Order Number",
    },
    {
        key: "store",
        label: "Store",
    },
    {
        key: "product",
        label: "Product",
    },
    {
        key: "name",
        label: "Name",
    },
    {
        key: "country",
        label: "Country",
    },
    {
        key: "price",
        label: "Price",
    },
    {
        key: "agent",
        label: "Agent",
    },
    {
        key: "status",
        label: "Status",
    },
];

export default function Confirmation() {

    const [selectionBehavior, setSelectionBehavior] = useState("toggle");

    // State to keep track of the selected tab
    const [selectedTab, setSelectedTab] = useState('photos');

    // Function to handle tab change
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    const [selectedRows, setSelectedRows] = useState([]);
    const rowsPerPage = 10;

    const handleCheckboxChange = (key) => {
        if (selectedRows.includes(key)) {
            setSelectedRows(selectedRows.filter((selectedKey) => selectedKey !== key));
        } else {
            setSelectedRows([...selectedRows, key]);
        }
    };
    const renderCell = useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {

            case "orderNum":
                return (
                    <div>
                        <p>{item.orderNum}</p>
                        <Link to="#" className="text-blue-500">({item.subNum})</Link>
                    </div>
                );
            case "store":
                return (
                    <span>{item.store}</span>
                );
            case "product":
                return (
                    <div>
                        <p>{item.product}</p>
                        <Link to="#" className="text-blue-500">(SKU: {item.productId})</Link>
                    </div>
                );
            case "name":
                return (
                    <span>{item.name}</span>
                );
            case "country":
                return (
                    <span>{item.country}</span>
                );
            case "price":
                return (
                    <span>{item.price}</span>
                );
            case "agent":
                return (
                    <span>{item.agent}</span>
                );
            case "status":
                return (
                    <span>{item.status}</span>
                );
            case "actions":
                return (
                    <span></span>
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
            <DashboardLayout title="Call Center - Confirmation" icon={<CustomerService01Icon className="text-info" />}
                additionalContent={
                    <div className="dark:bg-info/10 w-fit rounded-full px-4 py-1.5 text-center">
                        <span className="text-lg"><strong
                            className="text-info">Call</strong> Whatsapp</span>
                    </div>}>
                <div>
                    {/*Tabs*/}
                    <div className="flex flex-row justify-between items-center gap-4 px-12">
                        <Tabs
                            aria-label="Options"
                            color="primary"
                            variant="underlined"
                            classNames={{
                                tabList: "gap-6 w-full relative rounded-none p-0 border-b bg-transparent border-b-transparent",
                                cursor: "w-full bg-info",
                                tab: "max-w-fit px-0 h-12 text-red-500",
                                tabContent: "group-data-[selected=true]:text-info text-gray-600"
                            }}
                            onTabChange={handleTabChange} // Attach the tab change handler
                        >
                            <Tab
                                key="photos"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <strong>Active</strong>
                                        <Chip color={selectedTab === 'photos' ? "danger" : "default"} size="sm">12345</Chip>
                                    </div>
                                }
                            />

                            <Tab
                                key="music"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <strong>Archived</strong>
                                        <Chip color={selectedTab === 'music' ? "danger" : "default"} size="sm" className="text-gray-400">12345</Chip>
                                    </div>
                                }
                            />
                        </Tabs>

                        {/*Tab content*/}

                        <div className="flex flex-row gap-2">
                            <Button color="default" className="rounded-full bg-info">
                                <Calling02Icon size={18} /> Start Call
                            </Button>
                            <Button variant="bordered" className="rounded-full">
                                List of Agents <ArrowDown01Icon size={16} />
                            </Button>
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