import Transition from "@/core/utils/Transition.jsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { Cancel01Icon, DeliveryBox01Icon, InformationCircleIcon, PencilEdit01Icon, Search01Icon, Search02Icon, Upload04Icon, UserIdVerificationIcon, ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import CountrySelector from "@shared/components/CountrySelector.jsx";
import { SignupSteps } from "@/core/constants/signup.js";
import { COUNTRIES } from "@/core/constants/countries.js";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Switch } from "@nextui-org/switch";
import { DatePicker } from "@nextui-org/react";


function NewExpensesModal({ id, modalOpen, setModalOpen }) {

    const modalContent = useRef(null);

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
        setModalOpen(v)

    }







    const onrderNumRef = useRef()
    useEffect(() => {
        if (modalOpen && onrderNumRef.current) {
            onrderNumRef.current.focus();
        }
    }, [modalOpen])



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
                    className="bg-white  dark:bg-base_dark border border-transparent dark:border-[#ffffff10] max-w-xl w-full max-h-full rounded-lg shadow-lg 
                    px-6 py-4 overflow-y-auto">
                    <div className="flex flex-row justify-between items-center w-full border-b border-b-gray-200 dark:border-b-[#ffffff10] mb-6 pb-4">
                        <h3 className="text-lg font-normal">New Expenses</h3>
                        <Button isIconOnly className="rounded-full "
                            onClick={() => closeModal(false)}>
                            <Cancel01Icon />
                        </Button>
                    </div>

                    <div >

                        <div className="flex flex-col gap-8 lg:flex-row mt-6 ">
                            <div className="w-full">
                                <label htmlFor="#expense" className="block mr-2">
                                    <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Informations *</span>
                                    <Select
                                        selectedKeys={"1"}
                                        id="designation"
                                        placeholder="Select a designtaion"
                                        labelPlacement="outside"
                                        classNames={{
                                            value: " dark:!text-[#ffffff85] !text-[#00000085] ",

                                            trigger: 'bg-transparent !rounded-xl mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg ',
                                        }}>
                                        <SelectItem key={"1"}>
                                            Designation
                                        </SelectItem>
                                    </Select>
                                    <Input className="mt-2" type="text" labelPlacement="outside" variant="bordered" color="primary" value={"Amount"}
                                        classNames={{
                                            input: ["!text-[#00000050] dark:!text-[#FFFFFF50]"],

                                            // input tag inside innerWrapper
                                        }} />
                                </label>
                                <div className="w-full  mt-5">
                                    <label htmlFor="#expense" className="block mr-2">
                                        <span className="text-sm text-[#00000050]  dark:text-[#FFFFFF30]">Date *</span>
                                        <div key={"bordered"} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                            <DatePicker classNames={{
                                                value: " dark:!text-[#ffffff85] !text-[#00000085] ",
                                                inputWrapper: 'bg-transparent !rounded-xl !mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg ',
                                            }} variant={"bordered"} />
                                        </div>
                                    </label>
                                </div>

                            </div>

                        </div>






                        <div className="mt-6 pt-4 border-t border-t-gray-200 dark:border-t-[#ffffff10] flex flex-row justify-center items-center gap-4">
                            <Button className="rounded-full min-w-28 bg-blue-600 text-white px-4 py-2"
                                onClick={() => closeModal(false)}>
                                Add
                            </Button>
                            <Button variant="bordered" className="rounded-full min-w-28  px-4 py-2"
                                onClick={() => closeModal(false)}>
                                Cancel
                            </Button>

                        </div>
                    </div>
                </div>
            </Transition>
        </>
    );
}

export default NewExpensesModal;



