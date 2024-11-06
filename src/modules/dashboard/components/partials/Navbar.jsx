import { useThemeProvider } from "@/core/providers/ThemeContext.jsx";
import DropdownNotifications from "@/modules/dashboard/components/DropdownNotifications.jsx";
import ThemeToggle from "@/modules/dashboard/components/ThemeToggle.jsx";
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
    Clock01Icon,
    CommandIcon,
    FilterIcon,
    HelpCircleIcon,
    Logout05Icon,
    Menu11Icon,
    Moon02Icon,
    MoonCloudIcon,
    Notification01Icon,
    Search01Icon,
    Settings02Icon,
    Share08Icon,
    SidebarRight01Icon,
    Sun02Icon
} from "hugeicons-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FilterModal from "@/modules/dashboard/components/FilterModal.jsx";
import { motion, AnimatePresence } from 'framer-motion'
import { RoutesConfig } from "../../../../core/constants/routes";
import { Code } from "@nextui-org/code";

export default function NavbarComponent({ epingled, setEpingled, showSidebar, setShowSidebar }) {
    const { currentTheme, changeCurrentTheme } = useThemeProvider();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [SmallNotOpen, setSmallNotOpen] = useState(false);
    const [SearchInputOpen, setSearchInputOpen] = useState(false);
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();
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

                <Button onClick={() => setEpingled(!epingled)} isIconOnly variant="light" className="hidden lg:flex">
                    <SidebarRight01Icon />
                </Button>
                <Button onClick={() => setShowSidebar(!showSidebar)} isIconOnly variant="light" className="lg:hidden">
                    <SidebarRight01Icon />
                </Button>

                {/* {currentTheme === 'light' ? !showSidebar && <img src={codPowerGroupLogo} alt="cod power group logo" className="w-20" /> :
                    !showSidebar && <img src={codPowerGroupLogoDark} alt="cod power group logo" className="w-20" />} */}
                <NavbarItem className="mr-auto lg:hidden">
                    {currentTheme === 'light' ? <img src={codPowerGroupLogo} alt="cod power group logo" className="w-20" /> : <img src={codPowerGroupLogoDark} alt="cod power group logo" className="w-20" />}
                </NavbarItem>
                {/* profile , notification, search icons big size screen*/}


                {/* red wide button and date time big size */}
                <NavbarContent className="justify-between hidden gap-4 px-2 md:flex md:flex-row">



                    <NavbarItem className="">
                        <h4 className="text-lg font-bold">{moment().format('dddd, DD MMM YYYY')}</h4>
                        <span className="flex flex-row items-center gap-1 text-gray-600"> <Clock01Icon
                            size={16} /> {moment().format('HH:mm  Z')}</span>
                    </NavbarItem>



                </NavbarContent>
                <NavbarContent className="justify-between gap-4 flex md:flex-row max-w-fit ">


                    <NavbarContent className="justify-self-start md:mr-auto max-w-fit">
                        <NavbarItem className="hidden lg:block">
                            <AnimatePresence>
                                <div onClick={() => setSearchInputOpen(true)} className={`cursor-pointer  overflow-visible p-2 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center 
                                    ${SearchInputOpen && 'bg-gray-200 dark:bg-gray-800'}`}>
                                    {SearchInputOpen ? (
                                        <motion.div key="searchInput"
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: "300px", opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="outline-none w-full  bg-transparent text-gray-700 dark:text-white rounded-full focus:outline-none ">

                                            {SearchInputOpen && <motion.div className="w-full flex justify-center items-center gap-2 " initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3, delay: 0.2 }} ><Search01Icon size={24} />
                                                <input

                                                    className="flex-grow focus:outline-none outline-none bg-transparent placeholder:text-[#00000060] placeholder:dark:text-[#ffffff50]"
                                                    type="text"
                                                    placeholder="Search..."
                                                    onBlur={() => setSearchInputOpen(false)}
                                                    autoFocus
                                                />
                                                <Code className="flex flex-row  bg-transparent justify-center pl-0"> &nbsp; <CommandIcon
                                                    className="mr-1" size={16} /> + k
                                                </Code></motion.div>}
                                        </motion.div>
                                    ) : (<Search01Icon />)}


                                </div>

                            </AnimatePresence>

                        </NavbarItem>
                        <NavbarItem>
                            <div onClick={(e) => {
                                e.preventDefault();
                                if (pathname.includes(RoutesConfig.find(r => r.name === "Notifications").path)) {
                                    navigate(-1);
                                } else {
                                    navigate(RoutesConfig.find(r => r.name === "Notifications").path, { state: { from: pathname } })
                                }

                            }}

                                isIconOnly
                                className={`${pathname.includes(RoutesConfig.find(r => r.name === "Notifications").path) ? " bg-glb_red text-white" : "bg-gray-100 dark:bg-neutral-800 hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800"} cursor-pointer overflow-visible p-2 rounded-full flex items-center justify-center relative`}
                            >

                                <Notification01Icon />
                                <div
                                    className={`absolute top-2 right-2 w-2.5 h-2.5 ${pathname.includes(RoutesConfig.find(r => r.name === "Notifications").path) ? 'bg-white border-2 border-glb_red dark:border-glb_red' : 'bg-glb_red border-2 border-gray-100 dark:border-gray-900'}  rounded-full`}></div>
                            </div>
                        </NavbarItem>
                        <NavbarItem className="md:hidden" >
                            <Button
                                isIconOnly
                                color="default"
                                variant="flat"
                                className={`
                                ${currentTheme === 'light'
                                        ? "bg-glb_blue text-white"
                                        : "bg-gray-100 dark:bg-neutral-800 hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800"
                                    }
                                    font-bold rounded-full
                            `}
                                onClick={() => changeCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}
                                aria-label="Toggle Theme"
                            >
                                {currentTheme === 'light' ? <Sun02Icon /> : <Moon02Icon />}
                            </Button>


                        </NavbarItem>
                        <NavbarItem className="md:hidden flex justify-center items-center">
                            <Button
                                className="rounded-full"
                                isIconOnly
                                variant="light"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMenuOpen(!isMenuOpen)
                                }}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {/* <Menu11Icon /> */}
                                <img src={'https://i.pravatar.cc/150?u=a042581f4e29026024d'} />
                            </Button>
                        </NavbarItem>

                    </NavbarContent>

                    <NavbarItem className="ml-2 mr-4 hidden md:block">
                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                                <User
                                    as="button"
                                    avatarProps={{
                                        isBordered: false,
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
                </NavbarContent>

                {/*right side bar small size */}
                <AnimatePresence>
                    {isMenuOpen && <NavbarMenu onClick={() => setIsMenuOpen(false)}
                        className={`flex fixed w-full inset-0 p-0 h-screen bg-gray-500/10`}>



                        <motion.div layout initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 0.3 }} exit={{ width: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`max-w-80 ml-auto h-screen bg-base_light dark:bg-base_dark`}>
                            {/* <NavbarMenuItem className="ml-auto mr-4 w-fit">
                                <Button isIconOnly className="my-4 bg-gray-100 rounded-full dark:bg-gray-800"
                                    onClick={() => setIsMenuOpen(false)}>
                                    <Cancel01Icon className="mx-auto" />
                                </Button>
                            </NavbarMenuItem> */}
                            <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }}
                                exit={{ opacity: 0, transition: { ease: 'easeIn', delay: 0 } }}
                                className="w-full h-full overflow-y-auto h-full flex flex-col justify-center ">
                                <div className="flex my-3 flex-col gap-1 w-full justify-center items-center">
                                    <h4 className="text-lg font-bold">{moment().format('dddd, MM MMM YYYY')}</h4>
                                    <span className="flex flex-row items-center gap-1 text-gray-600"> <Clock01Icon
                                        size={16} /> {moment().format('HH:mm  Z')}</span>
                                </div>
                                <NavbarMenuItem className="px-4 my-8">
                                    <div className="flex justify-center gap-2  w-full  items-center">
                                        <User
                                            as="button"
                                            avatarProps={{
                                                isBordered: false,
                                                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                                            }}
                                            classNames={{ name: "font-bold", }}
                                            className="transition-transform"
                                        // description="Super Admin"
                                        // name="Tony Reichert"
                                        />
                                        <div className="flex flex-col">
                                            <h4 className="font-thin">{'Hello, 👋 Good Morning'}</h4>
                                            <h1 className="font-semibold">Tony Reichert</h1>
                                        </div>
                                    </div>

                                    <div className="flex flex-row w-full my-4">
                                        <Input className="w-full ml-auto" placeholder="Search" classNames={{
                                            inputWrapper: "bg-gray-100 dark:bg-neutral-800 rounded-full",
                                        }} startContent={<Search01Icon size={18} className="text-gray-500" />}
                                            endContent={<FilterIcon size={18} className="text-gray-500" />} />


                                    </div>
                                </NavbarMenuItem>
                                <NavbarMenuItem className="px-8 my-12 text-sm flex-grow">
                                    <h3 className="mt-4 mb-2 text-gray-400">System</h3>
                                    <ul>
                                        <li className="px-2 py-2">
                                            <Link to="#" className="flex w-full justify-start gap-4 items-center">
                                                <span className="flex w-full gap-1">
                                                    <MoonCloudIcon className={showSidebar ? "mr-2 ml-1" : ''} size="20" />
                                                    Dark Mode
                                                </span>
                                                <ThemeToggle />
                                            </Link>
                                        </li>
                                        <li className="px-2 py-2">
                                            <Link state={{ from: pathname }} to="/settings" className="flex w-full">
                                                <span className="flex w-full gap-1">
                                                    <Settings02Icon className="mr-2" size="20" />
                                                    Settings
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="px-2 py-2">
                                            <Link state={{ from: pathname }} to="/referrals" className="flex w-full">
                                                <span className="flex w-full gap-1">
                                                    <Share08Icon className="mr-2" size="20" />
                                                    Referrals
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="px-2 py-2">
                                            <Link state={{ from: pathname }} to="/help" className="flex w-full">
                                                <span className="flex w-full gap-1">
                                                    <HelpCircleIcon className="mr-2" size="20" />
                                                    Help
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </NavbarMenuItem>

                                <NavbarMenuItem className="block px-8 my-12">
                                    <Link to="/login"
                                        className="flex flex-row items-center justify-start w-full gap-2 my-2 text-danger">
                                        <Logout05Icon size={18} className="rotate-45" />
                                        <span>Logout</span>
                                    </Link>
                                    <span className="text-sm text-gray-500">
                                        Copyright © {new Date().getFullYear()}. COD Power Group, All rights reserved.
                                    </span>
                                </NavbarMenuItem>
                            </motion.div>

                        </motion.div>
                    </NavbarMenu>}
                </AnimatePresence>
            </Navbar >



            <FilterModal modalOpen={showFilterModal} setModalOpen={setShowFilterModal} id={2} />
        </>
    );
}