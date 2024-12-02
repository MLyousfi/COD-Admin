// ShipmentsInTransit.jsx
import React, { useState, useMemo } from 'react';
import {
  DeliveryTruck01Icon,
  PencilEdit01Icon,
  PlusSignIcon,
  TableIcon,
  PackageIcon,
  Settings02Icon,
  ArrowUpDownIcon, 
  ArrowRight01Icon,
    Calculator01Icon,
    CallOutgoing01Icon,
    CustomerSupportIcon,
    Download01Icon,
    DropboxIcon,
    PrinterIcon,
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../shared/components/Table';
import { rows } from '../../../core/utils/data9'; 
import { useThemeProvider } from '../../../core/providers/ThemeContext';
import CustomModal from '../../shared/components/modal'; 
import { Select, SelectItem } from "@nextui-org/select";
import { Menu, MenuItem } from "@nextui-org/menu";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

// Assuming 'Unknown' is defined elsewhere. If not, replace with appropriate logic or data.
class Unknown {
  toLocaleString() {
    return "Unknown Value";
  }
}

const ShipmentsInTransit = () => {
  const [unknown2s, setUnknown2s] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null); // State to manage dropdown visibility
  const rowsPerPage = 10;
  const { currentTheme } = useThemeProvider();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInvoiceData, setNewInvoiceData] = useState({
    TrackNumber: '',
    remitted: '',
  });

  const TrackNumbers = [
    { key: 'TrackNumber1', label: 'TrackNumber One' },
    { key: 'TrackNumber2', label: 'TrackNumber Two' },
  ];

  // Sorting State
  const [sortDirection, setSortDirection] = useState(null); // 'asc' | 'desc' | null

  // Handler to toggle sort direction
  const handleSortPrice = () => {
    setSortDirection(prev => {
      if (prev === 'asc') return 'desc';
      return 'asc'; // Defaults to ascending if previously 'desc' or null
    });
  };

  // Define columns inside the component to access sort state and handler
  const columns = useMemo(() => [
    { key: "checkbox", label: "#" },
    { key: "orderNumber", label: "Order Num" },
    { key: "TrackNumber", label: "Track N°" },
    { key: "unknown", label: "Unknown" },
    { key: "unknown2", label: "Unknown" },
    { key: "statut", label: "Statut" },
    { key: "name", label: "Name" },
    { 
      key: "price", 
      label: (
        <div className="flex items-center">
          Price
          <ArrowUpDownIcon
            onClick={handleSortPrice}
            className="ml-1 cursor-pointer"
            size={16}
            title="Sort by Price"
          />
        </div>
      )
    },
    { key: "shipping", label: "Shipping" },
    { key: "products", label: "Products" },
    { key: "from", label: "From" },
    { key: "to", label: "To" },
    { key: "city", label: "City" },
    { key: "address", label: "Address" },
    { key: "shipby", label: "Ship By" },
    { key: "options", label: "Actions" },
  ], []); 

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewInvoiceData({ TrackNumber: '', remitted: '' });
  };

  const handleCreateInvoice = () => {
    if (!newInvoiceData.TrackNumber || !newInvoiceData.remitted) {
      alert("Please select both 'Track Number' and 'Remitted'.");
      return;
    }

    const newKey = unknown2s.length + 1;
    const newUnknown2 = {
      key: newKey,
      orderNumber: `INV-${newKey}`,
      TrackNumber: newInvoiceData.TrackNumber,
      unknown: new Unknown().toLocaleString(),
      unknown2: "Sample unknown2",
      name: 10,
      price: "$1000",
      shipping: "$700",
      products: "$300",
      from: "$500",
      to: "$500",
      statut: "Pending",
      city: "Unpaid",
      verified: false,
      status: "active",
    };
    setUnknown2s([...unknown2s, newUnknown2]);
    handleCloseModal();
  };

  const handleSelectChange = (key, value) => {
    setNewInvoiceData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCheckboxChange = (keys, isRange) => {
    // Checkbox handling logic
    if (isRange) {
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
      setSelectedRows(keys);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.includes(keys)
          ? prevSelected.filter((key) => key !== keys)
          : [...prevSelected, keys]
      );
    }
  };

  const handleDelete = (key) => {
    setUnknown2s(unknown2s.filter(unknown2 => unknown2.key !== key));
  };

  const toggleDropdown = (key) => {
    setIsDropdownOpen(isDropdownOpen === key ? null : key);
  };

  // Filter rows based on status
  const filteredUnknown2s = useMemo(() => {
    return unknown2s.filter(unknown2 => unknown2.status === "archived");
  }, [unknown2s]);

  // Sorting Logic
  const sortedUnknown2s = useMemo(() => {
    if (!sortDirection) return filteredUnknown2s;

    return [...filteredUnknown2s].sort((a, b) => {
      // Extract numeric values from price strings
      const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g,""));
      const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g,""));

      if (sortDirection === 'asc') {
        return priceA - priceB;
      } else if (sortDirection === 'desc') {
        return priceB - priceA;
      }
      return 0;
    });
  }, [filteredUnknown2s, sortDirection]);

  const renderCell = (item, columnKey) => {
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
          <div className="flex space-x-2 justify-center items-center relative">
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full bg-[#ED0006] p-0 flex items-center justify-center"
              style={{ padding: 0, minWidth: '32px', height: '32px' }}
            >
              <PrinterIcon size={16} className="text-[#FFFFFF] dark:text-[#FFFFFF]" />
            </Button>
            {isDropdownOpen === item.key && (
              <Menu
                className="absolute mt-2 z-50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg"
                style={{ minWidth: '200px', left: 'auto', right: 0 }}
                onClose={() => setIsDropdownOpen(null)}
              >
                <MenuItem onClick={() => {/* handle click */}}>
                  <div className="flex items-center">
                    <PrinterIcon size={14} className="mr-2" />
                    <span>Client Invoice</span>
                  </div>
                </MenuItem>
                <MenuItem onClick={() => {/* handle click */}}>
                  <div className="flex items-center">
                    <TableIcon size={14} className="mr-2" />
                    <span>Sourcing Invoice</span>
                  </div>
                </MenuItem>
                <MenuItem onClick={() => {/* handle click */}}>
                  <div className="flex items-center">
                    <PackageIcon size={14} className="mr-2" />
                    <span>DDP Shipping Provider</span>
                  </div>
                </MenuItem>
                <MenuItem onClick={() => {/* handle click */}}>
                  <div className="flex items-center">
                    <Settings02Icon size={14} className="mr-2" />
                    <span>General Report</span>
                  </div>
                </MenuItem>
              </Menu>
            )}
          </div>
        );

      default:
        return <span className="text-sm dark:text-white">{item[columnKey]}</span>;
    }
  };

  return (
    <DashboardLayout title="Collects - Shipments in Transit" icon={<DeliveryTruck01Icon className="text-info" />}>
      <div className="p-2 md:p-4">
        <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row">
          {/* Clickable Menu Title for Orders */}
          <div className="flex items-center cursor-pointer">
            <h2 className="text-lg ml-3 font-semibold border-b-2 border-blue-600 pb-1">Orders</h2>
            <span className="bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center ml-2">
              {filteredUnknown2s.length}
            </span>
          </div>

          <div className="flex gap-2 flex-wrap items-center w-full md:w-auto justify-end md:justify-start">
            <Button
              color="default"
              className="rounded-full flex items-center gap-2"
              style={{ backgroundColor: '#0258E8', color: 'white' }}
            >
              Validate
            </Button>
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

        {/* The table is always visible */}
        <Table
          columns={columns}
          data={sortedUnknown2s} // Pass sorted data
          renderCell={renderCell}
          handleCheckboxChange={handleCheckboxChange}
          selectedRows={selectedRows}
          rowsPerPage={rowsPerPage}
          className="dark:bg-gray-800 dark:text-white"
        />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="New Invoice"
        isDarkMode={currentTheme === "dark"}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">
                TrackNumber
              </label>
              <Select
                selectedKeys={newInvoiceData.TrackNumber ? [newInvoiceData.TrackNumber] : []}
                onSelectionChange={(keys) => handleSelectChange('TrackNumber', keys)}
                placeholder="Select TrackNumber"
                classNames={{
                  trigger: 'w-full bg-transparent border border-gray-300 dark:border-gray-600',
                  content: 'bg-transparent border border-gray-300 dark:border-gray-600',
                }}
              >
                {TrackNumbers.map((TrackNumber) => (
                  <SelectItem key={TrackNumber.key}>{TrackNumber.label}</SelectItem>
                ))}
              </Select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">
                Remitted
              </label>
              <Select
                selectedKeys={newInvoiceData.remitted ? [newInvoiceData.remitted] : []}
                onSelectionChange={(keys) => handleSelectChange('remitted', keys)}
                placeholder="All Orders"
                classNames={{
                  trigger: 'w-full bg-transparent border border-gray-300 dark:border-gray-600',
                  content: 'bg-transparent border border-gray-300 dark:border-gray-600',
                }}
              >
                {TrackNumbers.map((TrackNumber) => (
                  <SelectItem key={TrackNumber.key}>{TrackNumber.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300 dark:border-gray-600" />

        <div className="flex justify-center gap-4">
          <Button
            className="bg-info text-white rounded-full px-4 py-2"
            onClick={handleCreateInvoice}
          >
            Create Invoice
          </Button>
          <Button
            variant="light"
            className="border border-[#00000050] dark:border-gray-300 rounded-full px-4 py-2"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </div>
      </CustomModal>
    </DashboardLayout>
  );
};

export default ShipmentsInTransit;
