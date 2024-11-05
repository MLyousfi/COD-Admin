import React, { useState } from "react";
import {
    Airplane01Icon,
    BoxingBagIcon,
    CallDone02Icon,
    CallEnd01Icon,
    CancelCircleIcon,
    ChartHistogramIcon,
    Configuration01Icon,
    DeliveryReturn01Icon,
    DeliveryTruck02Icon,
    PackageDeliveredIcon,
    ShoppingBasket03Icon,
    ShoppingBasketCheckIn02Icon,
    ShoppingBasketDone03Icon,
    ShoppingCart01Icon,
    TaskDone01Icon,
    TimeSetting03Icon,
    Calendar03Icon,
    FilterIcon,
    ArrowDown01Icon,
    ArrowLeft01Icon,
    ArrowRight01Icon,
} from "hugeicons-react";
import { motion } from "framer-motion";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import StatsCard from "../components/StatsCard";
import { Button } from "@nextui-org/button";

const tableColumns = [
    { key: "list", label: "List of Agents" },
    { key: "callCenterT", label: "Call Center T", subColumns: ["code", "percentage"] },
    { key: "fatimaKhadou", label: "Fatima KHADOU", subColumns: ["code", "percentage"] },
];

const tableData = [
    {
        key: 1,
        list: "Total Leads 01",
        callCenterT: { code: "01", percentage: "26%" },
        fatimaKhadou: { code: "01", percentage: "100%" },
    },
    {
        key: 2,
        list: "Total Leads 02",
        callCenterT: { code: "01", percentage: "24.7%" },
        fatimaKhadou: { code: "01", percentage: "100%" },
    },
    {
        key: 3,
        list: "Total Leads 03",
        callCenterT: { code: "01", percentage: "11%" },
        fatimaKhadou: { code: "01", percentage: "11%" },
    },
    {
        key: 4,
        list: "Total Leads 04",
        callCenterT: { code: "01", percentage: "0%" },
        fatimaKhadou: { code: "01", percentage: "0%" },
    },
    {
        key: 5,
        list: "Total Leads 06",
        callCenterT: { code: "01", percentage: "26%" },
        fatimaKhadou: { code: "01", percentage: "100%" },
    },
    {
        key: 6,
        list: "Total Leads 07",
        callCenterT: { code: "01", percentage: "24.7%" },
        fatimaKhadou: { code: "01", percentage: "100%" },
    },
    {
        key: 7,
        list: "Total Leads 08",
        callCenterT: { code: "01", percentage: "11%" },
        fatimaKhadou: { code: "01", percentage: "11%" },
    },
    {
        key: 8,
        list: "Total Leads 09",
        callCenterT: { code: "01", percentage: "0%" },
        fatimaKhadou: { code: "01", percentage: "0%" },
    },
];


// Sample statistics data
const statistics = [
    {
        key: 1,
        title: "Total Leads",
        percentage: "100%",
        total: 1927,
        icon: ShoppingBasket03Icon,
        bgColor: "bg-[#4A5E5E40]",
    },
    {
        key: 2,
        title: "Real Leads",
        percentage: "100%",
        total: 1927,
        icon: ShoppingBasketDone03Icon,
        bgColor: "bg-[#FF00A830]",
    },
    {
        key: 3,
        title: "New Leads",
        percentage: "100%",
        total: 1927,
        icon: ShoppingCart01Icon,
        bgColor: "bg-[#4A5E5E40]",
    },
    {
        key: 4,
        title: "Test",
        percentage: "100%",
        total: 1927,
        icon: Configuration01Icon,
        bgColor: "bg-[#0057FF30]",
    },
    {
        key: 5,
        title: "Upsell",
        percentage: "100%",
        total: 1927,
        icon: ShoppingBasketCheckIn02Icon,
        bgColor: "bg-[#4A5E5E40]",
    },
    {
        key: 6,
        title: "No Answer",
        percentage: "100%",
        total: 1927,
        icon: CallEnd01Icon,
        bgColor: "bg-[#FF2E0030]",
    },
    {
        key: 7,
        title: "Cancel",
        percentage: "100%",
        total: 1927,
        icon: CancelCircleIcon,
        bgColor: "bg-[#FF2E0030]",
    },
    {
        key: 8,
        title: "Scheduled",
        percentage: "100%",
        total: 1927,
        icon: TimeSetting03Icon,
        bgColor: "bg-[#FFE50030]",
    },
    {
        key: 9,
        title: "Wrong Phones",
        percentage: "100%",
        total: 1927,
        icon: CallEnd01Icon,
        bgColor: "bg-[#4A5E5E40]",
    },
    {
        key: 10,
        title: "Double Order",
        percentage: "100%",
        total: 1927,
        icon: ShoppingBasket03Icon,
        bgColor: "bg-[#00D1FF30]",
    },
    {
        key: 11,
        title: "Return",
        percentage: "100%",
        total: 1927,
        icon: DeliveryReturn01Icon,
        bgColor: "bg-[#FFA59F30]",
    },
    {
        key: 12,
        title: "In Transit",
        percentage: "100%",
        total: 1927,
        icon: DeliveryTruck02Icon,
        bgColor: "bg-[#7E28A630]",
    },
    {
        key: 13,
        title: "Confirmed",
        percentage: "100%",
        total: 1927,
        icon: CallDone02Icon,
        bgColor: "bg-[#14FF0030]",
    },
    {
        key: 14,
        title: "Delivered",
        percentage: "100%",
        total: 1927,
        icon: TaskDone01Icon,
        bgColor: "bg-[#00FFA330]",
    },
    {
        key: 15,
        title: "Shipped",
        percentage: "100%",
        total: 1927,
        icon: PackageDeliveredIcon,
        bgColor: "bg-[#00FF6630]",
    },
];

// Inline table component with pagination
const InlineTable = ({ columns, data, rowsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Get current page data
    const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="overflow-x-auto w-full">
            <table className="min-w-full table-auto">
                <thead>
                    {/* First Header Row */}
                    <tr className="h-12 text-white">
                        <th className="bg-transparent px-2 py-2 text-center text-sm font-semibold"></th>
                        <th
                            colSpan={2}
                            className="dark:bg-[#FFFFFF02] bg-[#00000008] px-2 py-2 text-center text-black dark:text-white text-sm font-semibold"
                        >
                            Call Center T
                        </th>
                        <th
                            colSpan={2}
                            className="dark:bg-[#FFFFFF06] bg-[#00000012] px-2 py-2  text-black dark:text-white text-center text-sm font-semibold"
                        >
                            Fatima KHADOU
                        </th>
                    </tr>

                    {/* Second Header Row */}
                    <tr className="h-10 text-white">
                        <th className="px-2 py-2 text-center text-black dark:text-white text-sm font-semibold dark:bg-[#FFFFFF02] bg-[#00000008]">List of Agents</th>
                        <th className="px-2 py-2 text-center text-sm  text-black dark:text-white font-semibold dark:bg-[#FFFFFF02] bg-[#00000008]">01</th>
                        <th className="px-2 py-2 text-center text-sm text-black dark:text-white font-semibold dark:bg-[#FFFFFF02] bg-[#00000008]">100%</th>
                        <th className="px-2 py-2 text-center text-sm text-black dark:text-white font-semibold dark:bg-[#FFFFFF06] bg-[#00000012]">01</th>
                        <th className="px-2 py-2 text-center text-sm text-black dark:text-white font-semibold dark:bg-[#FFFFFF06] bg-[#00000012]">100%</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Data Rows */}
                    {currentData.map((item, index) => (
                        <tr
                            key={item.key}
                            className="h-12" // Removed conditional background
                        >
                            {/* First Column with Alternating Backgrounds */}
                            <td
                                className={`px-2 py-2 text-center dark:text-gray-300 text-sm font-semibold ${
                                    index % 2 === 0 ? 'dark:bg-[#FFFFFF06] bg-[#00000012]' : 'dark:bg-[#FFFFFF02] bg-[#00000008]'
                                }`}
                            >
                                {item.list}
                            </td>
                            {/* Other Columns with Uniform Background */}
                            <td className="px-2 py-2 text-center dark:text-gray-300 text-sm font-semibold dark:bg-[#FFFFFF02] bg-[#00000008]">
                                {item.callCenterT.code}
                            </td>
                            <td className="px-2 py-2 text-center dark:text-gray-300 text-sm font-semibold dark:bg-[#FFFFFF02] bg-[#00000008]">
                                {item.callCenterT.percentage}
                            </td>
                            <td className="px-2 py-2 text-center dark:text-gray-300 text-sm font-semibold dark:bg-[#FFFFFF06] bg-[#00000012]">
                                {item.fatimaKhadou.code}
                            </td>
                            <td className="px-2 py-2 text-center dark:text-gray-300 text-sm font-semibold dark:bg-[#FFFFFF06] bg-[#00000012]">
                                {item.fatimaKhadou.percentage}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center my-4 space-x-2">
                <button
                    className="px-3 py-1 bg-gray-200 dark:bg-[#1a1a1a] dark:text-white rounded flex items-center space-x-1 text-sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ArrowLeft01Icon size={12} /> <span>Previous</span>
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`px-3 py-1 text-sm ${currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-600 dark:text-white"
                        } rounded`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    className="px-3 py-1 bg-gray-200 dark:bg-[#1a1a1a] dark:text-white rounded flex items-center space-x-1 text-sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <span>Next</span> <ArrowRight01Icon size={12} />
                </button>
            </div>
        </div>
    );
};


export default function FollowUpStatistics() {
    const container = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };
    const headerButtons = (
        <div className="flex gap-2 flex-wrap items-center">
        
            <Button
                className="bg-[#0258E8] border border-blue-800 text-white rounded-full px-4 py-2 flex items-center"
                auto
                aria-label="Apply Filter"
            >
                <FilterIcon className="text-white" size={18} />
                <span>Apply Filter</span>
            </Button>
        </div>
    );
    return (
        <DashboardLayout hasSearchInput={false} title="Statistics - Follow Up" icon={<ChartHistogramIcon className="text-info" 
        
        />}
        additionalContent={headerButtons}

        >

            {/* Header Section with Title and Buttons */}
            <div className="flex justify-between items-center px-8 mb-6">
                <div className="mt-14 text-xl font-semibold text-black dark:text-white">Statistics</div>
                
            </div>

            {/* Statistics Cards */}
            <motion.div initial="hidden" animate="visible" variants={container} className="flex flex-col flex-wrap justify-start px-8 md:flex-row">
                {statistics.map((stat, index) => (
                    <StatsCard
                        useHover={true}
                        icon={React.createElement(stat.icon)}
                        bgColor={stat.bgColor}
                        title={stat.title}
                        key={index}
                        percentage={stat.percentage}
                        total={stat.total}
                    />
                ))}
            </motion.div>

            {/* Title and Inline Table Section */}
            <div className="mt-8 px-8">
                <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">List of Agents</h2>
                <InlineTable columns={tableColumns} data={tableData} rowsPerPage={10} />
            </div>
        </DashboardLayout>
    );
}
