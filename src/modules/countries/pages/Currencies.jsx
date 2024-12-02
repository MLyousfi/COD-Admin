// Currencies.jsx
import React, { useState } from 'react';
import { PencilEdit01Icon, PlusSignIcon, Delete01Icon, EarthIcon ,
  PrinterIcon, 
  Download01Icon,
  CustomerSupportIcon,
  ArrowRight01Icon,
  CallOutgoing01Icon,
  DropboxIcon,
  Settings02Icon
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../shared/components/Table';
import { rows as initialRows } from '../../../core/utils/data10';
import NewCurrencyModal from '../components/NewCurrencyModal'; // Adjust the import path
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

const columns = [
  { key: "currencyName", label: "Currency Name", w: 'w-[25%]' },
  { key: "equalInUSD", label: "Equal in USD", w: 'w-[25%]' },
  { key: "equalInUSDShipping", label: "Equal in USD (Shipping Company)", w: 'w-[25%]' },
  { key: "options", label: "Actions", w: 'w-[25%]' },
];

const Currencies = () => {
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editedCurrency, setEditedCurrency] = useState(null);
  const rowsPerPage = 10;

  const handleDelete = (key) => {
    setProducts(products.filter(product => product.key !== key));
  };

  const handleSave = (currencyData) => {
    if (editedCurrency) {
      // Editing existing currency
      setProducts(products.map(product => 
        product.key === editedCurrency.key ? { ...product, ...currencyData } : product
      ));
    } else {
      // Creating new currency
      const newKey = products.length > 0 ? Math.max(...products.map(p => p.key)) + 1 : 1;
      setProducts([...products, { key: newKey, ...currencyData }]);
    }
    setOpenModal(false);
    setEditedCurrency(null);
  };

  return (
    <DashboardLayout title="Countries - Currencies" icon={<EarthIcon className="text-info" />}>
      <div className="p-2 md:p-4">
        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap justify-end items-center self-end mb-8">
          <Button
            color="default"
            onClick={() => { setEditedCurrency(null); setOpenModal(true); }}
            className="rounded-full"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
          >
            <PlusSignIcon size={18} /> New Currency
          </Button>
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

        {/* Currencies Table */}
        <Table
          columns={columns}
          data={products}
          renderCell={(item, columnKey) => {
            switch (columnKey) {
              case "options":
                return (
                  <div className="flex space-x-2 justify-center">
                    <Button
                      onClick={() => { setEditedCurrency(item); setOpenModal(true); }}
                      variant="flat"
                      size="sm"
                      className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                      style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
                    >
                      <PencilEdit01Icon size={14} style={{ color: 'white' }} />
                    </Button>
                    <Button
                      variant="flat"
                      size="sm"
                      className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                      style={{ backgroundColor: '#ED0006', padding: 0, minWidth: '32px', height: '32px' }}
                      onClick={() => handleDelete(item.key)}
                    >
                      <Delete01Icon size={14} style={{ color: 'white' }} />
                    </Button>
                  </div>
                );
              default:
                return <span className="text-sm dark:text-white">{item[columnKey]}</span>;
            }
          }}
          selectedRows={selectedRows}
          rowsPerPage={rowsPerPage}
          className="dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* New Currency Modal */}
      <NewCurrencyModal
        isOpen={openModal}
        onClose={() => { setOpenModal(false); setEditedCurrency(null); }}
        onSave={handleSave}
        editedCurrency={editedCurrency}
      />
    </DashboardLayout>
  );
};

export default Currencies;
