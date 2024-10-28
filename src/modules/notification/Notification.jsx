import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import { Database01Icon, DeliveryBox01Icon, DeliveryTruck02Icon, File01Icon, Idea01Icon, LockIcon, Notification01Icon, ProductLoadingIcon, Wallet01Icon } from "hugeicons-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";



const notifications = [
    {
        id: 1,
        title: "Stock Alert",
        message: "To start work with data, please create your first components templates.",
        actionText: "Learn More",
        icon: Database01Icon,
    },
    {
        id: 2,
        title: "Your Sourcing Quotation is ready!",
        message: "To start work with data, please create your first components templates.",
        actionText: "Learn More",
        icon: Database01Icon,
    },
    {
        id: 3,
        title: "You received a New message from your Agent",
        message: "To start work with data, please create your first components templates.",
        actionText: "Learn More",
        icon: Database01Icon,
    },
    {
        id: 4,
        title: "A New Sourcing Invoice/ Quote is ready!",
        message: "To start work with data, please create your first components templates.",
        actionText: "Learn More",
        icon: Database01Icon,
    },
    {
        id: 5,
        title: "Product Back in Stock",
        message: "One of your saved products is now back in stock. Don't miss out!",
        actionText: "Check Now",
        icon: ProductLoadingIcon,
    },
    {
        id: 6,
        title: "Order Shipped",
        message: "Your recent order has been shipped and is on its way to you.",
        actionText: "Track Order",
        icon: DeliveryTruck02Icon,
    },
    {
        id: 7,
        title: "New Feature Update",
        message: "Explore the new features added to enhance your experience.",
        actionText: "Learn More",
        icon: Idea01Icon,
    },
    {
        id: 8,
        title: "Security Alert",
        message: "Unusual activity detected on your account. Please review.",
        actionText: "Review Now",
        icon: LockIcon,
    },
    {
        id: 9,
        title: "Payment Reminder",
        message: "Your next payment is due soon. Don't miss the deadline.",
        actionText: "Pay Now",
        icon: Wallet01Icon,
    },
    {
        id: 10,
        title: "Weekly Summary",
        message: "Here’s your summary of activities and updates from this week.",
        actionText: "View Summary",
        icon: File01Icon,
    }
];


export default function Notification() {
    const location = useLocation();
    const navigate = useNavigate();
    const [visibleNotifications, setVisibleNotifications] = useState(4);

    // Function to load more notifications
    const loadMoreNotifications = () => {
        setVisibleNotifications((prevCount) => prevCount + 4);
    };

    // Retrieve the redirection link from the state
    const redirectLink = location.state.from;


    return (
        <>
            <DashboardLayout title="Notifications" hasSearchInput={false} hasReturnLink={redirectLink}
            >
                <div className="p-12 flex flex-col justify-center items-center gap-2">
                    {notifications.slice(0, visibleNotifications).map((item, index) => (
                        <div key={index} className="group  flex cursor-pointer hover:bg-[#0258E810] justify-start bg-[#00000008] dark:bg-[#ffffff05] items-center rounded-xl gap-2 w-full py-3 px-4">
                            <div className="flex justify-start items-center gap-3 w-3/4 flex-1 ">
                                <div className="flex justify-center items-center p-2 h-full bg-[#ffffff] text-[#ED0006] dark:bg-[#FCF4E9] rounded-xl dark:text-[#FF9314]">
                                    {React.createElement(item.icon, { size: 30 })}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-bold">{item.title}</h1>
                                    <h3 className="font-normal dark:text-[#ffffff50]">{item.message}</h3>
                                </div>
                            </div>
                            <div className="font-bold p-2 group-hover:text-[#0258E8] ">{item.actionText}</div>
                        </div>
                    ))}
                    {visibleNotifications < notifications.length && (
                        <button
                            onClick={loadMoreNotifications}
                            className="w-fit mt-4 px-4 py-2 text-center bg-transparent border dark:border-white rounded-full hover:bg-[#0258E810]">
                            Load More
                        </button>
                    )}
                </div>


            </DashboardLayout>
        </>
    )
}