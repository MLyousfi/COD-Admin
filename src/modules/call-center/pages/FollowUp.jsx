import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import {
    ArrowDown01Icon,
    ArrowLeft02Icon,
    ArrowRight01Icon,
    ArrowRight02Icon,
    ArrowUpDownIcon,
    Calculator01Icon,
    Calling02Icon,
    CallOutgoing01Icon,
    CustomerService01Icon,
    CustomerSupportIcon,
    DeliveryBox01Icon,
    Download01Icon,
    DropboxIcon,
    Edit01Icon,
    Logout03Icon,
    PencilEdit01Icon,
    PrinterIcon,
    Settings02Icon,
    UserIcon
} from "hugeicons-react";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../shared/components/Table";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import StatusTabs from "../../shared/components/StatusTabs";
import { agentNames } from "../../../core/utils/shared.data";
import OrderDetailsModal from "../components/OrderDetailsModal";
import { motion } from 'framer-motion'
const rows = [
    {
        key: 1,
        orderNum: "CSA817302782789123456",
        subNum: "BHSJDW82",
        trackNum: "TRK_12345",
        issue: "Store name",
        store: "Store name",
        product: "2x men's Jacket 02",
        productId: "19211111",
        name: "منال الرشيدي",
        country: "Saudi Arabia",
        price: "300.50 SAR",
        invoiceNum: "INV_02894512",
        shippingPrice: "0 USD",
        paymentStatus: "No",
        orderStatus: "Confirmed at 03/10/2024 - 14:00",
        created: "03/10/2024 - 14:00",
        followUp: "03/10/2024 - 14:00",
        followUpUpdated: "03/10/2024 - 14:00",
        agent: 'Dergouch Khadija',
        status: 'active' 
    },
    {
        key: 2,
        orderNum: "CSA817302782789654321",
        subNum: "FKSJD02D",
        trackNum: "TRK_23456",
        issue: "Store name",
        store: "Store name",
        product: "1x women's Scarf 05",
        productId: "19345454",
        name: "منال الرشيدي",
        country: "Saudi Arabia",
        price: "150.75 SAR",
        invoiceNum: "INV_02974613",
        shippingPrice: "0 USD",
        paymentStatus: "No",
        orderStatus: "Confirmed at 03/11/2024 - 10:05",
        created: "03/11/2024 - 10:05",
        followUp: "03/11/2024 - 10:05",
        followUpUpdated: "03/11/2024 - 10:05",
        agent: 'Dergouch Khadija',
        status: 'active' 
    },
    {
        key: 3,
        orderNum: "CSA817302782798987654",
        subNum: "LMSJSJD9",
        trackNum: "TRK_34567",
        issue: "Store name",
        store: "Store name",
        product: "3x men's T-shirt 03",
        productId: "19567890",
        name: "منال الرشيدي",
        country: "Saudi Arabia",
        price: "245.60 SAR",
        invoiceNum: "INV_03948567",
        shippingPrice: "0 USD",
        paymentStatus: "No",
        orderStatus: "Confirmed at 03/12/2024 - 11:30",
        created: "03/12/2024 - 11:30",
        followUp: "03/12/2024 - 11:30",
        followUpUpdated: "03/12/2024 - 11:30",
        agent: 'Dergouch Khadija',
        status: 'active' 
    },
    {
        key: 4,
        orderNum: "CSA817302782788765432",
        subNum: "WJDKD03S",
        trackNum: "TRK_45678",
        issue: "Store name",
        store: "Store name",
        product: "1x women's Dress 07",
        productId: "19834343",
        name: "منال الرشيدي",
        country: "Saudi Arabia",
        price: "500.99 SAR",
        invoiceNum: "INV_04958413",
        shippingPrice: "0 USD",
        paymentStatus: "No",
        orderStatus: "Confirmed at 03/13/2024 - 13:45",
        created: "03/13/2024 - 13:45",
        followUp: "03/13/2024 - 13:45",
        followUpUpdated: "03/13/2024 - 13:45",
        agent: 'Dergouch Khadija',
        status: 'archived' // Added status property
    },
    {
        key: 5,
        orderNum: "CSA817302782781234567",
        subNum: "NKSDO382",
        trackNum: "TRK_56789",
        issue: "Store name",
        store: "Store name",
        product: "4x men's Cap 04",
        productId: "19223232",
        name: "منال الرشيدي",
        country: "Saudi Arabia",
        price: "99.90 SAR",
        invoiceNum: "INV_05927365",
        shippingPrice: "0 USD",
        paymentStatus: "No",
        orderStatus: "Confirmed at 03/14/2024 - 09:15",
        created: "03/14/2024 - 09:15",
        followUp: "03/14/2024 - 09:15",
        followUpUpdated: "03/14/2024 - 09:15",
        agent: 'Dergouch Khadija',
        status: 'active' // Added status property
    },
    {
        key: 6,
        orderNum: "CSA817302782782345678",
        subNum: "POKSLD83",
        trackNum: "TRK_67890",
        issue: "Store name",
        store: "Store name",
        product: "2x women's Shoes 09",
        productId: "19456565",
        name: "منال الرشيدي",
        country: "Saudi Arabia",
        price: "350.00 SAR",
        invoiceNum: "INV_06325341",
        shippingPrice: "0 USD",
        paymentStatus: "No",
        orderStatus: "Confirmed at 03/15/2024 - 17:20",
        created: "03/15/2024 - 17:20",
        followUp: "03/15/2024 - 17:20",
        followUpUpdated: "03/15/2024 - 17:20",
        agent: 'Dergouch Khadija',
        status: 'archived' // Added status property
    },
    {
        key: 7,
        orderNum: "CSA817302782783456789",
        subNum: "OSLD0932",
        trackNum: "TRK_78901",
        issue: "Store name",
        store: "Store name",
        product: "1x men's Pants 06",
        productId: "19987878",
        name: "منال الرشيدي",
        country: "Saudi Arabia",
        price: "400.45 SAR",
        invoiceNum: "INV_07283197",
        shippingPrice: "0 USD",
        paymentStatus: "No",
        orderStatus: "Confirmed at 03/16/2024 - 18:35",
        created: "03/16/2024 - 18:35",
        followUp: "03/16/2024 - 18:35",
        followUpUpdated: "03/16/2024 - 18:35",
        agent: 'Dergouch Khadija',
        status: 'active' 
    },
    {
        key: 8,
        orderNum: "CSA817302782784567890",
        subNum: "WLSDI03D",
        trackNum: "TRK_89012",
        issue: "Store name",
        store: "Store name",
        product: "3x women's Skirt 08",
        productId: "19676767",
        name: "منال الرشيدي",
        country: "Saudi Arabia",
        price: "275.80 SAR",
        invoiceNum: "INV_08371645",
        shippingPrice: "0 USD",
        paymentStatus: "No",
        orderStatus: "Confirmed at 03/17/2024 - 10:50",
        created: "03/17/2024 - 10:50",
        followUp: "03/17/2024 - 10:50",
        followUpUpdated: "03/17/2024 - 10:50",
        agent: 'Dergouch Khadija',
        status: 'archived' 
    },
    {
        key: 9,
        orderNum: "CSA817302782785678901",
        subNum: "PLDKS382",
        trackNum: "TRK_90123",
        issue: "Store name",
        store: "Store name",
        product: "2x women's Bag 10",
        productId: "19898989",
        name: "منال الرشيدي",
        country: "Saudi Arabia",
        price: "450.25 SAR",
        invoiceNum: "INV_09235124",
        shippingPrice: "0 USD",
        paymentStatus: "No",
        orderStatus: "Confirmed at 03/18/2024 - 12:10",
        created: "03/18/2024 - 12:10",
        followUp: "03/18/2024 - 12:10",
        followUpUpdated: "03/18/2024 - 12:10",
        agent: 'Dergouch Khadija',
        status: 'active' 
    },
    {
        key: 10,
        orderNum: "CSA817302782786789012",
        subNum: "JDJD83W",
        trackNum: "TRK_01234",
        issue: "Store name",
        store: "Store name",
        product: "1x men's Suit 01",
        productId: "19954545",
        name: "منال الرشيدي",
        country: "Saudi Arabia",
        price: "600.99 SAR",
        invoiceNum: "INV_10283467",
        shippingPrice: "0 USD",
        paymentStatus: "No",
        orderStatus: "Confirmed at 03/19/2024 - 16:25",
        created: "03/19/2024 - 16:25",
        followUp: "03/19/2024 - 16:25",
        followUpUpdated: "03/19/2024 - 16:25",
        agent: 'Dergouch Khadija',
        status: 'archived' 
    },
];



const columns = [
    { key: "checkbox", label: "#", w: "w-[4%]" },
    {
        key: "orderNum",
        label: "Order Number",
        w: "w-[12%]"
    },
    {
        key: "store",
        label: "Store",
        w: "w-[8%]"
    },
    {
        key: "product",
        label: "Product",
        w: "w-[18%]"
    },
    {
        key: "name",
        label: "Name",
        w: "w-[10%]"
    },
    {
        key: "country",
        label: "Country",
        w: "w-[10%]"
    },
    {
        key: "price",
        label: "Price",
        w: "w-[8%]"
    },
    {
        key: "agent",
        label: "Agent",
        w: "w-[10%]"
    },
    {
        key: "orderStatus",
        label: "Status",
        w: "w-[10%]"
    },
    {
        key: "paymentStatus",
        label: "Upsell",
        w: "w-[5%]"
    },

    {
        key: "created",
        label: "Add At",
        w: "w-[8%]"
    },
    {
        key: "followUp",
        label: "First Call",
        w: "w-[8%]"
    },
    {
        key: "followUpUpdated",
        label: "Last Call",
        w: "w-[8%]"
    },
    {
        key: "key",
        label: "№ Call",
        w: "w-[5%]"
    },

];


export default function FollowUp() {

    const [openOderDModel, setOpenOderDModel] = useState(false)
    const [orderdetails, setOrderdetails] = useState(null)
    const [selectedRows, setSelectedRows] = useState([]);
    const [callTab, setCallTab] = useState('All');
    const [sortAscending, setSortAscending] = useState(true);
    const rowsPerPage = 10;

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
    const [selectedTab, setSelectedTab] = useState('active');


    const openOrderDetailsModal = (item) => {
        setOrderdetails(item)
        setOpenOderDModel(true);
    }



    // Helper function to parse price string and extract numeric value
    const parsePrice = (priceStr) => {
        const num = parseFloat(priceStr.replace(/[^\d.-]/g, ""));
        return num;
    };

    // Sort the rows based on the price and sort order
    const sortedRows = useMemo(() => {
        return [...rows].sort((a, b) => {
            const priceA = parsePrice(a.price);
            const priceB = parsePrice(b.price);

            return sortAscending ? priceA - priceB : priceB - priceA;
        });
    }, [sortAscending]);

    const toggleSortOrder = () => {
        setSortAscending(!sortAscending);
    };

    const filteredRows = useMemo(() => {
        return sortedRows.filter((row) => {
          const rowStatus = typeof row.status === 'string' ? row.status.toLowerCase() : '';
          const currentTab = selectedTab.toLowerCase();
      
          const statusMatch =
            currentTab === 'active' ? rowStatus === 'active' : rowStatus === 'archived';
      
          return statusMatch;
        });
      }, [selectedTab, sortedRows]);
    const renderCell = useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "orderNum":
                return (
                    <div>
                        <p>{item.orderNum}</p>
                        <Button onClick={() => openOrderDetailsModal(item)} className="bg-transparent p-0 m-0 cursor-pointer text-blue-500">({item.subNum})</Button>
                    </div>
                );
            case "trackN":
                return (
                    <span>{item.trackNum}</span>
                );
            case "store":
                return (
                    <span>{item.store}</span>
                );
            case "product":
                return (
                    <div>
                        <p>{item.product}</p>
                        <span className="text-dark_selected">(SKU: {item.productId})</span>
                    </div>
                );
            case "name":
                return (
                    <span>{item.name}</span>
                );
            case "country":
                return (
                    <span>{item.country}</span>
                );
            case "price":
                return (
                    <span>{item.price}</span>
                );
            case "invoiceNum":
                return (
                    <div>
                        <p>{item.invoiceNum}</p>
                        <span className="text-dark_selected">(Status: {item.paymentStatus})</span>
                    </div>
                );
            case "orderStatus":
                return (
                    <div className="flex justify-center items-center flex-col">
                        <span className="font-normal">Confirmed at</span>
                        <span className="font-thin">{item.created}</span>
                    </div>

                );
            case "paymentStatus":
                return (
                    <div className={`${item.paymentStatus === "No" ? "bg-[#ED000620] text-[#ED0006]" : ""} py-1.5 px-6 rounded-full w-fit mx-auto flex justify-center items-center`}>
                        {item.paymentStatus}
                    </div>

                );
            case "actions":
                return (
                    <span></span>
                );
            default:
                return cellValue;
        }
    }, []);



    return (
        <>
            <DashboardLayout title="Call Center - Follow Up" icon={<CustomerService01Icon className="text-info" />}
                additionalContent={
                    <div className="flex  flex-1">
                        <div className="flex justify-evenly gap-2 items-center px-4 rounded-full bg-[#0258E810]">
                            {['All', 'Call'].map((t, idx) => (
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
                    </div>

                }
            >
                <div className="p-2 md:p-4">
                    {/*Tabs*/}
                    <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row">
                        <StatusTabs
                            activeCount={rows.filter((row) => row.status === "active").length}
                            archivedCount={
                                rows.filter((row) => row.status === "archived").length
                            }
                            selectedTab={selectedTab}
                            onTabChange={setSelectedTab}
                        />


                        <div className="flex gap-2 flex-wrap items-center justify-end ">
                            <Button color="default" className="rounded-full bg-info text-white">
                                <Calling02Icon size={18} /> Start Follow Up
                            </Button>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="bordered" className="rounded-full">
                                        List of Agents <ArrowDown01Icon size={16} />
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
                             {/* Actions Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  color="default"
                  className="rounded-full text-white bg-glb_red flex items-center"
                >
                  <PencilEdit01Icon size={18} className="mr-1" /> Actions
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="print">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <PrinterIcon size={15} /> Print
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="export">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Download01Icon size={15} /> Export
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="call-center">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <CustomerSupportIcon size={15} /> Call center
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="follow-up">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <CallOutgoing01Icon size={15} /> Follow up
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="shipping">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <DropboxIcon size={15} /> Shipping
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="general">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Settings02Icon size={15} /> General
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

                        </div>
                    </div>
                    <Table
                        columns={columns.map((col) =>
                            col.key === "price"
                                ? {
                                    ...col,
                                    label: (
                                        <div className="flex items-center">
                                            {col.label}
                                            <ArrowUpDownIcon
                                                size={15}
                                                onClick={toggleSortOrder}
                                                className="ml-1 cursor-pointer text-gray-400 hover:text-blue-500"
                                            />
                                        </div>
                                    ),
                                }
                                : col
                        )}
                        data={filteredRows}  
                        renderCell={renderCell}
                        handleCheckboxChange={handleCheckboxChange}
                        selectedRows={selectedRows} 
                        rowsPerPage={rowsPerPage}  
                        className="dark:bg-gray-800 dark:text-white" 
                    />
                </div>


                <OrderDetailsModal modalOpen={openOderDModel} Order={orderdetails} setModalOpen={setOpenOderDModel} id={4} />

            </DashboardLayout>
        </>
    )
}