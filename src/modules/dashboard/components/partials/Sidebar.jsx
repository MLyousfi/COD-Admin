import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@nextui-org/button";
import codPowerGroupLogo from "@shared/assets/images/cod-power-group-logo.svg";
import codPowerGroupLogoDark from "@shared/assets/images/cod-logo-dark.svg";
import { SidebarLeft01Icon, MoonCloudIcon, Settings02Icon, Share08Icon, HelpCircleIcon, Sun02Icon, Moon02Icon } from "hugeicons-react";
import ThemeToggle from "@/modules/dashboard/components/ThemeToggle.jsx";
import { RouteNames, RoutesConfig } from "@/core/constants/routes.js";
import { useThemeProvider } from "../../../../core/providers/ThemeContext";
import { motion } from "framer-motion";

export default function Sidebar({ showSidebar, setShowSidebar }) {
    const location = useLocation();
    const { currentTheme, changeCurrentTheme } = useThemeProvider();
    const { pathname } = location;
    const trigger = useRef(null);
    const sidebar = useRef(null);
    const [expandedRoutes, setExpandedRoutes] = useState({});
    const [scrollPosition, setScrollPosition] = useState(0);

    const toggleRoute = (routeName) => {
        setExpandedRoutes((prev) => ({
            ...prev,
            [routeName]: !prev[routeName],
        }));
    };
    const openRoute = (routeName) => {
        setExpandedRoutes((prev) => {
            // Check if the route is already toggled
            if (prev[routeName]) {
                return prev; // If already toggled, return the previous state unchanged
            }

            // Otherwise, toggle the route
            return {
                ...prev,
                [routeName]: true, // Set the route to expanded
            };
        });
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

    const container = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.1,       // Delay before starting the stagger
                staggerChildren: 0.05      // Delay between each child
            }
        }
    };
    useEffect(() => {
        // Restore scroll position when sidebar becomes visible
        if (showSidebar) {
            sidebar.current.scrollTop = scrollPosition;
        } else {
            // Save scroll position when sidebar is hidden
            setScrollPosition(sidebar.current.scrollTop);

        }


    }, [showSidebar]);


    const scrollToItem = (route) => {
        const element = document.getElementById(route);
        element?.scrollIntoView({ behavior: 'instant', block: "center" });
    };
    // Helper to expand only the current active route
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
        } else {
            setExpandedRoutes({});
        }
    }, [showSidebar, pathname]);

    const pathMapWithNotif = {};

    RoutesConfig.forEach(route => {

        if (route.path) {
            pathMapWithNotif[route.path] = { notifNum: 0 };
        }
        if (route.children) {
            route.children.forEach(child => {
                const childPath = child.path;
                pathMapWithNotif[childPath] = { notifNum: childPath === "/call-center-manager/agents-requests" ? 10 : 0 };

                if (child.children) {
                    child.children.forEach(grandChild => {
                        pathMapWithNotif[grandChild.path] = { notifNum: 0 };
                    });
                }
            });
        }
    });


    return (
        <motion.div layout transition={{ duration: 0.2 }}

            ref={sidebar}
            onMouseEnter={() => setShowSidebar(true)}
            onMouseLeave={() => setShowSidebar(false)}
            // ${showSidebar ? 'hidden lg:block lg:sticky' : 'hidden'}
            className={` ${showSidebar ? 'hidden lg:block lg:w-80 lg:min-w-64' : 'hidden lg:block lg:w-14'} fixed left-0 top-0 bottom-0 overflow-x-hidden bg-base_light dark:bg-transparent border-r border-gray-200 
            dark:border-[#ffffff10] z-30 overflow-y-auto max-h-screen`}>
            <div className={`flex justify-between items-center ${showSidebar ? 'my-6 px-6' : 'my-6 px-2'} h-10`}>
                <Link to='/dashboard'> {currentTheme === 'light' ? <img src={codPowerGroupLogo} alt="cod power group logo" className="w-20" /> :
                    <img src={codPowerGroupLogoDark} alt="cod power group logo" className="w-20" />}</Link>
                {/* {showSidebar && (
                    <Button ref={trigger} onClick={() => setShowSidebar(!showSidebar)} isIconOnly variant="light">
                        <SidebarLeft01Icon />
                    </Button>
                )} */}
            </div>

            <div className={`${showSidebar ? 'px-4 my-12' : 'p-0 my-12'} `}>
                <h3 className={`my-2 ${showSidebar ? '' : 'text-center'} text-gray-600`}>{showSidebar ? 'Menu' : "M"}</h3>
                <ul initial="hidden"
                    animate="visible" className={`flex flex-col gap-2 dark:text-gray-400 text-gray-600`}>
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
                                    <div id={route.name}>

                                        <button
                                            id={route.path}
                                            onClick={() => toggleRoute(route.name)}
                                            className={`flex  ${showSidebar ? "w-full justify-between" : "w-[50px] mx-auto justify-start"} items-center py-2 rounded-xl hover:bg-dark_selected_hover hover:text-black hover:dark:text-white
                                            ${isActiveParent || pathname.includes("/" + route.path) ? "bg-glb_blue text-white" : ""}`}
                                        >
                                            <div className={`flex w-full items-center ${showSidebar ? " px-2" : " justify-center"}`} >
                                                {
                                                    showSidebar ? (<>{React.createElement(route.icon, { className: 'mr-2 ml-1', size: 20 })}
                                                        <motion.h4 initial={{ x: 100 }} animate={{ x: 0 }}>{route.name}</motion.h4></>) : React.createElement(route.icon, { size: 20 })
                                                }

                                            </div>
                                        </button>
                                        {expandedRoutes[route.name] && showSidebar && (
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
                                                                        className={`flex w-full justify-between items-center px-2 py-2 rounded-xl  ${isActiveChild || isActiveGrandchild ? "text-dark_selected" : "text-gray-600 dark:text-white"}  
                                                                        hover:text-blue-600 dark:hover:text-blue-400`}
                                                                    >
                                                                        <div className="flex items-center">
                                                                            {child.name}
                                                                        </div>
                                                                    </button>
                                                                    {expandedRoutes[child.name] && showSidebar && (
                                                                        <ul className="pl-4">
                                                                            {child.children.map((grandChild, grandChildIndex) => (
                                                                                <li
                                                                                    key={grandChildIndex}
                                                                                    className={`flex justify-between items-center ml-6 px-2 py-2 rounded-xl  ${pathname === grandChild.path ? "text-dark_selected" : "text-gray-600 dark:text-white"} hover:text-blue-600 dark:hover:text-blue-400`}
                                                                                >
                                                                                    <Link to={grandChild.path} className={`flex w-full items-center `}>
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
                                                                    className={`flex w-full items-center px-2 py-2 rounded-xl ${pathname === child.path ? "text-dark_selected" : "text-gray-600 dark:text-white "} hover:text-blue-600 dark:hover:text-blue-400 
                                                                `}
                                                                >
                                                                    <motion.div
                                                                        initial={{ scale: 0.8, opacity: 0, y: 10 }}
                                                                        animate={{ scale: 1, opacity: 1, y: 0 }}
                                                                        transition={{
                                                                            type: "spring",
                                                                            stiffness: 300,
                                                                            damping: 15,
                                                                            bounce: 0.5,
                                                                        }} className={`flex justify-center text-[11px] items-center p-1 rounded-full ${pathMapWithNotif && pathMapWithNotif[child.path].notifNum !== 0 ? "bg-glb_red" : ""}  w-6 h-6 mr-3 text-white`} >{pathMapWithNotif && pathMapWithNotif[child.path].notifNum !== 0 ? pathMapWithNotif[child.path].notifNum : ''}</motion.div>
                                                                    {child.name}
                                                                </Link>
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        id={route.path}
                                        to={route.path}
                                        className={`flex  items-center ${showSidebar ? "px-2 w-full justify-start" : "w-[50px] mx-auto justify-center"} py-2 rounded-xl hover:bg-dark_selected_hover hover:text-black hover:dark:text-white  ${isActiveParent || pathname.includes(route.path) ? "bg-glb_blue text-white" : ""}`}
                                    >
                                        {showSidebar ? (<>{React.createElement(route.icon, { className: 'mr-2 ml-1', size: 20 })}
                                            <motion.h4 initial={{ x: 100 }} animate={{ x: 0 }}>{route.name}</motion.h4>
                                        </>) : React.createElement(route.icon, { size: 20 })
                                        }

                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>

                <div className={`mt-24 ${showSidebar ? 'px-2' : ''}`}>
                    <h3 className={`my-2 ${showSidebar ? '' : 'text-center'} text-gray-600`}>{showSidebar ? 'System' : "S"}</h3>

                    <ul className="dark:text-gray-400 text-gray-600">
                        <li className={`${showSidebar ? 'px-2' : ''} py-2`}>
                            {showSidebar && <Link to="#" className="flex w-full flex-row justify-between items-center">
                                <span className="flex w-full gap-1">
                                    <MoonCloudIcon className={showSidebar ? "mr-2 ml-1" : ''} size="20" />
                                    Dark Mode
                                </span>
                                <ThemeToggle />
                            </Link>}
                        </li>
                        <li className={`${showSidebar ? 'px-2' : ''} py-2`}>
                            <Link state={{ from: pathname }} to="/settings" className="flex w-full hover:text-black hover:dark:text-white">
                                <span className={`flex w-full gap-1 ${showSidebar ? '' : 'items-center justify-center'} `}>
                                    <Settings02Icon className={showSidebar ? "mr-2 ml-1" : ''} size="20" />
                                    {showSidebar && "Settings"}
                                </span>
                            </Link>
                        </li>
                        <li className={`${showSidebar ? 'px-2' : ''} py-2`}>
                            <Link state={{ from: pathname }} to="/referrals" className="flex w-full hover:text-black hover:dark:text-white">
                                <span className={`flex w-full gap-1 ${showSidebar ? '' : 'items-center justify-center'} `}>
                                    <Share08Icon className={showSidebar ? "mr-2 ml-1" : ''} size="20" />
                                    {showSidebar && 'Referrals'}
                                </span>
                            </Link>
                        </li>
                        <li className={`${showSidebar ? 'px-2' : ''} py-2`}>
                            <Link state={{ from: pathname }} to="/help" className="flex w-full hover:text-black hover:dark:text-white">
                                <span className={`flex w-full gap-1 ${showSidebar ? '' : 'items-center justify-center'} `}>
                                    <HelpCircleIcon className={showSidebar ? "mr-2 ml-1" : ''} size="20" />
                                    {showSidebar && 'Help & FAQ'}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
