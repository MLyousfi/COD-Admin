import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import {
    ArrowUpDownIcon,
    PencilEdit01Icon,
    PrinterIcon,
    ChartHistogramIcon,
    Download01Icon,
    CustomerSupportIcon,
    CallOutgoing01Icon,
    DropboxIcon,
    Settings02Icon,
    ArrowDown01Icon,
    FilterIcon,
    Calendar03Icon
} from "hugeicons-react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useCallback, useMemo, useState } from "react";
import Table from "../../stockManagement.jsx/components/Table";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import StatusTabs from "../../shared/components/StatusTabs";
import { Button } from "@nextui-org/button";

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

const AgentCard = ({ name, latestActivity }) => {
    return (
        <div className="flex items-center justify-between px-4 py-2 dark:bg-[#FFFFFF07] rounded-full w-[245px]">
            <div className="flex items-center">
                <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                <div>
                    <p className="text-white font-medium">{name}</p>
                    <span className="text-gray-400 text-xs whitespace-nowrap">Latest activity: {latestActivity}</span>
                </div>
            </div>
            <button className="text-gray-200 hover:text-white" aria-label="Agent Options">
                <EllipsisVerticalIcon className="h-7 w-7" />
            </button>
        </div>
    );
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

const Agents = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [sortDirection, setSortDirection] = useState(null);
    const [selectedTab, setSelectedTab] = useState('active');
    const rowsPerPage = 10;

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

    const handleSort = () => {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const sortedRows = useMemo(() => {
        if (!sortDirection) return rows;
        return [...rows].sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split("/").map(Number);
            const [dayB, monthB, yearB] = b.date.split("/").map(Number);
            const dateA = new Date(yearA, monthA - 1, dayA);
            const dateB = new Date(yearB, monthB - 1, dayB);
            if (sortDirection === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
    }, [sortDirection, rows]);

    const columns = [
        {
            key: "num",
            label: "Num",
            w: "w-[12%]"
        },
        {
            key: "date",
            label: (
                <div className="flex items-center justify-center cursor-pointer" onClick={handleSort}>
                    Date
                    <ArrowUpDownIcon className="ml-1" size={16} />
                </div>
            ),
            w: "w-[12%]"
        },
        {
            key: "oldStatut",
            label: "Old Statut",
            w: "w-[15%]"
        },
        {
            key: "statut",
            label: "Statut",
            w: "w-[15%]"
        },
        {
            key: "addedBy",
            label: "Added By",
            w: "w-[12%]"
        },
    ];

    const renderCell = useCallback((item, columnKey) => {
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
                return (
                    <span className="text-blue-500">({item.num})</span>
                );
            case "date":
                return (
                    <span>{item.date}</span>
                );
            case "oldStatut":
                return (
                    <span>{item.oldStatut}</span>
                );
            case "statut":
                return (
                    <span>{item.statut}</span>
                );
            case "addedBy":
                return (
                    <span>{item.addedBy}</span>
                );
            default:
                return cellValue;
        }
    }, [selectedRows, handleCheckboxChange]);

    return (
        <DashboardLayout
            hasSearchInput={false}
            title="Statistics - Agents"
            icon={<ChartHistogramIcon className="text-info" />}
            additionalContent={headerButtons}
        >
            <div className="p-2 md:p-4">
                <div className="mb-6">
                    <h2 className="text-white text-lg font-bold mb-4 ml-2">List of Agents</h2>
                    {/* Scrollable Container with Padding-Bottom */}
                    <div className="overflow-x-auto pb-4">
                        {/* Grid Container */}
                        <div className="grid grid-cols-8 gap-4 min-w-[2000px]">
                            {agentsList.map(agent => (
                                <AgentCard
                                    key={agent.id}
                                    name={agent.name}
                                    latestActivity={agent.latestActivity}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 justify-between items-center mb-4">
                    <StatusTabs
                        tabs={["Activities"]}
                        activeCount={rows.length}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                    />
                    <div className="flex gap-2 flex-wrap items-center self-end">
                        <Dropdown className="!backdrop-blur-md !bg-gray-400/30">
                            <DropdownTrigger>
                                <Button color="default" className="rounded-full text-white bg-glb_red">
                                    <PencilEdit01Icon size={18} /> Actions
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions" classNames={{ list: "!bg-transparent" }}>
                                <DropdownItem key="print">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <PrinterIcon size={15} /> Print
                                        </div>
                                        <ArrowUpDownIcon size={18} />
                                    </div>
                                </DropdownItem>
                                <DropdownItem key="export">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <Download01Icon size={15} /> Export
                                        </div>
                                        <ArrowUpDownIcon size={18} />
                                    </div>
                                </DropdownItem>
                                <DropdownItem key="callCenter">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <CustomerSupportIcon size={15} /> Call Center
                                        </div>
                                        <ArrowUpDownIcon size={18} />
                                    </div>
                                </DropdownItem>
                                <DropdownItem key="followUp">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <CallOutgoing01Icon size={15} /> Follow Up
                                        </div>
                                        <ArrowUpDownIcon size={18} />
                                    </div>
                                </DropdownItem>
                                <DropdownItem key="shipping">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <DropboxIcon size={15} /> Shipping
                                        </div>
                                        <ArrowUpDownIcon size={18} />
                                    </div>
                                </DropdownItem>
                                <DropdownItem key="general">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <Settings02Icon size={15} /> General
                                        </div>
                                        <ArrowUpDownIcon size={18} />
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
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
