// Funds.jsx
import React, { useState, useEffect } from "react";
import {
  ArrowDown01Icon,
  ArrowUpDownIcon,
  Calendar03Icon,
  ChartHistogramIcon,
  Delete01Icon,
  DollarCircleIcon,
  FilterIcon,
  PaymentSuccess02Icon,
  DeliveryTruck02Icon,
  PackageDeliveredIcon,
  DeliveryReturn01Icon,
} from "hugeicons-react";
import { motion } from "framer-motion";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import FundsCard from "../components/FundsCard";
import { Button } from "@nextui-org/button";
import CustomModal from "../../stockManagement.jsx/components/modal"; // Adjust the path as necessary

const salesData = [
  {
    key: 1,
    title: "Total Income",
    percentage: "7273,86 USD",
    total: "150 orders",
    icon: DollarCircleIcon,
    bgColor: "bg-[#4A5E5E40]",
  },
  {
    key: 2,
    title: "Total Confirmed",
    percentage: "5192,08 USD",
    total: "101 orders",
    icon: PaymentSuccess02Icon,
    bgColor: "bg-[#3E7C15]",
  },
  {
    key: 3,
    title: "In transit",
    percentage: "3757,36 USD",
    total: "75 orders",
    icon: DeliveryTruck02Icon,
    bgColor: "bg-[#4A5E5E40]",
  },
  {
    key: 4,
    title: "Total Delivered",
    percentage: "1434,72 USD",
    total: "50 orders",
    icon: PackageDeliveredIcon,
    bgColor: "bg-[#0057FF30]",
  },
];

const feesData = [
  {
    key: 1,
    title: "Call confirmation test",
    percentage: "7273,82 USD",
    total: "150 orders",
    icon: DollarCircleIcon,
    bgColor: "bg-[#4A5E5E40]",
  },
  {
    key: 2,
    title: "Upsell fees",
    percentage: "5192,08 USD",
    total: "101 orders",
    icon: PaymentSuccess02Icon,
    bgColor: "bg-[#3E7C15]",
  },
  {
    key: 3,
    title: "Shipping & Fulfillment fees",
    percentage: "3757,36 USD",
    total: "75 orders",
    icon: DeliveryTruck02Icon,
    bgColor: "bg-[#4A5E5E40]",
  },
  {
    key: 4,
    title: "Return fees",
    percentage: "3757,36 USD",
    total: "75 orders",
    icon: DeliveryReturn01Icon,
    bgColor: "bg-[#4A5E5E40]",
  },
  {
    key: 5,
    title: "COD fees",
    percentage: "3757,36 USD",
    total: "75 orders",
    icon: DeliveryReturn01Icon,
    bgColor: "bg-[#4A5E5E40]",
  },
  {
    key: 6,
    title: "VAT",
    percentage: "3757,36 USD",
    total: "75 orders",
    icon: DollarCircleIcon,
    bgColor: "bg-[#4A5E5E40]",
  },
];

const profitsData = [
  {
    key: 1,
    title: "Total profit",
    percentage: "7273,86 USD",
    icon: DollarCircleIcon,
    bgColor: "bg-[#4A5E5E40]",
  },
  {
    key: 2,
    title: "Already paid",
    percentage: "5192,86 USD",
    icon: PaymentSuccess02Icon,
    bgColor: "bg-[#3E7C15]",
  },
  {
    key: 3,
    title: "Unpaid",
    percentage: "3757,86 USD",
    icon: DeliveryTruck02Icon,
    bgColor: "bg-[#4A5E5E40]",
  },
  {
    key: 4,
    title: "Next remittance",
    percentage: "1434,86 USD",
    icon: PackageDeliveredIcon,
    bgColor: "bg-[#0057FF30]",
  },
];

export default function Funds() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Adjust based on your theme management

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    agent: "",
    product: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilter = () => {
    // Implement your filter logic here using the `filters` state
    console.log("Filters applied:", filters);
    closeModal();
  };

  const handleClearAll = () => {
    // Reset the filter state
    setFilters({
      from: "",
      to: "",
      agent: "",
      product: "",
    });
    console.log("All filters cleared.");
  };

  const agents = []; // Populate with your agents data
  const products = []; // Populate with your products data

  // Header Buttons
  const headerButtons = (
    <div className="flex flex-col gap-2 lg:flex-row w-full items-start lg:items-center lg:justify-end ">
      {/* Apply Filter Button */}
      <div className="order-1 lg:order-3 flex justify-end w-full mr-3 lg:w-auto pr-0">
        <Button
          className="bg-[#0258E8] border border-blue-800 text-white rounded-full px-4 py-2 flex items-center"
          auto
          aria-label="Apply Filter"
          onClick={openModal}
        >
          <FilterIcon className="text-white" size={18} />
          <span className="ml-2">Apply Filter</span>
        </Button>
      </div>

      {/* Today and List of Agents Buttons */}
      <div className="order-2 lg:order-1 flex flex-row justify-end gap-2 w-full lg:w-auto">
        <Button
          className="bg-transparent border border-gray-700 text-black dark:text-white rounded-full px-4 py-2 flex items-center"
          auto
          aria-label="Select Today"
        >
          <Calendar03Icon className="text-gray-500 dark:text-gray-300" size={18} />
          <span className="ml-2">Today</span>
        </Button>
        <Button
          className="bg-transparent border border-gray-700 text-black dark:text-white rounded-full px-4 py-2 flex items-center"
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
      title="Statistics - Funds"
      icon={<ChartHistogramIcon className="text-info" />}
    >
      {/* Include headerButtons here */}
      {headerButtons}

      {/* Modal Integration */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Filter properties"
        isDarkMode={isDarkMode}
      >
        {/* Modal Content */}
        <div className="flex flex-col space-y-4">
          {/* Sort By Section */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Sort by</span>
            <ArrowUpDownIcon
              className="dark:text-[#FFFFFF80] text-[#00000070]"
              size={18}
            />
          </div>

          {/* Dropdown 1: From */}
          <div className="flex items-center space-x-2">
            <label htmlFor="from" className="text-sm font-medium">
              From
            </label>
            <select
              id="from"
              name="from"
              value={filters.from}
              onChange={handleChange}
              className="flex-1 p-2 bg-transparent border-none rounded focus:outline-none"
            >
              {/* Populate with relevant date options or other options */}
            </select>
          </div>

          {/* Dropdown 2: To */}
          <div className="flex items-center space-x-2">
            <label htmlFor="to" className="text-sm font-medium">
              To
            </label>
            <select
              id="to"
              name="to"
              value={filters.to}
              onChange={handleChange}
              className="flex-1 p-2 bg-transparent border-none rounded focus:outline-none"
            >
              {/* Populate with relevant date options or other options */}
            </select>
          </div>

          {/* Dropdown 3: List of Agents */}
          <div className="flex items-center space-x-2">
            <label htmlFor="agent" className="text-sm font-medium">
              List of Agents
            </label>
            <select
              id="agent"
              name="agent"
              value={filters.agent}
              onChange={handleChange}
              className="flex-1 p-2 bg-transparent border-none rounded focus:outline-none"
            >
              {agents.map((agent, index) => (
                <option key={index} value={agent}>
                  {agent}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown 4: List of Products */}
          <div className="flex items-center space-x-2">
            <label htmlFor="product" className="text-sm font-medium">
              List of Products
            </label>
            <select
              id="product"
              name="product"
              value={filters.product}
              onChange={handleChange}
              className="flex-1 p-2 bg-transparent border-none rounded focus:outline-none"
            >
              {products.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Selected and Total Filtered Info */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-black dark:text-white">3 selected</p>
            <p className="text-sm dark:text-[#FFFFFF50] text-[#00000090]">
              12 Total Filtered
            </p>
          </div>

          {/* Apply Filter and Clear All Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="w-full sm:w-auto bg-[#00000010] dark:bg-[#FFFFFF25] border border-transparent text-[#00000080] dark:text-[#FFFFFF80] rounded-full px-4 py-2 flex items-center"
              onClick={handleApplyFilter}
              isDisabled
              auto
            >
              <FilterIcon
                className="text-[#00000080] dark:text-[#FFFFFF80] mr-2"
                size={18}
              />
              Apply Filter
            </Button>
            <Button
              className="w-full sm:w-auto bg-[#ED0006] border border-transparent text-white rounded-full px-4 py-2 flex items-center"
              onClick={handleClearAll}
              auto
            >
              <Delete01Icon className="text-white mr-2" size={18} />
              Clear All
            </Button>
          </div>
        </div>
      </CustomModal>

      {/* Sales Section */}
      <h2 className="text-xl font-bold px-2 md:px-8 mb-4 ml-2 mt-10">Sales</h2>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-2 md:px-8"
      >
        {salesData.map((stat, index) => (
          <FundsCard
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

      {/* Fees Section */}
      <h2 className="text-xl font-bold px-2 md:px-8 mt-8 mb-4 ml-2">Fees</h2>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 md:px-8"
      >
        {feesData.map((stat) => (
          <motion.div
            key={stat.key}
            className="p-6 hover:bg-dark_selected_hover rounded-lg m-2 shadow-sm border border-gray-200 dark:border-gray-800"
          >
            <div className="flex justify-start gap-2 items-center mb-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${stat.bgColor}`}
              >
                <span className="text-black dark:text-white text-2xl">
                  {React.createElement(stat.icon)}
                </span>
              </div>
              <p className="text-[18px] font-semibold text-gray-900 dark:text-gray-100">
                {stat.title}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                {stat.percentage}
              </p>
              <div className="text-sm rounded-full bg-light_opacity dark:bg-dark_opacity text-black dark:text-white font-bold px-4 py-1">
                {stat.total}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Profits Section */}
      <h2 className="text-xl font-bold px-2 md:px-8 mt-8 mb-4 ml-2">Profits</h2>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-2 md:px-8"
      >
        {profitsData.map((stat) => (
          <motion.div
            key={stat.key}
            className="p-6 hover:bg-dark_selected_hover rounded-lg m-2 shadow-sm border border-gray-200 dark:border-gray-800"
          >
            <div className="flex justify-start gap-2 items-center mb-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${stat.bgColor}`}
              >
                <span className="text-black dark:text-white text-2xl">
                  {React.createElement(stat.icon)}
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {stat.title}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                {stat.percentage}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </DashboardLayout>
  );
}
