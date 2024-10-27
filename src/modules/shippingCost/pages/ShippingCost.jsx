import React, { useState } from 'react';
import { DeliveryTruck01Icon, PencilEdit01Icon, PlusSignIcon, EyeIcon, Delete01Icon, InvoiceIcon, DollarSquareIcon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Tabs, Tab } from "@nextui-org/tabs";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table'; // Adjust the path as necessary

const rows = [
    { 'From': 'Morocco', 'To': 'Spain', 'Progression': 12, 'Shipping Prices': '' },
    { 'From': 'France', 'To': 'Germany', 'Progression': 45, 'Shipping Prices': '' },
    { 'From': 'Italy', 'To': 'Morocco', 'Progression': 65, 'Shipping Prices': '' },
    { 'From': 'Spain', 'To': 'Italy', 'Progression': 33, 'Shipping Prices': '' },
    { 'From': 'Germany', 'To': 'France', 'Progression': 89, 'Shipping Prices': '' },
    { 'From': 'Morocco', 'To': 'Portugal', 'Progression': 17, 'Shipping Prices': '' },
    { 'From': 'Portugal', 'To': 'Spain', 'Progression': 56, 'Shipping Prices': '' },
    { 'From': 'Spain', 'To': 'Morocco', 'Progression': 72, 'Shipping Prices': '' },
    { 'From': 'France', 'To': 'Italy', 'Progression': 43, 'Shipping Prices': '' },
    { 'From': 'Italy', 'To': 'Portugal', 'Progression': 29, 'Shipping Prices': '' },
    { 'From': 'Germany', 'To': 'Morocco', 'Progression': 84, 'Shipping Prices': '' },
    { 'From': 'Morocco', 'To': 'France', 'Progression': 60, 'Shipping Prices': '' },
    { 'From': 'Portugal', 'To': 'Germany', 'Progression': 48, 'Shipping Prices': '' },
    { 'From': 'France', 'To': 'Portugal', 'Progression': 25, 'Shipping Prices': '' },
    { 'From': 'Italy', 'To': 'Spain', 'Progression': 77, 'Shipping Prices': '' },
    { 'From': 'Spain', 'To': 'Germany', 'Progression': 53, 'Shipping Prices': '' },
    { 'From': 'Portugal', 'To': 'Italy', 'Progression': 38, 'Shipping Prices': '' },
    { 'From': 'Morocco', 'To': 'Germany', 'Progression': 66, 'Shipping Prices': '' },
    { 'From': 'Germany', 'To': 'Spain', 'Progression': 10, 'Shipping Prices': '' },
    { 'From': 'France', 'To': 'Morocco', 'Progression': 92, 'Shipping Prices': '' },
];


const columns = [
    { key: "line", label: "Country Line" },
    { key: "progress", label: "Progression" },
    { key: "price", label: "Shipping Prices" },

];



const ShippingCost = () => {
    const [activeView, setActiveView] = useState('active');
    const [products, setProducts] = useState(rows); // Your rows data
    const [selectedRows, setSelectedRows] = useState([]);
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

    const renderCell = (item, columnKey) => {
        switch (columnKey) {


            case "line":
                return <span className="text-sm dark:text-white"><b>{item.From}</b> to <b>{item.To}</b></span>;
            case "progress":
                return <div className="flex  justify-center items-center mx-auto gap-2 w-[80%] min-w-[100px]">


                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${item.Progression}%` }}></div>
                    </div>
                    <span className="text-sm dark:text-ghost"><b>{item.Progression}%</b><span className="text-sm dark:text-ghosted">/100%</span></span>

                </div>;
            case "price":
                return <span className="text-sm dark:text-white">{item['Shipping Prices'] === '' ? 'Edit' : item['Shipping Prices']}</span>;

            default:
                return <span className="text-sm dark:text-white"></span>;
        }
    };

    return (
        <DashboardLayout title="Shipping Costs" additionalContent={
            <Button
                color="default"
                onClick={addNewProduct}
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
                />
            </div>
        </DashboardLayout>
    );
};

export default ShippingCost;
