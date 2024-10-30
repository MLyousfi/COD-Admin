import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import {
    ArrowDown01Icon,
    Calling02Icon,
    CustomerService01Icon,
    PencilEdit01Icon,
    ArrowUpDownIcon,
    UserIcon
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import StatusTabs from '../../shared/components/StatusTabs';
import Table from "../../stockManagement.jsx/components/Table";
import { motion } from 'framer-motion';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { agentNames } from "../../../core/utils/shared.data";


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
        status: "active",
    },
    {
        key: "2",
        orderNum: "DSAKDJFUIREOWJDNCAS",
        subNum: "AKSKDHJS",
        store: "Store 2",
        product: "Product Y",
        productId: "987654321",
        name: "Jane Smith",
        country: "United Arab Emirates",
        price: "15.324 AED",
        agent: "Bob Johnson",
        status: "archived",
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
        status: "active",
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
        price: "11.564 SAR",
        agent: "Alice Smith",
        status: "active",
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
        status: "active",
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
        status: "active",
    },
];



const columns = [
    { key: "checkbox", label: "#" },
    { key: "orderNum", label: "Order Number" },
    { key: "store", label: "Store" },
    { key: "product", label: "Product" },
    { key: "name", label: "Name" },
    { key: "country", label: "Country" },
    { key: "price", label: "Price" },
    { key: "agent", label: "Agent" },
    { key: "status", label: "Status" },
];

export default function Confirmation() {
    const [selectedTab, setSelectedTab] = useState('active');
    const [selectedRows, setSelectedRows] = useState([]);
    const rowsPerPage = 10;
    const [callTab, setCallTab] = useState('All');
    const [sortAscending, setSortAscending] = useState(true);

    const handleCheckboxChange = (key) => {
        if (selectedRows.includes(key)) {
            setSelectedRows(selectedRows.filter((selectedKey) => selectedKey !== key));
        } else {
            setSelectedRows([...selectedRows, key]);
        }
    };

    const filteredRows = selectedTab === 'active'
        ? rows.filter(row => row.status === "active")
        : rows.filter(row => row.status === "archived");

    const sortedRows = [...filteredRows].sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);

        return sortAscending ? priceA - priceB : priceB - priceA;
    });

    const toggleSortOrder = () => {
        setSortAscending(!sortAscending);
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
            case "product":
                return (
                    <div>
                        <p>{item.product}</p>
                        <Link to="#" className="text-blue-500">(SKU: {item.productId})</Link>
                    </div>
                );
            default:
                return <span>{cellValue}</span>;
        }
    }, []);

    return (
        <DashboardLayout
            title="Call Center - Confirmation"
            icon={<CustomerService01Icon className="text-info" />}
            additionalContent={
                <div className="flex justify-evenly gap-2 items-center px-4 rounded-full bg-[#0258E810]">
                    {['All', 'Whatsapp'].map((t, idx) => (
                        <motion.div
                            whileTap={{ scale: 0.8 }}
                            key={idx}
                            className={`flex justify-center items-center p-2 cursor-pointer ${callTab === t ? 'font-bold text-[#0258E8]' : 'font-normal text-black dark:text-white'}`}
                            onClick={() => setCallTab(t)}
                        >
                            {t}
                        </motion.div>
                    ))}
                </div>
            }
        >
            <div className="p-2 md:p-4">{/**here ---|> responsv */}
                <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row">{/**here ---|> responsv */}
                    <StatusTabs
                        activeCount={rows.filter(row => row.status === "active").length}
                        archivedCount={rows.filter(row => row.status === "archived").length}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                    />

                    <div className="flex gap-2 flex-wrap items-center"> {/**here ---|> responsv */}
                        <Button color="default" className="rounded-full bg-info text-white">
                            <Calling02Icon size={18} /> Start Call
                        </Button>

                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered" className="rounded-full">
                                    List of Agents <ArrowDown01Icon size={16} />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                {agentNames.map((i) => (
                                    <DropdownItem key={i}>
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2">
                                                <UserIcon size={15} /> {i}
                                            </div>

                                        </div>
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="default" className="rounded-full bg-danger text-white">
                            <PencilEdit01Icon size={18} /> Actions
                        </Button>
                    </div>

                </div>

                <Table
                    columns={columns.map(col =>
                        col.key === "price"
                            ? {
                                ...col,
                                label: (
                                    <div className="flex justify-center items-center">
                                        {col.label}
                                        <ArrowUpDownIcon
                                            size={15}
                                            onClick={toggleSortOrder}
                                            className="ml-1 cursor-pointer text-gray-400 hover:text-blue-500"
                                        />
                                    </div>
                                )
                            }
                            : col
                    )}
                    data={sortedRows}
                    renderCell={renderCell}
                    handleCheckboxChange={handleCheckboxChange}
                    selectedRows={selectedRows}
                    rowsPerPage={rowsPerPage}
                    className="dark:bg-gray-800 dark:text-white"
                />
            </div>
        </DashboardLayout>
    );
}
