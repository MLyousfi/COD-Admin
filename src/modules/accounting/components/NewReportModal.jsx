import Transition from "@/core/utils/Transition.jsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { Cancel01Icon } from "hugeicons-react";

import { Select, SelectItem } from "@nextui-org/select";


const years = Array.from({ length: 2024 - 2000 + 1 }, (_, i) => 2000 + i);
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function NewReportModal({ id, modalOpen, setModalOpen }) {

    const modalContent = useRef(null);

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
                        <h3 className="text-lg font-normal">New Report</h3>
                        <Button isIconOnly className="rounded-full "
                            onClick={() => closeModal(false)}>
                            <Cancel01Icon />
                        </Button>
                    </div>

                    <div >

                        <div className="flex flex-col gap-8 lg:flex-row mt-6 ">
                            <div className="w-full">

                                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Year</span>
                                <Select
                                    placeholder="Select a year"
                                    labelPlacement="outside"
                                    classNames={{
                                        value: " dark:!text-[#ffffff85] !text-[#00000085] ",

                                        trigger: 'bg-transparent !rounded-xl mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg ',
                                    }}>
                                    {years.map((y, index) => (
                                        <SelectItem key={(index + 1).toFixed()}>
                                            {y.toFixed()}
                                        </SelectItem>
                                    ))}

                                </Select>



                            </div>

                        </div>
                        <div className="flex flex-col gap-8 lg:flex-row mt-6 ">
                            <div className="w-full">

                                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Month</span>
                                <Select
                                    placeholder="Select a month"
                                    labelPlacement="outside"
                                    classNames={{
                                        value: " dark:!text-[#ffffff85] !text-[#00000085] ",

                                        trigger: 'bg-transparent !rounded-xl mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg ',
                                    }}>
                                    {months.map((m, index) => (
                                        <SelectItem key={(index + 1).toFixed()}>
                                            {m}
                                        </SelectItem>
                                    ))}

                                </Select>



                            </div>

                        </div>






                        <div className="mt-6 pt-4 border-t border-t-gray-200 dark:border-t-[#ffffff10] flex flex-row justify-center items-center gap-4">
                            <Button className="rounded-full min-w-28 bg-blue-600 text-white px-4 py-2"
                                onClick={() => closeModal(false)}>
                                Create Report
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

export default NewReportModal;



