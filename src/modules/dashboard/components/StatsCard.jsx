import { Chip } from "@nextui-org/chip";
import { ArrowDownRight01Icon, ArrowUpRight01Icon, DeliveryBox01Icon } from "hugeicons-react";
import { motion } from "framer-motion";
import React from "react";

const StatsCard = ({
    item
}) => {

    const item_motion = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };
    return (
        <motion.div variants={item_motion} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="p-6 rounded-lg m-2 shadow-sm border border-gray-200 
            dark:border-[#ffffff10]">
                {/* Icon and percentage change */}
                <div className="flex justify-between items-center mb-4">
                    <div style={{ backgroundColor: item.backgroundColor }} className={`w-12 h-12 flex items-center justify-center rounded-lg`}>
                        <span style={{ color: item.textColor }} className={` text-2xl`}>{React.createElement(item.icon)}</span>
                    </div>
                    <div>
                        <Chip style={{
                            backgroundColor: item.change.bgcolor,
                            color: item.change.textColor
                        }}
                            className={`flex flex-row gap-4`}>
                            <span className="inline-block font-bold">{item.change.value}%</span>
                            {item.change.direction === 'up' ?
                                <ArrowUpRight01Icon size={16} className="inline-block" />
                                : <ArrowDownRight01Icon size={16} className="inline-block" />}
                        </Chip>
                        <span className="text-xs text-gray-400">Last month</span>
                    </div>
                </div>

                {/* Net amount */}
                <div className="text-gray-700 dark:text-gray-300 flex flex-col justify-between gap-1">
                    <p className="text-sm">{item.title}</p>
                    <p className="text-2xl font-bold">$ {item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    <div className="text-sm text-gray-400 flex items-center">
                        <span className="mr-1"><DeliveryBox01Icon size={16} /></span>
                        <span>{item.subInfo}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StatsCard;
