import CallsCard from "@/modules/dashboard/components/CallsCard.jsx";
import GaugeChart from "@/modules/dashboard/components/GaugeChart.jsx";
import LineChartCard from "@/modules/dashboard/components/LineChartCard.jsx";
import ShippingCard from "@/modules/dashboard/components/ShippingCard.jsx";
import StatsCard from "@/modules/dashboard/components/StatsCard.jsx";
import {
    Airplane01Icon,
    BoxingBagIcon,
    CustomerSupportIcon,
    Home01Icon,
    RepeatIcon,
    ShippingTruck01Icon
} from "hugeicons-react";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";

export default function Dashboard() {
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [2, 3, 4, 3, 5, 4, 4, 3, 4, 2, 4, 5],
    };
    return (
        <>
            <DashboardLayout title="Dashboard" icon={<Home01Icon className="text-info"/>}>

                <div className="flex flex-col flex-wrap justify-start px-8 md:flex-row">
                    <StatsCard
                        icon={<CustomerSupportIcon/>}
                        percentageChange={10}
                        percentageLabel="increase"
                        netAmount={100}
                        title="Total Confirmed"
                        subInfo="23,324"
                        bgColor="bg-danger"
                        percentageBgColor="bg-danger-200"
                        percentageTextColor="text-danger-800"
                    />
                    <StatsCard
                        icon={<CustomerSupportIcon/>}
                        percentageChange={10}
                        percentageLabel="increase"
                        netAmount={100}
                        title="Total Confirmed"
                        subInfo="23,324"
                        bgColor="bg-success"
                        percentageBgColor="bg-green-200"
                        percentageTextColor="text-green-800"
                    />
                    <StatsCard
                        icon={<Airplane01Icon/>}
                        percentageChange={10}
                        percentageLabel="increase"
                        netAmount={100}
                        title="Total Delivered"
                        subInfo="23,324"
                        bgColor="bg-yellow-400"
                        percentageBgColor="bg-yellow-200"
                        percentageTextColor="text-yellow-800"
                    />
                    <StatsCard
                        icon={<ShippingTruck01Icon/>}
                        percentageChange={10}
                        percentageLabel="increase"
                        netAmount={100}
                        title="Total Remitted"
                        subInfo="23,324"
                        bgColor="bg-success"
                        percentageBgColor="bg-green-200"
                        percentageTextColor="text-green-800"
                    />
                </div>
                <div className="flex flex-row flex-wrap items-start justify-start p-4 md:px-8">
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
                        arcs={[{color: '#22c55e', limit: 50}]}  // Single arc
                    />

                </div>

                <div className="px-4 my-12 md:px-8">
                    <h3 className="my-6 text-xl font-bold">Call Center</h3>
                    <div className="flex flex-row flex-wrap">
                        <CallsCard
                            icon={<Airplane01Icon size={18}/>}
                            cardBg="bg-info"
                            percentage={10}
                            amount={100}
                            title="Total Calls"
                        />
                        <CallsCard
                            icon={<BoxingBagIcon size={18}/>}
                            cardBg="bg-danger"
                            percentage={10}
                            amount={100}
                            title="Total Calls"
                        />
                        <CallsCard
                            icon={<Airplane01Icon size={18}/>}
                            cardBg="bg-info"
                            percentage={10}
                            amount={100}
                            title="Total Calls"
                        />
                        <CallsCard
                            icon={<Airplane01Icon size={18}/>}
                            cardBg="bg-success"
                            percentage={10}
                            amount={100}
                            title="Total Calls"
                        />
                        <CallsCard
                            icon={<Airplane01Icon size={18}/>}
                            cardBg="bg-info"
                            percentage={10}
                            amount={100}
                            title="Total Calls"
                        />
                        <CallsCard
                            icon={<Airplane01Icon size={18}/>}
                            cardBg="bg-info"
                            percentage={10}
                            amount={100}
                            title="Total Calls"
                        />
                        <CallsCard
                            icon={<Airplane01Icon size={18}/>}
                            cardBg="bg-danger"
                            percentage={10}
                            amount={100}
                            title="Total Calls"
                        />
                    </div>
                </div>

                <div className="px-8 ">
                    <h3 className="my-6 text-xl font-bold">Shipping</h3>
                    <div className="flex flex-row flex-wrap justify-start">
                        <ShippingCard
                            icon={<ShippingTruck01Icon/>}
                            iconBg="bg-info"
                            percentage={10}
                            amount={100}
                            title="Delivered"
                        />
                        <ShippingCard
                            icon={<ShippingTruck01Icon/>}
                            iconBg="bg-success"
                            percentage={10}
                            amount={100}
                            title="In Transit"
                        />
                        <ShippingCard
                            icon={<RepeatIcon/>}
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