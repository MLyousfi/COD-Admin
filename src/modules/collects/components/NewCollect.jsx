import React, { useState, useMemo } from 'react';
import {
  DeliveryTruck01Icon,
  PencilEdit01Icon,
  PlusSignIcon,
  Delete01Icon,
  EyeIcon,
  ArrowUpDownIcon,
  CheckmarkCircle01Icon,
  Recycle03Icon,
  ArrowDown01Icon
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table';
import StatusTabs from '../../shared/components/StatusTabs';
import { useNavigate } from 'react-router-dom';

export const rows = [
  {
    key: 1,
    number: "WIY_208398",
    trackNumber: 'TR12345',
    createdAt: '2024-01-01',
    shoppingBy: 'Alice Johnson',
    price: '$120.50',
    statut: 'Delivery again',
    from: 'New York',
    to: 'Los Angeles',
    city: 'New York',
    status: 'active',
  },
  {
    key: 2,
    number: "WIY_208398",
    trackNumber: 'TR12346',
    createdAt: '2024-01-02',
    shoppingBy: 'Bob Smith',
    price: '$80.00',
    statut: 'Delivery again',
    from: 'Chicago',
    to: 'Houston',
    city: 'Chicago',
    status: 'active',
  },
  {
    key: 3,
    number: "WIY_208398",
    trackNumber: 'TR12347',
    createdAt: '2024-01-03',
    shoppingBy: 'Catherine Lee',
    price: '$200.00',
    statut: 'Delivery again',
    from: 'San Francisco',
    to: 'Seattle',
    city: 'San Francisco',
    status: 'active',
  },
  {
    key: 4,
    number: "WIY_208398",
    trackNumber: 'TR12348',
    createdAt: '2024-01-04',
    shoppingBy: 'David Brown',
    price: '$150.75',
    statut: 'Delivery again',
    from: 'Miami',
    to: 'Orlando',
    city: 'Miami',
    status: 'active',
  },
  {
    key: 5,
    number: "WIY_208398",
    trackNumber: 'TR12349',
    createdAt: '2024-01-05',
    shoppingBy: 'Emma Watson',
    price: '$95.25',
    statut: 'Delivery again',
    from: 'Boston',
    to: 'Philadelphia',
    city: 'Boston',
    status: 'active',
  },
];

const columns = [
  { key: "checkbox", label: "#" },
  { key: "number", label: "N°" },
  { key: "trackNumber", label: "Track N°" },
  { key: "createdAt", label: "Created At" },
  { key: "shoppingBy", label: "Name by" },
  { key: "price", label: "Price", icon: <ArrowDown01Icon size={16} className="ml-1 cursor-pointer" /> },
  { key: "statut", label: "Statut" },
  { key: "from", label: "From" },
  { key: "to", label: "To" },
  { key: "city", label: "City" }
];

const NewCollect = () => {
  const [selectedTab, setSelectedTab] = useState('active');
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;

  const addNewProduct = () => {
    const newProduct = {
      key: products.length + 1,
      orderNumber: products.length + 1,
      createdAt: "2024-01-01",
      sentAt: "2024-01-05",
      shippedAt: "2024-01-10",
      shoppingBy: "John Doe",
      statut: "Delivery Again",
      send: "Shipped",
      status: "active",
    };
    setProducts([...products, newProduct]);
    navigate('/Collects/listOfShipments'); 
  };

  const [sortAscending, setSortAscending] = useState(true);

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
  const navigate = useNavigate();
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0; // Fallback for undefined or null values
    const num = parseFloat(priceStr.toString().replace(/[^\d.-]/g, ""));
    return isNaN(num) ? 0 : num;
  };

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

  const [activeView, setActiveView] = useState('active'); 

  const filteredRows = useMemo(() => {
    return selectedTab === "active"
      ? sortedRows.filter(row => row.status === "active")
      : sortedRows.filter(row => row.status === "archived");
  }, [selectedTab, sortedRows]);

  const handleDelete = (key) => {
    setProducts(products.filter(product => product.key !== key));
  };

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "statut":
        return (
          <div className="flex items-center">
            <span className="bg-[#5902E843] text-black dark:text-white px-2 py-1 rounded-full flex items-center">
              <Recycle03Icon size={16} className="mr-1" />
              <span className="whitespace-nowrap">{item.statut.trim()}</span>
            </span>
          </div>
        );

      case "send":
        return (
          <div className="flex items-center">
            <span className={item.send === "Shipped" ? "bg-[#00E0FF30] text-black dark:text-white px-2 py-1 rounded-full flex items-center" : "bg-[#00FF2930] text-black dark:text-white px-2 py-1 rounded-full flex items-center"}>
              <CheckmarkCircle01Icon size={16} className="mr-1" />
              {item.send}
            </span>
          </div>
        );

      case "options":
        return (
          <div className="flex space-x-2 justify-center">
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center bg-[#00000020] dark:bg-[#FFFFFF20]"
              style={{ padding: 0, minWidth: '32px', height: '32px' }}
            >
              <EyeIcon size={16} />
            </Button>

            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
            >
              <PencilEdit01Icon size={16} style={{ color: 'white' }} />
            </Button>

            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#ED0006', padding: 0, minWidth: '32px', height: '32px' }}
              onClick={() => handleDelete(item.key)}
            >
              <Delete01Icon size={16} style={{ color: 'white' }} />
            </Button>
          </div>
        );

      default:
        return <span className="text-sm dark:text-white">{item[columnKey]}</span>;
    }
  };

  return (
    <DashboardLayout
      title="New Collect"
      icon={[
        <DeliveryTruck01Icon className="text-info" />,
        <PlusSignIcon className="text-info" />
      ]}
    >
      <div className="p-2 md:p-4">{/* Responsive padding */}
        <div className="flex gap-4 md:justify-between md:items-center mb-4 flex-wrap flex-col-reverse md:flex-row items-start md:items-center ">
          <StatusTabs 
            activeCount={products.filter(product => product.status === "active").length}
            archivedCount={products.filter(product => product.status === "archived").length}
            selectedTab={activeView}
            onTabChange={setActiveView}
          />

          <div className="flex gap-2 flex-wrap items-center w-full md:w-auto justify-end">
            <Button
              color="default"
              onClick={addNewProduct}
              className="rounded-full px-8"
              style={{ backgroundColor: '#0258E8', color: 'white' }}
            >
              Validate
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

        {/* Table */}
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
          data={filteredRows} // Use filteredRows based on selected tab
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

export default NewCollect;
