import { useThemeProvider } from "@/core/providers/ThemeContext.jsx";
import DropdownNotifications from "@/modules/dashboard/components/DropdownNotifications.jsx";
import SearchModal from "@/modules/dashboard/components/SearchModal.jsx";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Input } from "@nextui-org/input";
import { Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { User } from "@nextui-org/user";
import codPowerGroupLogo from "@shared/assets/images/cod-power-group-logo.svg";
import codPowerGroupLogoDark from "@shared/assets/images/cod-logo-dark.svg";
import {
    ArrowDown01Icon,
    ArrowRight01Icon,
    Cancel01Icon,
    Clock01Icon,
    FilterIcon,
    HelpCircleIcon,
    Logout05Icon,
    Menu11Icon,
    Moon02Icon,
    Notification01Icon,
    Search01Icon,
    Settings02Icon,
    Share08Icon,
    SidebarRight01Icon,
    Sun02Icon
} from "hugeicons-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FilterModal from "@/modules/dashboard/components/FilterModal.jsx";
import { motion, AnimatePresence } from 'framer-motion'
import { RoutesConfig } from "../../../../core/constants/routes";

export default function NavbarComponent({ showSidebar, setShowSidebar }) {
    const { currentTheme, changeCurrentTheme } = useThemeProvider();
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [SmallNotOpen, setSmallNotOpen] = useState(false);
    const [SearchInputOpen, setSearchInputOpen] = useState(false);
    const location = useLocation();
    const { pathname } = location;
    const [ReturnTo, setReturnTo] = useState(pathname)

    const [showFilterModal, setShowFilterModal] = useState(false);
    const dropdownRef = useRef(null);



    // Close dropdown if clicked outside
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
    return (
        <>
            <Navbar disableAnimation isBordered className="z-20 w-full px-2 py-4 bg-transparent" maxWidth="full">
                {/* {!showSidebar && (
                    <Button onClick={() => setShowSidebar(!showSidebar)} isIconOnly variant="light">
                        <SidebarRight01Icon />
                    </Button>
                )} */}
                {currentTheme === 'light' ? !showSidebar && <img src={codPowerGroupLogo} alt="cod power group logo" className="w-20" /> :
                    !showSidebar && <img src={codPowerGroupLogoDark} alt="cod power group logo" className="w-20" />}
                <NavbarItem className="mr-auto lg:hidden">
                    {currentTheme === 'light' ? <img src={codPowerGroupLogo} alt="cod power group logo" className="w-20" /> : <img src={codPowerGroupLogoDark} alt="cod power group logo" className="w-20" />}
                </NavbarItem>
                {/* profile , notification, search icons big size screen*/}
                <NavbarContent className="justify-between hidden gap-4 px-2 md:flex md:flex-row max-w-fit">
                    <NavbarItem className="ml-2 mr-4">
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
                                    description="Super Admin"
                                    name="Tony Reichert"
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
                    </NavbarItem>

                    <NavbarContent className="justify-self-start md:mr-auto max-w-fit">
                        <NavbarItem>
                            <Link to={RoutesConfig.find(r => r.name === "Notifications").path}
                                state={{ from: pathname }}// Add the redirection link here

                                isIconOnly
                                className={`${pathname.includes(RoutesConfig.find(r => r.name === "Notifications").path) ? "bg-glb_blue text-white" : "bg-gray-100 dark:bg-neutral-800 hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800"} overflow-visible p-2 rounded-full flex items-center justify-center relative`}
                            >

                                <Notification01Icon />
                                <div
                                    className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-gray-100 dark:border-gray-900 rounded-full"></div>
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="md:hidden">
                            {currentTheme === 'light' ?
                                <Button isIconOnly color="default" to="#" variant="flat"
                                    className="font-bold text-gray-700 rounded-full"
                                    onClick={() => changeCurrentTheme('dark')}>
                                    <Moon02Icon />
                                </Button> :
                                <Button isIconOnly color="secondary" to="#" variant="flat"
                                    className="font-bold text-gray-700 rounded-full bg-base_card"
                                    onClick={() => changeCurrentTheme('light')}>
                                    <Sun02Icon className="text-gray-500" />
                                </Button>
                            }
                        </NavbarItem>
                        <NavbarItem className="md:hidden">
                            <Button
                                isIconOnly
                                variant="light"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            >
                                <Menu11Icon />
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <AnimatePresence>
                                <div onClick={() => setSearchInputOpen(true)} className={`cursor-pointer  overflow-visible p-2 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800
                                    ${SearchInputOpen && 'bg-gray-200 dark:bg-gray-800'}`}>
                                    {SearchInputOpen ? (<motion.input
                                        key="searchInput"
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: "200px", opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-2 outline-none bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-white rounded-full focus:outline-none"
                                        type="text"
                                        placeholder="Search..."
                                        onBlur={() => setSearchInputOpen(false)}
                                        autoFocus
                                    />) : (<Search01Icon />)}


                                </div>


                            </AnimatePresence>

                        </NavbarItem>
                    </NavbarContent>


                </NavbarContent>

                {/* red wide button and date time big size */}
                <NavbarContent className="justify-between hidden gap-4 px-2 md:flex md:flex-row">

                    <NavbarItem className="hidden ml-auto lg:block relative bg-slate-600 p-5">
                        <div ref={dropdownRef} onClick={() => setSmallNotOpen(true)} className="cursor-pointer absolute top-0 left-1/2 transform -translate-x-1/2 rounded-xl p-2 font-semibold text-red-500 dark:text-white bg-red-200 dark:bg-[#2F1214]">
                            <div className=" flex justify-center items-center gap-2 ">
                                <h4 className="text-sm">Important Notifications in the ERP</h4>
                                {SmallNotOpen ? <ArrowDown01Icon /> : <ArrowRight01Icon />}
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
                                                <h4 className="text-sm">{i.label}</h4>

                                            </motion.div>))}</motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </NavbarItem>

                    <NavbarItem className="ml-auto">
                        <h4 className="text-lg font-bold">{moment().format('dddd, MM MMM YYYY')}</h4>
                        <span className="flex flex-row items-center gap-1 text-gray-600"> <Clock01Icon
                            size={16} /> {moment().format('HH:mm  Z')}</span>
                    </NavbarItem>
                </NavbarContent>

                {/* small size */}
                <NavbarMenu onClick={() => setIsMenuOpen(false)}
                    className={`${isMenuOpen ? 'block' : 'hidden'} fixed inset-0 p-0 h-screen  bg-gray-500/10`}>

                    <div onClick={(e) => e.stopPropagation()} className="flex flex-col justify-center w-10/12 h-screen ml-auto bg-white dark:bg-black">
                        <NavbarMenuItem className="ml-auto mr-4 w-fit">
                            <Button isIconOnly className="my-4 bg-gray-100 rounded-full dark:bg-gray-800"
                                onClick={() => setIsMenuOpen(false)}>
                                <Cancel01Icon className="mx-auto" />
                            </Button>
                        </NavbarMenuItem>
                        <NavbarMenuItem className="px-4 my-8">
                            <Dropdown placement="bottom-start">
                                <DropdownTrigger>
                                    <User
                                        as="button"
                                        avatarProps={{
                                            isBordered: true,
                                            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                                        }}
                                        classNames={{ name: "font-bold", base: 'mx-auto flex mb-8' }}
                                        className="transition-transform"
                                        description="Super Admin"
                                        name="Tony Reichert"
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
                            <div className="flex flex-row w-full my-4">
                                <Input className="w-full ml-auto" placeholder="Search" classNames={{
                                    inputWrapper: "bg-gray-100 dark:bg-neutral-800 rounded-full",
                                }} startContent={<Search01Icon size={18} className="text-gray-500" />} />

                                <Button isIconOnly className="mx-2 text-white rounded-full bg-info"
                                    onClick={() => setShowFilterModal(!showFilterModal)}>
                                    <FilterIcon size={18} />
                                </Button>
                            </div>
                        </NavbarMenuItem>
                        <NavbarMenuItem className="px-8 my-12 text-sm">
                            <h3 className="mt-4 mb-2 text-gray-400">System</h3>
                            <ul>
                                <li className="px-2 py-2">
                                    <Link to="#" className="flex w-full">
                                        <span className="flex w-full gap-1">
                                            <Settings02Icon className="ml-1 mr-2" size="20" />
                                            Settings
                                        </span>
                                    </Link>
                                </li>
                                <li className="px-2 py-2">
                                    <Link to="#" className="flex w-full">
                                        <span className="flex w-full gap-1">
                                            <Share08Icon className="ml-1 mr-2" size="20" />
                                            Referrals
                                        </span>
                                    </Link>
                                </li>
                                <li className="px-2 py-2">
                                    <Link to="#" className="flex w-full">
                                        <span className="flex w-full gap-1">
                                            <HelpCircleIcon className="ml-1 mr-2" size="20" />
                                            Help
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </NavbarMenuItem>

                        <NavbarMenuItem className="block px-8 my-12">
                            <Link to="#"
                                className="flex flex-row items-center justify-start w-full gap-2 my-2 text-danger">
                                <Logout05Icon size={18} className="rotate-45" />
                                <span>Logout</span>
                            </Link>
                            <span className="text-sm text-gray-500">
                                Copyright © {new Date().getFullYear()}. COD Power Group, All rights reserved.
                            </span>
                        </NavbarMenuItem>
                    </div>
                </NavbarMenu>
            </Navbar>

            <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen}
                setModalOpen={setSearchModalOpen} />

            <FilterModal modalOpen={showFilterModal} setModalOpen={setShowFilterModal} id={2} />
        </>
    );
}