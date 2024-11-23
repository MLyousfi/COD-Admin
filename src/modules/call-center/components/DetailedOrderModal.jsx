// OrderDetailsModal.jsx

import React, { useEffect, useRef, useState } from "react";
import Transition from "@/core/utils/Transition.jsx";
import { Button } from "@nextui-org/button";
import {
  ArrowLeft01Icon,
  Call02Icon,
  CallOutgoing01Icon,
  Cancel01Icon,
  Chatting01Icon,
  DeliveryBox01Icon,
  HeadsetIcon,
  InformationCircleIcon,
  UserIdVerificationIcon,
  ShippingTruck01Icon,
  WhatsappIcon,
} from "hugeicons-react";
// Importing icons from react-icons
import { FaGoogle, FaMapMarkerAlt } from "react-icons/fa";
import styled from "styled-components";
import { useThemeProvider } from "../../../core/providers/ThemeContext";

// Navigation Options
const NavOptions = [
  {
    key: 1,
    label: "Informations",
    notify: 0,
    icon: InformationCircleIcon,
  },
  {
    key: 2,
    label: "Customer",
    notify: 0,
    icon: UserIdVerificationIcon,
  },
  {
    key: 3,
    label: "Products",
    notify: 1,
    icon: DeliveryBox01Icon,
  },
  {
    key: 4,
    label: "Call List",
    notify: 9,
    icon: CallOutgoing01Icon,
  },
  {
    key: 5,
    label: "Call Center",
    notify: 14,
    icon: HeadsetIcon,
  },
  {
    key: 6,
    label: "Messages",
    notify: 0,
    icon: Chatting01Icon,
  },
  {
    key: 7,
    label: "Shipping History",
    notify: 0,
    icon: ShippingTruck01Icon,
  },
  {
    key: 8,
    label: "Follow Up",
    notify: 0,
    icon: Call02Icon,
  },
];

// Styled Components
const MyTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 100%;

  tr {
    height: 48px;
  }

  /* Style odd rows */
  tr:nth-child(odd) td {
    background-color: ${({ currentTheme }) =>
      currentTheme === "light" ? "white" : "#ffffff02"};
  }

  /* Style even rows */
  tr:nth-child(even) td {
    background-color: ${({ currentTheme }) =>
      currentTheme === "light" ? "#f9f9f9" : "#ffffff05"};
  }

  td {
    text-align: center;
    padding: 8px;
    border-right: 1px solid
      ${({ currentTheme }) =>
        currentTheme === "light" ? "#00000030" : "#ffffff30"};
  }

  td:last-child {
    border-right: none;
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

  /* Responsive adjustments */
  @media (max-width: 768px) {
    td {
      padding: 6px;
      font-size: 0.875rem; /* Adjust font size for better fit */
    }

    tr {
      height: auto; /* Allow row height to adjust based on content */
    }
  }
`;

const OrderInfoContainer = styled.div`
  border: 1px solid #ffffff50;
  border-radius: 16px;
  padding: 16px;
  background-color: transparent;

  @media (max-width: 768px) {
    padding: 12px; /* Adjust padding for smaller screens */
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
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [modalOpen]);

  // Close on Ctrl+K
  useEffect(() => {
    const keyHandler = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        closeModal(!modalOpen);
      }
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [modalOpen]);

  const closeModal = (v) => {
    setSelectedNavOption(1);
    setModalOpen(v);
  };

  return (
    <>
      {/* Overlay */}
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

      {/* Modal Dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className={`relative ${
            currentTheme === "light" ? "bg-white" : "dark:bg-base_dark"
          } border border-transparent dark:border-[#ffffff10] max-w-4xl w-full rounded-lg shadow-lg px-6 py-4 overflow-y-auto`}
          style={{ maxHeight: "90vh" }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full border-b border-b-gray-200 dark:border-b-[#ffffff10] mb-6 pb-4">
            <h3 className="text-lg font-normal text-center sm:text-left break-words">
              Order – Nº {Order && Order.orderNum}{" "}
              <span className="text-dark_selected">({Order && Order.subNum})</span>
            </h3>
            <Button
              isIconOnly
              className="mt-4 sm:mt-0 rounded-full bg-transparent"
              onClick={() => closeModal(false)}
            >
              <Cancel01Icon />
            </Button>
          </div>

          {/* Action Button */}
          <div className="flex justify-end items-center w-full flex-wrap mb-5">
            <Button color="default" className="rounded-full text-white bg-glb_red">
              <ArrowLeft01Icon size={18} /> Order Status
            </Button>
          </div>

          {/* Navigation Tabs - Sticky on All Screens */}
          <div className="flex justify-start items-center w-full flex-wrap gap-2 sticky top-0 bg-white dark:bg-base_dark z-10 mb-6">
            {NavOptions.map((option) => (
              <Button
                onClick={() => setSelectedNavOption(option.key)}
                key={option.key}
                className={`flex justify-center gap-3 px-4 py-2 items-center rounded-full ${
                  selectedNavOption === option.key
                    ? "bg-dark_selected text-white"
                    : "dark:bg-base_card dark:text-white"
                }`}
              >
                {React.createElement(option.icon)}
                {option.label}
                {option.notify > 0 && (
                  <div className="flex p-2 rounded-full w-5 h-5 text-sm items-center justify-center bg-glb_red text-white">
                    {option.notify}
                  </div>
                )}
              </Button>
            ))}
          </div>

          {/* Content Area */}
          <div className="pt-4">
            {/* Informations Section */}
            {selectedNavOption === 1 && (
              <div className="flex flex-col text-sm md:flex-row gap-6">
                {/* Left Section - Scrollable Table */}
                <div className="flex-1 pr-1 max-h-80 overflow-y-auto">
                  <MyTable currentTheme={currentTheme}>
                    <tbody>
                      <tr>
                        <td>Order</td>
                        <td>
                          {Order && Order.orderNum} ({Order && Order.subNum})
                        </td>
                      </tr>
                      <tr>
                        <td>Agent</td>
                        <td>{Order && Order.agent ? Order.agent : "N/A"}</td>
                      </tr>
                      <tr>
                        <td>Store</td>
                        <td>{Order && Order.store}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>In transit</td>
                      </tr>
                      <tr>
                        <td>Product</td>
                        <td>{Order && `${Order.product} (SKU: ${Order.productId})`}</td>
                      </tr>
                      <tr>
                        <td>Link</td>
                        <td>{Order && Order.invoiceNum}</td>
                      </tr>
                      <tr>
                        <td>Video</td>
                        <td>{Order && Order.video ? Order.video : "N/A"}</td>
                      </tr>
                      <tr>
                        <td>Offer</td>
                        <td>{Order && Order.offer ? Order.offer : "N/A"}</td>
                      </tr>
                      <tr>
                        <td>Upsell?</td>
                        <td>{Order && Order.upsell ? "Yes" : "No"}</td>
                      </tr>
                      <tr>
                        <td>Available Offers</td>
                        <td>{Order && Order.availableOffers ? Order.availableOffers : "Refuse"}</td>
                      </tr>
                      <tr>
                        <td>Sales Price</td>
                        <td>{Order && Order.salesPrice ? Order.salesPrice : "N/A"}</td>
                      </tr>
                    </tbody>
                  </MyTable>
                </div>

                {/* Right Section - Non-Scrollable Order Information */}
                <div className="flex-1">
                  <OrderInfoContainer currentTheme={currentTheme}>
                    <h4 className="text-sm font-semibold mb-4">CARACTERÍSTICAS:</h4>
                    <ul className="list-disc list-inside text-sm mb-6 text-gray-400">
                      <li>Pantalla táctil de alta definición de 7 pulgadas</li>
                      <li>Pantalla táctil plegable capacitiva</li>
                      <li>
                        Admite tarjeta SD, la interfaz USB2.0 de alta velocidad es compatible
                        Admite reproducción USB, reproducción de música AUX y reproducción
                      </li>
                      <li>Bluetooth</li>
                      <li>
                        Control electrónico totalmente digital de búsqueda de estaciones de radio.
                      </li>
                    </ul>
                    <h4 className="text-sm font-semibold mb-4">ESPECÍFICOS:</h4>
                    <ul className="list-disc list-inside text-sm mb-6 text-gray-400">
                      <li>Voltaje: CC 12 V</li>
                      <li>Resolución de pantalla: 800-480.</li>
                      <li>Tamaño de pantalla: Panel frontal retráctil de 7</li>
                      <li>Enlace espejo: soporte.</li>
                      <li>Salida de potencia: 4+45W.</li>
                      <li>Interfaz USB: USB2.0.</li>
                      <li>Frecuencia de radio: 87,5-108MHz.</li>
                    </ul>
                    <h4 className="text-sm font-semibold">Formato de audio:</h4>
                    <p className="text-sm text-gray-400">MP3/WMA/AAC/APE/OGG/M4A/RA/WAV</p>
                    <h4 className="text-sm font-semibold mt-4 mb-2">Formato de vídeo:</h4>
                    <p className="text-sm text-gray-400">H264 DIVX HD(720P 1080I 1080P)</p>
                    <p className="text-sm text-gray-400">AVI/FLV/MKV/RMVB/MPEG/ASF/TS/H264/QT.</p>
                  </OrderInfoContainer>
                </div>
              </div>
            )}

            {/* Customer Section */}
            {selectedNavOption === 2 && (
              <div className="flex flex-col gap-6">
                {/* Row 1: Full Name and Phone Number */}
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Full Name Input */}
                  <div className="flex-1">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1" // Updated label color
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
                      } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`} // Set bg-transparent and removed dark:bg-base_card
                    />
                  </div>

                  {/* Phone Number Input */}
                  <div className="flex-1">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1" // Updated label color
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
                      } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`} // Set bg-transparent and removed dark:bg-base_card
                    />
                  </div>
                </div>

                {/* Row 2: WhatsApp Number and Second Phone Number */}
                <div className="flex flex-col md:flex-row gap-4">
                  {/* WhatsApp Number Input */}
                  <div className="flex-1">
                    <label
                      htmlFor="whatsappNumber"
                      className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1" // Updated label color
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
                      } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`} // Set bg-transparent and removed dark:bg-base_card
                    />
                  </div>

                  {/* Second Phone Number Input */}
                  <div className="flex-1">
                    <label
                      htmlFor="secondPhoneNumber"
                      className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1" // Updated label color
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
                      } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`} // Set bg-transparent and removed dark:bg-base_card
                    />
                  </div>
                </div>

                {/* Row 3: Province and Country (Select Inputs) */}
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Province Select */}
                  <div className="flex-1">
                    <label
                      htmlFor="province"
                      className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1" // Updated label color
                    >
                      Province
                    </label>
                    <select
                      id="province"
                      name="province"
                      className={`w-full px-4 py-2 border ${
                        currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                      } bg-transparent dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} // Set bg-transparent and removed bg-white & dark:bg-base_card
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
                      className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1" // Updated label color
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      className={`w-full px-4 py-2 border ${
                        currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                      } bg-transparent dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} // Set bg-transparent and removed bg-white & dark:bg-base_card
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
                      className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1" // Updated label color
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
                      } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`} // Set bg-transparent and removed dark:bg-base_card
                    />
                  </div>

                  {/* City Select */}
                  <div className="flex-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1" // Updated label color
                    >
                      City
                    </label>
                    <select
                      id="city"
                      name="city"
                      className={`w-full px-4 py-2 border ${
                        currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                      } bg-transparent dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} // Set bg-transparent and removed bg-white & dark:bg-base_card
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
                      className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1" // Updated label color
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
                      } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`} // Set bg-transparent and removed dark:bg-base_card
                    />
                  </div>

                  {/* Area Name Input */}
                  <div className="flex-1">
                    <label
                      htmlFor="areaName"
                      className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1" // Updated label color
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
                      } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`} // Set bg-transparent and removed dark:bg-base_card
                    />
                  </div>
                </div>

                {/* Row 6: House Number and GPS Coordinates */}
                <div className="flex flex-col md:flex-row gap-4">
                  {/* House Number Input */}
                  <div className="flex-1">
                    <label
                      htmlFor="houseNumber"
                      className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1" // Updated label color
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
                      } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`} // Set bg-transparent and removed dark:bg-base_card
                    />
                  </div>

                  {/* GPS Coordinates Input */}
                  <div className="flex-1">
                    <label
                      htmlFor="gpsCoordinates"
                      className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1" // Updated label color
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
                      } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`} // Set bg-transparent and removed dark:bg-base_card
                    />
                  </div>
                </div>

                {/* Row 7: Address (Full Width) */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1" // Updated label color
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
                    } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`} // Set bg-transparent and removed dark:bg-base_card
                  />
                </div>

                {/* Row 8: Google Icon with Text and View Map Button */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  {/* Left: Google Icon with Text */}
                  <div className="flex items-center gap-2">
                    <FaGoogle className="w-6 h-6 text-white bg-blue-500 p-2 rounded-full" />
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
                    <FaMapMarkerAlt className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    View Map
                  </Button>
                </div>

                {/* Row 9: Your Notes (Full Width) */}
                <div>
                  <label
                    htmlFor="yourNotes"
                    className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1" // Updated label color
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
                    } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`} // Set bg-transparent and removed dark:bg-base_card
                  />
                </div>
              </div>
            )}

            {/* Products Section */}
            {selectedNavOption === 3 && (
              <div className="content-for-tab-3">
                {/* Content for Products */}
                <p>Products-related information goes here.</p>
              </div>
            )}

            {/* Call List Section */}
            {selectedNavOption === 4 && (
              <div className="content-for-tab-4">
                {/* Content for Call List */}
                <p>Call List-related information goes here.</p>
              </div>
            )}

            {/* Call Center Section */}
            {selectedNavOption === 5 && (
              <div className="content-for-tab-5">
                {/* Content for Call Center */}
                <p>Call Center-related information goes here.</p>
              </div>
            )}

            {/* Messages Section */}
            {selectedNavOption === 6 && (
              <div className="content-for-tab-6">
                {/* Content for Messages */}
                <p>Messages-related information goes here.</p>
              </div>
            )}

            {/* Shipping History Section */}
            {selectedNavOption === 7 && (
              <div className="content-for-tab-7">
                {/* Content for Shipping History */}
                <p>Shipping History-related information goes here.</p>
              </div>
            )}

            {/* Follow Up Section */}
            {selectedNavOption === 8 && (
              <div className="content-for-tab-8">
                {/* Content for Follow Up */}
                <p>Follow Up-related information goes here.</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 justify-center items-end mt-6">
              <Button
                className="rounded-full bg-glb_red text-white flex p-0 min-w-14 w-14 h-14 justify-center items-center"
                onClick={() => closeModal(false)}
              >
                <Call02Icon />
              </Button>
              <Button
                className="rounded-full bg-glb_green text-white flex min-w-14 p-0 w-14 h-14 justify-center items-center"
                onClick={() => closeModal(false)}
              >
                <WhatsappIcon />
              </Button>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default OrderDetailsModal;
