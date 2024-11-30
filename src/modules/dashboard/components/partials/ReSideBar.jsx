import { NavbarMenu, NavbarMenuItem } from '@nextui-org/navbar';
import {
  Cancel01Icon,
  HelpCircleIcon,
  MoonCloudIcon,
  Settings02Icon,
  Share08Icon,
  SidebarLeft01Icon,
} from 'hugeicons-react';
import React, { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@nextui-org/button';
import codPowerGroupLogo from '@shared/assets/images/cod-power-group-logo.svg';
import codPowerGroupLogoDark from '@shared/assets/images/cod-logo-dark.svg';
import ThemeToggle from '@/modules/dashboard/components/ThemeToggle.jsx';
import { RouteNames, RoutesConfig } from '@/core/constants/routes.js';
import { useThemeProvider } from '../../../../core/providers/ThemeContext';
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

  // Redux
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.sidebar.showReSidebar);

  // Memoize the handler to prevent unnecessary re-creations
  const HandleSetShowSidebar = useCallback((v) => {
    dispatch(setShowReSidebar(v));
  }, [dispatch]);

  const toggleRoute = (routePath) => {
    setExpandedRoutes((prev) => ({
      ...prev,
      [routePath]: !prev[routePath],
    }));
  };

  // Reset expandedRoutes when the sidebar is reopened
  useEffect(() => {
    if (showSidebar) {
      const newExpandedRoutes = {};

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
            newExpandedRoutes[route.path] = true;
          }

          // If a grandchild route is active, expand the child route
          route.children.forEach((child) => {
            const isGrandchildActive =
              child.children &&
              child.children.some(
                (grandChild) =>
                  pathname === grandChild.path ||
                  pathname.startsWith(`${grandChild.path}/`)
              );

            if (isGrandchildActive) {
              newExpandedRoutes[child.path] = true;
            }
          });
        }
      });

      setExpandedRoutes(newExpandedRoutes);
    }
  }, [showSidebar, pathname]);

  // Close sidebar on ESC key press
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!showSidebar || keyCode !== 27) return;
      HandleSetShowSidebar(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [showSidebar, HandleSetShowSidebar]);

  // Close sidebar when navigating to a route without submenus
  useEffect(() => {
    // Helper function to find a route by path
    const findRouteByPath = (routes, path) => {
      for (const route of routes) {
        if (route.path === path) {
          return route;
        }
        if (route.children) {
          const found = findRouteByPath(route.children, path);
          if (found) return found;
        }
      }
      return null;
    };

    const currentRoute = findRouteByPath(RoutesConfig, pathname);

    // If the current route exists and has no children, close the sidebar
    if (currentRoute && !currentRoute.children) {
      console.log(`Navigated to ${pathname}. Closing sidebar.`);
      HandleSetShowSidebar(false);
    }
  }, [pathname, RoutesConfig, HandleSetShowSidebar]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', showSidebar);
    if (showSidebar) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [showSidebar]);

  const pathMapWithNotif = {};

  RoutesConfig.forEach((route) => {
    if (route.path) {
      pathMapWithNotif[route.path] = { notifNum: 0 };
    }
    if (route.children) {
      route.children.forEach((child) => {
        const childPath = child.path;
        pathMapWithNotif[childPath] = {
          notifNum: childPath === '/call-center-manager/agents-requests' ? 10 : 0,
        };

        if (child.children) {
          child.children.forEach((grandChild) => {
            pathMapWithNotif[grandChild.path] = { notifNum: 0 };
          });
        }
      });
    }
  });

  const activeMenuItemRef = useRef(null);

  useLayoutEffect(() => {
    if (showSidebar && activeMenuItemRef.current) {
      activeMenuItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showSidebar]);

  return (
    <AnimatePresence>
      {showSidebar && (
        <div
          className="lg:hidden backdrop-blur-xl backdrop-saturate-150 z-30 fixed inset-0 p-0 h-screen bg-gray-500/10"
          onClick={() => HandleSetShowSidebar(false)}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-w-80 flex-col overflow-y-auto h-full mr-auto bg-base_light dark:bg-base_dark"
          >
            <div className="flex justify-between items-center my-6 px-6">
              <Link to="/dashboard" onClick={() => HandleSetShowSidebar(false)}>
                {currentTheme === 'light' ? (
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
              {showSidebar && (
                <Button
                  ref={trigger}
                  onClick={() => HandleSetShowSidebar(!showSidebar)}
                  isIconOnly
                  variant="light"
                >
                  <SidebarLeft01Icon />
                </Button>
              )}
            </div>

            <div className="px-4 my-12">
              <h3 className="my-2 text-gray-600"></h3>

              <ul className="flex flex-col gap-2 dark:text-gray-400 text-gray-600">
                {RoutesConfig.filter(
                  (route) => route.showInSidebar && route.path
                ).map((route) => {
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

                  const isActiveRoute = isActiveParent || pathname === route.path;

                  return (
                    <li key={route.path}>
                      {route.children ? (
                        <>
                          <button
                            id={route.path}
                            ref={isActiveRoute ? activeMenuItemRef : null}
                            onClick={() => toggleRoute(route.path)}
                            className={`flex w-full justify-between items-center px-2 py-2 rounded-xl hover:bg-dark_selected_hover hover:text-black hover:dark:text-white ${
                              isActiveRoute ? 'bg-glb_blue text-white' : ''
                            }`}
                          >
                            <div className="flex items-center">
                              {React.createElement(route.icon, {
                                className: 'mr-2 ml-1',
                                size: 20,
                              })}
                              {showSidebar && route.name}
                            </div>
                          </button>
                          {expandedRoutes[route.path] && (
                            <ul className="pl-4">
                              {route.children.map((child) => {
                                const isActiveChild =
                                  pathname === child.path ||
                                  pathname.startsWith(`${child.path}/`);
                                const isActiveGrandchild =
                                  child.children &&
                                  child.children.some(
                                    (grandChild) =>
                                      pathname === grandChild.path ||
                                      pathname.startsWith(`${grandChild.path}/`)
                                  );

                                const isActiveChildRoute =
                                  isActiveChild || isActiveGrandchild;

                                return (
                                  <li key={child.path} className="ml-6">
                                    {child.children ? (
                                      <>
                                        <button
                                          ref={
                                            isActiveChildRoute ? activeMenuItemRef : null
                                          }
                                          onClick={() => toggleRoute(child.path)}
                                          className={`flex w-full justify-between items-center px-2 py-2 ml-9 rounded-xl ${
                                            isActiveChildRoute
                                              ? 'text-dark_selected'
                                              : 'text-gray-600 dark:text-white'
                                          } hover:text-blue-600 dark:hover:text-blue-400`}
                                        >
                                          <div className="flex items-center">
                                            {child.name}
                                          </div>
                                        </button>
                                        {expandedRoutes[child.path] && (
                                          <ul className="pl-4">
                                            {child.children.map((grandChild) => (
                                              <li
                                                key={grandChild.path}
                                                className={`flex justify-between items-center ml-18 px-2 py-2 ml-16 rounded-xl ${
                                                  pathname === grandChild.path
                                                    ? 'text-dark_selected'
                                                    : 'text-gray-600 dark:text-white'
                                                } hover:text-blue-600 dark:hover:text-blue-400`}
                                              >
                                                <Link
                                                  ref={
                                                    pathname === grandChild.path
                                                      ? activeMenuItemRef
                                                      : null
                                                  }
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
                                        ref={
                                          isActiveChildRoute ? activeMenuItemRef : null
                                        }
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          HandleSetShowSidebar(false);
                                        }}
                                        to={child.path}
                                        className={`flex w-full items-center px-2 py-2 rounded-xl ${
                                          pathname === child.path
                                            ? 'text-dark_selected'
                                            : 'text-gray-600 dark:text-white'
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
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 15,
                                            bounce: 0.5,
                                          }}
                                          className={`flex justify-center text-[11px] items-center p-1 rounded-full ${
                                            pathMapWithNotif &&
                                            pathMapWithNotif[child.path].notifNum !== 0
                                              ? 'bg-glb_red'
                                              : ''
                                          } w-6 h-6 mr-3 text-white`}
                                        >
                                          {pathMapWithNotif &&
                                          pathMapWithNotif[child.path].notifNum !== 0
                                            ? pathMapWithNotif[child.path].notifNum
                                            : ''}
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
                          ref={isActiveRoute ? activeMenuItemRef : null}
                          onClick={() => {
                            console.log(`Closing sidebar for route: ${route.path}`);
                            HandleSetShowSidebar(false);
                          }}
                          to={route.path}
                          className={`flex w-full items-center px-2 py-2 rounded-xl hover:bg-dark_selected_hover hover:text-black hover:dark:text-white ${
                            isActiveRoute ? 'bg-glb_blue text-white' : ''
                          }`}
                        >
                          {React.createElement(route.icon, {
                            className: 'mr-2 ml-1',
                            size: 20,
                          })}
                          {showSidebar && route.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
