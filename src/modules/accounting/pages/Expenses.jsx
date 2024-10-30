import CallsCard from "@/modules/dashboard/components/CallsCard.jsx";
import GaugeChart from "@/modules/dashboard/components/GaugeChart.jsx";
import LineChartCard from "@/modules/dashboard/components/LineChartCard.jsx";
import ShippingCard from "@/modules/dashboard/components/ShippingCard.jsx";
import StatsCard from "@/modules/dashboard/components/StatsCard.jsx";
import {
    Airplane01Icon,
    ArrowDown01Icon,
    BoxingBagIcon,
    Calculator01Icon,
    Calendar01Icon,
    Calendar03Icon,
    CustomerSupportIcon,
    Delete01Icon,
    EyeIcon,
    Home01Icon,
    PencilEdit01Icon,
    PlusSignIcon,
    RepeatIcon,
    ShippingTruck01Icon
} from "hugeicons-react";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import { Button } from "@nextui-org/button";
import ChartCard from "../components/ChartCard";
import Table from "../../stockManagement.jsx/components/Table";
import { useState } from "react";

const rows = [
    {
        key: 1,
        v: 'Product Name 1',
        amount: '128 SAR',
        date: '12 Oct 2024'
    },
    {
        key: 2,
        v: 'Product Name 2',
        amount: '250 USD',
        date: '15 Oct 2024'
    },
    {
        key: 3,
        v: 'Product Name 3',
        amount: '300 EUR',
        date: '20 Sep 2024'
    },
    {
        key: 4,
        v: 'Product Name 4',
        amount: '99 AED',
        date: '10 Oct 2024'
    },
    {
        key: 5,
        v: 'Product Name 5',
        amount: '150 GBP',
        date: '01 Oct 2024'
    },
    {
        key: 6,
        v: 'Product Name 6',
        amount: '200 SAR',
        date: '18 Sep 2024'
    },
    {
        key: 7,
        v: 'Product Name 7',
        amount: '500 USD',
        date: '21 Sep 2024'
    },
    {
        key: 8,
        v: 'Product Name 8',
        amount: '75 EUR',
        date: '25 Aug 2024'
    },
    {
        key: 9,
        v: 'Product Name 9',
        amount: '180 SAR',
        date: '13 Oct 2024'
    },
    {
        key: 10,
        v: 'Product Name 10',
        amount: '220 AED',
        date: '14 Aug 2024'
    },
    {
        key: 11,
        v: 'Product Name 11',
        amount: '325 USD',
        date: '05 Sep 2024'
    },
    {
        key: 12,
        v: 'Product Name 12',
        amount: '50 GBP',
        date: '03 Oct 2024'
    },
    {
        key: 13,
        v: 'Product Name 13',
        amount: '900 SAR',
        date: '10 Sep 2024'
    },
    {
        key: 14,
        v: 'Product Name 14',
        amount: '128 EUR',
        date: '29 Sep 2024'
    },
    {
        key: 15,
        v: 'Product Name 15',
        amount: '350 AED',
        date: '19 Sep 2024'
    },
    {
        key: 16,
        v: 'Product Name 16',
        amount: '450 USD',
        date: '02 Oct 2024'
    },
    {
        key: 17,
        v: 'Product Name 17',
        amount: '600 GBP',
        date: '28 Sep 2024'
    },
    {
        key: 18,
        v: 'Product Name 18',
        amount: '275 SAR',
        date: '30 Aug 2024'
    },
    {
        key: 19,
        v: 'Product Name 19',
        amount: '499 AED',
        date: '22 Sep 2024'
    },
    {
        key: 20,
        v: 'Product Name 20',
        amount: '650 EUR',
        date: '11 Oct 2024'
    }
];


const columns = [
    { key: "v", label: "V" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "options", label: "Options" },
];
export default function Expenses() {
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [50, 100, 500, 500, 500, 300, 300, 300, 300, 200, 1000, 1000, 1000, 1000, 500, 500],
    };

    const [selectedRows, setSelectedRows] = useState([]);
    const rowsPerPage = 10;

    const handleCheckboxChange = (key) => {
        if (selectedRows.includes(key)) {
            setSelectedRows(selectedRows.filter((selectedKey) => selectedKey !== key));
        } else {
            setSelectedRows([...selectedRows, key]);
        }
    };

    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case "options":
                return (
                    <div className="flex space-x-2 justify-center">
                        {/* View Button */}
                        <Button
                            variant="flat"
                            size="sm"
                            className="w-8 h-8 bg-[#00000020] dark:bg-[#ffffff20] rounded-full p-0 flex items-center justify-center"
                            style={{ padding: 0, minWidth: '32px', height: '32px' }}
                        >
                            <EyeIcon size={14} />
                        </Button>

                        {/* Edit Button */}
                        <Button
                            variant="flat"
                            size="sm"
                            className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                            style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
                        >
                            <PencilEdit01Icon size={14} style={{ color: 'white' }} />
                        </Button>

                        {/* Delete Button */}
                        <Button
                            variant="flat"
                            size="sm"
                            className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                            style={{ backgroundColor: '#ED0006', padding: 0, minWidth: '32px', height: '32px' }}
                        // Call handleDelete with the item's key
                        >
                            <Delete01Icon size={14} style={{ color: 'white' }} />
                        </Button>
                    </div>
                );
            default:
                return <span className="text-sm dark:text-white">{item[columnKey]}</span>;
        }
    };

    return (
        <>
            <DashboardLayout title="Accounting - Expenses" icon={<Calculator01Icon className="text-info" />}>

                <div className="flex px-4 my-12 md:px-8 justify-end">
                    <div className="flex flex-row gap-2">
                        <Button color="default" className="rounded-full bg-info">
                            <PlusSignIcon size={18} /> New Expense
                        </Button>
                        <Button variant="bordered" className="rounded-full">
                            <Calendar03Icon size={16} /> 2024 <ArrowDown01Icon size={16} />
                        </Button>

                    </div>
                </div>


                <div className="flex flex-row flex-wrap items-center justify-center p-4 md:py-8 md:px-8 ">

                    <ChartCard
                        header={false}
                        title="Product Delivery"
                        data={chartData}
                        percentChange={1}
                        timeRange="Last Month"
                    />



                </div>
                <div className="flex flex-row flex-wrap items-center justify-center p-4 md:px-8 ">

                    <Table
                        columns={columns}
                        data={rows}
                        renderCell={renderCell}
                        handleCheckboxChange={handleCheckboxChange}
                        selectedRows={selectedRows}
                        rowsPerPage={rowsPerPage}
                        className="dark:bg-gray-800 dark:text-white"
                    />


                </div>


            </DashboardLayout>
        </>
    );
}