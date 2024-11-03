import { Chip } from "@nextui-org/chip";

const ShippingCard = ({
    icon,
    iconBg,
    percentage,
    amount,
    title,
    bgColor,
    textColor
}) => {
    return (
        <div className="col-span-1 ">
            <div
                className="flex flex-col md:flex-row justify-between border border-gray-200 
            dark:border-[#ffffff10] hover:bg-gray-200 transition-colors duration-300 ease-in-out dark:hover:bg-gray-900 px-4 py-3 rounded-lg shadow-sm m-2">
                {/* Icon and percentage change */}
                <div className="flex md:flex-col items-start justify-between">
                    <div style={{
                        backgroundColor: bgColor,
                        color: textColor
                    }} className={`w-12 h-12 flex items-center justify-center rounded-2xl `}>
                        <span >{icon}</span>
                    </div>
                    <p className="text-sm md:text-lg mt-2 text-gray-500">{title}</p>
                </div>


                <div className="flex md:flex-col justify-start items-end gap-1">

                    <h4 className="text-base md:text-3xl font-bold">{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                    <Chip className={`flex flex-row items-center justify-center gap-4 bg-opacity-30 bg-blue-500`}>
                        <i className={`w-2 h-2 rounded-full inline-block bg-blue-500`}></i>
                        <span className="inline-block dark:text-white text-black ml-1">{percentage}%</span>
                    </Chip>
                </div>
            </div>
        </div>
    );
};

export default ShippingCard;
