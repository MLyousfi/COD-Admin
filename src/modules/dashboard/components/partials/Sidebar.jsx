import { Button } from "@nextui-org/button";

import codPowerGroupLogo from "@shared/assets/images/cod-power-group-logo.svg";
import { Link, useLocation } from "react-router-dom";
import {
    Analytics01Icon,
    ArrowDown01Icon,
    ArrowUp01Icon,
    Calculator01Icon,
    CoinsDollarIcon,
    CommandLineIcon,
    CustomerService01Icon,
    CustomerServiceIcon,
    DeliveryBox01Icon,
    FerryBoatIcon,
    GlobalIcon,
    Globe02Icon,
    HelpCircleIcon,
    Home01Icon,
    Invoice02Icon,
    MoonCloudIcon,
    PackageIcon,
    Settings02Icon,
    Share08Icon,
    ShippingTruck01Icon,
    SidebarLeft01Icon,
    UserIcon,
    UserMultipleIcon,
    WarehouseIcon,
    WhatsappIcon
} from "hugeicons-react";
import ThemeToggle from "@/modules/dashboard/components/ThemeToggle.jsx";
import React, { useEffect, useRef, useState } from "react";
import { RouteNames, RoutesConfig } from "@/core/constants/routes.js";

export default function Sidebar({ showSidebar, setShowSidebar }) {

    const location = useLocation();
    const { pathname } = location;

    console.log(pathname.split('/'));


    const trigger = useRef(null);
    const sidebar = useRef(null);

    const [expandedRoutes, setExpandedRoutes] = useState({});

    const toggleRoute = (routeName) => {
        setExpandedRoutes((prev) => ({
            ...prev,
            [routeName]: !prev[routeName],
        }));
    };
    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!showSidebar || keyCode !== 27) return;
            setShowSidebar(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", showSidebar);
        if (showSidebar) {
            document.querySelector("body").classList.add("sidebar-expanded");
        } else {
            document.querySelector("body").classList.remove("sidebar-expanded");
        }
    }, [showSidebar]);
    return (
        <div
            ref={sidebar}
            className={`bg-white dark:bg-black border-r border-gray-200 dark:border-gray-900 z-30 lg:w-80 min-w-64 fixed ${showSidebar ? 'lg:sticky' : 'hidden'} overflow-y-auto min-h-screen`}>
            <div className="flex justify-between my-4 px-3">
                <img src={codPowerGroupLogo} alt="cod power group logo" className="w-20" />
                {showSidebar && (
                    <Button ref={trigger} onClick={() => setShowSidebar(!showSidebar)} isIconOnly variant="light">
                        <SidebarLeft01Icon />
                    </Button>
                )}
            </div>

            <div className="px-4 my-12">
                <h3 className="my-2 text-gray-600">Menu</h3>

                <ul className="flex flex-col gap-2 dark:text-gray-400 text-gray-600">
                    {RoutesConfig.filter(route => route.showInSidebar).map((route, index) => (
                        <li key={index}>
                            {/* Check if the route has children */}
                            {route.children ? (
                                <>
                                    <button
                                        onClick={() => toggleRoute(route.name)}
                                        className={`flex w-full justify-between items-center px-2 py-2 rounded-xl hover:bg-dark_selected_hover hover:text-white ${pathname.startsWith(`/${route.path}`) ? "bg-dark_selected text-white" : ""
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            {React.createElement(route.icon, { className: "mr-2 ml-1", size: 20 })}
                                            {route.name}
                                        </div>
                                        {expandedRoutes[route.name] ? (
                                            <ArrowUp01Icon className="mr-2 ml-1" size="20" />
                                        ) : (
                                            <ArrowDown01Icon className="mr-2 ml-1" size="20" />
                                        )}
                                    </button>
                                    {/* Render children if expanded */}
                                    {expandedRoutes[route.name] && (
                                        <ul className="pl-4">
                                            {route.children.map((child, childIndex) => (
                                                <li key={childIndex} className="ml-6">
                                                    {/* Check if child has its own children (nested inside child) */}
                                                    {child.children ? (
                                                        <>
                                                            <button
                                                                onClick={() => toggleRoute(child.name)}
                                                                className={`flex w-full justify-between items-center px-2 py-2 rounded-xl hover:bg-dark_selected_hover hover:text-white ${pathname.startsWith(`/${child.path}`) ? "text-dark_selected" : ""
                                                                    }`}
                                                            >
                                                                <div className="flex items-center">

                                                                    {child.name}
                                                                </div>
                                                                {expandedRoutes[child.name] ? (
                                                                    <ArrowUp01Icon className="mr-2 ml-1" size="20" />
                                                                ) : (
                                                                    <ArrowDown01Icon className="mr-2 ml-1" size="20" />
                                                                )}
                                                            </button>
                                                            {/* Render grandchild routes if expanded */}

                                                            {expandedRoutes[child.name] && (
                                                                <ul className="pl-4">
                                                                    {child.children.map((grandChild, grandChildIndex) => (
                                                                        <li
                                                                            key={grandChildIndex}
                                                                            className={`flex justify-between items-center ml-6 px-2 py-2 rounded-xl hover:text-dark_selected_hover ${pathname === grandChild.path ? "text-dark_selected" : "text-gray-600 dark:text-gray-400"} hover:text-blue-600 dark:hover:text-blue-400`}
                                                                        >
                                                                            <Link to={grandChild.path} className="flex w-full items-center">
                                                                                {grandChild.name}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <Link
                                                            to={child.path}
                                                            className={`flex w-full items-center px-2 py-2 rounded-xl hover:bg-dark_selected_hover hover:text-white ${pathname === child.path ? "text-dark_selected" : "text-gray-600 dark:text-gray-400"} 
                                                            hover:text-blue-600 dark:hover:text-blue-400`}
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to={route.path}
                                    className={`flex w-full items-center px-2 py-2 rounded-xl hover:bg-dark_selected_hover hover:text-white ${pathname.startsWith(`/${route.path}`) ? "bg-dark_selected text-white" : ""
                                        }`}
                                >
                                    {React.createElement(route.icon, { className: "mr-2 ml-1", size: 20 })}
                                    {route.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>


                <div className="mt-24 px-2">
                    <h3 className="text-gray-600 mb-2 mt-4">System</h3>
                    <ul className=" dark:text-gray-400 text-gray-600">
                        <li className="px-2 py-2">
                            <Link to="#" className="flex w-full flex-row justify-between items-center">
                                <span className="flex w-full gap-1">
                                    <MoonCloudIcon className="mr-2 ml-1" size="20" />
                                    Dark Mode
                                </span>
                                <ThemeToggle />
                            </Link>
                        </li>
                        <li className="px-2 py-2">
                            <Link to="#" className="flex w-full">
                                <span className="flex w-full gap-1">
                                    <Settings02Icon className="mr-2 ml-1" size="20" />
                                    Settings
                                </span>
                            </Link>
                        </li>
                        <li className="px-2 py-2">
                            <Link to="#" className="flex w-full">
                                <span className="flex w-full gap-1">
                                    <Share08Icon className="mr-2 ml-1" size="20" />
                                    Referrals
                                </span>
                            </Link>
                        </li>
                        <li className="px-2 py-2">
                            <Link to="#" className="flex w-full">
                                <span className="flex w-full gap-1">
                                    <HelpCircleIcon className="mr-2 ml-1" size="20" />
                                    Help
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}