import {useThemeProvider} from "@/core/providers/ThemeContext.jsx";
import DropdownNotifications from "@/modules/dashboard/components/DropdownNotifications.jsx";
import SearchModal from "@/modules/dashboard/components/SearchModal.jsx";
import {Button} from "@nextui-org/button";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {Input} from "@nextui-org/input";
import {Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem} from "@nextui-org/navbar";
import {User} from "@nextui-org/user";
import codPowerGroupLogo from "@shared/assets/images/cod-power-group-logo.svg";
import {
    ArrowRight01Icon,
    Cancel01Icon,
    Clock01Icon,
    FilterIcon,
    HelpCircleIcon,
    Logout05Icon,
    Menu11Icon,
    Moon02Icon,
    Search01Icon,
    Settings02Icon,
    Share08Icon,
    SidebarRight01Icon,
    Sun02Icon
} from "hugeicons-react";
import moment from "moment";
import {useState} from "react";
import {Link} from "react-router-dom";
import FilterModal from "@/modules/dashboard/components/FilterModal.jsx";


export default function NavbarComponent({showSidebar, setShowSidebar}) {
    const {currentTheme, changeCurrentTheme} = useThemeProvider();
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [showFilterModal, setShowFilterModal] = useState(false);

    return (
        <>
            <Navbar disableAnimation isBordered className="z-20 w-full px-2 py-4" maxWidth="full">
                {!showSidebar && (
                    <Button onClick={() => setShowSidebar(!showSidebar)} isIconOnly variant="light">
                        <SidebarRight01Icon/>
                    </Button>
                )}
                <NavbarItem className="mr-auto lg:hidden">
                    <img src={codPowerGroupLogo} alt="cod power group logo" className="w-20"/>
                </NavbarItem>
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

                    <NavbarItem>
                        <Button
                            isIconOnly
                            className={`overflow-visible bg-gray-100 dark:bg-gray-950 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full ml-3 ${searchModalOpen && 'bg-gray-200 dark:bg-gray-800'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSearchModalOpen(true);
                            }}
                            aria-controls="search-modal"
                        >
                            <span className="sr-only">Search</span>
                            <svg
                                className="fill-current text-gray-500/80 dark:text-gray-400/80"
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z"/>
                                <path
                                    d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z"/>
                            </svg>
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent className="justify-self-start md:mr-auto max-w-fit">
                    <NavbarItem>
                        <DropdownNotifications/>
                    </NavbarItem>
                    <NavbarItem className="md:hidden">
                        {currentTheme === 'light' ?
                            <Button isIconOnly color="default" to="#" variant="flat"
                                    className="font-bold text-gray-700 rounded-full"
                                    onClick={() => changeCurrentTheme('dark')}>
                                <Moon02Icon/>
                            </Button> :
                            <Button isIconOnly color="secondary" to="#" variant="flat"
                                    className="font-bold text-gray-700 rounded-full bg-gray-950"
                                    onClick={() => changeCurrentTheme('light')}>
                                <Sun02Icon className="text-gray-500"/>
                            </Button>
                        }
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            isIconOnly
                            variant="light"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            className="md:hidden">
                            <Menu11Icon/>
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent className="justify-between hidden gap-4 px-2 md:flex md:flex-row">

                    <NavbarItem className="hidden ml-auto lg:block">
                        <Button color="danger" to="#" variant="flat" className="font-bold text-danger">
                            Important Notifications in the ERP
                            <ArrowRight01Icon/>
                        </Button>
                    </NavbarItem>

                    <NavbarItem className="ml-auto">
                        <h4 className="text-lg font-bold">{moment().format('dddd, MM MMM YYYY')}</h4>
                        <span className="flex flex-row items-center gap-1 text-gray-600"> <Clock01Icon
                            size={16}/> {moment().format('HH:mm  Z')}</span>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu
                    className={`${isMenuOpen ? 'block' : 'hidden'} fixed inset-0 p-0 h-screen bg-gray-500/10`}>

                    <div className="flex flex-col justify-center w-10/12 h-screen ml-auto bg-white dark:bg-black">
                        <NavbarMenuItem className="ml-auto mr-4 w-fit">
                            <Button isIconOnly className="my-4 bg-gray-100 rounded-full dark:bg-gray-800"
                                    onClick={() => setIsMenuOpen(false)}>
                                <Cancel01Icon className="mx-auto"/>
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
                                        classNames={{name: "font-bold", base: 'mx-auto flex mb-8'}}
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
                                    inputWrapper: "bg-gray-100 dark:bg-gray-950 rounded-full",
                                }} startContent={<Search01Icon size={18} className="text-gray-500"/>}/>

                                <Button isIconOnly className="mx-2 text-white rounded-full bg-info"
                                        onClick={() => setShowFilterModal(!showFilterModal)}>
                                    <FilterIcon size={18}/>
                                </Button>
                            </div>
                        </NavbarMenuItem>
                        <NavbarMenuItem className="px-8 my-12 text-sm">
                            <h3 className="mt-4 mb-2 text-gray-400">System</h3>
                            <ul>
                                <li className="px-2 py-2">
                                    <Link to="#" className="flex w-full">
                             <span className="flex w-full gap-1">
                                <Settings02Icon className="ml-1 mr-2" size="20"/>
                                Settings
                            </span>
                                    </Link>
                                </li>
                                <li className="px-2 py-2">
                                    <Link to="#" className="flex w-full">
                             <span className="flex w-full gap-1">
                                <Share08Icon className="ml-1 mr-2" size="20"/>
                                Referrals
                            </span>
                                    </Link>
                                </li>
                                <li className="px-2 py-2">
                                    <Link to="#" className="flex w-full">
                            <span className="flex w-full gap-1">
                                <HelpCircleIcon className="ml-1 mr-2" size="20"/>
                                Help
                            </span>
                                    </Link>
                                </li>
                            </ul>
                        </NavbarMenuItem>

                        <NavbarMenuItem className="block px-8 my-12">
                            <Link to="#"
                                  className="flex flex-row items-center justify-start w-full gap-2 my-2 text-danger">
                                <Logout05Icon size={18} className="rotate-45"/>
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
                         setModalOpen={setSearchModalOpen}/>

            <FilterModal modalOpen={showFilterModal} setModalOpen={setShowFilterModal} id={2}/>
        </>
    );
}