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
    CustomerSupportIcon,
    DeliveryReturn01Icon,
    DeliveryTruck02Icon,
    Home01Icon,
    PackageDeliveredIcon,
    RepeatIcon,
    ShippingTruck01Icon,
    ShoppingBasket03Icon,
    ShoppingBasketCheckIn02Icon,
    ShoppingBasketDone03Icon,
    ShoppingCart01Icon,
    TaskDone01Icon,
    TimeSetting03Icon
} from "hugeicons-react";
import { motion } from 'framer-motion';

import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import StatsCard from "../components/StatsCard";
import React from "react";
const statistics = [
    {
        key: 1,
        title: "Totals Leads",
        percentage: "100%",
        total: 1927,
        icon: ShoppingBasket03Icon,
        bgColor: "bg-blue-500",
    },
    {
        key: 2,
        title: "Real Leads",
        percentage: "95%",
        total: 1820,
        icon: ShoppingBasketDone03Icon,
        bgColor: "bg-green-500",
    },
    {
        key: 3,
        title: "New Leads",
        percentage: "40%",
        total: 770,
        icon: ShoppingCart01Icon,
        bgColor: "bg-yellow-500",
    },
    {
        key: 4,
        title: "Test",
        percentage: "5%",
        total: 95,
        icon: Configuration01Icon,
        bgColor: "bg-red-500",
    },
    {
        key: 5,
        title: "Upsell",
        percentage: "20%",
        total: 385,
        icon: ShoppingBasketCheckIn02Icon,
        bgColor: "bg-purple-500",
    },
    {
        key: 6,
        title: "No Answer",
        percentage: "10%",
        total: 193,
        icon: CallEnd01Icon,
        bgColor: "bg-gray-500",
    },
    {
        key: 7,
        title: "Cancels",
        percentage: "8%",
        total: 154,
        icon: CancelCircleIcon,
        bgColor: "bg-pink-500",
    },
    {
        key: 8,
        title: "Scheduled",
        percentage: "30%",
        total: 578,
        icon: TimeSetting03Icon,
        bgColor: "bg-teal-500",
    },
    {
        key: 9,
        title: "Wrong Phones",
        percentage: "3%",
        total: 58,
        icon: CallEnd01Icon,
        bgColor: "bg-indigo-500",
    },
    {
        key: 10,
        title: "Double Order",
        percentage: "1%",
        total: 19,
        icon: ShoppingBasket03Icon,
        bgColor: "bg-orange-500",
    },
    {
        key: 11,
        title: "Returns",
        percentage: "7%",
        total: 135,
        icon: DeliveryReturn01Icon,
        bgColor: "bg-rose-500",
    },
    {
        key: 12,
        title: "In Transit",
        percentage: "25%",
        total: 481,
        icon: DeliveryTruck02Icon,
        bgColor: "bg-cyan-500",
    },
    {
        key: 13,
        title: "Confirmed",
        percentage: "85%",
        total: 1638,
        icon: CallDone02Icon,
        bgColor: "bg-lime-500",
    },
    {
        key: 14,
        title: "Delivered",
        percentage: "90%",
        total: 1734,
        icon: TaskDone01Icon,
        bgColor: "bg-emerald-500",
    },
    {
        key: 15,
        title: "Shipped",
        percentage: "65%",
        total: 1252,
        icon: PackageDeliveredIcon,
        bgColor: "bg-fuchsia-500",
    },
];


export default function Products() {
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [2, 3, 4, 3, 5, 4, 4, 3, 4, 2, 4, 5],
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
            <DashboardLayout title="Statistics" icon={<ChartHistogramIcon className="text-info" />}>

                <motion.div initial="hidden"
                    animate="visible" variants={container} className="flex flex-col flex-wrap justify-start px-8 md:flex-row">
                    {statistics.map((stat, index) => (
                        <StatsCard useHover={true} icon={React.createElement(stat.icon)} bgColor={stat.bgColor} title={stat.title} key={index} percentage={stat.percentage} total={stat.total} />
                    ))}

                </motion.div>


                <div className="px-4 my-12 md:px-8">
                    <h3 className="my-6 text-xl font-bold">Call Center</h3>
                    <motion.div initial="hidden"
                        animate="visible" variants={container} className="flex flex-row flex-wrap">
                        <CallsCard
                            icon={<Airplane01Icon size={18} />}
                            cardBg="bg-info"
                            percentage={10}
                            amount={100}
                            title="Total Calls"
                        />
                        <CallsCard
                            icon={<BoxingBagIcon size={18} />}
                            cardBg="bg-danger"
                            percentage={10}
                            amount={100}
                            title="Total Calls"
                        />
                        <CallsCard
                            icon={<Airplane01Icon size={18} />}
                            cardBg="bg-info"
                            percentage={10}
                            amount={100}
                            title="Total Calls"
                        />
                        <CallsCard
                            icon={<Airplane01Icon size={18} />}
                            cardBg="bg-success"
                            percentage={10}
                            amount={100}
                            title="Total Calls"
                        />
                        <CallsCard
                            icon={<Airplane01Icon size={18} />}
                            cardBg="bg-info"
                            percentage={10}
                            amount={100}
                            title="Total Calls"
                        />
                        <CallsCard
                            icon={<Airplane01Icon size={18} />}
                            cardBg="bg-info"
                            percentage={10}
                            amount={100}
                            title="Total Calls"
                        />
                        <CallsCard
                            icon={<Airplane01Icon size={18} />}
                            cardBg="bg-danger"
                            percentage={10}
                            amount={100}
                            title="Total Calls"
                        />
                    </motion.div>
                </div>

                <div className="px-8 ">
                    <h3 className="my-6 text-xl font-bold">Shipping</h3>
                    <div className="flex flex-row flex-wrap justify-start">
                        <ShippingCard
                            icon={<ShippingTruck01Icon />}
                            iconBg="bg-info"
                            percentage={10}
                            amount={100}
                            title="Delivered"
                        />
                        <ShippingCard
                            icon={<ShippingTruck01Icon />}
                            iconBg="bg-success"
                            percentage={10}
                            amount={100}
                            title="In Transit"
                        />
                        <ShippingCard
                            icon={<RepeatIcon />}
                            percentage={10}
                            amount={100}
                            iconBg="bg-danger"
                            title="Remitted"
                        />
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}