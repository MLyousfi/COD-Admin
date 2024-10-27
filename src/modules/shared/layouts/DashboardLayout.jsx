import Sidebar from "@/modules/dashboard/components/partials/Sidebar.jsx";
import Header from "@/modules/dashboard/components/partials/Navbar.jsx";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { ArrowRight01Icon, CommandIcon, FilterIcon, Search01Icon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Code } from "@nextui-org/code";
import FilterModal from "@/modules/dashboard/components/FilterModal.jsx";
import ReSideBar from "../../dashboard/components/partials/ReSideBar";
import ResideBar from "../../dashboard/components/partials/ReSideBar";

export default function DashboardLayout({ children, icon, title, additionalContent, hasSearchInput = true }) {

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
            <div className="flex overflow-hidden bg-base_light dark:bg-dark-gradient ">
                {/* sidebar for mobiles screens */}
                <ResideBar showSidebar={showSidebar} setShowSidebar={HandleSideBarChange} />
                {/* sidebar for bigger screens */}
                <Sidebar showSidebar={showSidebar} setShowSidebar={HandleSideBarChange} />
                <div
                    onMouseOver={() => HandleSideBarChange(true)} // Show sidebar on hover
                    className="absolute top-0 left-0 h-full w-4  hover:cursor-pointer bg-transparent z-40"
                    style={{ width: "10px" }} // 10px width hover area
                />
                <div className="relative flex-1">
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
                        <h2 className="flex flex-row gap-2 ml-4 text-xl font-bold items-center">
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
                    {children}


                    <footer className="mx-auto my-12 text-center">
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