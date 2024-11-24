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
  GoogleIcon,
  PlusSignIcon,
  Delete01Icon,
  CheckmarkCircle02Icon,
  CallEnd01Icon,
  Time04Icon,
  Notebook01Icon,
  PauseIcon
} from "hugeicons-react";
import { FaMapMarkerAlt, FaRegPauseCircle } from "react-icons/fa";
import styled from "styled-components";
import { useThemeProvider } from "../../../core/providers/ThemeContext";
import { motion } from "framer-motion";
import { size } from "lodash";

const NavOptions = [
  { key: 1, label: "Informations", notify: 0, icon: InformationCircleIcon },
  { key: 2, label: "Customer", notify: 0, icon: UserIdVerificationIcon },
  { key: 3, label: "Products", notify: 1, icon: DeliveryBox01Icon },
  { key: 4, label: "Call List", notify: 9, icon: CallOutgoing01Icon },
  { key: 5, label: "Call Center", notify: 14, icon: HeadsetIcon },
  { key: 6, label: "Messages", notify: 0, icon: Chatting01Icon },
  { key: 7, label: "Shipping History", notify: 0, icon: ShippingTruck01Icon },
  { key: 8, label: "Follow Up", notify: 0, icon: Call02Icon },
];

const MyTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 100%;

  th,
  td {
    text-align: center;
    padding: 12px 8px;
    background-color: transparent;
  }

  thead {
    border-bottom: 1px solid
      ${({ currentTheme }) => (currentTheme === "light" ? "#d1d1d1" : "#444444")};
  }

  th {
    font-weight: bold;
    color: ${({ currentTheme }) =>
      currentTheme === "light" ? "#6B7280" : "#D1D5DB70"};
    font-size: 0.875rem;
  }

  tr:hover {
    background-color: ${({ currentTheme }) =>
      currentTheme === "light" ? "#e0e0e0" : "#ffffff10"};
  }

  @media (max-width: 768px) {
    th,
    td {
      padding: 8px 4px;
      font-size: 0.875rem;
    }
  }
`;

const OrderInfoContainer = styled.div`
  border: 1px solid #ffffff50;
  border-radius: 16px;
  padding: 16px;
  background-color: transparent;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

function OrderDetailsModal({ id, modalOpen, setModalOpen, Order }) {
  const modalContent = useRef();
  const { currentTheme } = useThemeProvider();
  const [selectedNavOption, setSelectedNavOption] = useState(1);

  const [products, setProducts] = useState([
    {
      id: 1,
      productName: "Product A",
      sku: "SKU001",
      quantity: 10,
      price: 100,
      upsell: false,
    },
    {
      id: 2,
      productName: "Product B",
      sku: "SKU002",
      quantity: 5,
      price: 200,
      upsell: true,
    },
  ]);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState({
    productName: "",
    sku: "",
    quantity: "",
    price: "",
    upsell: false,
  });

  const [orderStatusDropdownOpen, setOrderStatusDropdownOpen] = useState(false);

  const dropdownRef = useRef();
  const orderStatusButtonRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        orderStatusDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !orderStatusButtonRef.current.contains(event.target)
      ) {
        setOrderStatusDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [orderStatusDropdownOpen]);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return;
      closeModal(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [modalOpen]);

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

  const handleAddProduct = () => {
    setIsProductModalOpen(true);
  };

  const handleProductModalClose = () => {
    setIsProductModalOpen(false);
    setNewProductData({
      productName: "",
      sku: "",
      quantity: "",
      price: "",
      upsell: false,
    });
  };

  const handleProductInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNewProductSubmit = (e) => {
    e.preventDefault();
    const { productName, sku, quantity, price } = newProductData;

    if (!productName || !sku || !quantity || !price) {
      alert("All fields except Upsell are required.");
      return;
    }

    const newProduct = {
      id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      productName,
      sku,
      quantity: Number(quantity),
      price: Number(price),
      upsell: newProductData.upsell,
    };

    setProducts([...products, newProduct]);
    handleProductModalClose();
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const productOptions = [
    { value: "Product A", label: "Product A" },
    { value: "Product B", label: "Product B" },
    { value: "Product C", label: "Product C" },
  ];
  const orderStatusOptions = [
    { label: "Confirmed", bgColor: "bg-[#00FF2950]", icon: CheckmarkCircle02Icon },
    { label: "No Answer", bgColor: "bg-[#FF004D50]", icon: CallEnd01Icon },
    { label: "Schedule", bgColor: "bg-[#FEF39150]", icon: Time04Icon },
    { label: "Canceled", bgColor: "bg-[#81818150]", icon: CallEnd01Icon },
    { label: "Wrong Number", bgColor: "bg-[#D3233050]", icon: CallEnd01Icon },
    { label: "Double Orders", bgColor: "bg-[#F07F4050]", icon: Notebook01Icon },
    { label: "Pending", bgColor: "bg-[#0085FF50]", icon: FaRegPauseCircle },
    { label: "Test", bgColor: "bg-[#D3233050]", icon: InformationCircleIcon },
  ];
  
  const totalPrice = products
    .reduce((acc, product) => acc + product.price * product.quantity, 0)
    .toFixed(2)
    .replace(".", ",");

  const handleUpsellChange = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, upsell: !product.upsell }
        : product
    );
    setProducts(updatedProducts);
  };

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
          className={`relative z-0 ${
            currentTheme === "light" ? "bg-white" : "dark:bg-base_dark"
          } border border-transparent dark:border-[#ffffff10] max-w-4xl w-full rounded-lg shadow-lg px-6 py-4 overflow-y-auto`}
          style={{ maxHeight: "90vh" }}
        >
          <div className="flex flex-row justify-between items-center w-full border-b border-b-gray-200 dark:border-b-[#ffffff10] mb-6 pb-4">
            <h3 className="text-lg font-normal">
              Order – Nº {Order && Order.orderNum}{" "}
              <span className="text-dark_selected">
                ({Order && Order.subNum})
              </span>
            </h3>
            <Button
              isIconOnly
              className="rounded-full bg-transparent"
              onClick={() => closeModal(false)}
            >
              <Cancel01Icon />
            </Button>
          </div>

          <div className="flex justify-end items-center w-full flex-wrap mb-5">
            <div className="relative inline-block text-left">
              <Button
                ref={orderStatusButtonRef}
                color="default"
                className="rounded-full text-white bg-glb_red"
                onClick={() =>
                  setOrderStatusDropdownOpen(!orderStatusDropdownOpen)
                }
              >
                <ArrowLeft01Icon size={18} /> Order Status
              </Button>
              {orderStatusDropdownOpen && (
  <div
    ref={dropdownRef}
    className="absolute mt-2 right-0 z-30 flex flex-col items-end min-w-max"
  >
    {orderStatusOptions.map((option, index) => (
      <Button
        key={index}
        className={`rounded-full text-white ${option.bgColor} ${
          index !== 0 ? "mt-2" : ""
        } flex items-center px-4 py-2`}
        onClick={() => {
          // Handle status change
          setOrderStatusDropdownOpen(false);
        }}
      >
        <option.icon className="mr-2" />
        {option.label}
      </Button>
    ))}
  </div>
)}

            </div>
          </div>

   

          <div className="relative">
            <div
              className={`transition-all duration-200 ${
                orderStatusDropdownOpen
                  ? "filter blur-sm opacity-50 pointer-events-none"
                  : ""
              }`}
            >
             <div className="flex justify-start items-center w-full flex-wrap gap-2 top-0 bg-white dark:bg-base_dark z-10 mb-6">
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
              {selectedNavOption === 1 && (
                <div className="flex flex-col text-sm md:flex-row gap-6">
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
                          <td>
                            {Order &&
                              `${Order.product} (SKU: ${Order.productId})`}
                          </td>
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
                          <td>
                            {Order && Order.availableOffers
                              ? Order.availableOffers
                              : "Refuse"}
                          </td>
                        </tr>
                        <tr>
                          <td>Sales Price</td>
                          <td>
                            {Order && Order.salesPrice
                              ? Order.salesPrice
                              : "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </MyTable>
                  </div>

                  <div className="flex-1">
                    <OrderInfoContainer currentTheme={currentTheme}>
                      <h4 className="text-sm font-semibold mb-4">
                        CARACTERÍSTICAS:
                      </h4>
                      <ul className="list-disc list-inside text-sm mb-6 text-gray-400">
                        <li>
                          Pantalla táctil de alta definición de 7 pulgadas
                        </li>
                        <li>Pantalla táctil plegable capacitiva</li>
                        <li>
                          Admite tarjeta SD, la interfaz USB2.0 de alta velocidad
                          es compatible Admite reproducción USB, reproducción de
                          música AUX y reproducción
                        </li>
                        <li>Bluetooth</li>
                        <li>
                          Control electrónico totalmente digital de búsqueda de
                          estaciones de radio.
                        </li>
                      </ul>
                      <h4 className="text-sm font-semibold mb-4">ESPECÍFICOS:</h4>
                      <ul className="list-disc list-inside text-sm mb-6 text-gray-400">
                        <li>Voltaje: CC 12 V</li>
                        <li>Resolución de pantalla: 800-480.</li>
                        <li>
                          Tamaño de pantalla: Panel frontal retráctil de 7
                        </li>
                        <li>Enlace espejo: soporte.</li>
                        <li>Salida de potencia: 4+45W.</li>
                        <li>Interfaz USB: USB2.0.</li>
                        <li>Frecuencia de radio: 87,5-108MHz.</li>
                      </ul>
                      <h4 className="text-sm font-semibold">
                        Formato de audio:
                      </h4>
                      <p className="text-sm text-gray-400">
                        MP3/WMA/AAC/APE/OGG/M4A/RA/WAV
                      </p>
                      <h4 className="text-sm font-semibold mt-4 mb-2">
                        Formato de vídeo:
                      </h4>
                      <p className="text-sm text-gray-400">
                        H264 DIVX HD(720P 1080I 1080P)
                      </p>
                      <p className="text-sm text-gray-400">
                        AVI/FLV/MKV/RMVB/MPEG/ASF/TS/H264/QT.
                      </p>
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
                </div>

                {/* Row 4: Street Name and City */}
                <div className="flex flex-col md:flex-row gap-4">
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
                </div>

                {/* Row 6: House Number */}
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
                    <GoogleIcon size={22} className="dark:text-white text-black " />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Get latitude and longitude by address
                    </span>
                  </div>
                  {/* Middle: Info Badge */}
                  <div className="flex md:w-1/3 items-center gap-2 bg-red-500 bg-opacity-20 text-red-700 dark:bg-[#ED000630] dark:text-[#ED0006] rounded-full px-3 py-1">
                    <InformationCircleIcon size={35} />
                    <span className="text-sm">
                      Address entered by the seller: Doctor Garcia Tapia 35 2-4
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
                    <FaMapMarkerAlt className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                    View Map
                  </Button>
                </div>

                {/* Row 9: Variant */}
                <div>
                  <label
                    htmlFor="variant"
                    className="block text-sm font-medium text-gray-700 dark:text-[#ffffff50] mb-1"
                  >
                    Variant
                  </label>
                  <input
                    type="text"
                    id="variant"
                    name="variant"
                    placeholder="Variant"
                    className={`w-full px-4 py-2 border ${
                      currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                    } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                  />
                </div>

                {/* Row 10: Your Notes (Full Width) */}
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
                    placeholder="Notes"
                    className={`w-full px-4 py-2 border ${
                      currentTheme === "light" ? "border-gray-300" : "border-gray-600"
                    } bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                  />
                </div>
              </div>
            )}

              {selectedNavOption === 3 && (
                <div className="flex flex-col relative">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">Products</h2>
                  </div>
                  <MyTable currentTheme={currentTheme}>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>SKU</th>
                        <th>Upsell</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <select
                              value={product.productName}
                              onChange={(e) => {
                                const updatedProducts = products.map((p) =>
                                  p.id === product.id
                                    ? { ...p, productName: e.target.value }
                                    : p
                                );
                                setProducts(updatedProducts);
                              }}
                              className="bg-transparent border border-gray-500 rounded-lg px-2 py-1 w-full"
                            >
                              {productOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="text-center">{product.price}</td>
                          <td className="text-center">{product.quantity}</td>
                          <td className="text-center">{product.sku}</td>
                          <td>
                            <motion.div
                              initial={{ scale: 1 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.1 }}
                              className="h-full w-full cursor-pointer py-2"
                              onClick={() => handleUpsellChange(product.id)}
                              role="checkbox"
                              aria-checked={product.upsell}
                              tabIndex={0}
                              onKeyPress={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handleUpsellChange(product.id);
                                }
                              }}
                            >
                              <div className="w-5 h-5 mx-auto rounded-md border border-[#00000050] dark:border-[#ffffff50] flex justify-center items-center">
                                {product.upsell && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 100,
                                    }}
                                    animate={{ scale: 1 }}
                                    className="w-3 h-3 rounded-sm bg-glb_blue"
                                  />
                                )}
                              </div>
                            </motion.div>
                          </td>
                          <td>
                            <div className="flex justify-center">
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="flex items-center justify-center w-10 h-10 dark:bg-[#ED0006] rounded-full"
                                aria-label="Delete Product"
                              >
                                <Delete01Icon
                                  size={18}
                                  style={{ color: "white" }}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </MyTable>

                  <div className="flex justify-start mt-4">
                    <Button className="bg-info font-bold rounded-full text-white px-4 py-2">
                      Total Price: {totalPrice} $
                    </Button>
                  </div>
                </div>
              )}

              {/* Other Sections */}
            </div>
          </div>

          <div
            className="sticky bottom-5 right-5 flex flex-col gap-3 justify-center items-end pointer-events-none"
            style={{ zIndex: 20 }}
          >
            {selectedNavOption === 3 && (
              <Button
                className="rounded-full bg-glb_blue text-white flex p-0 min-w-14 w-14 h-14 justify-center items-center pointer-events-auto"
                onClick={handleAddProduct}
                aria-label="Add Product"
              >
                <PlusSignIcon />
              </Button>
            )}

            <Button
              className="rounded-full bg-glb_red text-white flex p-0 min-w-14 w-14 h-14 justify-center items-center pointer-events-auto"
              onClick={() => closeModal(false)}
              aria-label="Close Modal"
            >
              <Call02Icon />
            </Button>

            <Button
              className="rounded-full bg-glb_green text-white flex min-w-14 p-0 w-14 h-14 justify-center items-center pointer-events-auto"
              onClick={() => closeModal(false)}
              aria-label="Whatsapp"
            >
              <WhatsappIcon />
            </Button>
          </div>

          {isProductModalOpen && (
            <Transition
              show={isProductModalOpen}
              enter="transition ease-out duration-200"
              enterStart="opacity-0 scale-95"
              enterEnd="opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveStart="opacity-100 scale-100"
              leaveEnd="opacity-0 scale-95"
            >
              <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
                <div
                  className={`relative bg-white dark:bg-base_dark rounded-lg shadow-lg p-6 w-full max-w-md`}
                >
                  <h2 className="text-lg font-semibold mb-4">
                    Add New Product
                  </h2>
                  <form onSubmit={handleNewProductSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="productName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Product Name
                      </label>
                      <select
                        id="productName"
                        name="productName"
                        value={newProductData.productName}
                        onChange={handleProductInputChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          currentTheme === "light"
                            ? "border-gray-300"
                            : "border-gray-600"
                        } bg-transparent rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        required
                      >
                        <option value="">Select Product</option>
                        {productOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="sku"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        SKU
                      </label>
                      <input
                        type="text"
                        id="sku"
                        name="sku"
                        value={newProductData.sku}
                        onChange={handleProductInputChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          currentTheme === "light"
                            ? "border-gray-300"
                            : "border-gray-600"
                        } bg-transparent rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Enter SKU"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={newProductData.quantity}
                        onChange={handleProductInputChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          currentTheme === "light"
                            ? "border-gray-300"
                            : "border-gray-600"
                        } bg-transparent rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Enter quantity"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={newProductData.price}
                        onChange={handleProductInputChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          currentTheme === "light"
                            ? "border-gray-300"
                            : "border-gray-600"
                        } bg-transparent rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Enter price"
                        required
                      />
                    </div>

                    <div className="flex items-center">
                      <motion.div
                        initial={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.1 }}
                        className="h-5 w-5 cursor-pointer"
                        onClick={() =>
                          setNewProductData((prevData) => ({
                            ...prevData,
                            upsell: !prevData.upsell,
                          }))
                        }
                        role="checkbox"
                        aria-checked={newProductData.upsell}
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setNewProductData((prevData) => ({
                              ...prevData,
                              upsell: !prevData.upsell,
                            }));
                          }
                        }}
                      >
                        <div className="w-5 h-5 mx-auto rounded-md border border-[#00000050] dark:border-[#ffffff50] flex justify-center items-center">
                          {newProductData.upsell && (
                            <motion.div
                              initial={{ scale: 0 }}
                              transition={{ type: "spring", stiffness: 100 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 rounded-sm bg-glb_blue"
                            />
                          )}
                        </div>
                      </motion.div>
                      <label
                        htmlFor="upsell"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        Upsell
                      </label>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="flat"
                        className="rounded-full bg-transparent border border-gray-500"
                        onClick={handleProductModalClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-glb_blue text-white rounded-full"
                      >
                        Add Product
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition>
          )}
        </div>
      </Transition>
    </>
  );
}

export default OrderDetailsModal;
