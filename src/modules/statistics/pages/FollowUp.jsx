// FollowUpStatistics.jsx

import React, { useState, useEffect } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { agentNames } from "../../../core/utils/shared.data";

import {
  Airplane01Icon,
  UserIcon,
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
import { useNavigate, useLocation } from "react-router-dom"; // Import React Router hooks

// Define columns and data for the table
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

// InlineTable component
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
      <table className="min-w-max w-full table-auto">
        <thead>
          {/* First Header Row */}
          <tr className="h-12 text-white">
            <th className="bg-transparent px-4 py-2 text-center text-sm font-semibold whitespace-nowrap"></th>
            <th
              colSpan={2}
              className="dark:bg-[#FFFFFF02] bg-[#00000008] px-4 py-2 text-center text-black dark:text-white text-sm font-semibold whitespace-nowrap"
            >
              Call Center T
            </th>
            <th
              colSpan={2}
              className="dark:bg-[#FFFFFF06] bg-[#00000012] px-4 py-2 text-center text-black dark:text-white text-sm font-semibold whitespace-nowrap"
            >
              Fatima KHADOU
            </th>
          </tr>

          {/* Second Header Row */}
          <tr className="h-10 text-white">
            <th className="px-4 py-2 text-center text-black dark:text-white text-sm font-semibold dark:bg-[#FFFFFF02] bg-[#00000008] whitespace-nowrap">
              List of Agents
            </th>
            <th className="px-4 py-2 text-center text-sm text-black dark:text-white font-semibold dark:bg-[#FFFFFF02] bg-[#00000008] whitespace-nowrap">
              01
            </th>
            <th className="px-4 py-2 text-center text-sm text-black dark:text-white font-semibold dark:bg-[#FFFFFF02] bg-[#00000008] whitespace-nowrap">
              100%
            </th>
            <th className="px-4 py-2 text-center text-sm text-black dark:text-white font-semibold dark:bg-[#FFFFFF06] bg-[#00000012] whitespace-nowrap">
              01
            </th>
            <th className="px-4 py-2 text-center text-sm text-black dark:text-white font-semibold dark:bg-[#FFFFFF06] bg-[#00000012] whitespace-nowrap">
              100%
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Data Rows */}
          {currentData.map((item, index) => (
            <tr key={item.key} className="h-12">
              {/* First Column with Alternating Backgrounds */}
              <td
                className={`px-4 py-2 text-center dark:text-gray-300 text-sm font-semibold whitespace-nowrap ${index % 2 === 0 ? "dark:bg-[#FFFFFF06] bg-[#00000012]" : "dark:bg-[#FFFFFF02] bg-[#00000008]"
                  }`}
              >
                {item.list}
              </td>
              {/* Other Columns with Uniform Background */}
              <td className="px-4 py-2 text-center dark:text-gray-300 text-sm font-semibold dark:bg-[#FFFFFF02] bg-[#00000008] whitespace-nowrap">
                {item.callCenterT.code}
              </td>
              <td className="px-4 py-2 text-center dark:text-gray-300 text-sm font-semibold dark:bg-[#FFFFFF02] bg-[#00000008] whitespace-nowrap">
                {item.callCenterT.percentage}
              </td>
              <td className="px-4 py-2 text-center dark:text-gray-300 text-sm font-semibold dark:bg-[#FFFFFF06] bg-[#00000012] whitespace-nowrap">
                {item.fatimaKhadou.code}
              </td>
              <td className="px-4 py-2 text-center dark:text-gray-300 text-sm font-semibold dark:bg-[#FFFFFF06] bg-[#00000012] whitespace-nowrap">
                {item.fatimaKhadou.percentage}
              </td>
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
            className={`px-3 py-1 text-sm rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-600 dark:text-white"
              }`}
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

export default function FollowUpStatistics() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // React Router Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // State for active tab
  const [activeTab, setActiveTab] = useState("Follow Up"); // Default to "Follow Up"

  useEffect(() => {
    const checkDarkMode = () => {
      const darkMode = document.documentElement.classList.contains("dark");
      setIsDarkMode(darkMode);
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  const [selectedDateRange, setSelectedDateRange] = useState("Today");
  const dateRangeOptions = ["Today", "Yesterday", "Last Week", "Last Month", "This Year"];
  
  // Update activeTab based on current path
  useEffect(() => {
    if (location.pathname.endsWith("/agents")) {
      setActiveTab("Agents");
    } else if (location.pathname.endsWith("/activities")) {
      setActiveTab("Activities");
    } else if (location.pathname.endsWith("/call-center")) {
      setActiveTab("Call Center");
    } else if (location.pathname.endsWith("/follow-up")) {
      setActiveTab("Follow Up");
    } else {
      setActiveTab("Follow Up"); // Default to "Follow Up"
    }
  }, [location.pathname]);

  // Placeholder functions for buttons
  const openModal = () => setIsModalOpen(true);

  // Header Buttons with Tabs
  const headerButtons = (
    <div className="flex flex-col gap-2 lg:flex-row w-full lg:w-auto items-start lg:items-center">
            {/* Apply Filter Button: First on small screens, Last on large screens */}
            <div className="order-1 lg:order-3 flex justify-end mb-2 lg:mb-0 w-full lg:w-auto lg:ml-auto">
                <Button
                    className="bg-[#0258E8] border border-blue-800 text-white rounded-full px-4 py-2 flex items-center w-auto"
                    auto
                    aria-label="Apply Filter"
                    onClick={openModal} // Use onClick instead of onPress
                >
                    <FilterIcon className="text-white" size={18} />
                    <span className="ml-2">Apply Filter</span>
                </Button>
            </div>

            {/* Today and List of Agents Buttons: Second on small screens, First on large screens */}
            <div className="order-2 lg:order-1 flex flex-row justify-end gap-2 w-full lg:w-auto">
            <Dropdown>
    <DropdownTrigger>
        <Button
            variant="bordered"
            className="bg-transparent border border-gray-700 text-black dark:text-white rounded-full px-4 py-2 flex items-center w-auto"
            aria-label="Select Date Range"
        >
            <Calendar03Icon className="text-gray-500 dark:text-gray-300" size={18} />
            <span className="ml-2">{selectedDateRange}</span>
        </Button>
    </DropdownTrigger>
    <DropdownMenu
        aria-label="Select Date Range"
        onAction={(key) => setSelectedDateRange(key)}
    >
        {dateRangeOptions.map((option) => (
            <DropdownItem key={option} keyValue={option}>
                {option}
            </DropdownItem>
        ))}
    </DropdownMenu>
</Dropdown>

                <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="rounded-full text-sm md:text-lg bg-transparent border border-gray-700 text-black dark:text-white rounded-full px-4 py-2 flex items-center w-auto">
                  <Calendar03Icon className="text-gray-500 dark:text-gray-300" size={18} />

                    <h6 className="text-sm md:text-sm">List of Agents</h6> <ArrowDown01Icon size={16} />
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
            </div>

      {/* Agents, Activities, Call Center, Follow Up Tabs */}
      <div className="flex justify-center gap-0 md:gap-2 my-4 text-sm md:text-[17px] whitespace-nowrap items-center px-4 rounded-full bg-[#0258E810] mx-auto md:mr-2">
      {["Agents", "Activities", "Call Center", "Follow Up"].map((tab, idx) => (
          <motion.div
            whileTap={{ scale: 0.9 }}
            key={idx}
            className={`flex justify-center items-center p-2 cursor-pointer ${
              activeTab === tab
                ? "font-bold text-[#0258E8]"
                : "font-normal text-black dark:text-white"
            }`}
            onClick={() => {
              setActiveTab(tab);
              if (tab === "Agents") {
                navigate("/statistics/agents");
              } else if (tab === "Activities") {
                navigate("/statistics/agents/activities");
              } else if (tab === "Call Center") {
                navigate("/statistics/agents/call-center");
              } else if (tab === "Follow Up") {
                navigate("/statistics/agents/follow-up");
              }
            }}
            aria-label={`${tab} Tab`}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActiveTab(tab);
                if (tab === "Agents") {
                  navigate("/statistics/agents");
                } else if (tab === "Activities") {
                  navigate("/statistics/agents/activities");
                } else if (tab === "Call Center") {
                  navigate("/statistics/agents/call-center");
                } else if (tab === "Follow Up") {
                  navigate("/statistics/agents/follow-up");
                }
              }
            }}
          >
            {tab}
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <DashboardLayout
      hasSearchInput={false}
      title="Statistics - Follow Up"
      icon={<ChartHistogramIcon className="text-info shrink-0" />}
      additionalContent={headerButtons} // Include headerButtons here
    >
      {/* Header Section with Title */}
      <div className="mt-1 px-8">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Statistics</h2>
      </div>

      {/* Statistics Cards */}
      <div className="flex flex-wrap justify-start px-2 md:px-8">
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

      {/* Title and Inline Table Section */}
      <div className="mt-8 px-8">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">List of Agents</h2>
        <InlineTable columns={tableColumns} data={tableData} rowsPerPage={10} />
      </div>
    </DashboardLayout>
  );
}