// Activities.jsx

import React, { useState } from "react";
import CallsCard from "@/modules/dashboard/components/CallsCard.jsx";
import GaugeChart from "@/modules/dashboard/components/GaugeChart.jsx";
import LineChartCard from "@/modules/dashboard/components/LineChartCard.jsx";
import ShippingCard from "@/modules/dashboard/components/ShippingCard.jsx";
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

// Define columns and data for the table
const tableColumns = [
    { key: "list", label: "List 01" },
    { key: "code", label: "01" },
    { key: "percentage", label: "100%" },
];

const tableData = [
    { key: 1, list: "List 01", code: "01", percentage: "100%" },
    { key: 2, list: "List 01", code: "01", percentage: "100%" },
    { key: 3, list: "List 01", code: "01", percentage: "100%" },
    { key: 4, list: "List 01", code: "01", percentage: "100%" },
    { key: 5, list: "List 01", code: "01", percentage: "100%" },
    { key: 6, list: "List 01", code: "01", percentage: "100%" },
    { key: 7, list: "List 01", code: "01", percentage: "100%" },
    { key: 8, list: "List 01", code: "01", percentage: "100%" },
    { key: 9, list: "List 01", code: "01", percentage: "100%" },
    { key: 10, list: "List 01", code: "01", percentage: "100%" },
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
                <tbody>
                    {/* Top Row */}
                    <tr className="h-12 rounded-3xl">
                        <td className="px-1 py-2 text-center text-sm font-semibold dark:text-gray-300" colSpan={1}></td>
                        <td className="px-1 py-2 text-center text-sm font-semibold dark:text-gray-300 bg-[#00000015] dark:bg-[#FFFFFF05]" colSpan={2}>
                            Newton
                        </td>
                    </tr>

                    {/* Data Rows */}
                    {currentData.map((item, index) => (
                        <tr
                            key={item.key}
                            className={`${index % 2 === 0 ? "bg-white dark:bg-[#FFFFFF10]" : "bg-gray-200 dark:bg-[#FFFFFF08]"
                                } h-12 rounded-3xl`}
                        >
                            {columns.map((column) => (
                                <td key={column.key} className="px-1 py-2 text-center dark:text-gray-300 text-sm font-semibold">
                                    {item[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center my-4 space-x-2">
                <button
                    className="px-3 py-1 bg-gray-200 dark:bg-[#1a1a1a] dark:text-white rounded flex items-center space-x-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="px-3 py-1 bg-gray-200 dark:bg-[#1a1a1a] dark:text-white rounded flex items-center space-x-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <span>Next</span> <ArrowRight01Icon size={12} />
                </button>
            </div>
        </div>
    );
};

export default function Activities() {
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

    // Updated headerButtons with reordered buttons
    const headerButtons = (
        <div className="flex flex-col gap-2 lg:flex-row w-full lg:w-auto items-start lg:items-center">
            {/* Apply Filter Button: First on small screens, Last on large screens */}
            <div className="order-1  lg:order-3 flex justify-end mb-2 lg:mb-0 w-full lg:w-auto lg:ml-auto">
                <Button
                    className="bg-[#0258E8] border border-blue-800 text-white rounded-full px-4 py-2 flex items-center w-auto"
                    auto
                    aria-label="Apply Filter"
                >
                    <FilterIcon className="text-white" size={18} />
                    <span className="ml-2">Apply Filter</span>
                </Button>
            </div>

            {/* Today and List of Agents Buttons: Second on small screens, First on large screens */}
            <div className="order-2 lg:order-1 flex flex-row justify-end gap-2 w-full lg:w-auto">
                <Button
                    className="bg-transparent border border-gray-700 text-black dark:text-white rounded-full px-4 py-2 flex items-center w-auto"
                    auto
                    aria-label="Select Today"
                >
                    <Calendar03Icon className="text-gray-500 dark:text-gray-300" size={18} />
                    <span className="ml-2">Today</span>
                </Button>
                <Button
                    className="bg-transparent border border-gray-700 text-black dark:text-white rounded-full px-4 py-2 flex items-center w-auto"
                    auto
                    aria-label="List of Agents"
                >
                    <Calendar03Icon className="text-gray-500 dark:text-gray-300" size={18} />
                    <span className="ml-2">List of Agents</span>
                    <ArrowDown01Icon className="ml-1 text-black dark:text-white" size={18} />
                </Button>
            </div>
        </div>
    );

    return (
        <DashboardLayout
            hasSearchInput={false}
            title="Statistics - Activities"
            icon={<ChartHistogramIcon className="text-info" />}
            additionalContent={headerButtons}
        >

           <div className="mt-14 px-2 md:px-8">
                <h2 className="text-xl font-semibold mb-4 text-black dark:text-white ml-4">Activities</h2>
                <div initial="hidden" animate="visible" variants={container} className="flex flex-wrap justify-start px-2 md:px-8">

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

                </div>

            </div>

            {/* Title and Inline Table Section */}
            <div className="mt-8 px-2 md:px-8">
                <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">List of Agents</h2>
                <InlineTable columns={tableColumns} data={tableData} rowsPerPage={10} />
            </div>
        </DashboardLayout>
    );
}
