// Banks.jsx
import React, { useState } from 'react';
import { PencilEdit01Icon, PlusSignIcon, Delete01Icon, Settings02Icon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table';
import StatusTabs from '../../shared/components/StatusTabs';
import { rows } from '../../../core/utils/data7';
import NewBankModal from '../components/NewBankModal';

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

  const filteredProducts = selectedTab === 'active'
    ? products.filter(product => product.status === "active")
    : products.filter(product => product.status === "archived");

  return (
    <DashboardLayout title="General - Bank" icon={<Settings02Icon className="text-info" />}>
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
            <Button
              color="default"
              className="rounded-full"
              style={{ backgroundColor: '#ED0006', color: 'white' }}
            >
              <PencilEdit01Icon size={18} style={{ color: 'white' }} /> Actions
            </Button>
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
