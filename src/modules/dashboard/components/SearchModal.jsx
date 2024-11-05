// ModalSearch.jsx
import React, { useEffect, useRef } from 'react';
import Transition from "@/core/utils/Transition.jsx";
import { Button } from "@nextui-org/button";
import { Cancel01Icon } from "hugeicons-react";
import { motion } from "framer-motion";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

function ModalSearch({ id, searchId, isOpen, onClose, isDarkMode, children, width = '600px' }) {
    const modalContent = useRef(null);

    // Close modal on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!isOpen || modalContent.current.contains(target)) return;
            onClose();
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [isOpen, onClose]);

    // Focus on the first input when modal opens
    const firstInputRef = useRef(null);
    useEffect(() => {
        if (isOpen && firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, [isOpen]);

    return (
        <>
            <Transition
                className="fixed inset-0 bg-[#00000090] bg-opacity-30 z-50 transition-opacity"
                show={isOpen}
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
                show={isOpen}
                enter="transition ease-in-out duration-200"
                enterStart="opacity-0 translate-y-4"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-200"
                leaveStart="opacity-100 translate-y-0"
                leaveEnd="opacity-0 translate-y-4">
                <div
                    ref={modalContent}
                    className={`bg-white dark:bg-base_dark border border-transparent dark:border-[#ffffff10] max-w-2xl w-full max-h-full rounded-lg shadow-lg px-6 py-4 overflow-y-auto`}
                    style={{ width }}>
                    <div className="flex flex-row justify-between items-center w-full border-b border-b-gray-200 dark:border-b-[#ffffff10] mb-6 pb-4">
                        <h3 className="text-lg font-normal">Search</h3>
                        <Button isIconOnly className="rounded-full bg-gray-200 dark:bg-base_card"
                            onClick={onClose}>
                            <Cancel01Icon />
                        </Button>
                    </div>
                    <div>
                        {children}
                        {/* Your modal content goes here */}
                    </div>
                </div>
            </Transition>
        </>
    );
}

export default ModalSearch;
