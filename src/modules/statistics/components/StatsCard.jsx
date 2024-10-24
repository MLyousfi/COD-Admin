import { Chip } from "@nextui-org/chip";
import { ArrowDownRight01Icon, ArrowUpRight01Icon, DeliveryBox01Icon } from "hugeicons-react";

const StatsCard = ({
    icon,
    total,
    useHover,
    bgColor,
    title,
    percentage
}) => {
    return (
        <div className={`w-full  md:w-1/2 lg:w-1/3 xl:w-1/4 `}>
            <div className="p-6 hover:bg-dark_selected_hover rounded-lg m-2 shadow-sm border border-gray-200 dark:border-gray-800">
                {/* Icon and percentage change */}
                <div className="flex justify-start gap-2 items-center mb-4">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${bgColor}`}>
                        <span className="text-white text-2xl">{icon}</span>
                    </div>
                    <p className="text-sm">{title}</p>
                </div>

                {/* Net amount */}
                <div className="text-gray-700 dark:text-gray-300 flex justify-between gap-1">

                    <p className="text-2xl font-bold">{percentage}</p>

                    <div className="text-sm rounded-full bg-light_opacity dark:bg-dark_opacity text-black dark:text-white font-bold px-4 flex items-center">
                        {total}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
