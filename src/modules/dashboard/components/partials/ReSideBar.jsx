
import { NavbarMenu, NavbarMenuItem } from '@nextui-org/navbar'
import { Cancel01Icon, HelpCircleIcon, MoonCloudIcon, Settings02Icon, Share08Icon, SidebarLeft01Icon } from 'hugeicons-react'
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@nextui-org/button";
import codPowerGroupLogo from "@shared/assets/images/cod-power-group-logo.svg";
import codPowerGroupLogoDark from "@shared/assets/images/cod-logo-dark.svg";
import ThemeToggle from "@/modules/dashboard/components/ThemeToggle.jsx";
import { RouteNames, RoutesConfig } from "@/core/constants/routes.js";
import { useThemeProvider } from "../../../../core/providers/ThemeContext";
import { motion } from 'framer-motion';

export default function ResideBar({ showSidebar, setShowSidebar }) {
    const location = useLocation();
    const { pathname } = location;
    const trigger = useRef(null);
    const sidebar = useRef(null);
    const [expandedRoutes, setExpandedRoutes] = useState({});
    const { currentTheme } = useThemeProvider();

    const toggleRoute = (routeName) => {
        setExpandedRoutes((prev) => ({
            ...prev,
            [routeName]: !prev[routeName],
        }));
    };

    // Keep parent, child, and grandchild routes expanded when any nested route is active
    useEffect(() => {
        RoutesConfig.forEach((route) => {
            if (route.children) {
                const isParentActive = route.children.some((child) => {
                    // Check if any grandchild route is active
                    const isChildActive = pathname.includes(child.path);
                    const isGrandchildActive =
                        child.children &&
                        child.children.some((grandChild) => pathname.includes(grandChild.path));

                    return isChildActive || isGrandchildActive;
                });

                if (isParentActive) {
                    setExpandedRoutes((prev) => ({
                        ...prev,
                        [route.name]: true,
                    }));
                }

                // If a grandchild route is active, expand the child route
                route.children.forEach((child) => {
                    const isGrandchildActive =
                        child.children &&
                        child.children.some((grandChild) => pathname.includes(grandChild.path));

                    if (isGrandchildActive) {
                        setExpandedRoutes((prev) => ({
                            ...prev,
                            [child.name]: true,
                        }));
                    }
                });
            }
        });
    }, [pathname]);

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


    const scrollToItem = (route) => {
        const element = document.getElementById(route);
        element?.scrollIntoView({ behavior: 'instant', block: "center" });
    };
    const expandCurrentRouteOnly = () => {
        let newExpandedRoutes = {};

        RoutesConfig.forEach((route) => {
            if (route.children && route.children.some(child => pathname.includes(child.path))) {
                scrollToItem(route.path);

                newExpandedRoutes[route.name] = true;
                route.children.forEach((child) => {
                    if (pathname.includes(child.path)) {
                        newExpandedRoutes[child.name] = true;
                    }
                });
            }
        });

        setExpandedRoutes(newExpandedRoutes);
    };

    // Toggle sidebar and keep only current route expanded
    useEffect(() => {
        if (showSidebar) {
            expandCurrentRouteOnly();

        }
    }, [showSidebar, pathname]);



    return (
        // w-10/12
        <div onClick={() => setShowSidebar(false)}
            className={`${showSidebar ? 'block' : 'hidden'} lg:hidden backdrop-blur-xl backdrop-saturate-150 z-30 fixed inset-0 p-0 h-screen  bg-gray-500/10`}>
            {showSidebar &&

                <motion.div layout initial={{ width: 0 }} animate={{ width: '80%' }} exit={{ width: 0 }} onClick={(e) => e.stopPropagation()} className="flex max-w-80 flex-col overflow-y-auto h-full mr-auto bg-base_light dark:bg-base_dark">
                    <div className="flex justify-between items-center my-6 px-6">
                        <Link to='/dashboard' onClick={() => setShowSidebar(false)} >{currentTheme === 'light' ? <img src={codPowerGroupLogo} alt="cod power group logo" className="w-20" /> :
                            <img src={codPowerGroupLogoDark} alt="cod power group logo" className="w-20" />}</Link>
                        {showSidebar && (
                            <Button ref={trigger} onClick={() => setShowSidebar(!showSidebar)} isIconOnly variant="light">
                                <SidebarLeft01Icon />
                            </Button>
                        )}
                    </div>

                    <div className="px-4 my-12">
                        <h3 className="my-2 text-gray-600">Menu</h3>

                        <ul className="flex flex-col gap-2 dark:text-gray-400 text-gray-600">
                            {RoutesConfig.filter(route => route.showInSidebar && route.path).map((route, index) => {
                                const isActiveParent = route.children && route.children.some((child) => {
                                    // Check if any child or grandchild route is active
                                    const isChildActive = pathname.includes(child.path);
                                    const isGrandchildActive =
                                        child.children &&
                                        child.children.some((grandChild) => pathname.includes(grandChild.path));

                                    return isChildActive || isGrandchildActive;
                                });

                                return (
                                    <li key={index}>
                                        {route.children ? (
                                            <>
                                                <button id={route.path}
                                                    onClick={() => toggleRoute(route.name)}
                                                    className={`flex w-full justify-between items-center px-2 py-2 rounded-xl hover:bg-dark_selected_hover hover:text-white 
                                            ${isActiveParent || pathname.includes("/" + route.path) ? "bg-glb_blue text-white" : ""}`}
                                                >
                                                    <div className="flex items-center">
                                                        {React.createElement(route.icon, { className: "mr-2 ml-1", size: 20 })}
                                                        {route.name}
                                                    </div>
                                                </button>
                                                {expandedRoutes[route.name] && (
                                                    <ul className="pl-4">
                                                        {route.children.map((child, childIndex) => {
                                                            const isActiveChild = pathname.includes(child.path);
                                                            const isActiveGrandchild =
                                                                child.children &&
                                                                child.children.some((grandChild) => pathname.includes(grandChild.path));

                                                            return (
                                                                <li key={childIndex} className="ml-6">
                                                                    {child.children ? (
                                                                        <>
                                                                            <button
                                                                                onClick={() => toggleRoute(child.name)}
                                                                                className={`flex w-full justify-between items-center px-2 py-2 rounded-xl ${isActiveChild || isActiveGrandchild ? "text-dark_selected" : "text-gray-600 dark:text-white"}  
                                                                        hover:text-blue-600 dark:hover:text-blue-400`}
                                                                            >
                                                                                <div className="flex items-center">
                                                                                    {child.name}
                                                                                </div>
                                                                            </button>
                                                                            {expandedRoutes[child.name] && (
                                                                                <ul className="pl-4">
                                                                                    {child.children.map((grandChild, grandChildIndex) => (
                                                                                        <li
                                                                                            key={grandChildIndex}
                                                                                            className={`flex justify-between items-center ml-6 px-2 py-2 rounded-xl ${pathname === grandChild.path ? "text-dark_selected" : "text-gray-600 dark:text-white"} hover:text-blue-600 dark:hover:text-blue-400`}
                                                                                        >
                                                                                            <Link onClick={() => setShowSidebar(false)} to={grandChild.path} className="flex w-full items-center">
                                                                                                {grandChild.name}
                                                                                            </Link>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <Link onClick={() => setShowSidebar(false)}
                                                                            to={child.path}
                                                                            className={`flex w-full items-center px-2 py-2 rounded-xl ${pathname === child.path ? "text-dark_selected" : "text-gray-600 dark:text-white "} hover:text-blue-600 dark:hover:text-blue-400 `}
                                                                        >
                                                                            {child.name}
                                                                        </Link>
                                                                    )}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                )}
                                            </>
                                        ) : (
                                            <Link
                                                id={route.path}
                                                to={route.path}
                                                className={`flex w-full items-center px-2 py-2 rounded-xl hover:bg-dark_selected_hover hover:text-white  ${isActiveParent || pathname.includes(route.path) ? "bg-glb_blue text-white" : ""}`}
                                            >
                                                {React.createElement(route.icon, { className: "mr-2 ml-1", size: 20 })}
                                                {route.name}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                        {/* <div className="mt-24 px-2">
                            <h3 className="text-gray-600 mb-2 mt-4">System</h3>
                            <ul className="dark:text-gray-400 text-gray-600">
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
                                            Help & FAQ
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </motion.div>}
        </div>
    )
}
