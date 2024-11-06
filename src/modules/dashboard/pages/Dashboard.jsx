import React, { useState, useEffect } from "react";
import {
  Airplane01Icon,
  ArrowTurnBackwardIcon,
  BoxingBagIcon,
  CallDone02Icon,
  CallEnd01Icon,
  CancelCircleIcon,
  Configuration01Icon,
  CustomerSupportIcon,
  DeliveryBox01Icon,
  DeliveryReturn01Icon,
  DeliveryTruck02Icon,
  HeadsetIcon,
  Home01Icon,
  PackageDeliveredIcon,
  RepeatIcon,
  ShippingTruck01Icon,
  ShoppingBasket03Icon,
  ShoppingBasketCheckIn02Icon,
  ShoppingBasketDone03Icon,
  ShoppingCart01Icon,
  TaskDone01Icon,
  TimeSetting03Icon,
  TruckIcon,
  Search01Icon,
  FilterIcon,
  CommandIcon,
} from "hugeicons-react";
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Code } from '@nextui-org/code';
import { Select, SelectItem } from '@nextui-org/select';
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import { motion } from "framer-motion";
import GaugeChart from "@/modules/dashboard/components/GaugeChart.jsx";
import LineChartCard from "@/modules/dashboard/components/LineChartCard.jsx";
import ShippingCard from "@/modules/dashboard/components/ShippingCard.jsx";
import StatsCard from "@/modules/dashboard/components/StatsCard.jsx";
import CallsCard from "../components/CallsCard";
import FilterModal from "../components/FilterModal";
import CustomModal from "../../stockManagement.jsx/components/modal"; // Import your CustomModal component

const dataCards = [
  {
    title: "Total Net",
    amount: 130293,
    icon: TruckIcon, // replace with the appropriate icon component or class
    backgroundColor: "#007AFF",
    textColor: "#FFFFFF",
    change: {
      value: 7.9,
      direction: "up",
      textColor: "#007AFF",
      bgcolor: "#007AFF30",
    },
    subInfo: 23982
  },
  {
    title: "Total Confirmed",
    amount: 130293,
    icon: HeadsetIcon, // replace with the appropriate icon component or class
    backgroundColor: "#00C853",
    textColor: "#FFFFFF",
    change: {
      value: 7.9,
      direction: "down",
      textColor: "#FF6D00",
      bgcolor: "#FF6D0020",
    },
    subInfo: 23982
  },
  {
    title: "Total Delivered",
    amount: 130293,
    icon: Airplane01Icon, // replace with the appropriate icon component or class
    backgroundColor: "#FFD60030",
    textColor: "#FFD600",
    change: {
      value: 7.9,
      direction: "up",
      textColor: "#00C853",
      bgcolor: "#00C85330",
    },
    subInfo: 23982
  },
  {
    title: "Total Remitted",
    amount: 130293,
    icon: TruckIcon, // replace with the appropriate icon component or class
    backgroundColor: "#00C853",
    textColor: "#FFFFFF",
    change: {
      value: 7.9,
      direction: "up",
      textColor: "#00C853",
      bgcolor: "#00C85330",
    },
    subInfo: 23982
  }
];
const callCenterItems = [
  {
    key: 1,
    title: "Totals Leads",
    percentage: 100,
    total: 1927,
    icon: ShoppingBasket03Icon,
    bgColor: "bg-blue-500",
  },
  {
    key: 2,
    title: "Real Leads",
    percentage: 95,
    total: 1820,
    icon: ShoppingBasketDone03Icon,
    bgColor: "bg-green-500",
  },
  {
    key: 3,
    title: "New Leads",
    percentage: 40,
    total: 770,
    icon: ShoppingCart01Icon,
    bgColor: "bg-yellow-500",
  },
  {
    key: 4,
    title: "Test",
    percentage: 5,
    total: 95,
    icon: Configuration01Icon,
    bgColor: "bg-red-500",
  },
  {
    key: 5,
    title: "Upsell",
    percentage: 20,
    total: 385,
    icon: ShoppingBasketCheckIn02Icon,
    bgColor: "bg-purple-500",
  },
  {
    key: 6,
    title: "No Answer",
    percentage: 10,
    total: 193,
    icon: CallEnd01Icon,
    bgColor: "bg-gray-500",
  },
  {
    key: 7,
    title: "Cancels",
    percentage: 8,
    total: 154,
    icon: CancelCircleIcon,
    bgColor: "bg-pink-500",
  },
  {
    key: 8,
    title: "Scheduled",
    percentage: 30,
    total: 578,
    icon: TimeSetting03Icon,
    bgColor: "bg-teal-500",
  },
  {
    key: 9,
    title: "Wrong Phones",
    percentage: 3,
    total: 58,
    icon: CallEnd01Icon,
    bgColor: "bg-indigo-500",
  },
  {
    key: 10,
    title: "Double Order",
    percentage: 1,
    total: 19,
    icon: ShoppingBasket03Icon,
    bgColor: "bg-orange-500",
  },
  {
    key: 11,
    title: "Returns",
    percentage: 7,
    total: 135,
    icon: DeliveryReturn01Icon,
    bgColor: "bg-rose-500",
  },
  {
    key: 12,
    title: "In Transit",
    percentage: 25,
    total: 481,
    icon: DeliveryTruck02Icon,
    bgColor: "bg-cyan-500",
  },
  {
    key: 13,
    title: "Confirmed",
    percentage: 85,
    total: 1638,
    icon: CallDone02Icon,
    bgColor: "bg-lime-500",
  },
  {
    key: 14,
    title: "Delivered",
    percentage: 90,
    total: 1734,
    icon: TaskDone01Icon,
    bgColor: "bg-emerald-500",
  },
  {
    key: 15,
    title: "Shipped",
    percentage: 65,
    total: 1252,
    icon: PackageDeliveredIcon,
    bgColor: "bg-fuchsia-500",
  },
];

const shipping = [
  {
    title: "Shipped",
    amount: 13293,
    icon: TruckIcon, // replace with the appropriate icon component or class
    backgroundColor: "#026712",
    textColor: "#FFFFFF",
    percentage: 32,
  },
  {
    title: "In Transit",
    amount: 13293,
    icon: Airplane01Icon, // replace with the appropriate icon component or class
    backgroundColor: "#FFD60030",
    textColor: "#FFD600",
    percentage: 32,
  },
  {
    title: "Delivered",
    amount: 13293,
    icon: DeliveryBox01Icon, // replace with the appropriate icon component or class
    backgroundColor: "#007AFF30",
    textColor: "#007AFF",
    percentage: 32,
  },
  {
    title: "Return",
    amount: 13293,


    icon: ArrowTurnBackwardIcon, // replace with the appropriate icon component or class
    backgroundColor: "#ff040430",
    textColor: "#ff04049c",
    percentage: 32,
  },
];

export default function Dashboard() {
  // State variables for modals
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // State variables for search inputs
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Original data arrays (already defined)
  // ...

  // State variables for filtered data
  const [filteredDataCards, setFilteredDataCards] = useState(dataCards);
  const [filteredCallCenterItems, setFilteredCallCenterItems] = useState(callCenterItems);
  const [filteredShipping, setFilteredShipping] = useState(shipping);

  // Date Range Options
  const dateRangeOptions = [
    { key: 'Today', label: 'Today' },
    { key: 'This Week', label: 'This Week' },
    { key: 'This Month', label: 'This Month' },
    { key: 'Last Month', label: 'Last Month' },
    // Add more as needed
  ];

  // Status Options
  const statusOptions = [
    { key: 'All', label: 'All' },
    { key: 'Active', label: 'Active' },
    { key: 'Inactive', label: 'Inactive' },
    // Add more as needed
  ];

  // Effect to handle dark mode detection
  useEffect(() => {
    const checkDarkMode = () => {
      const darkMode = document.documentElement.classList.contains('dark');
      setIsDarkMode(darkMode);
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  // Handle Ctrl+K to open the search modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [1, 3, 3, 2.5, 2.5, 2, 4, 4, 3, 3, 2, 4],
  };

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

  const handleSearch = (e) => {
    e.preventDefault();

    // Implement your filtering logic here based on selectedDateRange and selectedStatus

    // For demonstration, we'll just reset the data
    setFilteredDataCards(dataCards);
    setFilteredCallCenterItems(callCenterItems);
    setFilteredShipping(shipping);

    setIsSearchModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedDateRange('');
    setSelectedStatus('');
    setFilteredDataCards(dataCards);
    setFilteredCallCenterItems(callCenterItems);
    setFilteredShipping(shipping);
    setIsSearchModalOpen(false);
  };

  return (
    <>
      <DashboardLayout
        title="Dashboard"
        icon={<Home01Icon className="text-info" />}
        filterModalComponent={<FilterModal />}
      >
        {/* Small Screen: Search and Filter Icons on Top */}
        <div className="flex space-x-2 justify-center mb-4">
          <div className="flex space-x-2 md:hidden mb-4">
            <Input
              className="w-full"
              placeholder="Search"
              classNames={{
                inputWrapper: 'bg-gray-100 dark:bg-neutral-800 rounded-full',
              }}
              endContent={
                <Code className="flex flex-row justify-center pl-0">
                  &nbsp; <CommandIcon className="mr-1" size={16} /> + k
                </Code>
              }
              startContent={<Search01Icon size={24} />}
            />

            <Button
              isIconOnly
              className="dark:text-white text-black rounded-full bg-gray-100 dark:bg-neutral-800"
              onClick={() => setIsFilterModalOpen(true)} // Open FilterModal on click
            >
              <FilterIcon size={18} />
            </Button>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 mx-2 md:mx-4 lg:mx-8"
        >
          {filteredDataCards.map((item, index) => (
            <StatsCard key={index} item={item} />
          ))}
        </motion.div>

        <div className="flex flex-row flex-wrap items-start justify-start p-2 md:px-8">
          <LineChartCard
            title="Product Delivery"
            data={chartData}
            percentChange={7.9}
            timeRange="Last Month"
          />

          <GaugeChart
            type="semi"
            value={50}
            size={200}
            min={0}
            max={100}
            arcWidth={10}
            arcs={[{ color: '#22c55e', limit: 50 }]}
          />
        </div>

        <div className="mx-2 md:mx-4 lg:mx-8">
          <h3 className="my-6 text-xl font-bold">Call Center</h3>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 gap-1 lg:gap-2"
          >
            {filteredCallCenterItems.map((i, index) => (
              <CallsCard
                key={index}
                icon={React.createElement(i.icon, { size: 22 })}
                cardBg="bg-info"
                percentage={i.percentage}
                amount={i.total}
                title={i.title}
                bgColor={i.bgColor}
              />
            ))}
          </motion.div>
        </div>

        <div className="mx-2 md:mx-4 lg:mx-8">
          <h3 className="my-6 text-xl font-bold">Shipping</h3>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-1 lg:gap-2">
            {filteredShipping.map((i, index) => (
              <ShippingCard
                key={index}
                icon={React.createElement(i.icon, { size: 22 })}
                percentage={i.percentage}
                amount={i.amount}
                title={i.title}
                bgColor={i.backgroundColor}
                textColor={i.textColor}
              />
            ))}
          </div>
        </div>
      </DashboardLayout>

      {/* Render the Search Modal */}
      <CustomModal
        isOpen={isSearchModalOpen}
        onClose={handleCancel}
        title="Search"
        isDarkMode={isDarkMode}
        width="600px"
      >
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Date Range Select */}
          <div className="w-full">
            <label htmlFor="date-range" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Date Range</span>
            </label>
            <Select
              selectedKeys={selectedDateRange ? [selectedDateRange] : []}
              id="date-range"
              placeholder="Select Date Range"
              labelPlacement="outside"
              classNames={{
                value: 'dark:!text-[#ffffff85] !text-[#00000085]',
                trigger:
                  'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
              }}
              onSelectionChange={(keys) => setSelectedDateRange(keys.currentKey)}
            >
              {dateRangeOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Status Select */}
          <div className="w-full">
            <label htmlFor="status" className="block mb-1">
              <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Status</span>
            </label>
            <Select
              selectedKeys={selectedStatus ? [selectedStatus] : []}
              id="status"
              placeholder="All"
              labelPlacement="outside"
              classNames={{
                value: 'dark:!text-[#ffffff85] !text-[#00000085]',
                trigger:
                  'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
              }}
              onSelectionChange={(keys) => setSelectedStatus(keys.currentKey)}
            >
              {statusOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-center space-x-4 rounded-full">
            <Button type="submit" color="primary" className="rounded-full">
              Search Now
            </Button>
            <Button
              type="button"
              color="default"
              variant="flat"
              className="rounded-full bg-transparent border border-black dark:border-white text-black dark:text-white hover:bg-transparent"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CustomModal>


      <FilterModal
        id="filter-modal"
        modalOpen={isFilterModalOpen}
        setModalOpen={setIsFilterModalOpen}
      />
    </>
  );
}
