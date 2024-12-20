import { Chip } from "@nextui-org/chip";
import { DeliveryBox01Icon, MoreVerticalCircle01Icon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";
import { motion } from "framer-motion";
const CallsCard = ({
    icon,
    cardBg,
    percentage,
    amount,
    title,
    bgColor
}) => {
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };


    return (
        <motion.div variants={item} className="col-span-1">
            <div className="border border-gray-200 
            dark:border-[#ffffff10] hover:bg-gray-200 transition-colors duration-300 ease-in-out dark:hover:bg-gray-900 px-1 py-1 md:px-4 md:py-3 rounded-lg shadow-sm mx-2 my-1.5">
                {/* Icon and percentage change */}
                <div className="flex justify-start items-center mb-4">
                    <div className={`w-10 h-10 flex items-center justify-center bg-opacity-30 rounded-full ${bgColor}`}>
                        <span className="text-gray-800 dark:text-gray-100 ">{icon}</span>
                    </div>
                    <div className="flex flex-col justify-start items-start mx-2">
                        <p className="text-sm md:text-lg font-medium">{title}</p>
                    </div>
                    <div className="ml-auto md:hidden">
                        <Button isIconOnly variant="light">
                            <MoreVerticalCircle01Icon size={18} />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-4 items-start justify-center md:hidden">
                    <Progress aria-label="Loading..." value={60} classNames={{
                        track: "bg-gray-100 dark:bg-gray-700",
                        indicator: cardBg,
                    }} />
                    <p className="text-xl font-bold">
                        {amount} <span className="text-gray-600 text-xs">/100%</span>
                    </p>
                </div>


                <div className="hidden flex-row justify-between items-center mt-6 md:flex text-xl">
                    <Chip className="flex flex-row gap-4 bg-glb_blue_opacity">
                        <span className="inline-block font-bold text-info">{percentage}%</span>
                    </Chip>
                    <div className="flex justify-start items-center gap-1">
                        <DeliveryBox01Icon size={16} />

                        <p >{amount}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CallsCard;
