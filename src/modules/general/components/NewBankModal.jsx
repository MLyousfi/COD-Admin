import Transition from "@/core/utils/Transition.jsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { Cancel01Icon, Delete02Icon, DeliveryBox01Icon, InformationCircleIcon, PencilEdit01Icon, PlusMinus01Icon, PlusSignIcon, Search01Icon, Search02Icon, Upload04Icon, UserIdVerificationIcon, ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import CountrySelector from "@shared/components/CountrySelector.jsx";
import { SignupSteps } from "@/core/constants/signup.js";
import { COUNTRIES } from "@/core/constants/countries.js";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Switch } from "@nextui-org/switch";
import avatar from "@shared/assets/images/150.jpg"
import { Avatar } from "@nextui-org/react";
import { countries_code } from "../../../core/utils/dataCountries";


const NavOptions = [
    {
        key: 1,
        label: "Informations",
        notify: 0,
        icon: InformationCircleIcon
    },
    {
        key: 2,
        label: "List of Cities",
        notify: 0,
        icon: UserIdVerificationIcon
    }

]

function NewBankModal({ id, modalOpen, setModalOpen, editedBank }) {

    const modalContent = useRef(null);
    const [selectedNavOption, setSelectedNavOption] = useState(1)

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
                    className="bg-white relative dark:bg-base_dark border border-transparent dark:border-[#ffffff10] max-w-4xl w-full max-h-full rounded-lg shadow-lg 
                    px-6 py-4 overflow-y-auto">
                    <div className="flex flex-row justify-between items-center w-full border-b border-b-gray-200 dark:border-b-[#ffffff10] mb-6 pb-4">
                        <h3 className="text-lg font-normal">Edit Bank</h3>
                        <Button isIconOnly className="rounded-full bg-transparent "
                            onClick={() => closeModal(false)}>
                            <Cancel01Icon />
                        </Button>
                    </div>
                    <div className="flex flex-col md:flex-row w-full">
                        <div className="flex w-full md:w-[25%] md:flex-col justify-start items-start  md:flex-wrap gap-2 ">
                            {NavOptions.map((i) => (
                                <div onClick={() => setSelectedNavOption(i.key)} key={i.key}
                                    className={`${selectedNavOption === i.key ? " dark:text-white" : ' dark:text-[#ffffff50]'} cursor-pointer p-0 m-0 bg-transparent flex justify-center items-center rounded-full`}>

                                    {i.label}

                                </div>
                            ))}
                        </div>
                        <div className="px-2 md:px-10 w-full md:w-[75%]">
                            {selectedNavOption === 1 &&
                                <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }}>

                                    <div className="flex flex-col gap-8 lg:flex-row my-8">
                                        <div className="w-full lg:w-1/2">
                                            <Input type="text" variant="underlined" color="primary" value={editedBank ? editedBank.bankName : 'Qatar'}
                                                classNames={{
                                                    label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],

                                                    // input tag inside innerWrapper
                                                }}
                                                label="Bank Name" />
                                        </div>

                                    </div>


                                </motion.div>}
                            {selectedNavOption === 2 && <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }}>






                            </motion.div>}


                            <div className=" my-10 flex flex-row justify-start items-start gap-4">
                                <Button className="rounded-full min-w-28 bg-blue-600 text-white px-4 py-2"
                                    onClick={() => closeModal(false)}>
                                    Update Bank
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

export default NewBankModal;

