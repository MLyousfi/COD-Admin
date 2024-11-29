// DashboardLayout.jsx

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/modules/dashboard/components/partials/Sidebar.jsx"; // Import Sidebar
import Header from "@/modules/dashboard/components/partials/Navbar.jsx";
import FilterModal from "@/modules/dashboard/components/FilterModal.jsx";
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
import { useDispatch, useSelector } from "react-redux";
import {
  setShowReSidebar,
  setSidebarEpingled,
} from "../../../core/redux/slices/sidebarSlice";

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

  // Redux
  const dispatch = useDispatch();
  const sidebarEpingled = useSelector((state) => state.sidebar.sidebarEpingled);
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const showReSidebar = useSelector((state) => state.sidebar.showReSidebar);

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

  // Calculate main content margin-left based on sidebar width
  const sidebarWidth = showSidebar ? "20rem" : "3.5rem";

  return (
    <>
      <div
        className={`relative flex flex-col flex-grow min-h-screen overflow-y-scroll overflow-x-hidden w-full`}
      >
        {/* Header / Navbar */}
        <Header
          epingled={sidebarEpingled}
          setEpingled={(v) => dispatch(setSidebarEpingled(v))}
          showSidebar={showReSidebar}
          setShowSidebar={(v) => dispatch(setShowReSidebar(v))}
        />

       

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
            Copyright © {new Date().getFullYear()}. COD Power Group, All rights
            reserved.
          </span>
        </footer>
      </div>
      {/* Modals */}
      <SearchModal
        id="search-modal"
        searchId="search"
        modalOpen={searchModalOpen}
        setModalOpen={setSearchModalOpen}
      />
      <FilterModal
        modalOpen={showFilterModal}
        setModalOpen={setShowFilterModal}
        id={2}
      />
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
