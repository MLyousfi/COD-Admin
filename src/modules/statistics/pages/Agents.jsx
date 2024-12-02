// Agents.jsx

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { agentNames } from "../../../core/utils/shared.data";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import {
    ArrowUpDownIcon,
    PencilEdit01Icon,
    UserIcon,
    PrinterIcon,
    ChartHistogramIcon,
    Download01Icon,
    CustomerSupportIcon,
    CallOutgoing01Icon,
    DropboxIcon,
    Settings02Icon,
    ArrowDown01Icon,
    FilterIcon,
    Calendar03Icon,
    ArrowRight01Icon
} from "hugeicons-react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import Table from "../../shared/components/Table";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import StatusTabs from "../../shared/components/StatusTabs";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion"; // Ensure framer-motion is installed
import { div } from "framer-motion/client";

// Sample Agents List
const agentsList = [
    { id: 1, name: "Mariam Babia", latestActivity: "09/09/2024 15:38" },
    { id: 2, name: "Ahmed Al-Sayed", latestActivity: "10/09/2024 12:20" },
    { id: 3, name: "Sara Ahmed", latestActivity: "11/09/2024 09:15" },
    { id: 4, name: "Omar Khaled", latestActivity: "12/09/2024 14:50" },
    { id: 5, name: "Lina Farouk", latestActivity: "13/09/2024 16:45" },
    { id: 6, name: "Tarek Mansour", latestActivity: "14/09/2024 11:30" },
    { id: 7, name: "Nadia Mostafa", latestActivity: "15/09/2024 10:05" },
    { id: 8, name: "Youssef Hassan", latestActivity: "16/09/2024 13:25" },
    { id: 9, name: "Mariam Babia", latestActivity: "09/09/2024 15:38" },
    { id: 10, name: "Ahmed Al-Sayed", latestActivity: "10/09/2024 12:20" },
    { id: 11, name: "Lina Farouk", latestActivity: "13/09/2024 16:45" },
    { id: 12, name: "Tarek Mansour", latestActivity: "14/09/2024 11:30" },
    { id: 13, name: "Nadia Mostafa", latestActivity: "15/09/2024 10:05" },
    { id: 14, name: "Youssef Hassan", latestActivity: "16/09/2024 13:25" },
    { id: 15, name: "Mariam Babia", latestActivity: "09/09/2024 15:38" },
    { id: 16, name: "Ahmed Al-Sayed", latestActivity: "10/09/2024 12:20" },
    { id: 17, name: "Youssef Hassan", latestActivity: "16/09/2024 13:25" },
    { id: 18, name: "Mariam Babia", latestActivity: "09/09/2024 15:38" },
    { id: 19, name: "Ahmed Al-Sayed", latestActivity: "10/09/2024 12:20" },
    { id: 20, name: "Lina Farouk", latestActivity: "13/09/2024 16:45" },
    { id: 21, name: "Tarek Mansour", latestActivity: "14/09/2024 11:30" },
    { id: 22, name: "Nadia Mostafa", latestActivity: "15/09/2024 10:05" },
    { id: 23, name: "Youssef Hassan", latestActivity: "16/09/2024 13:25" },
    { id: 24, name: "Mariam Babia", latestActivity: "09/09/2024 15:38" },
];

// Sample Rows Data
const rows = [
    { key: 1, num: "WS282726", date: "09/09/2024", oldStatut: "No Answer", statut: "No Answer", addedBy: "BBBBBBBBBB" },
    { key: 2, num: "WS282727", date: "10/09/2024", oldStatut: "Pending", statut: "Resolved", addedBy: "CCCCCCCCCC" },
    { key: 3, num: "WS282728", date: "11/09/2024", oldStatut: "In Progress", statut: "Completed", addedBy: "DDDDDDDDDD" },
    { key: 4, num: "WS282729", date: "12/09/2024", oldStatut: "On Hold", statut: "No Answer", addedBy: "EEEEEEEEEE" },
    { key: 5, num: "WS282730", date: "13/09/2024", oldStatut: "Resolved", statut: "Closed", addedBy: "FFFFFFFFFF" },
    { key: 6, num: "WS282731", date: "14/09/2024", oldStatut: "No Answer", statut: "Pending", addedBy: "GGGGGGGGGG" },
    { key: 7, num: "WS282732", date: "15/09/2024", oldStatut: "Completed", statut: "Resolved", addedBy: "HHHHHHHHHH" },
    { key: 8, num: "WS282733", date: "16/09/2024", oldStatut: "Pending", statut: "In Progress", addedBy: "IIIIIIIIII" },
    { key: 9, num: "WS282734", date: "17/09/2024", oldStatut: "No Answer", statut: "On Hold", addedBy: "JJJJJJJJJJ" },
    { key: 10, num: "WS282735", date: "18/09/2024", oldStatut: "In Progress", statut: "Completed", addedBy: "KKKKKKKKKK" },
    { key: 11, num: "WS282736", date: "19/09/2024", oldStatut: "Closed", statut: "Resolved", addedBy: "LLLLLLLLLL" },
    { key: 12, num: "WS282737", date: "20/09/2024", oldStatut: "Resolved", statut: "Closed", addedBy: "MMMMMMMMMM" },
    { key: 13, num: "WS282738", date: "21/09/2024", oldStatut: "Pending", statut: "No Answer", addedBy: "NNNNNNNNNN" },
    { key: 14, num: "WS282739", date: "22/09/2024", oldStatut: "On Hold", statut: "In Progress", addedBy: "OOOOOOOOOO" },
    { key: 15, num: "WS282740", date: "23/09/2024", oldStatut: "No Answer", statut: "Pending", addedBy: "PPPPPPPPPP" },
    { key: 16, num: "WS282741", date: "24/09/2024", oldStatut: "Completed", statut: "Resolved", addedBy: "QQQQQQQQQQ" },
    { key: 17, num: "WS282742", date: "25/09/2024", oldStatut: "Resolved", statut: "Closed", addedBy: "RRRRRRRRRR" },
    { key: 18, num: "WS282743", date: "26/09/2024", oldStatut: "In Progress", statut: "On Hold", addedBy: "SSSSSSSSSS" },
    { key: 19, num: "WS282744", date: "27/09/2024", oldStatut: "Pending", statut: "Completed", addedBy: "TTTTTTTTTT" },
    { key: 20, num: "WS282745", date: "28/09/2024", oldStatut: "No Answer", statut: "Resolved", addedBy: "UUUUUUUUUU" },
];

// AgentCard Component
const AgentCard = ({ name, latestActivity }) => {
    return (
      <div className="flex items-center justify-between px-4 py-2 dark:bg-[#FFFFFF07] bg-[#00000010] rounded-full md:w-[320px] w-[245px]">
        <div className="flex items-center">
          <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
          <div className="md:ml-5">
            <p className=" dark:text-white font-medium  ">{name}</p>
            <p className=" dark:text-gray-400 text-gray-500 text-xs whitespace-nowrap ">
              Latest activity: {latestActivity}
            </p>
          </div>
        </div>
        <button className="dark:text-gray-200 hover:text-white" aria-label="Agent Options">
          <EllipsisVerticalIcon className="h-7 w-7" />
        </button>
      </div>
    );
  };

const Agents = () => {
    // State Hooks
    const [callTab, setCallTab] = useState("Agents"); // Initialize to "Agents" by default
    const [selectedRows, setSelectedRows] = useState([]);
    const [sortDirection, setSortDirection] = useState(null);
    const [selectedTab, setSelectedTab] = useState("active");
    const rowsPerPage = 10;
    const [selectedDateRange, setSelectedDateRange] = useState("Today");
    const dateRangeOptions = ["Today", "Yesterday", "Last Week", "Last Month", "This Year"];
    
    // React Router Hooks
    const navigate = useNavigate();
    const location = useLocation();

    // Update callTab based on current path
    useEffect(() => {
        if (location.pathname.endsWith("/agents")) {
            setCallTab("Agents");
        } else if (location.pathname.endsWith("/activities")) {
            setCallTab("Activities");
        } else if (location.pathname.endsWith("/call-center")) {
            setCallTab("Call Center");
        } else if (location.pathname.endsWith("/follow-up")) {
            setCallTab("Follow Up");
        } else {
            setCallTab("Agents"); // Default to Agents
        }
    }, [location.pathname]);

    // Header Buttons
    const headerButtons = (
        <div className="flex flex-col gap-2 lg:flex-row w-full lg:w-auto items-start lg:items-center">
            {/* Apply Filter Button: First on small screens, Last on large screens */}
            <div className="order-1 lg:order-3 flex justify-end mb-2 lg:mb-0 w-full lg:w-auto lg:ml-auto">
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
            <div className="flex justify-center gap-0 md:gap-2 my-4  text-sm md:text-[17px] whitespace-nowrap items-center px-4 rounded-full bg-[#0258E810] mx-auto md:mr-2">
                {["Agents", "Activities", "Call Center", "Follow Up"].map((t, idx) => (
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        key={idx}
                        className={`flex justify-center items-center p-2 cursor-pointer ${
                            callTab === t
                                ? "font-bold text-[#0258E8]"
                                : "font-normal text-black dark:text-white"
                        }`}
                        onClick={() => {
                            setCallTab(t);
                            if (t === "Agents") {
                                navigate("/statistics/agents");
                            } else if (t === "Activities") {
                                navigate("/statistics/agents/activities");
                            } else if (t === "Call Center") {
                                navigate("/statistics/agents/call-center");
                            } else if (t === "Follow Up") {
                                navigate("/statistics/agents/follow-up");
                            }
                        }}
                        aria-label={`${t} Tab`}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                setCallTab(t);
                                if (t === "Agents") {
                                    navigate("/statistics/agents");
                                } else if (t === "Activities") {
                                    navigate("/statistics/agents/activities");
                                } else if (t === "Call Center") {
                                    navigate("/statistics/agents/call-center");
                                } else if (t === "Follow Up") {
                                    navigate("/statistics/agents/follow-up");
                                }
                            }
                        }}
                    >
                        {t}
                    </motion.div>
                ))}
            </div>
        </div>
    );

    // Handle Checkbox Change
    const handleCheckboxChange = (key, isRange) => {
        if (isRange) {
            setSelectedRows((prevSelected) => {
                if (!prevSelected.includes(key)) {
                    return [...prevSelected, key];
                }
                return prevSelected;
            });
        } else {
            setSelectedRows((prevSelected) =>
                prevSelected.includes(key)
                    ? prevSelected.filter((item) => item !== key)
                    : [...prevSelected, key]
            );
        }
    };

    // Handle Sorting
    const handleSort = () => {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    // Sorted Rows based on Date
    const sortedRows = useMemo(() => {
        if (!sortDirection) return rows;
        return [...rows].sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split("/").map(Number);
            const [dayB, monthB, yearB] = b.date.split("/").map(Number);
            const dateA = new Date(yearA, monthA - 1, dayA);
            const dateB = new Date(yearB, monthB - 1, dayB);
            if (sortDirection === "asc") {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
    }, [sortDirection]);

    // Table Columns
    const columns = [
        {
            key: "num",
            label: "Num",
            w: "w-[12%]",
        },
        {
            key: "date",
            label: (
                <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={handleSort}
                >
                    Date
                    <ArrowUpDownIcon className="ml-1 text-gray-500" size={16} />
                </div>
            ),
            w: "w-[12%]",
        },
        {
            key: "oldStatut",
            label: "Old Statut",
            w: "w-[15%]",
        },
        {
            key: "statut",
            label: "Statut",
            w: "w-[15%]",
        },
        {
            key: "addedBy",
            label: "Added By",
            w: "w-[12%]",
        },
    ];

    // Render Cell Function
    const renderCell = useCallback(
        (item, columnKey) => {
            const cellValue = item[columnKey];
            switch (columnKey) {
                case "checkbox":
                    return (
                        <input
                            type="checkbox"
                            checked={selectedRows.includes(item.key)}
                            onChange={() => handleCheckboxChange(item.key, false)}
                        />
                    );
                case "num":
                    return <span className="text-blue-500">({item.num})</span>;
                case "date":
                    return <span>{item.date}</span>;
                case "oldStatut":
                    return <span>{item.oldStatut}</span>;
                case "statut":
                    return <span>{item.statut}</span>;
                case "addedBy":
                    return <span>{item.addedBy}</span>;
                default:
                    return cellValue;
            }
        },
        [selectedRows]
    );

    return (
        <DashboardLayout
            hasSearchInput={false}
            title="Statistics - Agents"
            icon={<ChartHistogramIcon className="text-info shrink-0" size={24} />} // Ensure consistent size
            additionalContent={headerButtons}
        >
            <div className="p-2 md:p-4">
                {/* List of Agents */}
                <div className="mb-6">
                    <h2 className="text-white text-lg font-bold mb-4 ml-2">List of Agents</h2>
                    {/* Scrollable Container with Padding-Bottom */}
                    <div className="overflow-x-auto pb-4">
                        {/* Grid Container */}
                        <div className="grid grid-cols-8 gap-4 md:min-w-[2800px] min-w-[2000px]">
                            {agentsList.map((agent) => (
                                <AgentCard
                                    key={agent.id}
                                    name={agent.name}
                                    latestActivity={agent.latestActivity}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Status Tabs and Actions */}
                <div className="flex gap-4 justify-between items-center mb-4">
                    <StatusTabs
                        tabs={["Activities"]}
                        activeCount={rows.length}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                    />
                    <div className="flex gap-2 flex-wrap items-center self-end">
                         {/* Actions Dropdown */}
           <Dropdown>
              <DropdownTrigger>
                <Button
                  color="default"
                  className="rounded-full text-white bg-glb_red flex items-center"
                >
                  <PencilEdit01Icon size={18} className="mr-1" /> Actions
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="print">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <PrinterIcon size={15} /> Print
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="export">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Download01Icon size={15} /> Export
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="call-center">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <CustomerSupportIcon size={15} /> Call center
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="follow-up">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <CallOutgoing01Icon size={15} /> Follow up
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="shipping">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <DropboxIcon size={15} /> Shipping
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="general">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Settings02Icon size={15} /> General
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
                    </div>
                </div>

                {/* Data Table */}
                <Table
                    columns={columns}
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

};

export default Agents;