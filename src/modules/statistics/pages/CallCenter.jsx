// CallCenter.jsx

import React, { useState, useEffect } from "react";
import { Calendar03Icon, FilterIcon, ArrowDown01Icon, ChartHistogramIcon } from "hugeicons-react";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import { Button } from "@nextui-org/button";
import CustomModal from "../../stockManagement.jsx/components/modal";
import Calendar from "react-calendar";
import { useNavigate, useLocation } from "react-router-dom"; // Import React Router hooks
import { motion } from "framer-motion"; // Import framer-motion for animations
import "react-calendar/dist/Calendar.css"; // Import the CSS for react-calendar

export default function CallCenter() {
    // State Hooks
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAgents, setSelectedAgents] = useState([]);
    const [selectedDateFilter, setSelectedDateFilter] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    // React Router Hooks
    const navigate = useNavigate();
    const location = useLocation();

    // State for active tab
    const [activeTab, setActiveTab] = useState(null);

    // Determine if dark mode is enabled (replace with your actual dark mode logic)
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            const darkMode = document.documentElement.classList.contains("dark");
            setIsDarkMode(darkMode);
        };

        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    // Update activeTab based on current path
    useEffect(() => {
        if (location.pathname.endsWith("/agents")) {
            setActiveTab("Agents");
        } else if (location.pathname.endsWith("/activities")) {
            setActiveTab("Activities");
        } else if (location.pathname.endsWith("/call-center")) {
            setActiveTab("Call Center");
        } else {
            setActiveTab(null); // No tab selected
        }
    }, [location.pathname]);

    // Example list of agents (replace with your actual data)
    const agents = [
        { id: 1, name: "Agent Smith" },
        { id: 2, name: "Agent Johnson" },
        { id: 3, name: "Agent Brown" },
        { id: 4, name: "Agent Davis" },
        { id: 5, name: "Agent Wilson" },
        // Add more agents as needed
    ];

    // Example list of date filters
    const dateFilters = [
        { value: "today", label: "Today" },
        { value: "yesterday", label: "Yesterday" },
        { value: "last7days", label: "Last 7 Days" },
        { value: "last30days", label: "Last 30 Days" },
        { value: "thisMonth", label: "This Month" },
        { value: "thisYear", label: "This Year" },
    ];

    // Handlers to open and close the modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAgents([]); // Optional: Reset the selected agents when closing
        setSelectedDateFilter(""); // Optional: Reset the date filter when closing
        setFromDate(new Date()); // Reset custom date range
        setToDate(new Date());
    };

    // Handler for agent selection change
    const handleAgentSelect = (e) => {
        const selectedAgentName = e.target.value;
        if (selectedAgentName && !selectedAgents.includes(selectedAgentName)) {
            setSelectedAgents([...selectedAgents, selectedAgentName]);
        }
        // Reset the select input to default
        e.target.value = "";
    };

    // Handler for date filter selection change
    const handleDateFilterSelect = (e) => {
        setSelectedDateFilter(e.target.value);
    };

    // Handler to remove a selected agent (optional)
    const removeAgent = (agentName) => {
        setSelectedAgents(selectedAgents.filter((agent) => agent !== agentName));
    };

    // Header buttons with Apply Filter and Tabs
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

            {/* Agents, Activities, and Call Center Tabs */}
            <div className="flex justify-center gap-0 md:gap-2 my-4 text-sm md:text-[17px] whitespace-nowrap items-center px-4 rounded-full bg-[#0258E810] mx-auto md:mr-16">
            {["Agents", "Activities", "Call Center","Follow Up"].map((tab, idx) => (
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
            title="Statistics - Call Center"
            icon={<ChartHistogramIcon className="text-info shrink-0" />}
            additionalContent={headerButtons}
        >
            {/* Custom Modal for Apply Filter */}
            <CustomModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Filter"
                isDarkMode={isDarkMode}
                width="800px" // Adjust the width as needed
            >
                {/* Filter Form */}
                <form className="flex flex-col gap-6">
                    {/* Select Input for List of Agents */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="agent-select"
                            className="mb-2 font-medium text-sm mt-5 dark:text-[#ffffff50] text-gray-500"
                        >
                            List of Agents
                        </label>
                        <select
                            id="agent-select"
                            onChange={handleAgentSelect}
                            className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent rounded-lg"
                        >
                            <option value="">Choose an agent</option>
                            {agents.map((agent) => (
                                <option key={agent.id} value={agent.name}>
                                    {agent.name}
                                </option>
                            ))}
                        </select>
                        {/* Display Selected Agents' Names directly below the agent select */}
                        {selectedAgents.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedAgents.map((agent, index) => (
                                    <span
                                        key={index}
                                        className="bg-info text-white px-3 py-0.5 rounded-full flex items-center"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => removeAgent(agent)}
                                            className="mr-2 text-white hover:text-gray-200 focus:outline-none"
                                            aria-label={`Remove ${agent}`}
                                        >
                                            &times;
                                        </button>
                                        {agent}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Select Input for Date Filter */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="date-filter-select"
                            className="mb-2 font-medium text-sm dark:text-[#ffffff50] text-gray-500"
                        >
                            Filter by Date
                        </label>
                        <select
                            id="date-filter-select"
                            value={selectedDateFilter}
                            onChange={handleDateFilterSelect}
                            className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent rounded-lg"
                        >
                            <option value="">Select a date range</option>
                            {dateFilters.map((filter) => (
                                <option key={filter.value} value={filter.value}>
                                    {filter.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Separator "Or" */}
                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
                        <span className="mx-2 text-gray-500 dark:text-gray-300">Or</span>
                        <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
                    </div>

                    {/* Custom Date Range Pickers */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* From Date Picker */}
                        <div className="flex flex-col w-full">
                            <label htmlFor="from-date" className="mb-2 font-medium text-sm text-[#ffffff50]">
                                From
                            </label>
                            <Calendar onChange={setFromDate} value={fromDate} className="from-date-calendar" />
                        </div>

                        {/* To Date Picker */}
                        <div className="flex flex-col w-full">
                            <label htmlFor="to-date" className="mb-2 font-medium text-sm text-[#ffffff50]">
                                To
                            </label>
                            <Calendar
                                onChange={setToDate}
                                value={toDate}
                                minDate={fromDate}
                                className="to-date-calendar"
                                tileDisabled={({ date, view }) => {
                                    if (view === "month") {
                                        return date < fromDate;
                                    }
                                    return false;
                                }}
                                tileClassName={({ date, view }) => {
                                    if (view === "month" && date < fromDate) {
                                        return "disabled-date";
                                    }
                                    return null;
                                }}
                            />
                        </div>
                    </div>

                    {/* Apply Filter Button */}
                    <div className="flex justify-center my-8 gap-2">
                        <Button
                            variant="solid"
                            className="rounded-full bg-info px-4 text-white font-bold"
                            onClick={() => {
                                // Handle filter submission
                                console.log("Selected Agents:", selectedAgents);
                                console.log("Selected Date Filter:", selectedDateFilter);
                                console.log("Custom From Date:", fromDate);
                                console.log("Custom To Date:", toDate);

                                // Add your filter logic here
                                if (fromDate && toDate) {
                                    // Validate dates if necessary
                                    if (fromDate > toDate) {
                                        alert('"From" date cannot be later than "To" date.');
                                        return;
                                    }
                                    console.log(
                                        `Filtering from ${fromDate.toLocaleDateString()} to ${toDate.toLocaleDateString()}`
                                    );
                                } else if (selectedDateFilter) {
                                    console.log(`Filtering by ${selectedDateFilter}`);
                                } else {
                                    console.log("No date filter applied");
                                }

                                closeModal();
                            }}
                        >
                            <FilterIcon className="text-white" size={18} />
                            <span>Apply Filter</span>
                        </Button>
                    </div>
                </form>

                {/* Styles for react-calendar */}
                <style jsx>{`
    /* Light Mode Styles */
    .from-date-calendar,
    .to-date-calendar {
        background-color: #ffffff;
        color: #000000;
        border: 1px solid #e5e7eb; /* Tailwind's gray-200 */
        border-radius: 0.5rem; /* Tailwind's rounded-lg */
        width: 100%;
    }

    .react-calendar__navigation {
        background-color: #f3f4f6; /* Tailwind's gray-100 */
        border-bottom: 1px solid #e5e7eb; /* Tailwind's gray-200 */
    }

    .react-calendar__navigation button {
        color: #1f2937; /* Tailwind's gray-800 */
        font-weight: 600; /* Tailwind's font-semibold */
        transition: color 0.3s; /* Smooth transition for hover */
    }


    .react-calendar__month-view__weekdays {
        color: #374151; /* Tailwind's gray-700 */
        font-size: 0.875rem; /* Tailwind's text-sm */
    }

    .react-calendar__tile {
        color: #374151; /* Tailwind's gray-700 */
        font-size: 0.875rem; /* Tailwind's text-sm */
    }

    .react-calendar__tile:hover,
    .react-calendar__tile--active,
    .react-calendar__tile--now {
        background-color: #3b82f6; /* Tailwind's blue-500 */
        color: #ffffff;
        cursor: pointer;
    }

    .react-calendar__tile--active {
        background-color: #2563eb; /* Tailwind's blue-600 */
        color: #ffffff;
    }

    .react-calendar__tile--disabled {
        background-color: #ff0000; /* Red background for disabled dates */
        color: #ffffff;
        cursor: not-allowed;
    }

    .disabled-date {
        background-color: #00000015 !important; /* Red background */
        color: #00000050 !important;
        cursor: not-allowed !important;
    }

    .react-calendar__navigation button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Dark Mode Styles */
    .dark .from-date-calendar,
    .dark .to-date-calendar {
        background-color: #ffffff05; /* Tailwind's gray-800 */
        color: #d1d5db; /* Tailwind's gray-300 */
        border: 1px solid #4b556305; /* Tailwind's gray-600 */
    }

    .dark .react-calendar__navigation {
        background-color: #ffffff10; /* Tailwind's gray-700 */
        border-bottom: 1px solid #4b556305; /* Tailwind's gray-600 */
    }

    .dark .react-calendar__navigation button {
        color: #d1d5db; /* Tailwind's gray-300 */
        font-weight: 600; /* Tailwind's font-semibold */
        transition: color 0.3s; /* Smooth transition for hover */
    }

    /* Hover Effect for Navigation Buttons in Dark Mode */
    .dark .react-calendar__navigation button:hover {
        background-color: #00000005
    }

    .dark .react-calendar__month-view__weekdays {
        color: #d1d5db; /* Tailwind's gray-300 */
        font-size: 0.875rem; /* Tailwind's text-sm */
    }

    .dark .react-calendar__tile {
        color: #d1d5db; /* Tailwind's gray-300 */
        font-size: 0.875rem; /* Tailwind's text-sm */
    }

    .dark .react-calendar__tile:hover,
    .dark .react-calendar__tile--active,
    .dark .react-calendar__tile--now {
        background-color: #3b82f6; /* Tailwind's blue-500 */
        color: #ffffff;
        cursor: pointer;
    }

    .dark .react-calendar__tile--active {
        background-color: #2563eb; /* Tailwind's blue-600 */
        color: #ffffff;
    }

    .dark .react-calendar__tile--disabled {
        background-color: #ff0000; /* Red background for disabled dates in dark mode */
        color: #ffffff;
        cursor: not-allowed;
    }

    .dark .disabled-date {
        background-color: #ffffff30 !important; /* Red background */
        color: #ffffff !important;
        cursor: not-allowed !important;
    }

    .dark .react-calendar__navigation button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Adjust Z-Index if Needed */
    .react-calendar {
        z-index: 1000;
    }

    /* Smooth Transition for Theme Changes */
    .react-calendar,
    .react-calendar__navigation,
    .react-calendar__tile {
        transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    }
`}</style>

            </CustomModal>
        </DashboardLayout>
    );
}
