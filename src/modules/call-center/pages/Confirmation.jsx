import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import {
  ArrowDown01Icon,
  Calling02Icon,
  CustomerService01Icon,
  PencilEdit01Icon,
  ArrowUpDownIcon,
  UserIcon,
  Cancel01Icon,
  Search01Icon,
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import StatusTabs from '../../shared/components/StatusTabs';
import Table from "../../stockManagement.jsx/components/Table";
import { motion } from 'framer-motion';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { agentNames } from "../../../core/utils/shared.data";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import CustomModal from '../../stockManagement.jsx/components/modal';

const rows = [
    {
        key: "1",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "active",
    },
    {
        key: "2",
        orderNum: "DSAKDJFUIREOWJDNCAS",
        subNum: "AKSKDHJS",
        store: "Store 2",
        product: "Product Y",
        productId: "987654321",
        name: "Jane Smith",
        country: "United Arab Emirates",
        price: "15.324 AED",
        agent: "Bob Johnson",
        status: "archived",
    },
    {
        key: "3",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "active",
    },
    {
        key: "4",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "11.564 SAR",
        agent: "Alice Smith",
        status: "active",
    },
    {
        key: "5",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "active",
    },
    {
        key: "6",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "archived",
    },
];

const columns = [
    { key: "checkbox", label: "#" },
    { key: "orderNum", label: "Order Number" },
    { key: "store", label: "Store" },
    { key: "product", label: "Product" },
    { key: "name", label: "Name" },
    { key: "country", label: "Country" },
    { key: "price", label: "Price" },
    { key: "agent", label: "Agent" },
    { key: "status", label: "Status" },
];

export default function Confirmation(modalOpen,setModalOpen) {
    const [selectedTab, setSelectedTab] = useState('active');
    const [selectedRows, setSelectedRows] = useState([]);
    const rowsPerPage = 10;
    const [callTab, setCallTab] = useState('Call');
    const [sortAscending, setSortAscending] = useState(true);
    
    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Refs for modal content and input focus
    const modalContent = useRef(null);
    const orderNumRef = useRef();

    // Handle Ctrl+K to toggle modal
    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setIsModalOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Close modal on click outside
    useEffect(() => {
        const clickHandler = (event) => {
            if (!isModalOpen || (modalContent.current && modalContent.current.contains(event.target))) return;
            setIsModalOpen(false);
        };

        document.addEventListener('click', clickHandler);

        return () => {
            document.removeEventListener('click', clickHandler);
        };
    }, [isModalOpen]);

    // Focus the order number input when modal opens
    useEffect(() => {
        if (isModalOpen && orderNumRef.current) {
            orderNumRef.current.focus();
        }
    }, [isModalOpen]);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
          const darkMode = document.documentElement.classList.contains('dark');
          setIsDarkMode(darkMode);
        };
    
        checkDarkMode();
    
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
        return () => observer.disconnect();
      }, []);

      const handleCheckboxChange = (keys, isRange) => {
        if (isRange) {
          // Add all keys in the range
          setSelectedRows((prevSelected) => {
            const newSelection = [...prevSelected];
            keys.forEach((key) => {
              if (!newSelection.includes(key)) {
                newSelection.push(key);
              }
            });
            return newSelection;
          });
        } else if (Array.isArray(keys)) {
          // Select all or unselect all
          setSelectedRows(keys);
        } else {
          // Toggle single selection
          setSelectedRows((prevSelected) =>
            prevSelected.includes(keys)
              ? prevSelected.filter((key) => key !== keys)
              : [...prevSelected, keys]
          );
        }
      };
    const filteredRows = rows.filter(row => row.status.toLowerCase() === selectedTab.toLowerCase());

    const sortedRows = [...filteredRows].sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g,""));
        const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g,""));

        return sortAscending ? priceA - priceB : priceB - priceA;
    });

    const toggleSortOrder = () => {
        setSortAscending(!sortAscending);
    };

    const renderCell = useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "orderNum":
                return (
                    <div>
                        <p>{item.orderNum}</p>
                        <Link to="#" className="text-blue-500">({item.subNum})</Link>
                    </div>
                );
            case "product":
                return (
                    <div>
                        <p>{item.product}</p>
                        <Link to="#" className="text-blue-500">(SKU: {item.productId})</Link>
                    </div>
                );
            default:
                return <span>{cellValue}</span>;
        }
    }, []);

    // Select items for the modal
    const selectItems = [
        { key: 1, label: 'Shipping Status' },
        { key: 2, label: 'Store' },
        { key: 3, label: 'Sales channels' },
        { key: 4, label: 'Exclude Sellers' },
        { key: 5, label: 'Affiliates' },
        { key: 6, label: 'Shipping company' },
        { key: 7, label: 'Remitted' }
    ];
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleSelectItem = useCallback((key) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(key)) {
                return prevSelectedItems.filter(itemKey => itemKey !== key);
            } else {
                return [...prevSelectedItems, key];
            }
        });
    }, []);

    const options = [
        { key: 1, label: 'Highest Priority (Confirmation)' },
        { key: 2, label: 'Highest Priority (Follow up)' },
        { key: 3, label: 'Orders locked' },
        { key: 4, label: 'Confirmed without city' },
    ];

    const [selectedOptions, setSelectedOptions] = useState([1, 3]);

    const toggleSelectOption = useCallback((key) => {
        setSelectedOptions((prevSelectedOptions) => {
            if (prevSelectedOptions.includes(key)) {
                return prevSelectedOptions.filter(itemKey => itemKey !== key);
            } else {
                return [...prevSelectedOptions, key];
            }
        });
    }, []);

    const selectAllItems = () => {
        setSelectedItems(selectItems.map(item => item.key));
    };

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
            <DashboardLayout
                title="Call Center - Confirmation"
                icon={<CustomerService01Icon className="text-info" />}
                additionalContent={
                    <div className="flex justify-evenly gap-2 items-center px-4 rounded-full bg-[#0258E810]">
                        {['Call', 'Whatsapp'].map((t, idx) => (
                            <motion.div
                                whileTap={{ scale: 0.8 }}
                                key={idx}
                                className={`flex justify-center items-center p-2 cursor-pointer ${callTab === t ? 'font-bold text-[#0258E8]' : 'font-normal text-black dark:text-white'}`}
                                onClick={() => setCallTab(t)}
                            >
                                {t}
                            </motion.div>
                        ))}
                    </div>
                }
            >
                <div className="p-2 md:p-4">{/* Responsive Padding */}
                    <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row">{/* Responsive Flex Layout */}
                        <StatusTabs
                            activeCount={rows.filter(row => row.status.toLowerCase() === "active").length}
                            archivedCount={rows.filter(row => row.status.toLowerCase() === "archived").length}
                            selectedTab={selectedTab}
                            onTabChange={setSelectedTab}
                        />

                        <div className="flex gap-1 items-center"> {/* Responsive Action Buttons */}
                            <Button color="default" className="rounded-full bg-info text-white">
                                <Calling02Icon size={18} /> <h6 className="text-[12px] md:text-sm">Start Call</h6>
                            </Button>

                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="bordered" className="rounded-full text-sm md:text-lg">
                                        <h6 className="text-[12px] md:text-sm">List of Agents</h6> <ArrowDown01Icon size={16} />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    {agentNames.map((i) => (
                                        <DropdownItem key={i}>
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-2">
                                                    <UserIcon size={15} /> {i}
                                                </div>
                                            </div>
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                            <Button color="default" className="rounded-full bg-danger text-white text-sm md:text-lg">
                                <PencilEdit01Icon size={18} /> <h6 className="text-[12px] md:text-sm">Actions</h6>
                            </Button>
                        </div>
                    </div>

                    <Table
                        columns={columns.map(col =>
                            col.key === "price"
                                ? {
                                    ...col,
                                    label: (
                                        <div className="flex justify-center items-center">
                                            {col.label}
                                            <ArrowUpDownIcon
                                                size={15}
                                                onClick={toggleSortOrder}
                                                className="ml-1 cursor-pointer text-gray-400 hover:text-blue-500"
                                            />
                                        </div>
                                    )
                                }
                                : col
                        )}
                        data={sortedRows}
                        renderCell={renderCell}
                        handleCheckboxChange={handleCheckboxChange}
                        selectedRows={selectedRows}
                        rowsPerPage={rowsPerPage}
                        className="dark:bg-gray-800 dark:text-white"
                    />
                </div>
            </DashboardLayout>

            {/* Render the CustomModal */}
            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Search"
                isDarkMode={isDarkMode}
                width="600px" // Optional: customize the width if needed
            >
                {/* Modal Content */}
                <div ref={modalContent} className="p-4">
                    {/* Select All Dropdown */}
                    <div className="flex justify-end mb-4">
                        <Dropdown closeOnSelect={false}>
                            <DropdownTrigger>
                                <motion.div
                                    initial={{ scale: 1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex justify-start px-4 py-2 border border-gray-400 dark:border-[#ffffff30] outline-none items-center gap-2 rounded-full"
                                >
                                    <div
                                        onClick={(e) => { e.stopPropagation(); selectedItems.length > 0 ? unselectAllItems() : selectAllItems() }}
                                        className='cursor-pointer w-5 h-5 rounded-md border border-[#00000050] dark:border-[#ffffff50] flex justify-center items-center'
                                    >
                                        {selectedItems.length === selectItems.length && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                transition={{ type: "spring", stiffness: 100 }}
                                                animate={{ scale: 1 }}
                                                className='w-3.5 h-3.5 rounded-sm bg-glb_blue'
                                            ></motion.div>
                                        )}
                                    </div>
                                    <h4 className="cursor-default">Select All</h4>
                                </motion.div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions" classNames={{ list: "!bg-transparent" }}>
                                <DropdownItem key="select-all">
                                    <motion.div
                                        initial={{ scale: 1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="flex justify-start w-full items-center gap-2"
                                        onClick={() => selectedItems.length > 0 ? unselectAllItems() : selectAllItems()}
                                    >
                                        <div
                                            className='w-5 h-5 rounded-md border border-[#00000050] dark:border-[#ffffff50] flex justify-center items-center'
                                        >
                                            {selectedItems.length === selectItems.length && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    transition={{ type: "spring", stiffness: 100 }}
                                                    animate={{ scale: 1 }}
                                                    className='w-3.5 h-3.5 rounded-sm bg-glb_blue'
                                                ></motion.div>
                                            )}
                                        </div>
                                        <h4>Select All</h4>
                                    </motion.div>
                                    <div className="h-[1px] w-full bg-white rounded-full mt-2"></div>
                                </DropdownItem>
                                {selectItems.map((i) => (
                                    <DropdownItem key={i.key} onClick={() => toggleSelectItem(i.key)}>
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="flex justify-start w-full items-center gap-2"
                                        >
                                            <div
                                                className='w-5 h-5 rounded-md border border-[#00000050] dark:border-[#ffffff50] flex justify-center items-center'
                                            >
                                                {selectedItems.includes(i.key) && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        transition={{ type: "spring", stiffness: 100 }}
                                                        animate={{ scale: 1 }}
                                                        className='w-3.5 h-3.5 rounded-sm bg-glb_blue'
                                                    ></motion.div>
                                                )}
                                            </div>
                                            <h4>{i.label}</h4>
                                        </motion.div>
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    {/* Input Fields */}
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
                            {/* You can add another input or leave it empty as per the original modal */}
                        </div>
                    </div>

                    {/* Select Dropdowns */}
                    <div className="flex flex-col gap-8 lg:flex-row mt-6">
                        <div className="w-full lg:w-1/2">
                            <label htmlFor="orders-status" className="block mr-2">
                                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Orders status</span>
                                <Select
                                    selectedKeys={["1"]}
                                    id="orders-status"
                                    placeholder="Select an option"
                                    labelPlacement="outside"
                                    classNames={{
                                        value: " dark:!text-[#ffffff85] !text-[#00000085] ",
                                        trigger: 'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg ',
                                    }}
                                >
                                    <SelectItem key="1">
                                        All
                                    </SelectItem>
                                    {/* Add more options if needed */}
                                </Select>
                            </label>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <label htmlFor="date" className="block mr-2">
                                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Date</span>
                                <Select
                                    selectedKeys={["1"]}
                                    id="date"
                                    placeholder="Select a date"
                                    labelPlacement="outside"
                                    classNames={{
                                        value: " dark:!text-[#ffffff85] !text-[#00000085]",
                                        trigger: 'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg ',
                                    }}
                                >
                                    <SelectItem key="1">
                                        Date
                                    </SelectItem>
                                    {/* Add more date options if needed */}
                                </Select>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 lg:flex-row mt-6">
                        <div className="w-full lg:w-1/2">
                            <label htmlFor="seller" className="block mr-2">
                                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Seller</span>
                                <Select
                                    selectedKeys={["1"]}
                                    id="seller"
                                    placeholder="Select a seller"
                                    labelPlacement="outside"
                                    classNames={{
                                        value: " dark:!text-[#ffffff85] !text-[#00000085]",
                                        trigger: 'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
                                    }}
                                >
                                    <SelectItem key="1">
                                        List of Sellers
                                    </SelectItem>
                                    {/* Add more sellers if needed */}
                                </Select>
                            </label>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <label htmlFor="product" className="block mr-2">
                                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">Product</span>
                                <Select
                                    selectedKeys={["1"]}
                                    id="product"
                                    placeholder="Select a product"
                                    labelPlacement="outside"
                                    classNames={{
                                        value: " dark:!text-[#ffffff85] !text-[#00000085]",
                                        trigger: 'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg ',
                                    }}
                                >
                                    <SelectItem key="1">
                                        List of Products
                                    </SelectItem>
                                    {/* Add more products if needed */}
                                </Select>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 lg:flex-row mt-6">
                        <div className="w-full lg:w-1/2">
                            <label htmlFor="from" className="block mr-2">
                                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">From</span>
                                <Select
                                    selectedKeys={["1"]}
                                    id="from"
                                    placeholder="Select a country"
                                    labelPlacement="outside"
                                    classNames={{
                                        value: " dark:!text-[#ffffff85] !text-[#00000085]",
                                        trigger: 'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
                                    }}
                                >
                                    <SelectItem key="1">
                                        All Countries
                                    </SelectItem>
                                    {/* Add more countries if needed */}
                                </Select>
                            </label>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <label htmlFor="to" className="block mr-2">
                                <span className="text-sm text-[#00000050] dark:text-[#FFFFFF30]">To</span>
                                <Select
                                    selectedKeys={["1"]}
                                    id="to"
                                    placeholder="Select a country"
                                    labelPlacement="outside"
                                    classNames={{
                                        value: " dark:!text-[#ffffff85] !text-[#00000085]",
                                        trigger: 'bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg',
                                    }}
                                >
                                    <SelectItem key="1">
                                        All Countries
                                    </SelectItem>
                                    {/* Add more countries if needed */}
                                </Select>
                            </label>
                        </div>
                    </div>

                    {/* Options Selection */}
                    <div className="flex flex-col gap-8 lg:flex-row mt-6">
                        <div className="w-full lg:w-1/2">
                            <label htmlFor="options" className="block mr-2">
                                <div className="flex flex-col gap-1">
                                    {options.map((i) => (
                                        <div
                                            key={i.key}
                                            onClick={() => toggleSelectOption(i.key)}
                                            className={`py-1 cursor-pointer flex justify-start items-center gap-2 w-full`}
                                        >
                                            <motion.div
                                                initial={{ scale: 1 }}
                                                whileTap={{ scale: 0.9 }}
                                                transition={{ duration: 0.1 }}
                                            >
                                                <div
                                                    className='w-5 h-5 rounded-md border border-[#00000050] dark:border-[#ffffff50] flex justify-center items-center'
                                                >
                                                    {selectedOptions.includes(i.key) && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            transition={{ type: "spring", stiffness: 100 }}
                                                            animate={{ scale: 1 }}
                                                            className='w-3.5 h-3.5 rounded-sm bg-glb_blue'
                                                        ></motion.div>
                                                    )}
                                                </div>
                                            </motion.div>
                                            <h4 className={selectedOptions.includes(i.key) ? "text-[#000000] dark:text-[#ffffff]" : "text-[#00000030] dark:text-[#ffffff30]"}>
                                                {i.label}
                                            </h4>
                                        </div>
                                    ))}
                                </div>
                            </label>
                        </div>
                        {/* You can add more option selections if needed */}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-t-gray-200 dark:border-t-[#ffffff10] flex flex-row justify-center items-center gap-4">
                        <Button
                            className="rounded-full bg-blue-600 text-white px-4 py-2"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <Search01Icon /> Validate
                        </Button>
                        <Button
                            className="rounded-full bg-gray-200 dark:bg-base_card px-4 py-2"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <Cancel01Icon size={16} /> Cancel
                        </Button>
                    </div>
                </div>
            </CustomModal>
        </>
    );
}
