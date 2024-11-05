// DashboardLayout.jsx

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/modules/dashboard/components/partials/Sidebar.jsx";
import ResideBar from "@/modules/dashboard/components/partials/ReSideBar.jsx";
import Header from "@/modules/dashboard/components/partials/Navbar.jsx";
import FilterModal from "@/modules/dashboard/components/FilterModal.jsx";
import SearchModal from "@/modules/dashboard/components/SearchModal.jsx";
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Clock01Icon,
  CommandIcon,
  FilterIcon,
  Search01Icon,
} from "hugeicons-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Code } from "@nextui-org/code";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { NavbarContent, NavbarItem } from "@nextui-org/navbar";
import moment from "moment";
import PropTypes from "prop-types";

export default function DashboardLayout({
  children,
  icon,
  title,
  additionalContent,
  hasSearchInput = true,
  hasReturnLink = null,
}) {
  // State management
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [smallNotOpen, setSmallNotOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const storedSidebarEpingled = localStorage.getItem("sidebar-epingled");
  const [sidebarEpingled, setSidebarEpingled] = useState(
    storedSidebarEpingled === null ? false : storedSidebarEpingled === "true"
  );
  const [showSidebar, setShowSidebar] = useState(sidebarEpingled);
  const [showReSidebar, setShowReSidebar] = useState(false);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSmallNotOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Animation variants for dropdown
  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  // Handlers for sidebar state
  const handleSideBarChange = (v) => {
    setShowSidebar(v);
  };

  const handlePinningSidebar = (v) => {
    localStorage.setItem("sidebar-epingled", v);
    setSidebarEpingled(v);
  };

  return (
    <>
      {/* Main Layout Container */}
      <div className="relative flex w-screen overflow-hidden bg-base_light dark:bg-dark-gradient min-h-screen">
        {/* Main Content Area */}
        <div
          className={`relative flex flex-col w-full lg:ml-auto min-h-screen ${
            sidebarEpingled
              ? "lg:w-[calc(100%-20rem)]"
              : showSidebar
              ? "lg:w-[calc(100%-20rem)]"
              : "lg:w-[calc(100%-3.5rem)]"
          }`}
        >
          {/* Header / Navbar */}
          <Header
            epingled={sidebarEpingled}
            setEpingled={handlePinningSidebar}
            showSidebar={showReSidebar}
            setShowSidebar={setShowReSidebar}
          />

          {/* Notification Banner (Hidden on large screens) */}
          <div className="relative h-12 w-full p-3 md:p-4 mx-auto text-center hidden lg:hidden">
            <div 
              ref={dropdownRef}
              onClick={() => setSmallNotOpen(!SmallNotOpen)}
              className="z-30 cursor-pointer absolute top-3 w-[90%] sm:w-[80%] max-w-80 left-1/2 transform -translate-x-1/2 rounded-xl p-2 font-semibold text-red-500 dark:text-white bg-red-200 dark:bg-[#2F1214]"
              >             
                             <div className="flex justify-center items-center gap-2">
                <h4 className="text-sm font-semibold">Important Notifications in the ERP</h4>
                {smallNotOpen ? (
                  <ArrowDown01Icon className="font-thin" />
                ) : (
                  <ArrowRight01Icon className="font-thin" />
                )}
              </div>

              <AnimatePresence>
                {smallNotOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="w-full flex flex-col gap-2 mt-2"
                  >
                    {[
                      { data: 154, label: "No Answers Late" },
                      { data: 21415, label: "Schedule Late - Follow Up" },
                      { data: 21415, label: "Schedule Late - Follow Up" },
                      { data: 21415, label: "Schedule Late - Follow Up" },
                    ].map((item, index) => (
                      <motion.div
                        variants={itemVariants}
                        key={index}
                        className="flex justify-start items-center gap-2"
                      >
                        <h4 className="text-sm">
                          <b>{item.data}</b>
                        </h4>
                        <h4 className="text-sm font-thin">{item.label}</h4>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Page Header with Title, Icons, and Optional Return Link */}
          <div className="flex flex-col items-start justify-start md:items-center md:justify-between w-full gap-4 px-3 md:px-4 my-6 md:flex-row">
            <h2 className="flex flex-row justify-start gap-2 md:ml-4 text-lg sm:text-xl font-bold items-center">
              {hasReturnLink && (
                <Link
                  to={hasReturnLink}
                  className="overflow-visible rounded-lg p-1 flex items-center justify-center"
                >
                  <ArrowLeft01Icon />
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-gray-100 dark:border-gray-900 rounded-full"></div>
                </Link>
              )}
              {icon}
              {title}
            </h2>

            {/* Additional Content (Optional) */}
            {additionalContent && additionalContent}

            {/* Search and Filter Section */}
            {hasSearchInput && (
              <div className="hidden md:flex">
                <Input
                  className="ml-auto w-80"
                  placeholder="Search"
                  classNames={{
                    inputWrapper: "bg-gray-100 dark:bg-neutral-800 rounded-full",
                  }}
                  endContent={
                    <Code className="flex flex-row justify-center pl-0">
                      &nbsp; <CommandIcon className="mr-1" size={16} /> + k
                    </Code>
                  }
                  startContent={<Search01Icon size={24} />}
                />

                <Button
                  isIconOnly
                  className="mx-2 dark:text-white text-black rounded-full bg-gray-100 dark:bg-neutral-800"
                  onClick={() => setShowFilterModal(!showFilterModal)}
                >
                  <FilterIcon size={18} />
                </Button>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">{children}</div>

          {/* Footer */}
          <footer className="mx-auto my-12 text-center">
            <span className="text-sm text-gray-600">
              Copyright © {new Date().getFullYear()}. COD Power Group, All rights reserved.
            </span>
          </footer>
        </div>

        {/* Sidebar for Mobile Screens */}
        <ResideBar showSidebar={showReSidebar} setShowSidebar={setShowReSidebar} />

        {/* Sidebar for Larger Screens */}
        <Sidebar
          sidebarEpingled={sidebarEpingled}
          showSidebar={sidebarEpingled ? true : showSidebar}
          setShowSidebar={handleSideBarChange}
        />
      </div>

      {/* Modals */}
      <SearchModal
        id="search-modal"
        searchId="search"
        modalOpen={searchModalOpen}
        setModalOpen={setSearchModalOpen}
      />
      <FilterModal modalOpen={showFilterModal} setModalOpen={setShowFilterModal} id={2} />
    </>
  );
}

// Prop Types for Validation
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.element,
  title: PropTypes.string.isRequired,
  additionalContent: PropTypes.node,
  hasSearchInput: PropTypes.bool, // Controls visibility of search and filter
  hasReturnLink: PropTypes.string, // Optional return link
};

// Default Props
DashboardLayout.defaultProps = {
  hasSearchInput: true,
  hasReturnLink: null,
  icon: null,
  additionalContent: null,
};
