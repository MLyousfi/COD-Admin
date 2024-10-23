import {Chip} from "@nextui-org/chip";

const ShippingCard = ({
                          icon,
                          iconBg,
                          percentage,
                          amount,
                          title,
                      }) => {
    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6">
            <div
                className="flex flex-row justify-between border border-gray-200 dark:border-gray-900 hover:bg-gray-200 dark:hover:bg-gray-900 px-4 py-3 rounded-lg shadow-sm m-2">
                {/* Icon and percentage change */}
                <div className="flex flex-col items-start justify-between">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg}`}>
                        <span className="text-white">{icon}</span>
                    </div>
                    <p className="text-sm mt-2 text-gray-500">{title}</p>
                </div>


                <div className="flex flex-col justify-start items-center">

                    <h4 className="text-xl font-medium">{amount}</h4>
                    <Chip className={`flex flex-row items-center justify-center gap-4 bg-blue-100`}>
                        <i className={`w-2 h-2 rounded-full inline-block ${iconBg}`}></i>
                        <span className="inline-block text-gray-800 ml-1">{percentage}%</span>
                    </Chip>
                </div>
            </div>
        </div>
    );
};

export default ShippingCard;
