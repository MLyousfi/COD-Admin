import { NavbarMenu, NavbarMenuItem } from '@nextui-org/navbar';
import { Cancel01Icon, HelpCircleIcon, MoonCloudIcon, Settings02Icon, Share08Icon, SidebarLeft01Icon } from 'hugeicons-react';
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@nextui-org/button";
import codPowerGroupLogo from "@shared/assets/images/cod-power-group-logo.svg";
import codPowerGroupLogoDark from "@shared/assets/images/cod-logo-dark.svg";
import ThemeToggle from "@/modules/dashboard/components/ThemeToggle.jsx";
import { RouteNames, RoutesConfig } from "@/core/constants/routes.js";
import { useThemeProvider } from "../../../../core/providers/ThemeContext";
import { AnimatePresence, motion } from 'framer-motion';
import { setShowReSidebar } from '../../../../core/redux/slices/sidebarSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function ResideBar() {
    const location = useLocation();
    const { pathname } = location;
    const trigger = useRef(null);
    const sidebar = useRef(null);
    const [expandedRoutes, setExpandedRoutes] = useState({});
    const { currentTheme } = useThemeProvider();

    // reduuuux 
    const dispatch = useDispatch();
    const showSidebar = useSelector((state) => state.sidebar.showReSidebar);
    const HandleSetShowSidebar = (v) => {
        dispatch(setShowReSidebar(v));
    }


    const toggleRoute = (routePath) => {
        setExpandedRoutes((prev) => ({
            ...prev,
            [routePath]: !prev[routePath],
        }));
    };

    // Keep parent, child, and grandchild routes expanded when any nested route is active
    useEffect(() => {
        RoutesConfig.forEach((route) => {
            if (route.children) {
                const isParentActive = route.children.some((child) => {
                    // Replace includes with precise matching
                    const isChildActive = pathname === child.path || pathname.startsWith(`${child.path}/`);
                    const isGrandchildActive =
                        child.children &&
                        child.children.some((grandChild) => pathname === grandChild.path || pathname.startsWith(`${grandChild.path}/`));

                    return isChildActive || isGrandchildActive;
                });

                if (isParentActive) {
                    setExpandedRoutes((prev) => ({
                        ...prev,
                        [route.path]: true,
                    }));
                }

                // If a grandchild route is active, expand the child route
                route.children.forEach((child) => {
                    const isGrandchildActive =
                        child.children &&
                        child.children.some((grandChild) => pathname === grandChild.path || pathname.startsWith(`${grandChild.path}/`));

                    if (isGrandchildActive) {
                        setExpandedRoutes((prev) => ({
                            ...prev,
                            [child.path]: true,
                        }));
                    }
                });
            }
        });
    }, [pathname]);

    // Close sidebar on ESC key press
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!showSidebar || keyCode !== 27) return;
            HandleSetShowSidebar(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    }, [showSidebar, HandleSetShowSidebar]);

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
            if (route.children && route.children.some(child => pathname === child.path || pathname.startsWith(`${child.path}/`))) {
                scrollToItem(route.path);

                newExpandedRoutes[route.path] = true; // Use route.path instead of route.name
                route.children.forEach((child) => {
                    if (pathname === child.path || pathname.startsWith(`${child.path}/`)) {
                        newExpandedRoutes[child.path] = true; // Use child.path instead of child.name
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

    const pathMapWithNotif = {};

    RoutesConfig.forEach((route) => {
        if (route.path) {
            pathMapWithNotif[route.path] = { notifNum: 0 };
        }
        if (route.children) {
            route.children.forEach((child) => {
                const childPath = child.path;
                pathMapWithNotif[childPath] = {
                    notifNum: childPath === "/call-center-manager/agents-requests" ? 10 : 0,
                };

                if (child.children) {
                    child.children.forEach((grandChild) => {
                        pathMapWithNotif[grandChild.path] = { notifNum: 0 };
                    });
                }
            });
        }
    });

    return (
        // w-10/12
        <AnimatePresence>
            {showSidebar && <div onClick={() => HandleSetShowSidebar(false)}
                className={`lg:hidden backdrop-blur-xl backdrop-saturate-150 z-30 fixed inset-0 p-0 h-screen bg-gray-500/10`}>

                <motion.div
                    layout
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 0.3 }}
                    exit={{ width: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="flex max-w-80 flex-col overflow-y-auto h-full mr-auto bg-base_light dark:bg-base_dark"
                >
                    <div className="flex justify-between items-center my-6 px-6">
                        <Link to='/dashboard' onClick={() => HandleSetShowSidebar(false)}>
                            {currentTheme === 'light' ? (
                                <img src={codPowerGroupLogo} alt="cod power group logo" className="w-20" />
                            ) : (
                                <img src={codPowerGroupLogoDark} alt="cod power group logo" className="w-20" />
                            )}
                        </Link>
                        {showSidebar && (
                            <Button ref={trigger} onClick={() => HandleSetShowSidebar(!showSidebar)} isIconOnly variant="light">
                                <SidebarLeft01Icon />
                            </Button>
                        )}
                    </div>

                    <div className="px-4 my-12">
                        <h3 className="my-2 text-gray-600"></h3>

                        <ul className="flex flex-col gap-2 dark:text-gray-400 text-gray-600">
                            {RoutesConfig.filter(route => route.showInSidebar && route.path).map((route, index) => {
                                const isActiveParent = route.children && route.children.some((child) => {
                                    // Replace includes with precise matching
                                    const isChildActive = pathname === child.path || pathname.startsWith(`${child.path}/`);
                                    const isGrandchildActive =
                                        child.children &&
                                        child.children.some((grandChild) => pathname === grandChild.path || pathname.startsWith(`${grandChild.path}/`));

                                    return isChildActive || isGrandchildActive;
                                });

                                return (
                                    <li key={route.path}>
                                        {route.children ? (
                                            <>
                                                <button
                                                    id={route.path}
                                                    onClick={() => toggleRoute(route.path)} // Use route.path
                                                    className={`flex w-full justify-between items-center px-2 py-2 rounded-xl hover:bg-dark_selected_hover hover:text-black hover:dark:text-white
                                                    ${isActiveParent || pathname === route.path ? "bg-glb_blue text-white" : ""}`}
                                                >
                                                    <div className="flex items-center">
                                                        {React.createElement(route.icon, { className: "mr-2 ml-1", size: 20 })}
                                                        {showSidebar && route.name} {/* Conditionally render name */}
                                                    </div>
                                                </button>
                                                {expandedRoutes[route.path] && ( // Use route.path
                                                    <ul className="pl-4">
                                                        {route.children.map((child, childIndex) => {
                                                            const isActiveChild = pathname === child.path || pathname.startsWith(`${child.path}/`);
                                                            const isActiveGrandchild =
                                                                child.children &&
                                                                child.children.some((grandChild) => pathname === grandChild.path || pathname.startsWith(`${grandChild.path}/`));

                                                            return (
                                                                <li key={child.path} className="ml-6">
                                                                    {child.children ? (
                                                                        <>
                                                                            <button
                                                                                onClick={() => toggleRoute(child.path)} // Use child.path
                                                                                className={`flex w-full justify-between items-center px-2 py-2 ml-9 rounded-xl 
                                                                                    ${isActiveChild || isActiveGrandchild ? "text-dark_selected" : "text-gray-600 dark:text-white "}  
                                                                                    hover:text-blue-600 dark:hover:text-blue-400`}
                                                                            >
                                                                                <div className="flex items-center">
                                                                                    {child.name}
                                                                                </div>
                                                                            </button>
                                                                            {expandedRoutes[child.path] && ( // Use child.path
                                                                                <ul className="pl-4">
                                                                                    {child.children.map((grandChild, grandChildIndex) => (
                                                                                        <li
                                                                                            key={grandChild.path}
                                                                                            className={`flex justify-between items-center ml-18 px-2 py-2 ml-16 rounded-xl  
                                                                                            ${pathname === grandChild.path ? "text-dark_selected" : "text-gray-600 dark:text-white"} 
                                                                                            hover:text-blue-600 dark:hover:text-blue-400`}
                                                                                        >
                                                                                            <Link
                                                                                                onClick={() => {
                                                                                                    HandleSetShowSidebar(false);
                                                                                                }}
                                                                                                to={grandChild.path}
                                                                                                className="flex w-full items-center"
                                                                                            >
                                                                                                {grandChild.name}
                                                                                            </Link>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <Link
                                                                            onClick={() => {
                                                                                HandleSetShowSidebar(false);
                                                                            }}
                                                                            to={child.path}
                                                                            className={`flex w-full items-center px-2 py-2 rounded-xl 
                                                                            ${pathname === child.path ? "text-dark_selected" : "text-gray-600 dark:text-white "} 
                                                                            hover:text-blue-600 dark:hover:text-blue-400`}
                                                                        ><motion.div
                                                                            initial={{
                                                                                scale: 0.8,
                                                                                opacity: 0,
                                                                                y: 10,
                                                                            }}
                                                                            animate={{
                                                                                scale: 1,
                                                                                opacity: 1,
                                                                                y: 0,
                                                                            }}
                                                                            transition={{
                                                                                type: "spring",
                                                                                stiffness: 300,
                                                                                damping: 15,
                                                                                bounce: 0.5,
                                                                            }}
                                                                            className={`flex justify-center text-[11px] items-center p-1 rounded-full ${pathMapWithNotif &&
                                                                                pathMapWithNotif[
                                                                                    child.path
                                                                                ].notifNum !== 0
                                                                                ? "bg-glb_red"
                                                                                : ""
                                                                                }  w-6 h-6 mr-3 text-white`}
                                                                        >
                                                                                {pathMapWithNotif &&
                                                                                    pathMapWithNotif[
                                                                                        child.path
                                                                                    ].notifNum !== 0
                                                                                    ? pathMapWithNotif[
                                                                                        child.path
                                                                                    ].notifNum
                                                                                    : ""}
                                                                            </motion.div>
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
                                                className={`flex w-full items-center px-2 py-2 rounded-xl hover:bg-dark_selected_hover hover:text-black hover:dark:text-white  
                                                ${isActiveParent || pathname === route.path ? "bg-glb_blue text-white" : ""}`}
                                            >
                                                {React.createElement(route.icon, { className: "mr-2 ml-1", size: 20 })}
                                                {showSidebar && route.name} {/* Conditionally render name */}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                        {/* 
                        <div className="mt-24 px-2">
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
                        </div> 
                        */}
                    </div>
                </motion.div>
            </div>}
        </AnimatePresence>
    )
}
