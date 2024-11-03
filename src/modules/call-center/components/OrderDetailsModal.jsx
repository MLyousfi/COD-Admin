import Transition from "@/core/utils/Transition.jsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { ArrowLeft01Icon, Call02Icon, CallOutgoing01Icon, Cancel01Icon, Chatting01Icon, DeliveryBox01Icon, HeadsetIcon, InformationCircleIcon, PencilEdit01Icon, Search01Icon, Search02Icon, ShippingTruck01Icon, UserIdVerificationIcon, WhatsappIcon } from "hugeicons-react";
import styled from 'styled-components';
import { useThemeProvider } from "../../../core/providers/ThemeContext";

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
                    className="relative bg-white dark:bg-base_dark border border-transparent dark:border-[#ffffff10] max-w-4xl w-full minw- max-h-full rounded-lg shadow-lg px-6 py-4 overflow-y-auto">
                    <div className="flex flex-row justify-between items-center w-full border-b border-b-gray-200 dark:border-b-[#ffffff10] mb-6 pb-4">
                        <h3 className="text-lg font-normal">Order – Nº {Order && Order.orderNum} <span className="text-dark_selected">({Order && Order.subNum})</span></h3>
                        <Button isIconOnly className="rounded-full bg-transparent "
                            onClick={() => closeModal(false)}>
                            <Cancel01Icon />
                        </Button>
                    </div>
                    <div >
                        <div className="flex justify-end items-center w-full flex-wrap">
                            <Button color="default" className="rounded-full text-white bg-glb_red">
                                <ArrowLeft01Icon size={18} /> Order Status
                            </Button>



                        </div>
                        <div className="flex justify-start items-center w-full flex-wrap gap-2 mt-6">
                            {NavOptions.map((i) => (
                                <Button onClick={() => setSelectedNavOption(i.key)} key={i.key} className={`${selectedNavOption === i.key ? "bg-dark_selected text-white" : 'dark:bg-base_card dark:text-white'} flex justify-center gap-3 px-4 py-2 items-center rounded-full`}>
                                    {React.createElement(i.icon)}
                                    {i.label}
                                    {i.notify > 0 && <div className="flex p-2 rounded-full w-5 h-5 text-sm items-center justify-center bg-glb_red text-white">{i.notify}</div>}
                                </Button>
                            ))}



                        </div>
                        <div className="flex  justify-start items-center w-full flex-wrap gap-2 mt-6 overflow-x-auto">
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
                                            {Order && Order.product + ' (SKU : ' + Order.productId + ') '}
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

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Upsell ?
                                        </td>
                                        <td>

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



                    </div>
                    <div className="sticky bottom-0 right-5 flex flex-col gap-3 justify-center items-end">
                        <Button className="rounded-full  bg-glb_red text-white flex p-0 min-w-14 w-14 h-14 justify-center items-center"
                            onClick={() => closeModal(false)}>
                            <Call02Icon />
                        </Button>
                        <Button className="rounded-full bg-glb_green text-white flex min-w-14 p-0 w-14 h-14 justify-center items-center "
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



