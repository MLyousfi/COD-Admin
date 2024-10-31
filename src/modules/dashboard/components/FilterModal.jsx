import Transition from "@/core/utils/Transition.jsx";
import { useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { Cancel01Icon, Search01Icon } from "hugeicons-react";
import CountrySelector from "@shared/components/CountrySelector.jsx";
import { SignupSteps } from "@/core/constants/signup.js";
import { COUNTRIES } from "@/core/constants/countries.js";
import { Select, SelectItem } from "@nextui-org/select";

export default function FilterModal({ id, modalOpen, setModalOpen }) {

    const modalContent = useRef(null);

    const [isFromCountryOpen, setIsFromCountryOpen] = useState(false);
    const [isToCountryOpen, setIsToCountryOpen] = useState(false);
    const [fromCountry, setFromCountry] = useState(SignupSteps.defaultCountry);
    const [toCountry, setToCountry] = useState(SignupSteps.defaultCountry);

    return (
        <>
            {/* Modal backdrop */}
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
                    className="bg-white dark:bg-base_dark border border-transparent dark:border-[#ffffff10] max-w-2xl w-full max-h-full rounded-lg shadow-lg px-6 py-4 overflow-y-auto">
                    <div className="flex flex-row justify-between items-center w-full border-b border-b-gray-200 dark:border-b-[#ffffff10] mb-6 pb-4">
                        <h3 className="text-lg font-bold">Dashboard Filter</h3>
                        <Button isIconOnly className="rounded-full bg-gray-200 dark:bg-base_card"
                            onClick={() => setModalOpen(false)}>
                            <Cancel01Icon />
                        </Button>
                    </div>
                    <div>
                        <h4 className="text-lg font-medium">Countries</h4>
                        <div className="flex flex-col lg:flex-row">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#fromCountry" className="block mr-2">
                                    <span className="text-sm text-gray-400">From Country</span>
                                    <CountrySelector
                                        open={isFromCountryOpen}
                                        onToggle={() => setIsFromCountryOpen(!isFromCountryOpen)}
                                        id="fromCountry" onChange={(country) => setFromCountry(country)}
                                        selectedValue={COUNTRIES.find(option => option.value === fromCountry)} />
                                </label>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#toCountry" className="block mt-4 lg:mt-0 lg:ml-2">
                                    <span className="text-sm text-gray-400">To Country</span>
                                    <CountrySelector
                                        open={isToCountryOpen}
                                        onToggle={() => setIsToCountryOpen(!isToCountryOpen)}
                                        id="toCountry" onChange={(country) => setToCountry(country)}
                                        selectedValue={COUNTRIES.find(option => option.value === toCountry)} />
                                </label>
                            </div>
                        </div>
                        <h4 className="text-lg font-medium mt-6 mb-2">Lists</h4>
                        <div className="flex flex-col lg:flex-row my-2">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#agents" className="block mr-2">
                                    <span className="text-sm text-gray-400">List of agents</span>
                                    <Select
                                        id="agents"
                                        placeholder="Select an agent"
                                        labelPlacement="outside"
                                        classNames={{
                                            trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg', // Added rounded-lg
                                        }}>
                                        <SelectItem>
                                            Agent
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#follow-up-agents" className="block mt-4 lg:mt-0 lg:ml-2">
                                    <span className="text-sm text-gray-400">List of follow up agents</span>
                                    <Select
                                        id="follow-up-agents"
                                        placeholder="Select a follow up agent"
                                        labelPlacement="outside"
                                        classNames={{
                                            trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg',
                                        }}>
                                        <SelectItem>
                                            Agent
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row my-4">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#seller" className="block mr-2">
                                    <span className="text-sm text-gray-400">List of sellers *</span>
                                    <Select
                                        id="seller"
                                        placeholder="Select a seller"
                                        labelPlacement="outside"
                                        classNames={{
                                            trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg', 
                                        }}>
                                        <SelectItem>
                                            Agent
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#product" className="block mt-4 lg:mt-0 lg:ml-2">
                                    <span className="text-sm text-gray-400">List of products *</span>
                                    <Select
                                        id="product"
                                        placeholder="Select a product"
                                        labelPlacement="outside"
                                        classNames={{
                                            trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg',
                                        }}>
                                        <SelectItem>
                                            Agent
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row my-4">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#affiliate" className="block mr-2">
                                    <span className="text-sm text-gray-400">List of affiliates *</span>
                                    <Select
                                        id="affiliate"
                                        placeholder="Select an affiliate"
                                        labelPlacement="outside"
                                        classNames={{
                                            trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg', 
                                        }}>
                                        <SelectItem>
                                            Agent
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#store" className="block mt-4 lg:mt-0 lg:ml-2">
                                    <span className="text-sm text-gray-400">List of stores *</span>
                                    <Select
                                        id="store"
                                        placeholder="Select a store"
                                        labelPlacement="outside"
                                        classNames={{
                                            trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg', 
                                        }}
                                        color="default">
                                        <SelectItem>
                                            Agent
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                        </div>
                        <h4 className="text-lg font-medium mt-6 mb-2">Confirmation</h4>
                        <div className="flex flex-col lg:flex-row my-2">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#agents" className="block mr-2">
                                    <span className="text-sm text-gray-400">Confirmed by</span>
                                    <Select
                                        id="agents"
                                        placeholder="Confirmed by"
                                        labelPlacement="outside"
                                        classNames={{
                                            trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg', 
                                        }}>
                                        <SelectItem>
                                            Agent
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#follow-up-agents" className="block mt-4 lg:mt-0 lg:ml-2">
                                    <span className="text-sm text-gray-400">Confirmed via</span>
                                    <Select
                                        id="follow-up-agents"
                                        placeholder="Confirmed via"
                                        labelPlacement="outside"
                                        classNames={{
                                            trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg',
                                        }}>
                                        <SelectItem>
                                            Whatsapp
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                        </div>
                        <h4 className="text-lg font-medium mt-6 mb-2">Channels</h4>
                        <div className="flex flex-col lg:flex-row my-2">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#agents" className="block mr-2">
                                    <span className="text-sm text-gray-400">Sales Channel *</span>
                                    <Select
                                        id="agents"
                                        placeholder="Select a channel"
                                        labelPlacement="outside"
                                        classNames={{
                                            trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg', 
                                        }}>
                                        <SelectItem>
                                            Chanel
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                        </div>
                        <h4 className="text-lg font-medium mt-6 mb-2">Companies</h4>
                        <div className="flex flex-col lg:flex-row my-2">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#agents" className="block mr-2">
                                    <span className="text-sm text-gray-400">Shopping Company *</span>
                                    <Select
                                        id="agents"
                                        placeholder="Select a company"
                                        labelPlacement="outside"
                                        classNames={{
                                            trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg', 
                                        }}>
                                        <SelectItem>
                                            Chanel
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-t-gray-200 dark:border-t-[#ffffff10] flex flex-row justify-center items-center gap-4">
                            <Button className="rounded-full bg-blue-600 text-white px-4 py-2"
                                onClick={() => setModalOpen(false)}>
                                <Search01Icon /> Apply & Search
                            </Button>
                            <Button className="rounded-full bg-gray-200 dark:bg-base_card px-4 py-2"
                                onClick={() => setModalOpen(false)}>
                                <Cancel01Icon size={16} /> Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Transition>
        </>
    );
}
