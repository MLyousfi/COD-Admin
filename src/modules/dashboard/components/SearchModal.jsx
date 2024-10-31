import Transition from "@/core/utils/Transition.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { Cancel01Icon, PencilEdit01Icon, Search01Icon, Search02Icon } from "hugeicons-react";
import CountrySelector from "@shared/components/CountrySelector.jsx";
import { SignupSteps } from "@/core/constants/signup.js";
import { COUNTRIES } from "@/core/constants/countries.js";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

function ModalSearch({ id, searchId, modalOpen, setModalOpen }) {

    const modalContent = useRef(null);
    // const searchInput = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!modalOpen || modalContent.current.contains(target)) return
            setModalOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });



    // show if the ctrl+k key is pressed
    useEffect(() => {
        const keyHandler = (event) => {
            if (event.ctrlKey && event.keyCode === 75) {
                event.preventDefault();
                setModalOpen(!modalOpen);
            }
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    const selectItems = [{ key: 1, label: 'Shipping Status' }, { key: 2, label: 'Store' },
    { key: 3, label: 'Sales channels' }, { key: 4, label: 'Exclude Sellers' }, { key: 5, label: 'Affiliates' },
    { key: 6, label: 'Shipping company' }, { key: 7, label: 'Remitted' }
    ]
    const [selectedItems, setSelectedItems] = useState([])

    const toggleSelectItem = useCallback((key) => {
        setSelectedItems((prevSelectedItems) => {
            // Check if the key is already in the selected items
            if (prevSelectedItems.includes(key)) {
                // If it exists, remove it
                return prevSelectedItems.filter(itemKey => itemKey !== key);
            } else {
                // If it doesn't exist, add it
                return [...prevSelectedItems, key];
            }
        });
    }, []);
    const options = [
        {
            key: 1,
            label: 'Highest Priority (Confirmation)'
        },
        {
            key: 2,
            label: 'Highest Priority (Follow up)'
        },
        {
            key: 3,
            label: 'Orders locked'
        },
        {
            key: 4,
            label: 'Confirmed without city'
        },
    ]

    const [selectedOptions, setSelectedOptions] = useState([1, 3])

    const toggleSelectOption = useCallback((key) => {
        setSelectedOptions((prevSelectedOptions) => {
            // Check if the key is already in the selected items
            if (prevSelectedOptions.includes(key)) {
                // If it exists, remove it
                return prevSelectedOptions.filter(itemKey => itemKey !== key);
            } else {
                // If it doesn't exist, add it
                return [...prevSelectedOptions, key];
            }
        });
    }, []);

    const selectAllItems = () => {
        setSelectedItems(selectItems.map(item => item.key));
    };


    // Function to unselect all items
    const unselectAllItems = () => {
        setSelectedItems([]);
    };

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
                    className="bg-white dark:bg-base_dark border border-transparent dark:border-[#ffffff10] max-w-2xl w-full max-h-full rounded-lg shadow-lg px-6 py-4 overflow-y-auto">
                    <div className="flex flex-row justify-between items-center w-full border-b border-b-gray-200 dark:border-b-[#ffffff10] mb-6 pb-4">
                        <h3 className="text-lg font-normal">Search</h3>
                        <Button isIconOnly className="rounded-full bg-gray-200 dark:bg-base_card"
                            onClick={() => setModalOpen(false)}>
                            <Cancel01Icon />
                        </Button>
                    </div>
                    <div>
                        <div className="flex justify-end">
                            <Dropdown closeOnSelect={false} className="!backdrop-blur-md dark:!bg-black/30 !bg-gray-400/30">
                                <DropdownTrigger>

                                    <motion.div
                                        initial={{ scale: 1 }}
                                        whileTap={{ scale: 0.9 }} className="flex justify-start px-3 border-gray-400 dark:border-[#ffffff30] outline-none items-center gap-2 rounded-full border" >
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ duration: 0.1 }} className='py-2' >
                                            {/* animate this div and it's child ontap when the parent div above clicked using framer motion */}
                                            <div
                                                onClick={(e) => { e.stopPropagation(); selectedItems.length > 0 ? unselectAllItems() : selectAllItems() }}
                                                className='cursor-pointer w-5 h-5 mx-auto rounded-md border border-[#00000050] dark:border-[#ffffff50] flex justify-center items-center'>
                                                {selectedItems.length === selectItems.length && <motion.div initial={{ scale: 0 }} transition={{ type: "spring", stiffness: 100 }} animate={{ scale: 1 }} className='w-3.5 h-3.5 rounded-sm bg-glb_blue'></motion.div>}
                                            </div> </motion.div>
                                        <h4 className="cursor-default">Select All</h4>
                                    </motion.div>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions" classNames={{ list: "!bg-transparent" }} >
                                    <DropdownItem key="new " className="">
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            whileTap={{ scale: 0.9 }} className=" flex justify-start w-full items-center gap-2 " onClick={() => selectedItems.length > 0 ? unselectAllItems() : selectAllItems()}>
                                            <motion.div
                                                initial={{ scale: 1 }}
                                                whileTap={{ scale: 0.9 }}
                                                transition={{ duration: 0.1 }} className='py-2' >
                                                {/* animate this div and it's child ontap when the parent div above clicked using framer motion */}
                                                <div
                                                    className='w-5 h-5 mx-auto rounded-md border border-[#00000050] dark:border-[#ffffff50] flex justify-center items-center'>
                                                    {selectedItems.length === selectItems.length && <motion.div initial={{ scale: 0 }} transition={{ type: "spring", stiffness: 100 }} animate={{ scale: 1 }} className='w-3.5 h-3.5 rounded-sm bg-glb_blue'></motion.div>}
                                                </div> </motion.div>
                                            <h4>Select All</h4>
                                        </motion.div>
                                        <div className=" h-[1px] w-full bg-white rounded-full mt-2"  ></div>
                                    </DropdownItem>
                                    {selectItems.map((i, idx) => (
                                        <DropdownItem key={idx} onClick={(e) => {
                                            toggleSelectItem(i.key)
                                        }}>
                                            <motion.div
                                                initial={{ scale: 1 }}
                                                whileTap={{ scale: 0.9 }} className="flex justify-start w-full items-center gap-2 " >
                                                <motion.div
                                                    initial={{ scale: 1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    transition={{ duration: 0.1 }} className='py-2' >
                                                    {/* animate this div and it's child ontap when the parent div above clicked using framer motion */}
                                                    <div
                                                        className='w-5 h-5 mx-auto rounded-md border border-[#00000050] dark:border-[#ffffff50] flex justify-center items-center'>
                                                        {selectedItems.includes(i.key) && <motion.div initial={{ scale: 0 }} transition={{ type: "spring", stiffness: 100 }} animate={{ scale: 1 }} className='w-3.5 h-3.5 rounded-sm bg-glb_blue'></motion.div>}
                                                    </div> </motion.div>
                                                <h4>{i.label}</h4>
                                            </motion.div>
                                        </DropdownItem>
                                    ))

                                    }

                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="flex flex-col gap-8 lg:flex-row">
                            <div className="w-full lg:w-1/2">
                                <Input type="text" variant="underlined" color="primary" value={"0001"} ref={onrderNumRef} onFocus={() => console.log('focus')}
                                    classNames={{
                                        label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],

                                        // input tag inside innerWrapper
                                    }}
                                    label="Order num" />
                            </div>
                            <div className="w-full lg:w-1/2">
                                <Input type="text" variant="underlined" color="primary"
                                    classNames={{
                                        label: [" !text-[#00000050] dark:!text-[#FFFFFF30]"],

                                    }}
                                    label="Phone number" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-8 lg:flex-row">
                            <div className="w-full lg:w-1/2">
                                <Input type="text" variant="underlined" color="primary"
                                    classNames={{
                                        label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],

                                        // input tag inside innerWrapper
                                    }}
                                    label="Full name" />
                            </div>
                            <div className="w-full lg:w-1/2">

                            </div>
                        </div>

                        <div className="flex flex-col gap-8 lg:flex-row mt-6">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#agents" className="block mr-2">
                                    <span className="text-sm text-[#00000050]  dark:text-[#FFFFFF30]">Orders status</span>
                                    <Select
                                        selectedKeys={"1"}
                                        id="agents"
                                        placeholder="Select an agent"
                                        labelPlacement="outside"
                                        classNames={{
                                            value: " dark:!text-[#ffffff85] !text-[#00000085] ",
                                            trigger: 'bg-transparent  mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg ',
                                        }}>
                                        <SelectItem key={"1"}>
                                            All
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#agents" className="block mr-2">
                                    <span className="text-sm text-[#00000050]  dark:text-[#FFFFFF30]">Date</span>
                                    <Select
                                        selectedKeys={"1"}
                                        id="agents"
                                        placeholder="Select an agent"
                                        labelPlacement="outside"
                                        classNames={{
                                            value: " dark:!text-[#ffffff85] !text-[#00000085]",
                                            trigger: 'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg ',
                                        }}>
                                        <SelectItem key={"1"}>
                                            Date
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-8 lg:flex-row mt-6">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#agents" className="block mr-2">
                                    <span className="text-sm text-[#00000050]  dark:text-[#FFFFFF30]">Seller</span>
                                    <Select selectedKeys={"1"}
                                        id="agents"
                                        placeholder="Select an agent"
                                        labelPlacement="outside"
                                        classNames={{
                                            value: " dark:!text-[#ffffff85] !text-[#00000085]",
                                            trigger: 'bg-transparent  mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
                                        }}>
                                        <SelectItem key={"1"}>
                                            List of Sellers
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#agents" className="block mr-2">
                                    <span className="text-sm text-[#00000050]  dark:text-[#FFFFFF30]">Product</span>
                                    <Select
                                        selectedKeys={"1"}
                                        id="agents"
                                        placeholder="Select an agent"
                                        labelPlacement="outside"
                                        classNames={{
                                            value: " dark:!text-[#ffffff85] !text-[#00000085]",
                                            trigger: 'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg ',
                                        }}>
                                        <SelectItem key={"1"}>
                                            List of Products
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-8 lg:flex-row mt-6">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#agents" className="block mr-2">
                                    <span className="text-sm text-[#00000050]  dark:text-[#FFFFFF30]">From</span>
                                    <Select
                                        selectedKeys={"1"}
                                        id="agents"
                                        placeholder="Select an agent"
                                        labelPlacement="outside"
                                        classNames={{
                                            value: " dark:!text-[#ffffff85] !text-[#00000085]",
                                            trigger: 'bg-transparent  mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
                                        }}>
                                        <SelectItem key="1">
                                            All Countries
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="#agents" className="block mr-2">
                                    <span className="text-sm text-[#00000050]  dark:text-[#FFFFFF30]">To</span>
                                    <Select
                                        selectedKeys={"1"}
                                        id="agents"
                                        placeholder="Select an agent"
                                        labelPlacement="outside"
                                        classNames={{
                                            value: " dark:!text-[#ffffff85] !text-[#00000085]",
                                            trigger: 'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
                                        }}>
                                        <SelectItem key={"1"}>
                                            All Countries
                                        </SelectItem>
                                    </Select>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-8 mt-6" >
                            <div className="flex flex-col gap-1">
                                {options.map((i, idx) => (
                                    <div key={idx} onClick={() => toggleSelectOption(i.key)} className="py-1 cursor-pointer flex justify-start items-center gap-2 w-full">
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ duration: 0.1 }}  >
                                            <div

                                                className='cursor-pointer w-5 h-5 mx-auto rounded-md border border-[#00000050] dark:border-[#ffffff50] flex justify-center items-center'>
                                                {selectedOptions.includes(i.key) && <motion.div initial={{ scale: 0 }} transition={{ type: "spring", stiffness: 100 }} animate={{ scale: 1 }} className='w-3.5 h-3.5 rounded-sm bg-glb_blue'></motion.div>}
                                            </div> </motion.div>
                                        <h4 className={` ${selectedOptions.includes(i.key) ? "text-[#000000] dark:text-[#ffffff]" : "text-[#00000030] dark:text-[#ffffff30]"}`}>{i.label}</h4>
                                    </div>
                                ))}
                            </div>



                        </div>

                        <div className="mt-6 pt-4 border-t border-t-gray-200 dark:border-t-[#ffffff10] flex flex-row justify-center items-center gap-4">
                            <Button className="rounded-full bg-blue-600 text-white px-4 py-2"
                                onClick={() => setModalOpen(false)}>
                                <Search01Icon /> Validate
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

export default ModalSearch;

