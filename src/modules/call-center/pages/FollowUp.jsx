import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import {
    ArrowDown01Icon,
    ArrowLeft02Icon,
    ArrowRight02Icon,
    Calling02Icon,
    CustomerService01Icon,
    PencilEdit01Icon
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import StatusTabs from '../../shared/components/StatusTabs';
import Table from "../../stockManagement.jsx/components/Table";
import { motion } from 'framer-motion'
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
        orderNum: "ASDJQOIWRYJKSADF",
        subNum: "LSDKJAF",
        store: "Store 3",
        product: "Product Z",
        productId: "234567891",
        name: "Mohammed Ali",
        country: "Qatar",
        price: "9.876 QAR",
        agent: "Emily Chen",
        status: "active",
    },
    {
        key: "4",
        orderNum: "QWERJHKLASDFNMVCX",
        subNum: "ASDFJH",
        store: "Store 4",
        product: "Product A",
        productId: "345678912",
        name: "Sara Ahmed",
        country: "Kuwait",
        price: "10.876 KWD",
        agent: "John Lee",
        status: "archived",
    },
    {
        key: "5",
        orderNum: "KJHASDHJKLASDF",
        subNum: "LMNOPQR",
        store: "Store 5",
        product: "Product B",
        productId: "456789123",
        name: "Noura Mohammed",
        country: "Oman",
        price: "13.786 OMR",
        agent: "Mike Ross",
        status: "active",
    },
    {
        key: "6",
        orderNum: "QWERTYUIOPLKJHGF",
        subNum: "ZXCVBNM",
        store: "Store 6",
        product: "Product C",
        productId: "567891234",
        name: "Ahmed Zaki",
        country: "Bahrain",
        price: "14.872 BHD",
        agent: "Alice Smith",
        status: "archived",
    },
    {
        key: "7",
        orderNum: "ZXCVBNMASDFGHJKL",
        subNum: "QWERTYUI",
        store: "Store 7",
        product: "Product D",
        productId: "678912345",
        name: "Ali Hassan",
        country: "Saudi Arabia",
        price: "18.654 SAR",
        agent: "Bob Johnson",
        status: "active",
    },
    {
        key: "8",
        orderNum: "UIOPASDFGHJKLZXCV",
        subNum: "QAZWSXED",
        store: "Store 8",
        product: "Product E",
        productId: "789123456",
        name: "Fatima Al Otaibi",
        country: "UAE",
        price: "16.435 AED",
        agent: "Sara Brown",
        status: "archived",
    },
    {
        key: "9",
        orderNum: "QAZWSXEDCRFVTGBY",
        subNum: "PLMNOKJ",
        store: "Store 9",
        product: "Product F",
        productId: "890123567",
        name: "Rami Youssef",
        country: "Qatar",
        price: "11.987 QAR",
        agent: "Mohammed Ali",
        status: "active",
    },
    {
        key: "10",
        orderNum: "RFVBGYHNUJMIKOL",
        subNum: "ZXCVBNMAS",
        store: "Store 10",
        product: "Product G",
        productId: "901234678",
        name: "Zainab Hussain",
        country: "Kuwait",
        price: "17.456 KWD",
        agent: "Alice Smith",
        status: "archived",
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

export default function FollowUp() {
    const [selectedTab, setSelectedTab] = useState('active');
    const [callTab, setCallTab] = useState('All');
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

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
            title="Call Center - Follow Up"
            icon={<CustomerService01Icon className="text-info" />}
            additionalContent={
                <div className="flex justify-evenly gap-2 items-center px-4 rounded-full bg-[#0258E810]">
                    {['All', 'Call'].map((t, idx) => (
                        <motion.div whileTap={{
                            scale: 0.8,
                        }} key={idx} className={`flex justify-center items-center p-2 cursor-pointer ${callTab === t ? 'font-bold text-[#0258E8]' : 'font-normal text-black dark:text-white'}`} onClick={() => setCallTab(t)}>{t}</motion.div>
                    ))}
                </div>
            }
        >
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <StatusTabs
                        activeCount={rows.filter(row => row.status === "active").length}
                        archivedCount={rows.filter(row => row.status === "archived").length}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                    />

                    <div className="flex space-x-4 items-center">
                        <Button color="default" className="rounded-full bg-info text-white">
                            <Calling02Icon size={18} /> Start Call
                        </Button>
                        <Button variant="bordered" className="rounded-full">
                            List of Agents <ArrowDown01Icon size={16} />
                        </Button>
                        <Button color="default" className="rounded-full bg-danger text-white">
                            <PencilEdit01Icon size={18} /> Actions
                        </Button>
                    </div>
                </div>

                <Table
                    columns={columns}
                    data={filteredRows}
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
