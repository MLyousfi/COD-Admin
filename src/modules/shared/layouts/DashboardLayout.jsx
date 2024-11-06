// DashboardLayout.jsx

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/modules/dashboard/components/partials/Sidebar.jsx";
import ResideBar from "@/modules/dashboard/components/partials/ReSideBar.jsx";
import Header from "@/modules/dashboard/components/partials/Navbar.jsx";
import SearchModal from "@/modules/dashboard/components/SearchModal.jsx";
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  CommandIcon,
  FilterIcon,
  Search01Icon,
} from "hugeicons-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Code } from "@nextui-org/code";
import PropTypes from "prop-types";

export default function DashboardLayout({
  children,
  icon,
  title,
  additionalContent,
  hasSearchInput = true,
  hasReturnLink = null,
  filterModalComponent = null, // New prop for custom modals
}) {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const storedSidebarEpingled = localStorage.getItem("sidebar-epingled");
  const [sidebarEpingled, setSidebarEpingled] = useState(
    storedSidebarEpingled === null ? false : storedSidebarEpingled === "true"
  );
  const [showSidebar, setShowSidebar] = useState(sidebarEpingled);
  const [showReSidebar, setShowReSidebar] = useState(false);

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

          {/* Page Header with Title, Icons, and Optional Return Link */}
          <div className="flex flex-col items-start justify-start md:items-center md:justify-between w-full gap-4 px-3 md:px-4 my-6 md:flex-row">
            <h2 className="flex flex-row justify-start gap-2 md:ml-4 text-lg sm:text-xl font-bold items-center">
              {hasReturnLink && (
                <Link
                  to={hasReturnLink}
                  className="rounded-lg p-1 flex items-center justify-center"
                >
                  <ArrowLeft01Icon />
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

      {/* Render custom filter modal if provided */}
      {filterModalComponent &&
        React.cloneElement(filterModalComponent, {
          modalOpen: showFilterModal,
          setModalOpen: setShowFilterModal,
        })}
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
  filterModalComponent: PropTypes.element, // Optional custom filter modal component
};

// Default Props
DashboardLayout.defaultProps = {
  hasSearchInput: true,
  hasReturnLink: null,
  icon: null,
  additionalContent: null,
  filterModalComponent: null, // Default to null for no custom filter modal
};
