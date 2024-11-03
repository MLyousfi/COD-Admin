import React, { useEffect, useState } from 'react';
import { DeliveryTruck01Icon, PencilEdit01Icon, PlusSignIcon, EyeIcon, Delete01Icon, InvoiceIcon, DollarSquareIcon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Tabs, Tab } from "@nextui-org/tabs";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table'; // Adjust the path as necessary
import CreateLineModal from '../components/CreateLineModal';
import { AnimatePresence, motion } from 'framer-motion';

const rows = [
    { id: 1, 'From': 'Morocco', 'To': 'Spain', 'Progression': 12, 'Shipping Prices': '' },
    { id: 2, 'From': 'France', 'To': 'Germany', 'Progression': 45, 'Shipping Prices': '' },
    { id: 3, 'From': 'Italy', 'To': 'Morocco', 'Progression': 65, 'Shipping Prices': '' },
    { id: 4, 'From': 'Spain', 'To': 'Italy', 'Progression': 33, 'Shipping Prices': '' },
    { id: 5, 'From': 'Germany', 'To': 'France', 'Progression': 89, 'Shipping Prices': '' },
    { id: 6, 'From': 'Morocco', 'To': 'Portugal', 'Progression': 17, 'Shipping Prices': '' },
    { id: 7, 'From': 'Portugal', 'To': 'Spain', 'Progression': 56, 'Shipping Prices': '' },
    { id: 8, 'From': 'Spain', 'To': 'Morocco', 'Progression': 72, 'Shipping Prices': '' },
    { id: 9, 'From': 'France', 'To': 'Italy', 'Progression': 43, 'Shipping Prices': '' },
    { id: 10, 'From': 'Italy', 'To': 'Portugal', 'Progression': 29, 'Shipping Prices': '' },
    { id: 11, 'From': 'Germany', 'To': 'Morocco', 'Progression': 84, 'Shipping Prices': '' },
    { id: 12, 'From': 'Morocco', 'To': 'France', 'Progression': 60, 'Shipping Prices': '' },
    { id: 13, 'From': 'Portugal', 'To': 'Germany', 'Progression': 48, 'Shipping Prices': '' },
    { id: 14, 'From': 'France', 'To': 'Portugal', 'Progression': 25, 'Shipping Prices': '' },
    { id: 15, 'From': 'Italy', 'To': 'Spain', 'Progression': 77, 'Shipping Prices': '' },
    { id: 16, 'From': 'Spain', 'To': 'Germany', 'Progression': 53, 'Shipping Prices': '' },
    { id: 17, 'From': 'Portugal', 'To': 'Italy', 'Progression': 38, 'Shipping Prices': '' },
    { id: 18, 'From': 'Morocco', 'To': 'Germany', 'Progression': 66, 'Shipping Prices': '' },
    { id: 19, 'From': 'Germany', 'To': 'Spain', 'Progression': 10, 'Shipping Prices': '' },
    { id: 20, 'From': 'France', 'To': 'Morocco', 'Progression': 92, 'Shipping Prices': '' },
];


const columns = [
    { key: "line", label: "Country Line" },
    { key: "progress", label: "Progression" },
    { key: "price", label: "Shipping Prices" },

];



const ShippingCost = () => {
    const [activeView, setActiveView] = useState('active');
    const [products, setProducts] = useState(rows);
    const [selectedRows, setSelectedRows] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null)
    const rowsPerPage = 13;

    const addNewProduct = () => {
        const newProduct = {
            key: products.length + 1,
            invoiceNumber: `INV-${products.length + 1}`,
            store: "New Store",
            totalRemittance: "$1000",
            netRemittance: "$900",
            totalCharges: "$100",
            statut: "Unpaid", // Default status
            date: "09/08/2024 - 19:01",
            verified: false,
            status: "active", // New invoices will be active
        };
        setProducts([...products, newProduct]);
    };

    const handleCheckboxChange = (key) => {
        if (selectedRows.includes(key)) {
            setSelectedRows(selectedRows.filter((selectedKey) => selectedKey !== key));
        } else {
            setSelectedRows([...selectedRows, key]);
        }
    };

    const handleDelete = (key) => {
        setProducts(products.filter(product => product.key !== key));
    };

    // Filter products based on the current view (active or archived)
    const filteredProducts = activeView === 'active'
        ? products.filter(product => product.status === "active")
        : products.filter(product => product.status === "archived");


    const container = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.1,       // Delay before starting the stagger
                staggerChildren: 0.1      // Delay between each child
            }
        }
    };
    const item_motion = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    const rowDetails = (item) => {
        return (
            <AnimatePresence>

                <tr >
                    <td colSpan={3}>
                        <motion.div initial="hidden"
                            animate="visible" variants={container} className='flex justify-start items-center gap-3 w-full py-2 mt-3'>
                            <motion.div variants={item_motion} className="flex box-content w-[40%] justify-between items-center py-1 px-6 gap-3 rounded-3xl bg-glb_red_opacity">
                                <div className="flex flex-col py-2">
                                    <h3 className='text-glb_red text-nowrap'>Default Cost</h3>
                                    <h3 className='text-white text-sm lg:text-xl text-nowrap'>2 Kg Domestic / 0.5 International</h3>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <h3 className='text-white text-lg font-semibold'>19</h3>
                                    <div className="bg-ghosted text-sm py-1 text-white rounded-full px-2">
                                        USD
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={item_motion} className="flex box-content w-[25%] justify-between items-center py-1 px-6 gap-3 rounded-3xl bg-glb_red_opacity">
                                <div className="flex flex-col py-2">
                                    <h3 className='text-glb_red text-nowrap'>Additional Cost</h3>
                                    <h3 className='text-white text-sm lg:text-xl text-nowrap'>Per 0.5 KG</h3>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <h3 className='text-white text-lg font-semibold'>0</h3>
                                    <div className="bg-ghosted text-sm py-1 text-white rounded-full px-2">
                                        USD
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div variants={item_motion} className="flex box-content w-[35%] justify-between items-center py-1 px-6 gap-3 rounded-3xl bg-glb_red_opacity">
                                <div className="flex flex-col py-2">
                                    <h3 className='text-glb_red text-nowrap'>SMA Token</h3>
                                    <h3 className='text-white text-sm lg:text-xl text-nowrap'>Paste Token Here</h3>
                                </div>
                                <div className="flex justify-between items-center gap-2">

                                    <div className="bg-glb_red text-sm py-1 text-white rounded-full px-2">
                                        Enable
                                    </div>
                                </div>
                            </motion.div>

                        </motion.div>
                    </td>
                </tr>
            </AnimatePresence>
        );
    };

    const renderCell = (item, columnKey) => {
        switch (columnKey) {


            case "line":
                return <span className="text-sm dark:text-white"><b>{item.From}</b> to <b>{item.To}</b></span>;
            case "progress":
                return <div className="flex justify-center items-center mx-auto gap-2 w-[80%] min-w-[100px]">


                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${item.Progression}%` }}></div>
                    </div>
                    <span className="text-sm dark:text-ghost"><b>{item.Progression}%</b><span className="text-sm dark:text-ghosted">/100%</span></span>

                </div>;
            case "price":
                if (expandedRow && expandedRow === item.id) {
                    return (<div className='flex justify-center items-center gap-2'>
                        <Button variant="bordered" className="border-light_opacity dark:border-dark_opacity rounded-full" onClick={() => setExpandedRow(null)}>
                            Save
                        </Button>
                        <Button variant="bordered" className="border-light_opacity dark:border-dark_opacity rounded-full" onClick={() => setExpandedRow(null)}>
                            Delete
                        </Button>
                    </div>)
                } else {
                    return <span onClick={() => setExpandedRow(item.id)} className="cursor-pointer text-sm dark:text-white">{item['Shipping Prices'] === '' ? 'Edit' : item['Shipping Prices']}</span>
                }

            default:
                return <span className="text-sm dark:text-white"></span>;
        }
    };

    useEffect(() => {
        console.log(expandedRow);

    }, [expandedRow])

    return (
        <DashboardLayout title="Shipping Costs" additionalContent={
            <Button
                color="default"
                onClick={() => setOpenModal(true)}
                className="rounded-full"
                style={{ backgroundColor: '#0258E8', color: 'white' }}
            >
                <PlusSignIcon size={18} /> Create New Line
            </Button>} hasSearchInput={false} icon={<DollarSquareIcon className="text-info" />}>
            <div className="p-4">
                {/* Tabs for Active and Archived */}


                {/* Use the Generalized Table Component */}
                <Table
                    coloredHeader={['#0258E840', '#0258E830']}
                    columns={columns}
                    data={rows}  // Use filtered products based on active view
                    renderCell={renderCell}
                    handleCheckboxChange={handleCheckboxChange}
                    selectedRows={selectedRows}
                    rowsPerPage={rowsPerPage}
                    className="dark:bg-gray-800 dark:text-white"
                    rowDetails={rowDetails}
                    expandedRow={expandedRow}
                />
            </div>

            <CreateLineModal modalOpen={openModal} setModalOpen={setOpenModal} id={1} />
        </DashboardLayout>
    );
};

export default ShippingCost;
