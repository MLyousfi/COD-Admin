import Sidebar from "@/modules/dashboard/components/partials/Sidebar.jsx";
import Header from "@/modules/dashboard/components/partials/Navbar.jsx";
import { Button } from "@nextui-org/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown01Icon, ArrowLeft01Icon, ArrowRight01Icon, Clock01Icon, CommandIcon, FilterIcon, Search01Icon } from "hugeicons-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/input";
import { Code } from "@nextui-org/code";
import FilterModal from "@/modules/dashboard/components/FilterModal.jsx";
import ResideBar from "../../dashboard/components/partials/ReSideBar";
import { Link } from "react-router-dom";
import SearchModal from "@/modules/dashboard/components/SearchModal.jsx";
import { NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import moment from "moment";

export default function DashboardLayout({ children, icon, title, additionalContent, hasSearchInput = true, hasReturnLink = null }) {

    const [showFilterModal, setShowFilterModal] = useState(false);

    const [SmallNotOpen, setSmallNotOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const storedSidebarEpingled = localStorage.getItem("sidebar-epingled");
    const [sidebarEpingled, setSidebarEpingled] = useState(storedSidebarEpingled === null ? false : storedSidebarEpingled === "true");
    const [showSidebar, setShowSidebar] = useState(sidebarEpingled);

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

        setShowSidebar(v); // Ensure to update showSidebar here
    }

    const HandlePinglingSideBar = (v) => {

        localStorage.setItem("sidebar-epingled", v);
        setSidebarEpingled(v)
    }
    return (
        <>
            {/* i want to add a hover on 10px in the right of this parent div to show the side bar  */}
            <div className="relative flex w-screen overflow-hidden bg-base_light dark:bg-dark-gradient min-h-screen">


                <div className={`relative flex flex-col w-full lg:ml-auto min-h-screen ${sidebarEpingled ? ' lg:w-[calc(100%-20rem)] ' : showSidebar ? ' lg:w-[calc(100%-20rem)]' : 'lg:w-[calc(100%-3.5rem)]'}`}>
                    {/*  Site header */}
                    <Header epingled={sidebarEpingled} setEpingled={HandlePinglingSideBar} showSidebar={showSidebar} setShowSidebar={HandleSideBarChange} />
                    {!hasReturnLink && <div className="flex p-3 md:p-4 md:hidden mx-auto gap-6 mt-4 justify-between items-center">

                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                                <User
                                    as="button"
                                    avatarProps={{
                                        isBordered: true,
                                        src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                                    }}
                                    classNames={{
                                        name: "font-bold",
                                    }}
                                    className="transition-transform"

                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Actions" variant="flat">
                                <DropdownItem key="profile" className="gap-2 h-14">
                                    <p className="font-bold">Signed in as</p>
                                    <p className="font-bold">@tonyreichert</p>
                                </DropdownItem>
                                <DropdownItem key="settings">
                                    My Settings
                                </DropdownItem>
                                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                <DropdownItem key="analytics">
                                    Analytics
                                </DropdownItem>
                                <DropdownItem key="system">System</DropdownItem>
                                <DropdownItem key="configurations">Configurations</DropdownItem>
                                <DropdownItem key="help_and_feedback">
                                    Help & Feedback
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <div className="flex flex-col gap-2 justify-center items-center">
                            <h4 className="text-lg font-bold">{moment().format('dddd, MM MMM YYYY')}</h4>
                            <span className="flex flex-row items-center gap-1 text-gray-600"> <Clock01Icon
                                size={16} /> {moment().format('HH:mm  Z')}</span>
                        </div>
                        <Button isIconOnly className="rounded-full bg-gray-200 dark:bg-base_card"
                            onClick={() => setSearchModalOpen(true)}>
                            <Search01Icon />
                        </Button>

                    </div>}
                    <div className="relative  h-12 w-full p-3 md:p-4 mx-auto text-center hidden lg:hidden">
                        <div ref={dropdownRef} onClick={() => setSmallNotOpen(!SmallNotOpen)} className="z-30 cursor-pointer absolute top-3 w-[90%] sm:w-[80%] max-w-80 left-1/2 transform -translate-x-1/2 rounded-xl p-2 font-semibold text-red-500 dark:text-white bg-red-200 dark:bg-[#2F1214]">
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
                        className="flex flex-col items-start justify-start md:items-center md:justify-between w-full gap-4 px-3 md:px-4 my-6 md:flex-row ">
                        <h2 className="flex flex-row justify-start gap-2  md:ml-4 text-lg sm:text-xl font-bold items-center">
                            {hasReturnLink && <Link to={hasReturnLink}

                                isIconOnly
                                className={` overflow-visible rounded-lg p-1  flex items-center justify-center `}
                            >

                                <ArrowLeft01Icon />
                                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-gray-100 dark:border-gray-900 rounded-full">

                                </div>
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
                                className="mr-1" size={16} /> + k
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
                <Sidebar showSidebar={sidebarEpingled ? true : showSidebar} setShowSidebar={HandleSideBarChange} />

            </div >
            <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen}
                setModalOpen={setSearchModalOpen} />
            <FilterModal modalOpen={showFilterModal} setModalOpen={setShowFilterModal} id={2} />
        </>
    )
}