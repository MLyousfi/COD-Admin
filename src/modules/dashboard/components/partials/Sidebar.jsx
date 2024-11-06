import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@nextui-org/button";
import codPowerGroupLogo from "@shared/assets/images/cod-power-group-logo.svg";
import codPowerGroupLogoDark from "@shared/assets/images/cod-logo-dark.svg";
import {
    SidebarLeft01Icon,
    MoonCloudIcon,
    Settings02Icon,
    Share08Icon,
    HelpCircleIcon,
    Sun02Icon,
    Moon02Icon,
} from "hugeicons-react";
import ThemeToggle from "@/modules/dashboard/components/ThemeToggle.jsx";
import { RouteNames, RoutesConfig } from "@/core/constants/routes.js";
import { useThemeProvider } from "../../../../core/providers/ThemeContext";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import { setShowSidebar } from "../../../../core/redux/slices/sidebarSlice";

export default function Sidebar() {
    const location = useLocation();
    const { currentTheme } = useThemeProvider();
    const { pathname } = location;
    const sidebar = useRef(null);
    const [expandedRoutes, setExpandedRoutes] = useState({});
    const [scrollPosition, setScrollPosition] = useState(0);


    // reduuux
    // reduuuux 
    const dispatch = useDispatch();
    const sidebarEpingled = useSelector((state) => state.sidebar.sidebarEpingled);
    const showSidebar = useSelector((state) => state.sidebar.sidebarEpingled ? true : state.sidebar.showSidebar);
    const HandleSetShowSidebar = (v) => {
        dispatch(setShowSidebar(v));
    }



    const toggleRoute = (routePath) => {
        setExpandedRoutes((prev) => ({
            ...prev,
            [routePath]: !prev[routePath],
        }));
    };

    const openRoute = (routePath) => {
        setExpandedRoutes((prev) => {
            if (prev[routePath]) {
                return prev;
            }
            return {
                ...prev,
                [routePath]: true,
            };
        });
    };

    useEffect(() => {
        RoutesConfig.forEach((route) => {
            if (route.children) {
                const isParentActive = route.children.some((child) => {
                    const isChildActive =
                        pathname === child.path || pathname.startsWith(`${child.path}/`);
                    const isGrandchildActive =
                        child.children &&
                        child.children.some(
                            (grandChild) =>
                                pathname === grandChild.path ||
                                pathname.startsWith(`${grandChild.path}/`)
                        );

                    return isChildActive || isGrandchildActive;
                });

                if (isParentActive) {
                    setExpandedRoutes((prev) => ({
                        ...prev,
                        [route.path]: true,
                    }));
                }

                route.children.forEach((child) => {
                    const isGrandchildActive =
                        child.children &&
                        child.children.some(
                            (grandChild) =>
                                pathname === grandChild.path ||
                                pathname.startsWith(`${grandChild.path}/`)
                        );

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



    useEffect(() => {
        if (showSidebar) {
            sidebar.current.scrollTop = scrollPosition;
        } else {
            setScrollPosition(sidebar.current.scrollTop);
        }
    }, [showSidebar, scrollPosition]);

    const scrollToItem = (route) => {
        const element = document.getElementById(route);
        element?.scrollIntoView({ behavior: "instant", block: "center" });
    };

    const expandCurrentRouteOnly = () => {
        let newExpandedRoutes = {};

        RoutesConfig.forEach((route) => {
            if (route.children && route.children.some((child) => pathname.startsWith(child.path))) {
                scrollToItem(route.path);
                newExpandedRoutes[route.path] = true;
                route.children.forEach((child) => {
                    if (pathname === child.path || pathname.startsWith(`${child.path}/`)) {
                        newExpandedRoutes[child.path] = true;
                    }
                });
            }
        });

        setExpandedRoutes(newExpandedRoutes);
    };

    useEffect(() => {
        if (showSidebar) {
            expandCurrentRouteOnly();
        } else {
            setExpandedRoutes({});
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
        <motion.div
            transition={{ duration: 0.2 }}
            ref={sidebar}
            onMouseEnter={() => HandleSetShowSidebar(true)}
            onMouseLeave={() => HandleSetShowSidebar(false)}
            className={`${showSidebar ? "hidden lg:block lg:w-80 lg:min-w-64" : "hidden lg:block lg:w-14"
                } fixed left-0 top-0 bottom-0 overflow-x-hidden bg-base_light dark:bg-transparent border-r border-gray-200 
            dark:border-[#ffffff10] z-30 overflow-y-auto max-h-screen`}
        >
            <div
                className={`flex justify-between items-center ${showSidebar ? "my-6 px-6" : "my-6 px-2"
                    } h-10`}
            >
                <Link to="/dashboard">
                    {currentTheme === "light" ? (
                        <img
                            src={codPowerGroupLogo}
                            alt="cod power group logo"
                            className="w-20"
                        />
                    ) : (
                        <img
                            src={codPowerGroupLogoDark}
                            alt="cod power group logo"
                            className="w-20"
                        />
                    )}
                </Link>

            </div>

            <div className={`${showSidebar ? "px-4 my-12" : "p-0 my-12"}`}>
                <h3
                    className={`my-2 ${showSidebar ? "" : "text-center"
                        } text-gray-600`}
                >
                    {showSidebar ? "Menu" : "M"}
                </h3>
                <ul
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-2 dark:text-gray-400 text-gray-600"
                >
                    {RoutesConfig.filter((route) => route.showInSidebar && route.path).map(
                        (route) => {
                            const isActiveParent =
                                route.children &&
                                route.children.some((child) => {
                                    const isChildActive =
                                        pathname === child.path ||
                                        pathname.startsWith(`${child.path}/`);
                                    const isGrandchildActive =
                                        child.children &&
                                        child.children.some(
                                            (grandChild) =>
                                                pathname === grandChild.path ||
                                                pathname.startsWith(`${grandChild.path}/`)
                                        );

                                    return isChildActive || isGrandchildActive;
                                });

                            return (
                                <li key={route.path}>
                                    {route.children ? (
                                        <div id={route.path}>
                                            <button
                                                id={route.path}
                                                onClick={() => toggleRoute(route.path)}
                                                className={`flex ${showSidebar
                                                    ? "w-full justify-between"
                                                    : "w-[50px] mx-auto justify-start"
                                                    } items-center py-2 rounded-xl hover:bg-dark_selected_hover hover:text-black hover:dark:text-white
                                                ${isActiveParent || pathname === route.path
                                                        ? "bg-glb_blue text-white"
                                                        : ""
                                                    }`}
                                            >
                                                <div
                                                    className={`flex w-full items-center ${showSidebar
                                                        ? "px-2"
                                                        : "justify-center"
                                                        }`}
                                                >
                                                    {showSidebar ? (
                                                        <>
                                                            {React.createElement(route.icon, {
                                                                className: "mr-2 ml-1",
                                                                size: 20,
                                                            })}
                                                            <motion.h4
                                                                initial={{ x: 100 }}
                                                                animate={{ x: 0 }}
                                                            >
                                                                {route.name}
                                                            </motion.h4>
                                                        </>
                                                    ) : (
                                                        React.createElement(route.icon, { size: 20 })
                                                    )}
                                                </div>
                                            </button>
                                            {expandedRoutes[route.path] && showSidebar && (
                                                <ul className="pl-4">
                                                    {route.children.map((child) => {
                                                        const isActiveChild =
                                                            pathname === child.path ||
                                                            pathname.startsWith(
                                                                `${child.path}/`
                                                            );
                                                        const isActiveGrandchild =
                                                            child.children &&
                                                            child.children.some(
                                                                (grandChild) =>
                                                                    pathname === grandChild.path ||
                                                                    pathname.startsWith(
                                                                        `${grandChild.path}/`
                                                                    )
                                                            );

                                                        return (
                                                            <li key={child.path} className="ml-6">
                                                                {child.children ? (
                                                                    <>
                                                                        <button
                                                                            onClick={() =>
                                                                                toggleRoute(child.path)
                                                                            }
                                                                            className={`flex w-full justify-between items-center px-11 py-2 rounded-xl ${isActiveChild ||
                                                                                isActiveGrandchild
                                                                                ? "text-dark_selected"
                                                                                : "text-gray-600 dark:text-white"
                                                                                } hover:text-blue-600 dark:hover:text-blue-400`}
                                                                        >
                                                                            <div className="flex items-center">
                                                                                {child.name}
                                                                            </div>
                                                                        </button>
                                                                        {expandedRoutes[child.path] &&
                                                                            showSidebar && (
                                                                                <ul className="pl-20">
                                                                                    {child.children.map(
                                                                                        (grandChild) => (
                                                                                            <li
                                                                                                key={grandChild.path}
                                                                                                className={`flex justify-between items-center ml-2 px-[10px] py-2 rounded-xl ${pathname ===
                                                                                                    grandChild.path
                                                                                                    ? "text-dark_selected"
                                                                                                    : "text-gray-600 dark:text-white"
                                                                                                    } hover:text-blue-600 dark:hover:text-blue-400`}
                                                                                            >
                                                                                                <Link
                                                                                                    to={grandChild.path}
                                                                                                    className="flex w-full items-center"
                                                                                                >
                                                                                                    {grandChild.name}
                                                                                                </Link>
                                                                                            </li>
                                                                                        )
                                                                                    )}
                                                                                </ul>
                                                                            )}
                                                                    </>
                                                                ) : (
                                                                    <Link
                                                                        to={child.path}
                                                                        className={`flex w-full items-center px-2 py-2 rounded-xl ${pathname === child.path
                                                                            ? "text-dark_selected"
                                                                            : "text-gray-600 dark:text-white "
                                                                            } hover:text-blue-600 dark:hover:text-blue-400`}
                                                                    >
                                                                        <motion.div
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
                                        </div>
                                    ) : (
                                        <Link
                                            id={route.path}
                                            to={route.path}
                                            className={`flex items-center ${showSidebar
                                                ? "px-2 w-full justify-start"
                                                : "w-[50px] mx-auto justify-center"
                                                } py-2 rounded-xl hover:bg-dark_selected_hover hover:text-black hover:dark:text-white ${isActiveParent || pathname === route.path
                                                    ? "bg-glb_blue text-white"
                                                    : ""
                                                }`}
                                        >
                                            {showSidebar ? (
                                                <>
                                                    {React.createElement(route.icon, {
                                                        className: "mr-2 ml-1",
                                                        size: 20,
                                                    })}
                                                    <motion.h4
                                                        initial={{ x: 100 }}
                                                        animate={{ x: 0 }}
                                                    >
                                                        {route.name}
                                                    </motion.h4>
                                                </>
                                            ) : (
                                                React.createElement(route.icon, { size: 20 })
                                            )}
                                        </Link>
                                    )}
                                </li>
                            );
                        }
                    )}
                </ul>

                <div className={`mt-24 ${showSidebar ? "px-2" : ""}`}>
                    <h3
                        className={`my-2 ${showSidebar ? "" : "text-center"
                            } text-gray-600`}
                    >
                        {showSidebar ? "System" : "S"}
                    </h3>

                    <ul className="dark:text-gray-400 text-gray-600">
                        <li className={`${showSidebar ? "px-2" : ""} py-2`}>
                            {showSidebar && (
                                <Link to="#" className="flex w-full flex-row justify-between items-center">
                                    <span className="flex w-full gap-1">
                                        <MoonCloudIcon
                                            className={`${showSidebar ? "mr-2 ml-1" : ""
                                                }`}
                                            size="20"
                                        />
                                        Dark Mode
                                    </span>
                                    <ThemeToggle />
                                </Link>
                            )}
                        </li>
                        <li className={`${showSidebar ? "px-2" : ""} py-2`}>
                            <Link
                                state={{ from: pathname }}
                                to="/settings"
                                className="flex w-full hover:text-black hover:dark:text-white"
                            >
                                <span
                                    className={`flex w-full gap-1 ${showSidebar
                                        ? ""
                                        : "items-center justify-center"
                                        }`}
                                >
                                    <Settings02Icon
                                        className={`${showSidebar ? "mr-2 ml-1" : ""
                                            }`}
                                        size="20"
                                    />
                                    {showSidebar && "Settings"}
                                </span>
                            </Link>
                        </li>
                        <li className={`${showSidebar ? "px-2" : ""} py-2`}>
                            <Link
                                state={{ from: pathname }}
                                to="/referrals"
                                className="flex w-full hover:text-black hover:dark:text-white"
                            >
                                <span
                                    className={`flex w-full gap-1 ${showSidebar
                                        ? ""
                                        : "items-center justify-center"
                                        }`}
                                >
                                    <Share08Icon
                                        className={`${showSidebar ? "mr-2 ml-1" : ""
                                            }`}
                                        size="20"
                                    />
                                    {showSidebar && "Referrals"}
                                </span>
                            </Link>
                        </li>
                        <li className={`${showSidebar ? "px-2" : ""} py-2`}>
                            <Link
                                state={{ from: pathname }}
                                to="/help"
                                className="flex w-full hover:text-black hover:dark:text-white"
                            >
                                <span
                                    className={`flex w-full gap-1 ${showSidebar
                                        ? ""
                                        : "items-center justify-center"
                                        }`}
                                >
                                    <HelpCircleIcon
                                        className={`${showSidebar ? "mr-2 ml-1" : ""
                                            }`}
                                        size="20"
                                    />
                                    {showSidebar && "Help & FAQ"}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
