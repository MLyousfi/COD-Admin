import Transition from "@/core/utils/Transition.jsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { ArrowLeft01Icon, Call02Icon, CallOutgoing01Icon, Cancel01Icon, Chatting01Icon, DeliveryBox01Icon, HeadsetIcon, InformationCircleIcon, PencilEdit01Icon, Search01Icon, Search02Icon, ShippingTruck01Icon, UserIdVerificationIcon, WhatsappIcon , GoogleIcon,Location08Icon} from "hugeicons-react";
import styled from 'styled-components';
import { useThemeProvider } from "../../../core/providers/ThemeContext";
import { FaGoogle, FaMapMarkerAlt } from "react-icons/fa"; // Imported react-icons

const NavOptions = [
    {
        key: 1,
        label: "Informations",
        notify: 0,
        icon: InformationCircleIcon
    },
    {
        key: 2,
        label: "Customer",
        notify: 0,
        icon: UserIdVerificationIcon
    },
    {
        key: 3,
        label: "Products",
        notify: 1,
        icon: DeliveryBox01Icon
    },
    {
        key: 4,
        label: "Call List",
        notify: 9,
        icon: CallOutgoing01Icon
    },
    {
        key: 5,
        label: "Call Center",
        notify: 14,
        icon: HeadsetIcon
    },
    {
        key: 6,
        label: "Messages",
        notify: 0,
        icon: Chatting01Icon
    },
    {
        key: 7,
        label: "Shipping History",
        notify: 0,
        icon: ShippingTruck01Icon
    },
    {
        key: 8,
        label: "Follow Up",
        notify: 0,
        icon: Call02Icon
    },
]

const MyTable = styled.table`
    min-width: 100%;

    tr {
        padding: 8px;
        height: 48px;
    }

    /* Style even rows */
    tr:nth-child(odd) td {
        background-color: ${({ currentTheme }) =>
            currentTheme === 'light' ? 'white' : '#ffffff02'};
    }

    /* Style odd rows */
    tr:nth-child(even) td {
        background-color: ${({ currentTheme }) =>
            currentTheme === 'light' ? '#00000010' : '#ffffff05'};
    }
    td {
        text-align: center;
        padding: 8px;
    }
    td:first-child {
        border-right: 1px solid ${({ currentTheme }) =>
            currentTheme === 'light' ? '#00000030' : '#ffffff30'};
    }

    /* Top-left corner */
    tr:first-child td:first-child {
        border-top-left-radius: 10px;
    }

    /* Top-right corner */
    tr:first-child td:last-child {
        border-top-right-radius: 10px;
    }

    /* Bottom-left corner */
    tr:last-child td:first-child {
        border-bottom-left-radius: 10px;
    }

    /* Bottom-right corner */
    tr:last-child td:last-child {
        border-bottom-right-radius: 10px;
    }
`;

function OrderDetailsModal({ id, modalOpen, setModalOpen, Order }) {

    const modalContent = useRef();
    const { currentTheme } = useThemeProvider();
    const [selectedNavOption, setSelectedNavOption] = useState(1);

    // Close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!modalOpen || modalContent.current.contains(target)) return;
            closeModal(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [modalOpen]);

    const closeModal = (v) => {
        setSelectedNavOption(1);
        setModalOpen(v);
    };

    // Show if the ctrl+k key is pressed
    useEffect(() => {
        const keyHandler = (event) => {
            if (event.ctrlKey && event.keyCode === 75) { // 75 is the keyCode for 'k'
                event.preventDefault();
                closeModal(!modalOpen);
            }
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    }, [modalOpen]);

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
                    className="relative bg-white dark:bg-base_dark border border-transparent dark:border-[#ffffff10] max-w-4xl w-full minw- max-h-full rounded-lg shadow-lg px-6 py-4 overflow-y-auto">
                    
                    {/* Header */}
                    <div className="flex flex-row justify-between items-center w-full border-b border-b-gray-200 dark:border-b-[#ffffff10] mb-6 pb-4">
                        <h3 className="text-lg font-normal">Order – Nº {Order && Order.orderNum} <span className="text-dark_selected">({Order && Order.subNum})</span></h3>
                        <Button isIconOnly className="rounded-full bg-transparent "
                            onClick={() => closeModal(false)}>
                            <Cancel01Icon />
                        </Button>
                    </div>
                    
                    {/* Navigation Buttons */}
                    <div className="flex justify-end items-center w-full flex-wrap">
                        <Button color="default" className="rounded-full text-white bg-glb_red">
                            <ArrowLeft01Icon size={18} /> Order Status
                        </Button>
                    </div>
                    
                    <div className="flex justify-start items-center w-full flex-wrap gap-2 mt-6">
                        {NavOptions.map((i) => (
                            <Button 
                                onClick={() => setSelectedNavOption(i.key)} 
                                key={i.key} 
                                className={`${selectedNavOption === i.key ? "bg-dark_selected text-white" : 'dark:bg-base_card dark:text-white'} flex justify-center gap-3 px-4 py-2 items-center rounded-full`}>
                                {React.createElement(i.icon)}
                                {i.label}
                                {i.notify > 0 && <div className="flex p-2 rounded-full w-5 h-5 text-sm items-center justify-center bg-glb_red text-white">{i.notify}</div>}
                            </Button>
                        ))}
                    </div>
                    
                    {/* Content Area */}
                    <div className="mt-6">
                        {/* Conditionally render content based on selectedNavOption */}
                        {selectedNavOption === 2 ? (
                            // Customer Section
                            <div className="flex flex-col gap-6">
                                {/* Row 1: Full Name and Phone Number */}
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Full Name Input */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="fullName"
                                            className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            placeholder="Enter full name"
                                            className={`w-full px-4 py-2 border ${
                                                currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                                            } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                                        />
                                    </div>

                                    {/* Phone Number Input */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="phoneNumber"
                                            className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            placeholder="Enter phone number"
                                            className={`w-full px-4 py-2 border ${
                                                currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                                            } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                                        />
                                    </div>
                                </div>

                                {/* Row 2: WhatsApp Number and Second Phone Number */}
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* WhatsApp Number Input */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="whatsappNumber"
                                            className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                                        >
                                            WhatsApp Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="whatsappNumber"
                                            name="whatsappNumber"
                                            placeholder="Enter WhatsApp number"
                                            className={`w-full px-4 py-2 border ${
                                                currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                                            } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                                        />
                                    </div>

                                    {/* Second Phone Number Input */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="secondPhoneNumber"
                                            className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                                        >
                                            Second Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="secondPhoneNumber"
                                            name="secondPhoneNumber"
                                            placeholder="Enter second phone number"
                                            className={`w-full px-4 py-2 border ${
                                                currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                                            } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                                        />
                                    </div>
                                </div>

                                {/* Row 3: Province and Country (Select Inputs) */}
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Province Select */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="province"
                                            className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                                        >
                                            Province
                                        </label>
                                        <select
                                            id="province"
                                            name="province"
                                            className={`w-full px-4 py-2 border ${
                                                currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                                            } bg-transparent dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        >
                                            <option value="">Select Province</option>
                                            {/* Replace with actual province options */}
                                            <option value="province1">Province 1</option>
                                            <option value="province2">Province 2</option>
                                            <option value="province3">Province 3</option>
                                        </select>
                                    </div>

                                    {/* Country Select */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                                        >
                                            Country
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            className={`w-full px-4 py-2 border ${
                                                currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                                            } bg-transparent dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        >
                                            <option value="">Select Country</option>
                                            {/* Replace with actual country options */}
                                            <option value="country1">Country 1</option>
                                            <option value="country2">Country 2</option>
                                            <option value="country3">Country 3</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 4: Street Name and City */}
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Street Name Input */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="streetName"
                                            className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                                        >
                                            Street Name
                                        </label>
                                        <input
                                            type="text"
                                            id="streetName"
                                            name="streetName"
                                            placeholder="Enter street name"
                                            className={`w-full px-4 py-2 border ${
                                                currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                                            } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                                        />
                                    </div>

                                    {/* City Select */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                                        >
                                            City
                                        </label>
                                        <select
                                            id="city"
                                            name="city"
                                            className={`w-full px-4 py-2 border ${
                                                currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                                            } bg-transparent dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        >
                                            <option value="">Select City</option>
                                            {/* Replace with actual city options */}
                                            <option value="city1">City 1</option>
                                            <option value="city2">City 2</option>
                                            <option value="city3">City 3</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 5: Nearest Place and Area Name */}
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Nearest Place Input */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="nearestPlace"
                                            className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                                        >
                                            Nearest Place
                                        </label>
                                        <input
                                            type="text"
                                            id="nearestPlace"
                                            name="nearestPlace"
                                            placeholder="Enter nearest place"
                                            className={`w-full px-4 py-2 border ${
                                                currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                                            } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                                        />
                                    </div>

                                    {/* Area Name Input */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="areaName"
                                            className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                                        >
                                            Area Name
                                        </label>
                                        <input
                                            type="text"
                                            id="areaName"
                                            name="areaName"
                                            placeholder="Enter area name"
                                            className={`w-full px-4 py-2 border ${
                                                currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                                            } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                                        />
                                    </div>
                                </div>

                                {/* Row 6: House Number and GPS Coordinates */}
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* House Number Input */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="houseNumber"
                                            className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                                        >
                                            House Number
                                        </label>
                                        <input
                                            type="text"
                                            id="houseNumber"
                                            name="houseNumber"
                                            placeholder="Enter house number"
                                            className={`w-full px-4 py-2 border ${
                                                currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                                            } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                                        />
                                    </div>

                                    {/* GPS Coordinates Input */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="gpsCoordinates"
                                            className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                                        >
                                            GPS Coordinates
                                        </label>
                                        <input
                                            type="text"
                                            id="gpsCoordinates"
                                            name="gpsCoordinates"
                                            placeholder="Enter GPS coordinates"
                                            className={`w-full px-4 py-2 border ${
                                                currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                                            } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                                        />
                                    </div>
                                </div>

                                {/* Row 7: Address (Full Width) */}
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder="Enter full address"
                                        className={`w-full px-4 py-2 border ${
                                            currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                                        } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                                    />
                                </div>

                                {/* Row 8: Google Icon with Text and View Map Button */}
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                    {/* Left: Google Icon with Text */}
                                    <div className="flex items-center gap-2">
                                        <GoogleIcon className="dark:text-white text-black" />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            Get latitude and longitude by address
                                        </span>
                                    </div>

                                    {/* Right: View Map Button */}
                                    <Button
                                        className="flex items-center gap-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2"
                                        onClick={() => {
                                            // Handle view map action here
                                            console.log("View Map Clicked");
                                        }}
                                    >
                                        <Location08Icon className=" text-gray-700 dark:text-gray-300" />
                                        View Map
                                    </Button>
                                </div>

                                {/* Row 9: Your Notes (Full Width) */}
                                <div>
                                    <label
                                        htmlFor="yourNotes"
                                        className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                                    >
                                        Your Notes
                                    </label>
                                    <input
                                        type="text"
                                        id="yourNotes"
                                        name="yourNotes"
                                        placeholder="Enter your notes"
                                        className={`w-full px-4 py-2 border ${
                                            currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                                        } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                                    />
                                </div>
                            </div>
                        ) : (
                            // Existing Content for other NavOptions
                            <div className="flex justify-start items-center w-full flex-wrap gap-2 mt-6 overflow-x-auto">
                                <MyTable currentTheme={currentTheme} >
                                    <tbody>
                                        <tr >
                                            <td>
                                                Order
                                            </td>
                                            <td>
                                                {Order && Order.orderNum} ({Order && Order.subNum})
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Agent
                                            </td>
                                            <td>
                                                {/* Add Agent details here */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Store
                                            </td>
                                            <td>
                                                {Order && Order.store}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Statut
                                            </td>
                                            <td>
                                                In transit
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Product
                                            </td>
                                            <td>
                                                {Order && `${Order.product} (SKU : ${Order.productId})`}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Link
                                            </td>
                                            <td>
                                                {Order && Order.invoiceNum}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Offer
                                            </td>
                                            <td>
                                                {/* Add Offer details here */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Upsell ?
                                            </td>
                                            <td>
                                                {/* Add Upsell details here */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Available Offers
                                            </td>
                                            <td>
                                                Refuse
                                            </td>
                                        </tr>
                                    </tbody>
                                </MyTable>
                            </div>
                        )}
                    </div>
                    
                    {/* Sticky Buttons */}
                    <div className="sticky bottom-0 right-5 flex flex-col gap-3 justify-center items-end">
                        <Button 
                            className="rounded-full bg-glb_red text-white flex p-0 min-w-14 w-14 h-14 justify-center items-center"
                            onClick={() => closeModal(false)}>
                            <Call02Icon />
                        </Button>
                        <Button 
                            className="rounded-full bg-glb_green text-white flex min-w-14 p-0 w-14 h-14 justify-center items-center"
                            onClick={() => closeModal(false)}>
                            <WhatsappIcon />
                        </Button>
                    </div>

                </div>
            </Transition>
        </>
    );

}

export default OrderDetailsModal;
