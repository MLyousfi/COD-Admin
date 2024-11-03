import Transition from "@/core/utils/Transition.jsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import CountrySelector from "@shared/components/CountrySelector.jsx";
import { SignupSteps } from "@/core/constants/signup.js";
import { COUNTRIES } from "@/core/constants/countries.js";
import { useThemeProvider } from "../../../core/providers/ThemeContext";
import { Cancel01Icon } from "hugeicons-react";

function CreateLineModal({ id, modalOpen, setModalOpen }) {

    // const searchInput = useRef(null);
    const modalContent = useRef()
    const { currentTheme } = useThemeProvider();
    const [selectedNavOption, setSelectedNavOption] = useState(1)
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

    // show if the ctrl+k key is pressed
    useEffect(() => {
        const keyHandler = (event) => {
            if (event.ctrlKey && event.keyCode === 75) {
                event.preventDefault();
                closeModal(!modalOpen);
            }
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });



    const [isFromCountryOpen, setIsFromCountryOpen] = useState(false);
    const [isToCountryOpen, setIsToCountryOpen] = useState(false);
    const [fromCountry, setFromCountry] = useState(SignupSteps.defaultCountry);
    const [toCountry, setToCountry] = useState(SignupSteps.defaultCountry);



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
                className="fixed  inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
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
                    className="relative !overflow-visible bg-white dark:bg-base_dark border border-transparent dark:border-[#ffffff10] max-w-2xl w-full minw- max-h-full rounded-lg shadow-lg px-6 py-4 overflow-y-auto">
                    <div className="flex flex-row justify-between items-center w-full border-b border-b-gray-200 dark:border-b-[#ffffff10] mb-6 pb-4">
                        <h3 className="text-lg font-normal">Create Country Line</h3>
                        <Button isIconOnly className="rounded-full bg-transparent "
                            onClick={() => closeModal(false)}>
                            <Cancel01Icon />
                        </Button>
                    </div>
                    <div className="min-h-[200px]">
                        <div className="w-full ">
                            <label htmlFor="#toCountry" className="block mt-4 lg:mt-0 lg:ml-2">
                                <span className="text-sm text-gray-400">From</span>
                                <CountrySelector
                                    useMap={false}
                                    open={isFromCountryOpen}
                                    onToggle={() => setIsFromCountryOpen(!isFromCountryOpen)}
                                    id="fromCountry" onChange={(country) => setFromCountry(country)}
                                    selectedValue={COUNTRIES.find(option => option.value === fromCountry)} />
                            </label>
                        </div>
                        <div className="w-full ">
                            <label htmlFor="#toCountry" className="block mt-4 lg:mt-0 lg:ml-2">
                                <span className="text-sm text-gray-400">To</span>
                                <CountrySelector
                                    useMap={false}
                                    open={isToCountryOpen}
                                    onToggle={() => setIsToCountryOpen(!isToCountryOpen)}
                                    id="toCountry" onChange={(country) => setToCountry(country)}
                                    selectedValue={COUNTRIES.find(option => option.value === toCountry)} />
                            </label>
                        </div>


                    </div>
                    <div className="mt-6 pt-4 border-t border-t-gray-200 dark:border-t-[#ffffff10] flex flex-row justify-center items-center gap-4">
                        <Button className="!static rounded-full bg-blue-600 text-white px-4 py-2"
                            onClick={() => setModalOpen(false)}>
                            Create Country
                        </Button>
                        <Button className="!static rounded-full bg-gray-200 dark:bg-base_card px-4 py-2"
                            onClick={() => setModalOpen(false)}>
                            Cancel
                        </Button>
                    </div>

                </div>
            </Transition>
        </>
    );
}

export default CreateLineModal;



