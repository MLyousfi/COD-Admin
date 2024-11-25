// Sponsoring.jsx

import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Calendar03Icon ,ChartHistogramIcon,FilterIcon,ArrowDown01Icon} from "hugeicons-react";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import { Button } from "@nextui-org/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import react-datepicker's default styles

export default function Sponsoring() {
    // Sample options for the select inputs
    const sponsors = [
        { label: "Sponsor 1", value: "sponsor1" },
        { label: "Sponsor 2", value: "sponsor2" },
        { label: "Sponsor 3", value: "sponsor3" },
    ];

    const stores = [
        { label: "Store 1", value: "store1" },
        { label: "Store 2", value: "store2" },
        { label: "Store 3", value: "store3" },
    ];

    // State for selected values
    const [selectedSponsor, setSelectedSponsor] = useState("");
    const [selectedStore, setSelectedStore] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const headerButtons = (
        <div className="flex flex-col gap-2 lg:flex-row w-full lg:w-auto items-start lg:items-center">
            {/* Apply Filter Button: First on small screens, Last on large screens */}
            <div className="order-1  lg:order-3 flex justify-end mb-2 lg:mb-0 w-full lg:w-auto lg:ml-auto">
                <Button
                    className="bg-[#0258E8] border border-blue-800 text-white rounded-full px-4 py-2 flex items-center w-auto"
                    auto
                    aria-label="Apply Filter"
                >
                    <FilterIcon className="text-white" size={18} />
                    <span className="ml-2">Apply Filter</span>
                </Button>
            </div>

            {/* Today and List of Agents Buttons: Second on small screens, First on large screens */}
            <div className="order-2 lg:order-1 flex flex-row justify-end gap-2 w-full lg:w-auto">
                <Button
                    className="bg-transparent border border-gray-700 text-black dark:text-white rounded-full px-4 py-2 flex items-center w-auto"
                    auto
                    aria-label="Select Today"
                >
                    <Calendar03Icon className="text-gray-500 dark:text-gray-300" size={18} />
                    <span className="ml-2">Today</span>
                </Button>
                <Button
                    className="bg-transparent border border-gray-700 text-black dark:text-white rounded-full px-4 py-2 flex items-center w-auto"
                    auto
                    aria-label="List of Agents"
                >
                    <Calendar03Icon className="text-gray-500 dark:text-gray-300" size={18} />
                    <span className="ml-2">List of Agents</span>
                    <ArrowDown01Icon className="ml-1 text-black dark:text-white" size={18} />
                </Button>
            </div>
        </div>
    );
    return (
        <DashboardLayout
            hasSearchInput={false}
            title="Statistics - Sponsoring"
            icon={<ChartHistogramIcon className="text-info" />}
            additionalContent={headerButtons}
        >
            {/* Embedded Custom Styles for react-datepicker */}
            <style jsx>{`
                /* Light Mode Styles */
                .react-datepicker {
                    background-color: #ffffff;
                    color: #000000;
                    border: 1px solid #e5e7eb; /* Tailwind's gray-200 */
                    border-radius: 0.5rem; /* Tailwind's rounded-lg */
                }

                .react-datepicker__header {
                    background-color: #f3f4f6; /* Tailwind's gray-100 */
                    border-bottom: 1px solid #e5e7eb; /* Tailwind's gray-200 */
                }

                .react-datepicker__current-month,
                .react-datepicker-time__header {
                    color: #1f2937; /* Tailwind's gray-800 */
                }

                .react-datepicker__day-name,
                .react-datepicker__day,
                .react-datepicker__month-text,
                .react-datepicker__year-text {
                    color: #374151; /* Tailwind's gray-700 */
                }

                .react-datepicker__day:hover,
                .react-datepicker__day--keyboard-selected {
                    background-color: #3b82f6; /* Tailwind's blue-500 */
                    color: #ffffff;
                }

                .react-datepicker__day--selected {
                    background-color: #2563eb; /* Tailwind's blue-600 */
                    color: #ffffff;
                }

                .react-datepicker__navigation-icon::before {
                    border-color: #1f2937; /* Tailwind's gray-800 */
                }

                /* Dark Mode Styles */
                .dark .react-datepicker {
                    background-color: #1f2937; /* Tailwind's gray-800 */
                    color: #d1d5db; /* Tailwind's gray-300 */
                    border: 1px solid #4b5563; /* Tailwind's gray-600 */
                }

                .dark .react-datepicker__header {
                    background-color: #374151; /* Tailwind's gray-700 */
                    border-bottom: 1px solid #4b5563; /* Tailwind's gray-600 */
                }

                .dark .react-datepicker__current-month,
                .dark .react-datepicker-time__header {
                    color: #d1d5db; /* Tailwind's gray-300 */
                }

                .dark .react-datepicker__day-name,
                .dark .react-datepicker__day,
                .dark .react-datepicker__month-text,
                .dark .react-datepicker__year-text {
                    color: #d1d5db; /* Tailwind's gray-300 */
                }

                .dark .react-datepicker__day:hover,
                .dark .react-datepicker__day--keyboard-selected {
                    background-color: #3b82f6; /* Tailwind's blue-500 */
                    color: #ffffff;
                }

                .dark .react-datepicker__day--selected {
                    background-color: #2563eb; /* Tailwind's blue-600 */
                    color: #ffffff;
                }

                .dark .react-datepicker__navigation-icon::before {
                    border-color: #d1d5db; /* Tailwind's gray-300 */
                }

                /* Adjust Popper Container Z-Index if Needed */
                .react-datepicker-popper {
                    z-index: 1000;
                }

                /* Smooth Transition for Theme Changes */
                .react-datepicker,
                .react-datepicker__header,
                .react-datepicker__day,
                .react-datepicker__navigation-icon::before {
                    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
                }

                /* Font Size and Weight Adjustments */
                .react-datepicker__day,
                .react-datepicker__month-text,
                .react-datepicker__year-text {
                    font-size: 0.875rem; /* Tailwind's text-sm */
                }

                .react-datepicker__current-month {
                    font-weight: 600; /* Tailwind's font-semibold */
                }

                /* RTL Support (Optional) */
                /* .rtl .react-datepicker {
                    direction: rtl;
                } */
            `}</style>

            <div className="mt-14 px-4 md:px-8 w-full">
                <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">Select Filters</h2>
                <div className="flex flex-col gap-6 w-full">
                    {/* List of Sponsors */}
                    <div className="w-full">
                        <label htmlFor="sponsor" className="block">
                            <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">List of Sponsors</span>
                            <Select
                                id="sponsor"
                                placeholder="List of Sponsors"
                                value={selectedSponsor}
                                onChange={(value) => setSelectedSponsor(value)}
                                classNames={{
                                    trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg w-full',
                                }}
                            >
                                {sponsors.map((sponsor) => (
                                    <SelectItem key={sponsor.value} value={sponsor.value}>
                                        {sponsor.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </label>
                    </div>

                    {/* List of Stores */}
                    <div className="w-full">
                        <label htmlFor="store" className="block">
                            <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">List of Stores</span>
                            <Select
                                id="store"
                                placeholder="List of Stores"
                                value={selectedStore}
                                onChange={(value) => setSelectedStore(value)}
                                classNames={{
                                    trigger: 'bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg w-full',
                                }}
                            >
                                {stores.map((store) => (
                                    <SelectItem key={store.value} value={store.value}>
                                        {store.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </label>
                    </div>

                    {/* Date Selector */}
                    <div className="w-full">
                        <label htmlFor="date" className="block">
                            <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Date</span>
                            <div className="relative">
                                <DatePicker
                                    id="date"
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    placeholderText="Date"
                                    className="w-full bg-transparent focus:border-dark_selected border border-gray-300 dark:border-[#ffffff10] rounded-lg py-2 pl-4 pr-10"
                                    dateFormat="dd/MM/yyyy"
                                    wrapperClassName="w-full"
                                />
                                <Calendar03Icon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none" size={18} />
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
