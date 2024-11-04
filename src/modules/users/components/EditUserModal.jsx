import Transition from "@/core/utils/Transition.jsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { Cancel01Icon, Delete02Icon, DeliveryBox01Icon, InformationCircleIcon, PencilEdit01Icon, Search01Icon, Search02Icon, Upload04Icon, UserIdVerificationIcon, ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import CountrySelector from "@shared/components/CountrySelector.jsx";
import { SignupSteps } from "@/core/constants/signup.js";
import { COUNTRIES } from "@/core/constants/countries.js";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Switch } from "@nextui-org/switch";
import { Avatar } from "@nextui-org/react";


const NavOptions = [
    {
        key: 1,
        label: "Informations",
        notify: 0,
        icon: InformationCircleIcon
    },
    {
        key: 2,
        label: "Permissions",
        notify: 0,
        icon: UserIdVerificationIcon
    },
    {
        key: 3,
        label: "Sales Manager",
        notify: 0,
        icon: DeliveryBox01Icon
    },

]

function EditUserModal({ id, modalOpen, setModalOpen }) {

    const modalContent = useRef(null);
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null)
    const [selectedNavOption, setSelectedNavOption] = useState(1)
    const handleButtonClick = () => {
        // Trigger the click event on the hidden file input
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file)
        }
    };
    // const searchInput = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!modalOpen || modalContent.current.contains(target)) return
            closeModal(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    const closeModal = (v) => {
        setSelectedNavOption(1);
        setModalOpen(v)

    }







    const onrderNumRef = useRef()
    useEffect(() => {
        if (modalOpen && onrderNumRef.current) {
            onrderNumRef.current.focus();
        }
    }, [modalOpen])


    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            <Transition
                className="fixed inset-0 bg-[#00000090] bg-opacity-30 z-50 transition-opacity"
                show={modalOpen}
                enter="transition ease-out duration-200"
                enterStart="opacity-0"
                enterEnd="opacity-100"
                leave="transition ease-out duration-100"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
                aria-hidden="true"
            />
            {/* Modal dialog */}
            <Transition
                id={id}
                className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
                role="dialog"
                aria-modal="true"
                show={modalOpen}
                enter="transition ease-in-out duration-200"
                enterStart="opacity-0 translate-y-4"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-200"
                leaveStart="opacity-100 translate-y-0"
                leaveEnd="opacity-0 translate-y-4">
                <div
                    ref={modalContent}
                    className="bg-white  dark:bg-base_dark border border-transparent dark:border-[#ffffff10] max-w-4xl w-full max-h-full rounded-lg shadow-lg 
                    px-6 py-4 overflow-y-auto">
                    <div className="flex flex-row justify-between items-center w-full border-b border-b-gray-200 dark:border-b-[#ffffff10] mb-6 pb-4">
                        <h3 className="text-lg font-normal">New Affiliate</h3>
                        <Button isIconOnly className="rounded-full "
                            onClick={() => closeModal(false)}>
                            <Cancel01Icon />
                        </Button>
                    </div>
                    <div className="grid grid-cols-4 w-full">
                        <div className="flex flex-col justify-start items-start col-span-1 md:flex-wrap gap-2 ">
                            {NavOptions.map((i) => (
                                <div onClick={() => setSelectedNavOption(i.key)} key={i.key}
                                    className={`${selectedNavOption === i.key ? " dark:text-white" : ' dark:text-[#ffffff50]'} cursor-pointer p-0 m-0 bg-transparent flex justify-center items-center rounded-full`}>

                                    {i.label}

                                </div>
                            ))}
                        </div>
                        <div className="px-10 col-span-3">
                            {selectedNavOption === 1 && <motion.div className="min-h-[500px]" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }}>
                                <div className="flex flex-col gap-8 lg:flex-row my-8">
                                    <div className="relative rounded-lg overflow-hidden">
                                        <div
                                            className="absolute inset-0 items-center z-10 gap-2 flex flex-col justify-center bg-zinc-900/60">
                                            <Button isIconOnly className="border rounded-full" variant="light">
                                                <Delete02Icon size={18} className="text-white" />
                                            </Button>
                                            <span className="text-sm text-white">Delete</span>
                                        </div>
                                        <Avatar
                                            className="w-32 h-32 rounded-lg"
                                            src="https://i.pravatar.cc/150"
                                            alt="Profile Picture"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-8 lg:flex-row my-8">
                                    <div className="w-full lg:w-1/2">
                                        <Input type="text" variant="underlined" color="primary" value={"First name"} ref={onrderNumRef}
                                            classNames={{
                                                label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],

                                                // input tag inside innerWrapper
                                            }}
                                            label="First name" />
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                        <Input type="text" variant="underlined" color="primary" value={"Last name"}
                                            classNames={{
                                                label: [" !text-[#00000050] dark:!text-[#FFFFFF30]"],

                                            }}
                                            label="Last name" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-8 lg:flex-row my-8">

                                    <div className="w-full lg:w-1/2">
                                        <Input
                                            label="Password"
                                            variant="underlined" color="primary" value={'this is a password'}
                                            placeholder="Enter your password"
                                            endContent={
                                                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                                    {isVisible ? (
                                                        <ViewOffSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    ) : (
                                                        <ViewIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    )}
                                                </button>
                                            }
                                            type={isVisible ? "text" : "password"}

                                        />
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                        <Input type="email" variant="underlined" color="primary" value={'example@cod.com'}
                                            classNames={{
                                                label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],

                                                // input tag inside innerWrapper
                                            }}
                                            label="Email" />
                                    </div>
                                </div>


                                <div className="flex flex-col gap-8 lg:flex-row items-end mt-6">
                                    <div className="w-full lg:w-1/2">
                                        <label htmlFor="#manager" className="block mr-2">
                                            <span className="text-sm text-[#00000050]  dark:text-[#FFFFFF30]">Manager</span>
                                            <Select selectedKeys={"1"}
                                                id="manager"
                                                variant="underlined"
                                                color="primary"
                                                placeholder="Select an manager"
                                                labelPlacement="outside"
                                                classNames={{
                                                    value: " dark:!text-[#ffffff] !text-[#000000]",
                                                }}>
                                                <SelectItem key={"1"}>
                                                    List of Managers
                                                </SelectItem>
                                            </Select>
                                        </label>
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                        <Input type="text" variant="underlined" color="primary"
                                            classNames={{
                                                label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],

                                            }}
                                            endContent={
                                                <button className="focus:outline-none" type="button" aria-label="toggle password visibility">
                                                    <InformationCircleIcon size={18} className="text-2xl text-default-400 pointer-events-none" />

                                                </button>
                                            }
                                            label="CIN" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-8 lg:flex-row mt-6">
                                    <div className="w-full ">
                                        <Input
                                            classNames={{ input: 'pointer-events-none ' }}
                                            label="Image"
                                            variant="underlined"
                                            color="primary" value={image ? image.name : 'Select image'}
                                            placeholder="Select image"
                                            endContent={
                                                <><button className="focus:outline-none" type="button" onClick={() => handleButtonClick()}
                                                    aria-label="toggle password visibility">

                                                    <Upload04Icon className="text-2xl text-default-400 pointer-events-none" />

                                                </button>
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                    /></>
                                            }
                                            type='text'

                                        />
                                    </div>

                                </div>



                            </motion.div>}
                            {selectedNavOption === 2 && <motion.div className="min-h-[500px]" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }}>


                                <div className="flex flex-col gap-8 lg:flex-row mt-6 ">
                                    <div className="w-full lg:w-1/2">
                                        <label htmlFor="#roles" className="block mr-2">
                                            <span className="text-sm ">Role</span>
                                            <Select
                                                selectedKeys={"1"}
                                                id="roles"
                                                placeholder="Select a partner"
                                                labelPlacement="outside"
                                                classNames={{
                                                    value: " dark:!text-[#ffffff85] !text-[#00000085] ",
                                                    trigger: 'bg-transparent  mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg ',
                                                }}>
                                                <SelectItem key={"1"}>
                                                    Super Admin
                                                </SelectItem>
                                            </Select>
                                        </label>
                                        <div className="mt-2 flex justify-start items-center gap-2">
                                            <Switch classNames={{ base: 'h-2', wrapper: 'h-5', thumb: 'h-3 w-3 bg-[#ffffff50]' }} aria-label="Automatic updates" size="sm" />
                                            <h6 className="text-sm text-[#00000050] dark:text-[#ffffff50]">Custom permissions</h6>
                                        </div>

                                    </div>

                                </div>
                                <div className="flex flex-col gap-8 lg:flex-row mt-6">
                                    <div className="w-full lg:w-1/2">
                                        <span className="text-sm ">Origin Countries</span>

                                        <div className="mt-2 flex justify-start items-center gap-2">
                                            <Switch classNames={{ base: 'h-2', wrapper: 'h-5', thumb: 'h-3 w-3 bg-[#ffffff50]' }} aria-label="Automatic updates" size="sm" />
                                            <h6 className="text-sm text-[#00000050] dark:text-[#ffffff50]">All countries</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-8 lg:flex-row mt-6">
                                    <div className="w-full lg:w-1/2 ">
                                        <span className="text-sm ">Warehouse</span>
                                    </div>

                                </div>



                            </motion.div>}
                            {selectedNavOption === 3 && <motion.div className="min-h-[500px]" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }}>
                                <div className="flex flex-col gap-8 lg:flex-row my-8">
                                    <div className="w-full lg:w-1/2">
                                        <Input type="text" labelPlacement="outside" disabled variant="bordered" color="primary" value={"Jack"}
                                            classNames={{
                                                label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],

                                                // input tag inside innerWrapper
                                            }}
                                            label="Type" />
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                        <Input type="text" labelPlacement="outside" disabled variant="bordered" color="primary" value={"ID"}
                                            classNames={{
                                                label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],

                                                // input tag inside innerWrapper
                                            }}
                                            label="ID" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-8 lg:flex-row my-8">
                                    <div className="w-full lg:w-1/2">
                                        <Input type="text" labelPlacement="outside" disabled variant="bordered" color="primary" value={"Jack@codpowergroup.com"}
                                            classNames={{
                                                label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],

                                                // input tag inside innerWrapper
                                            }}
                                            label="Username" />
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                        <Input
                                            label="Password"
                                            variant="underlined" color="primary" value={'this is a password'}
                                            placeholder="Enter your password"
                                            endContent={
                                                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                                    {isVisible ? (
                                                        <ViewOffSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    ) : (
                                                        <ViewIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    )}
                                                </button>
                                            }
                                            type={isVisible ? "text" : "password"}

                                        />
                                    </div>
                                </div>





                            </motion.div>}

                            <div className="mt-2 mb-6 flex flex-row justify-start items-start gap-4">
                                <Button className="rounded-full min-w-28 bg-blue-600 text-white px-4 py-2"
                                    onClick={() => closeModal(false)}>
                                    Update User
                                </Button>
                                <Button variant="bordered" className="rounded-full min-w-28  px-4 py-2"
                                    onClick={() => closeModal(false)}>
                                    Cancel
                                </Button>

                            </div>
                        </div>


                    </div>
                </div>
            </Transition>
        </>
    );
}

export default EditUserModal;

