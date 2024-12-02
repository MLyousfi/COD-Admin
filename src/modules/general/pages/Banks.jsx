// Banks.jsx
import React, { useState } from 'react';
import { PencilEdit01Icon, PlusSignIcon, Delete01Icon, Settings02Icon,
  PrinterIcon, 
  Download01Icon,
  CustomerSupportIcon,
  ArrowRight01Icon,
  CallOutgoing01Icon,
  DropboxIcon,
 } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../shared/components/Table';
import StatusTabs from '../../shared/components/StatusTabs';
import { rows } from '../../../core/utils/data7';
import NewBankModal from '../components/NewBankModal';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

const columns = [
  { key: "checkbox", label: "#", w: 'w-[5%]' },
  { key: "bankName", label: "Bank Name", w: 'w-[75%]' },
  { key: "options", label: "Actions", w: 'w-[20%]' },
];

const Banks = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedTab, setSelectedTab] = useState('active');
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;
  const [editedBank, setEditedBank] = useState(null)

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

  const handleDelete = (key) => {
    setProducts(products.filter(product => product.key !== key));
  };

  const filteredProducts = selectedTab.toLowerCase() === 'active'
  ? products.filter(product => product.status && product.status.toLowerCase() === "active")
  : products.filter(product => product.status && product.status.toLowerCase() === "archived");
  return (
    <DashboardLayout title="General - Banks" icon={<Settings02Icon className="text-info" />}>
      <div className="p-2 md:p-4">{/**here ---|> responsv */}
        <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row">{/**here ---|> responsv */}
          <StatusTabs
            activeCount={products.filter(product => product.status === "active").length}
            archivedCount={products.filter(product => product.status === "archived").length}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />

          <div className="flex gap-2 flex-wrap justify-end items-center self-end"> {/**here ---|> responsv */}
            <Button
              color="default"
              onClick={() => { setEditedBank(null); setOpenModal(true) }}
              className="rounded-full"
              style={{ backgroundColor: '#0258E8', color: 'white' }}
            >
              <PlusSignIcon size={18} /> New Bank
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
        </div>

        <Table
          columns={columns}
          data={filteredProducts}
          renderCell={(item, columnKey) => {
            switch (columnKey) {
              case "checkbox":
                return (
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.key)}
                    onChange={() => handleCheckboxChange(item.key)}
                  />
                );
              case "options":
                return (
                  <div className="flex space-x-2 justify-center">
                    <Button
                      onClick={() => { setEditedBank(item); setOpenModal(true) }}
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
          handleCheckboxChange={handleCheckboxChange}
          selectedRows={selectedRows}
          rowsPerPage={rowsPerPage}
          className="dark:bg-gray-800 dark:text-white"
        />
      </div>
      <NewBankModal modalOpen={openModal} setModalOpen={setOpenModal} editedBank={editedBank} id={1} />
    </DashboardLayout>
  );
};

export default Banks;
