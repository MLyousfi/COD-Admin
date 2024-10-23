import Sidebar from "@/modules/dashboard/components/partials/Sidebar.jsx";
import Header from "@/modules/dashboard/components/partials/Navbar.jsx";
import { Button } from "@nextui-org/button";
import { ArrowRight01Icon, CommandIcon, FilterIcon, Search01Icon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Code } from "@nextui-org/code";
import FilterModal from "@/modules/dashboard/components/FilterModal.jsx";

export default function DashboardLayout({ children, icon, title, additionalContent }) {

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
            <div className="flex overflow-hidden">
                <Sidebar showSidebar={showSidebar} setShowSidebar={HandleSideBarChange} />
                <div className="relative w-full">
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
                        className="flex flex-col items-start justify-between w-full gap-4 px-4 my-6 md:flex-row md:px-8">
                        <h2 className="flex flex-row gap-2 ml-4 text-xl font-bold items-center">
                            {icon}
                            {title}
                        </h2>
                        {/*  Additional content */}
                        {additionalContent != null && additionalContent}
                        <div className="hidden md:flex">
                            <Input className="ml-auto w-80" placeholder="Search" classNames={{
                                inputWrapper: "bg-gray-100 dark:bg-gray-950 rounded-full",
                            }} endContent={<Code className="flex flex-row justify-center pl-0"> &nbsp; <CommandIcon
                                className="mr-1" size={16} /> + K
                            </Code>} startContent={<Search01Icon size={24} />} />

                            <Button isIconOnly className="mx-2 text-white rounded-full bg-info"
                                onClick={() => setShowFilterModal(!showFilterModal)}>
                                <FilterIcon size={18} />
                            </Button>
                        </div>

                    </div>
                    {/*  Page content */}
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