import Sidebar from "@/modules/dashboard/components/partials/Sidebar.jsx";
import Header from "@/modules/dashboard/components/partials/Navbar.jsx";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { ArrowLeft01Icon, ArrowRight01Icon, CommandIcon, FilterIcon, Search01Icon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Code } from "@nextui-org/code";
import FilterModal from "@/modules/dashboard/components/FilterModal.jsx";
import ReSideBar from "../../dashboard/components/partials/ReSideBar";
import ResideBar from "../../dashboard/components/partials/ReSideBar";
import { Link } from "react-router-dom";

export default function DashboardLayout({ children, icon, title, additionalContent, hasSearchInput = true, hasReturnLink = null }) {

    const [showFilterModal, setShowFilterModal] = useState(false);
    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");
    const [showSidebar, setShowSidebar] = useState(sidebarExpanded);

    const HandleSideBarChange = (v) => {

        localStorage.setItem("sidebar-expanded", v);
        setSidebarExpanded(v)
        setShowSidebar(v); // Ensure to update showSidebar here
    }
    return (
        <>
            {/* i want to add a hover on 10px in the right of this parent div to show the side bar  */}
            <div className="flex overflow-hidden bg-base_light dark:bg-dark-gradient min-h-screen">
                {/* sidebar for mobiles screens */}
                <ResideBar showSidebar={showSidebar} setShowSidebar={HandleSideBarChange} />
                {/* sidebar for bigger screens */}
                <Sidebar showSidebar={showSidebar} setShowSidebar={HandleSideBarChange} />

                <div className={`relative flex flex-col lg:ml-auto min-h-screen ${showSidebar ? 'w-full lg:w-[calc(100%-20rem)]' : 'w-[calc(100%-3.5rem)]'}`}>
                    {/*  Site header */}
                    <Header showSidebar={showSidebar} setShowSidebar={HandleSideBarChange} />
                    <div className="p-4 mx-auto text-center lg:hidden">
                        <Button color="danger" to="#" variant="flat"
                            className="w-full px-4 font-bold text-danger lg:w-fit">
                            Important Notifications in the ERP
                            <ArrowRight01Icon />
                        </Button>
                    </div>
                    <div
                        className="flex flex-col items-center justify-between w-full gap-4 px-4 my-6 md:flex-row md:px-8">
                        <h2 className="flex flex-row justify-start gap-2 ml-4 text-xl font-bold items-center">
                            {hasReturnLink && <Link to={hasReturnLink}

                                isIconOnly
                                className={` overflow-visible rounded-lg p-1  flex items-center justify-center `}
                            >

                                <ArrowLeft01Icon className="text-white" />
                                <div
                                    className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-gray-100 dark:border-gray-900 rounded-full"></div>
                            </Link>}
                            {icon}
                            {title}
                        </h2>
                        {/*  Additional content */}
                        {additionalContent != null && additionalContent}
                        {hasSearchInput && <div className="hidden md:flex">
                            <Input className="ml-auto w-80" placeholder="Search" classNames={{
                                inputWrapper: "bg-gray-100 dark:bg-neutral-800 rounded-full",
                            }} endContent={<Code className="flex flex-row justify-center pl-0"> &nbsp; <CommandIcon
                                className="mr-1" size={16} /> + R
                            </Code>} startContent={<Search01Icon size={24} />} />

                            <Button isIconOnly className="mx-2 dark:text-white text-black rounded-full bg-gray-100 dark:bg-neutral-800"
                                onClick={() => setShowFilterModal(!showFilterModal)}>
                                <FilterIcon size={18} />
                            </Button>
                        </div>}

                    </div>
                    <div className="flex-grow">
                        {children}
                    </div>


                    <footer className=" mx-auto my-12 text-center">
                        <span className="text-sm text-gray-600">
                            Copyright © {new Date().getFullYear()}. COD Power Group, All rights reserved.
                        </span>
                    </footer>
                </div>
            </div>

            <FilterModal modalOpen={showFilterModal} setModalOpen={setShowFilterModal} id={2} />
        </>
    )
}