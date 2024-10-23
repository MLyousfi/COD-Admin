import {Chip} from "@nextui-org/chip";
import {ArrowDownRight01Icon, ArrowUpRight01Icon, DeliveryBox01Icon} from "hugeicons-react";

const StatsCard = ({
                       icon,
                       percentageChange,
                       percentageLabel,
                       netAmount,
                       subInfo,
                       bgColor,
                       title,
                       percentageBgColor,
                       percentageTextColor
                   }) => {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="p-6 rounded-lg m-2 shadow-sm border border-gray-200 dark:border-gray-800">
                {/* Icon and percentage change */}
                <div className="flex justify-between items-center mb-4">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${bgColor}`}>
                        <span className="text-white text-2xl">{icon}</span>
                    </div>
                    <div>
                        <Chip className={`flex flex-row gap-4 ${percentageBgColor} ${percentageTextColor}`}>
                            <span className="inline-block font-bold">{percentageChange}%</span>
                            {percentageLabel === 'increase' ?
                                <ArrowUpRight01Icon size={16} className="inline-block"/>
                                : <ArrowDownRight01Icon size={16} className="inline-block"/>}
                        </Chip>
                        <span className="text-xs text-gray-400">Last month</span>
                    </div>
                </div>

                {/* Net amount */}
                <div className="text-gray-700 dark:text-gray-300 flex flex-col justify-between gap-1">
                    <p className="text-sm">{title}</p>
                    <p className="text-2xl font-bold">$ {netAmount}</p>
                    <div className="text-sm text-gray-400 flex items-center">
                        <span className="mr-1"><DeliveryBox01Icon size={16}/></span>
                        <span>{subInfo}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
