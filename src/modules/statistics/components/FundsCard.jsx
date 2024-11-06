// FundsCard.jsx
import { Chip } from "@nextui-org/chip";
import { ArrowDownRight01Icon, ArrowUpRight01Icon, DeliveryBox01Icon } from "hugeicons-react";
import { motion } from "framer-motion";

const FundsCard = ({
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
        <motion.div variants={item} className="w-full">
            <div className="p-5 sm:p-3 mb-3 hover:bg-dark_selected_hover rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                {/* Icon and percentage change */}
                <div className="flex justify-start gap-2 items-center mb-3 sm:mb-4">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full ${bgColor}`}>
                        <span className="text-black dark:text-white text-xl sm:text-lg">{icon}</span>
                    </div>
                    <p className="text-lg sm:text-sm md:text-base font-semibold truncate">{title}</p>
                </div>

                {/* Net amount */}
                <div className="text-gray-700 dark:text-gray-300 flex justify-between gap-2">
                    <p className="text-xl sm:text-[17px] whitespace-nowrap font-bold py-1 ">{percentage}</p>
                    <div className="text-sm sm:text-xs rounded-full bg-light_opacity dark:bg-dark_opacity whitespace-nowrap text-black dark:text-white font-bold px-3 py-1 flex items-center">
                        {total}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FundsCard;
