// StatsCard.jsx

import { Chip } from "@nextui-org/chip";
import { ArrowDownRight01Icon, ArrowUpRight01Icon, DeliveryBox01Icon } from "hugeicons-react";
import { motion } from "framer-motion";

const StatsCard = ({
    icon,
    total,
    useHover,
    bgColor,
    title,
    percentage
}) => {
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };
    return (
        <motion.div variants={item} className={`w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4`}>
            <div className="p-4 sm:p-5 hover:bg-dark_selected_hover rounded-lg m-2 shadow-sm border border-gray-200 dark:border-gray-800">
                {/* Icon and Title */}
                <div className="flex justify-start gap-2 items-center mb-3 sm:mb-4">
                    {/* Responsive Icon Container */}
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full ${bgColor}`}>
                        {/* Responsive Icon Size */}
                        <span className="text-black dark:text-white text-xl sm:text-lg">
                            {icon}
                        </span>
                    </div>
                    {/* Responsive Title Text */}
                    <p className="text-sm sm:text-sm md:text-base font-semibold truncate">{title}</p>
                </div>

                {/* Percentage and Total */}
                <div className="text-gray-700 dark:text-gray-300 flex justify-between items-center gap-1">
                    {/* Responsive Percentage Text */}
                    <p className="text-lg sm:text-base md:text-xl font-bold truncate">{percentage}</p>

                    {/* Responsive Total Badge */}
                    <div className="text-sm sm:text-[16px] rounded-full bg-light_opacity dark:bg-dark_opacity text-black dark:text-white font-bold px-3 sm:px-2 py-0.5 flex items-center">
                        {total}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StatsCard;
