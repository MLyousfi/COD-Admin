import Sidebar from "@/modules/dashboard/components/partials/Sidebar.jsx";
import Header from "@/modules/dashboard/components/partials/Navbar.jsx";
import { Button } from "@nextui-org/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown01Icon, ArrowLeft01Icon, ArrowRight01Icon, CommandIcon, FilterIcon, Search01Icon } from "hugeicons-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/input";
import { Code } from "@nextui-org/code";
import FilterModal from "@/modules/dashboard/components/FilterModal.jsx";
import ResideBar from "../../dashboard/components/partials/ReSideBar";
import { Link } from "react-router-dom";

export default function DashboardLayout({ children, icon, title, additionalContent, hasSearchInput = true, hasReturnLink = null }) {

    const [showFilterModal, setShowFilterModal] = useState(false);
    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");
    const [showSidebar, setShowSidebar] = useState(sidebarExpanded);
    const [SmallNotOpen, setSmallNotOpen] = useState(false);
    const dropdownRef = useRef(null);
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
    const HandleSideBarChange = (v) => {

        localStorage.setItem("sidebar-expanded", v);
        setSidebarExpanded(v)
        setShowSidebar(v); // Ensure to update showSidebar here
    }
    return (
        <>
            {/* i want to add a hover on 10px in the right of this parent div to show the side bar  */}
            <div className="flex overflow-hidden bg-base_light dark:bg-dark-gradient min-h-screen">


                <div className={`relative  flex flex-col w-full lg:ml-auto min-h-screen ${showSidebar ? ' lg:w-[calc(100%-20rem)]' : 'lg:w-[calc(100%-3.5rem)]'}`}>
                    {/*  Site header */}
                    <Header showSidebar={showSidebar} setShowSidebar={HandleSideBarChange} />
                    <div className="relative h-12 w-full p-4 mx-auto text-center lg:hidden">
                        <div ref={dropdownRef} onClick={() => setSmallNotOpen(!SmallNotOpen)} className="z-30 cursor-pointer absolute top-3 w-fit left-1/2 transform -translate-x-1/2 rounded-xl p-2 font-semibold text-red-500 dark:text-white bg-red-200 dark:bg-[#2F1214]">
                            <div className=" flex justify-center items-center gap-2 ">
                                <h4 className="text-sm font-semibold ">Important Notifications in the ERP</h4>
                                {SmallNotOpen ? <ArrowDown01Icon className="font-thin" /> : <ArrowRight01Icon className="font-thin" />}
                            </div>

                            <AnimatePresence>
                                {SmallNotOpen && (
                                    <motion.div initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        index={22}
                                        variants={dropdownVariants} className="w-full flex flex-col gap-2 mt-2">
                                        {[{ data: 154, label: 'No Answers Late' }, { data: 21415, label: 'Schedule Late - Follow Up' }
                                            , { data: 21415, label: 'Schedule Late - Follow Up' }, { data: 21415, label: 'Schedule Late - Follow Up' }
                                        ].map((i, ix) => (
                                            <motion.div variants={itemVariants}
                                                custom={ix} key={ix} className=" flex justify-start items-center gap-2 ">
                                                <h4 className="text-sm"><b>{i.data}</b></h4>
                                                <h4 className="text-sm font-thin">{i.label}</h4>

                                            </motion.div>))}</motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div
                        className="flex flex-col items-center justify-between w-full gap-4 px-4 my-6 md:flex-row md:px-8">
                        <h2 className="flex flex-row justify-start gap-2 ml-4 text-xl font-bold items-center">
                            {hasReturnLink && <Link to={hasReturnLink}

                                isIconOnly
                                className={` overflow-visible rounded-lg p-1  flex items-center justify-center `}
                            >

                                <ArrowLeft01Icon />
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
                {/* sidebar for mobiles screens */}
                <ResideBar showSidebar={showSidebar} setShowSidebar={HandleSideBarChange} />
                {/* sidebar for bigger screens */}
                <Sidebar showSidebar={showSidebar} setShowSidebar={HandleSideBarChange} />
            </div>

            <FilterModal modalOpen={showFilterModal} setModalOpen={setShowFilterModal} id={2} />
        </>
    )
}