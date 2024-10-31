
import GaugeChart from "@/modules/dashboard/components/GaugeChart.jsx";
import LineChartCard from "@/modules/dashboard/components/LineChartCard.jsx";
import ShippingCard from "@/modules/dashboard/components/ShippingCard.jsx";
import StatsCard from "@/modules/dashboard/components/StatsCard.jsx";
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
    TruckIcon
} from "hugeicons-react";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import { motion } from "framer-motion";
import CallsCard from "../components/CallsCard";
import React from "react";


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
        backgroundColor: "#00C85390",
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
                delayChildren: 0.3,       // Delay before starting the stagger
                staggerChildren: 0.2      // Delay between each child
            }
        }
    };



    return (
        <>
            <DashboardLayout title="Dashboard" icon={<Home01Icon className="text-info" />}>

                <motion.div initial="hidden"
                    animate="visible" variants={container} className="flex flex-col flex-wrap justify-start px-2 md:px-8 md:flex-row">
                    {dataCards.map((item, index) => (
                        <StatsCard
                            key={index}
                            item={item}
                        />
                    ))}

                </motion.div>
                <div className="flex flex-row flex-wrap items-start justify-start p-2 md:px-8">
                    {/* <LineChartCard
                        title="Product Delivery"
                        data={chartData}
                        percentChange={7.9}
                        timeRange="Last Month"
                    /> */}
                    <LineChartCard
                        title="Product Delivery"
                        data={chartData}
                        percentChange={7.9}
                        timeRange="Last Month"
                    />

                    <GaugeChart
                        type="semi"
                        value={50}  // Set a simple value
                        size={200}
                        min={0}
                        max={100}
                        arcWidth={10}
                        arcs={[{ color: '#22c55e', limit: 50 }]}  // Single arc
                    />

                </div>

                <div className="px-2 my-12 md:px-8">
                    <h3 className="my-6 text-xl font-bold">Call Center</h3>
                    <motion.div initial="hidden"
                        animate="visible" variants={container} className="flex flex-row flex-wrap">
                        {callCenterItems.map((i, index) => (

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

                <div className="px-2 md:px-8 ">
                    <h3 className="my-6 text-xl font-bold">Shipping</h3>
                    <div className="flex flex-row flex-wrap justify-start">
                        {shipping.map((i, index) => (
                            <ShippingCard
                                key={index}
                                icon={React.createElement(i.icon, { size: 22 })}

                                percentage={i.percentage}
                                amount={i.amount}
                                title={i.title}
                                bgColor={i.backgroundColor}
                                textColor={i.textColor}
                            />
                        ))
                        }
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}