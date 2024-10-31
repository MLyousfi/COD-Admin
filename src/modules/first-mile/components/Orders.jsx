// Orders.jsx
import React, { useCallback, useState, useMemo } from "react";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import {
  ArrowDown01Icon,
  ArrowUpDownIcon,
  PlusSignIcon,
  PencilEdit01Icon,
  PrinterIcon,
  Download01Icon,
  ArrowRight01Icon,
  CustomerSupportIcon,
  CallOutgoing01Icon,
  DropboxIcon,
  Settings02Icon,
  DeliveryBox01Icon,
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import { Link } from "react-router-dom";
import Table from "../../stockManagement.jsx/components/Table";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import StatusTabs from "../../shared/components/StatusTabs";

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
    paymentStatus: "Ng",
    shipPrice: "0 USD",
    statut: "No",
    status: "active", // Added status
    orderStatus: "Confirmed at 03/10/2024 - 14:00",
    created: "03/10/2024 - 14:00",
    followUp: "03/10/2024 - 14:00",
    followUpCreated: "03/10/2024 - 14:00"
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
    statut: "No",
    price: "150.75 SAR",
    invoiceNum: "INV_02974613",
    paymentStatus: "Ng",
    shipPrice: "0 USD",
    status: "active", // Added status
    orderStatus: "Confirmed at 03/11/2024 - 10:05",
    created: "03/11/2024 - 10:05",
    followUp: "03/11/2024 - 10:05",
    followUpCreated: "03/11/2024 - 10:05"
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
    paymentStatus: "Ng",
    statut: "No",
    shipPrice: "0 USD",
    status: "archived", // Added status
    orderStatus: "Confirmed at 03/12/2024 - 11:30",
    created: "03/12/2024 - 11:30",
    followUp: "03/12/2024 - 11:30",
    followUpCreated: "03/12/2024 - 11:30"
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
    statut: "Yes",
    price: "500.99 SAR",
    invoiceNum: "INV_04958413",
    paymentStatus: "Ng",
    shipPrice: "0 USD",
    status: "active", // Added status
    orderStatus: "Confirmed at 03/13/2024 - 13:45",
    created: "03/13/2024 - 13:45",
    followUp: "03/13/2024 - 13:45",
    followUpCreated: "03/13/2024 - 13:45"
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
    statut: "No",
    price: "99.90 SAR",
    invoiceNum: "INV_05927365",
    paymentStatus: "Ng",
    shipPrice: "0 USD",
    status: "archived", // Added status
    orderStatus: "Confirmed at 03/14/2024 - 09:15",
    created: "03/14/2024 - 09:15",
    followUp: "03/14/2024 - 09:15",
    followUpCreated: "03/14/2024 - 09:15"
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
    statut: "No",
    country: "Saudi Arabia",
    price: "350.00 SAR",
    invoiceNum: "INV_06325341",
    paymentStatus: "Ng",
    shipPrice: "0 USD",
    status: "archived", // Added status
    orderStatus: "Confirmed at 03/15/2024 - 17:20",
    created: "03/15/2024 - 17:20",
    followUp: "03/15/2024 - 17:20",
    followUpCreated: "03/15/2024 - 17:20"
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
    statut: "Yes",
    paymentStatus: "Ng",
    shipPrice: "0 USD",
    status: "active", // Added status
    orderStatus: "Confirmed at 03/16/2024 - 18:35",
    created: "03/16/2024 - 18:35",
    followUp: "03/16/2024 - 18:35",
    followUpCreated: "03/16/2024 - 18:35"
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
    statut: "Yes",
    price: "275.80 SAR",
    invoiceNum: "INV_08371645",
    paymentStatus: "Ng",
    shipPrice: "0 USD",
    status: "active", // Added status
    orderStatus: "Confirmed at 03/17/2024 - 10:50",
    created: "03/17/2024 - 10:50",
    followUp: "03/17/2024 - 10:50",
    followUpCreated: "03/17/2024 - 10:50"
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
    paymentStatus: "Ng",
    statut: "No",
    shipPrice: "0 USD",
    status: "archived", // Added status
    orderStatus: "Confirmed at 03/18/2024 - 12:10",
    created: "03/18/2024 - 12:10",
    followUp: "03/18/2024 - 12:10",
    followUpCreated: "03/18/2024 - 12:10"
  },
  {
    key: 10,
    orderNum: "CSA817302782786789012",
    subNum: "KLDSD832",
    trackNum: "TRK_01234",
    issue: "Store name",
    store: "Store name",
    product: "1x men's Suit 11",
    productId: "19767676",
    name: "منال الرشيدي",
    country: "Saudi Arabia",
    statut: "Yes",
    price: "599.99 SAR",
    invoiceNum: "INV_10193456",
    paymentStatus: "Ng",
    shipPrice: "0 USD",
    status: "active", // Added status
    orderStatus: "Confirmed at 03/19/2024 - 16:25",
    created: "03/19/2024 - 16:25",
    followUp: "03/19/2024 - 16:25",
    followUpCreated: "03/19/2024 - 16:25"
  }
];

const columns = [
  { key: "checkbox", label: "#", w: "w-[3%]" },
  { key: "orderNum", label: "Order Number", w: "w-[12%]" },
  { key: "trackN", label: "Track №", w: "w-[8%]" },
  { key: "store", label: "Store", w: "w-[10%]" },
  { key: "product", label: "Product", w: "w-[15%]" },
  { key: "name", label: "Name", w: "w-[10%]" },
  { key: "country", label: "Country", w: "w-[8%]" },
  { key: "price", label: "Price", w: "w-[8%]" },
  { key: "shipPrice", label: "Shipping Price", w: "w-[8%]" },
  { key: "invoiceNum", label: "Invoice №", w: "w-[8%]" },
  { key: "statut", label: "Statut", w: "w-[7%]" },
  { key: "created", label: "Created", w: "w-[8%]" },
  { key: "followUp", label: "Follow Up", w: "w-[7%]" },
  { key: "followUpCreated", label: "Follow Up Created", w: "w-[8%]" },
];

export default function Orders() {
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;
  const [selectedTab, setSelectedTab] = useState("active");
  const [sortAscending, setSortAscending] = useState(true);

  const handleCheckboxChange = (key) => {
    if (selectedRows.includes(key)) {
      setSelectedRows(selectedRows.filter((selectedKey) => selectedKey !== key));
    } else {
      setSelectedRows([...selectedRows, key]);
    }
  };

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

  // Toggle the sort order between ascending and descending
  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
  };

  // Filter the rows based on selected tab
  const filteredRows = useMemo(() => {
    return selectedTab === "active"
      ? sortedRows.filter(row => row.status === "active")
      : sortedRows.filter(row => row.status === "archived");
  }, [selectedTab, sortedRows]);

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "orderNum":
        return (
          <div>
            <p>{item.orderNum}</p>
            <Link to="#" className="text-blue-500">
              ({item.subNum})
            </Link>
          </div>
        );
      case "trackN":
        return <span>{item.trackNum}</span>;
      case "store":
        return <span>{item.store}</span>;
      case "product":
        return (
          <div>
            <p>{item.product}</p>
            <Link to="#" className="text-blue-500">
              (SKU: {item.productId})
            </Link>
          </div>
        );
      case "name":
        return <span>{item.name}</span>;
      case "country":
        return <span>{item.country}</span>;
      case "price":
        return <span>{item.price}</span>;
      case "shipPrice":
        return <span>{item.shipPrice}</span>;
      case "invoiceNum":
        return (
          <div>
            <p>{item.invoiceNum}</p>
            <Link to="#" className="text-blue-500">
              (Status: {item.paymentStatus})
            </Link>
          </div>
        );
      case "statut":
        return (
          <div className="flex items-center justify-center">
            <span
              className={`px-2 py-1 rounded-full ${
                item.statut === "No"
                  ? "bg-red-500 bg-opacity-20 text-red-600"
                  : item.statut === "Yes"
                  ? "bg-green-500 bg-opacity-20 text-green-600"
                  : ""
              }`}
            >
              {item.statut}
            </span>
          </div>
        );
      case "created":
        return <span>{item.created}</span>;
      case "followUp":
        return <span>{item.followUp}</span>;
      case "followUpCreated":
        return <span>{item.followUpCreated}</span>;
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <DashboardLayout
        title="First Mile - Orders"
        icon={<DeliveryBox01Icon className="text-info" />}
      >
        <div>
          {/* Tabs */}
          <div className="flex flex-row justify-between items-center gap-4 p-12">
            <StatusTabs
              activeCount={rows.filter((row) => row.status === "active").length}
              archivedCount={
                rows.filter((row) => row.status === "archived").length
              }
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
            />

            <div className="flex flex-row gap-2">
              {/* New Sales Channel Button */}
              <Button
                color="default"
                className="rounded-full text-white bg-blue-600 flex items-center"
              >
                <PlusSignIcon size={18} className="mr-1" /> New Sales Channel
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
    </>
  );
}