import Transition from "@/core/utils/Transition.jsx";
import React, { useEffect, useRef, useState } from "react";
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
import styled from 'styled-components';
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
      currentTheme === 'light' ? 'white' : '#ffffff02'};
  }

  /* Style even rows */
  tr:nth-child(even) td {
    background-color: ${({ currentTheme }) =>
      currentTheme === 'light' ? '#f9f9f9' : '#ffffff05'};
  }

  td {
    text-align: center;
    padding: 8px;
    border-right: 1px solid ${({ currentTheme }) =>
      currentTheme === 'light' ? '#00000030' : '#ffffff30'};
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
`;

const OrderInfoContainer = styled.div`
  border: 1px solid #ffffff50;
  border-radius: 16px;
  padding: 16px;
  background-color: transparent;
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

  // Close on Ctrl+K
  useEffect(() => {
    const keyHandler = (event) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        closeModal(!modalOpen);
      }
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
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
        className="fixed inset-0 z-50 flex items-start justify-center px-4 sm:px-6 overflow-y-auto"
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
            currentTheme === 'light' ? 'bg-white' : 'dark:bg-base_dark'
          } border border-transparent dark:border-[#ffffff10] max-w-5xl w-full rounded-lg shadow-lg px-6 py-4`}
          style={{ maxHeight: '90vh', overflowY: 'auto' }}
        >
          {/* Header */}
          <div className="flex flex-row justify-between items-center w-full border-b border-b-gray-200 dark:border-b-[#ffffff10] mb-6 pb-4">
            <h3 className="text-lg font-normal">
              Order – Nº {Order?.orderNum}{' '}
              <span className="text-dark_selected">({Order?.subNum})</span>
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
                            <Button color="default" className="rounded-full text-white bg-glb_red">
                                <ArrowLeft01Icon size={18} /> Order Status
                            </Button>



                        </div>

          {/* Navigation Tabs - Sticky */}
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
          {selectedNavOption === 1 && (
            <div className="flex flex-col text-sm md:flex-row gap-6">
              {/* Left Section - Scrollable Table */}
              <div className="flex-1 pr-1 max-h-80 overflow-y-auto">
                <MyTable currentTheme={currentTheme}>
                  <tbody>
                    <tr>
                      <td>Order</td>
                      <td>
                        {Order?.orderNum} ({Order?.subNum})
                      </td>
                    </tr>
                    <tr>
                      <td>Agent</td>
                      <td>{Order?.agent || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td>Store</td>
                      <td>{Order?.store}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>In transit</td>
                    </tr>
                    <tr>
                      <td>Product</td>
                      <td>
                        {Order?.product} (SKU: {Order?.productId})
                      </td>
                    </tr>
                    <tr>
                      <td>Link</td>
                      <td>{Order?.invoiceNum}</td>
                    </tr>
                    <tr>
                      <td>Video</td>
                      <td>{Order?.video || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td>Offer</td>
                      <td>{Order?.offer || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td>Upsell?</td>
                      <td>{Order?.upsell ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                      <td>Available Offers</td>
                      <td>{Order?.availableOffers || 'Refuse'}</td>
                    </tr>
                    <tr>
                      <td>Sales Price</td>
                      <td>{Order?.salesPrice || 'N/A'}</td>
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
                    <li>Control electrónico totalmente digital de búsqueda de estaciones de radio.</li>
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
                  <h4 className="text-sm font-semibold mb-4">Formato de audio:</h4>
                  <p className="text-sm text-gray-400">MP3/WMA/AAC/APE/OGG/M4A/RA/WAV</p>
                  <h4 className="text-sm font-semibold mt-4 mb-2">Formato de vídeo:</h4>
                  <p className="text-sm text-gray-400">H264 DIVX HD(720P 1080I 1080P)</p>
                  <p className="text-sm text-gray-400">AVI/FLV/MKV/RMVB/MPEG/ASF/TS/H264/QT.</p>
                </OrderInfoContainer>
              </div>
            </div>
          )}

          {/* Content for Other Tabs */}
          {selectedNavOption === 2 && (
            <div className="content-for-tab-2">
              {/* Content for Customer */}
              <p>Customer-related information goes here.</p>
            </div>
          )}
          {selectedNavOption === 3 && (
            <div className="content-for-tab-3">
              {/* Content for Products */}
              <p>Products-related information goes here.</p>
            </div>
          )}
          {/* Repeat for other tabs as needed */}

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
      </Transition>
    </>
  );
}

export default OrderDetailsModal;
