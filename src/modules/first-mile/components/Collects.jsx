// Collects.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  DeliveryBox01Icon, 
  PencilEdit01Icon, 
  PlusSignIcon, 
  Delete01Icon, 
  EyeIcon, 
  CheckmarkCircle01Icon, 
  Recycle03Icon, 
  ArrowDown01Icon,
  InformationCircleIcon ,
  CustomerService01Icon,
  Edit01Icon,
  Logout03Icon,
  PrinterIcon,
  ArrowRight01Icon,
  CallOutgoing01Icon,
  CustomerSupportIcon,
  Download01Icon,
  DropboxIcon,
  Settings02Icon,
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown"; // Import Dropdown components
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../shared/components/Table';
import StatusTabs from '../../shared/components/StatusTabs'; 
import CustomModal from '../../shared/components/modal'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const rows = [
  {
      key: "1",
      number:"WIY-58168",
      orderNumber: "2522",
      createdAt: "2024-01-01",
      sentAt: "2024-01-05",
      shippedAt: "2024-01-10",
      shippingBy: "Moussa Karim",
      status: "active",
      statut: "New",
      warehouse:"China's Warehouse",
  },
  {
      key: "2",
      number:"WIY-58168",
      orderNumber: "2523",
      createdAt: "2024-01-02",
      sentAt: "2024-01-06",
      shippedAt: "2024-01-11",
      shippingBy: "Sara Ahmed",
      status: "archived",
      statut: "Shipped",
      warehouse:"China's Warehouse",
  },
  {
      key: "3",
      number:"WIY-58168",
      orderNumber: "2524",
      createdAt: "2024-01-03",
      sentAt: "2024-01-07",
      shippedAt: "2024-01-12",
      shippingBy: "Ali Zafar",
      status: "archived",
      statut: "Shipped",
      warehouse:"China's Warehouse",
  },
  {
      key: "4",
      number:"WIY-58168",
      orderNumber: "2525",
      createdAt: "2024-01-04",
      sentAt: "2024-01-08",
      shippedAt: "2024-01-13",
      shippingBy: "Nina Johnson",
      status: "archived",
      statut: "Delivered",
      warehouse:"China's Warehouse",
  },
  {
      key: "5",
      number:"WIY-58168",
      orderNumber: "2526",
      createdAt: "2024-01-05",
      sentAt: "2024-01-09",
      shippedAt: "2024-01-14",
      shippingBy: "John Smith",
      status: "archived",
      statut: "Shipped",
      warehouse:"China's Warehouse",
  },
  {
      key: "6",
      number:"WIY-58168",
      orderNumber: "2527",
      createdAt: "2024-01-06",
      sentAt: "2024-01-10",
      shippedAt: "2024-01-15",
      shippingBy: "Emily Clark",
      status: "archived",
      statut: "Delivered",
      warehouse:"China's Warehouse",
  },
  {
      key: "9",
      number:"WIY-58168",
      orderNumber: "2530",
      createdAt: "2024-01-09",
      sentAt: "2024-01-13",
      shippedAt: "2024-01-18",
      shippingBy: "David Brown",
      status: "archived",
      statut: "Shipped",
      warehouse:"China's Warehouse",
  },
];

const columns = [
  { key: "number", label: "N°" },
  { key: "orderNumber", label: "Total" },
  { key: "createdAt", label: "Created At" },
  { key: "shippedAt", label: "Shipped At" },
  { key: "warehouse", label: "Warehouse" },
  { key: "shippingBy", label: "Shipping By" },
  { key: "statut", label: "Statut" },
  { key: "options", label: "Actions" },
];

const Collects = () => {
  const navigate = useNavigate(); 
  const [selectedTab, setSelectedTab] = useState('active');
  const [statutFilter, setStatutFilter] = useState('All'); // New state for statut filter
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollect, setSelectedCollect] = useState(null);
  const rowsPerPage = 10;
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to add a new collect
  const addNewCollect = () => {
    const newCollect = {
      key: (products.length + 1).toString(),
      number: `WIY-${58168 + products.length + 1}`,
      orderNumber: (2522 + products.length + 1).toString(),
      createdAt: "2024-01-07",
      sentAt: "2024-01-11",
      shippedAt: "2024-01-16",
      shippingBy: "New Shipper",
      status: "active",
      statut: "New",
      warehouse:"China's Warehouse",
    };
    setProducts([...products, newCollect]);
  };

  // Detect dark mode
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

  // Handle checkbox changes
  const handleCheckboxChange = (key) => {
    if (selectedRows.includes(key)) {
      setSelectedRows(selectedRows.filter(rowKey => rowKey !== key));
    } else {
      setSelectedRows([...selectedRows, key]);
    }
  };

  // Handle delete action
  const handleDelete = (key) => {
    setProducts(products.filter(product => product.key !== key));
  };

  // Handle view modal
  const openModal = (collect) => {
    setSelectedCollect(collect);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCollect(null);
  };

  // Handle edit action
  const handleEdit = (collect) => {
    navigate(`/first-mile/edit-collect`);
  };

  // Filtering logic with useMemo and case-insensitive comparison
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const productStatus = typeof product.status === 'string' ? product.status.toLowerCase() : '';
      const currentTab = selectedTab.toLowerCase();
      const currentStatut = statutFilter.toLowerCase();
      
      const statusMatch =
        currentTab === 'active' ? productStatus === 'active' : productStatus === 'archived';
      
      const statutMatch = statutFilter === 'All' ? true : product.statut.toLowerCase() === currentStatut;
      
      return statusMatch && statutMatch;
    });
  }, [selectedTab, statutFilter, products]);

  // Debugging: Log selectedTab and statutFilter
  useEffect(() => {
    console.log('Selected Tab:', selectedTab);
  }, [selectedTab]);

  useEffect(() => {
    console.log('Statut Filter:', statutFilter);
    console.log('Filtered Products:', filteredProducts);
  }, [statutFilter, filteredProducts]);

  // Function to determine statut styles
  const getStatutStyle = (statut) => {
    switch (statut) {
      case "Shipped":
        return "bg-[#00E0FF30] text-black dark:text-white";
      case "Delivered":
        return "bg-[#00FF2930] text-black dark:text-white";
      case "New":
        return "bg-[#0242E830] text-black dark:text-white";
      default:
        return "bg-gray-300 text-black dark:text-white";
    }
  };

  // Render cell content
  const renderCell = useCallback((item, columnKey) => {
    switch (columnKey) {
      case "statut":
        let bgColor = "";
        let textColor = "text-black dark:text-white";

        if (item.statut === "Shipped") {
          bgColor = "bg-[#00E0FF30]";
        } else if (item.statut === "Delivered") {
          bgColor = "bg-[#00FF2930]";
        } else if (item.statut === "New") {
          bgColor = "bg-[#0242E830]";
        } else {
          bgColor = "bg-gray-300";
        }

        return (
          <div className="flex items-center justify-center">
            <span className={`${bgColor} ${textColor} px-2 py-1 rounded-full flex items-center justify-center text-center`}>
              {item.statut !== "New" && <CheckmarkCircle01Icon size={16} className="mr-1" />}
              {item.statut}
            </span>
          </div>
        );

      case "options":
        return (
          <div className="flex space-x-2 justify-center">
            {/* View Button */}
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center bg-[#00000020] dark:bg-[#FFFFFF20]"
              style={{ padding: 0, minWidth: '32px', height: '32px' }}
              onClick={() => openModal(item)}
            >
              <EyeIcon size={16} />
            </Button>

            {/* Edit Button */}
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
              onClick={() => handleEdit(item)}
            >
              <PencilEdit01Icon size={16} style={{ color: 'white' }} />
            </Button>

            {/* Delete Button */}
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
        return <span className="text-sm dark:text-white text-center">{item[columnKey]}</span>;
    }
  }, [handleDelete, handleEdit, openModal]);

  return (
    <DashboardLayout title="First Mile - Collects" icon={<DeliveryBox01Icon className="text-info" />}>
      <div className="p-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-4">
          {/* StatusTabs - Order 2 on small screens, Order 1 on large screens */}
          <div className="order-2 lg:order-1 w-full lg:w-auto">
            <StatusTabs
              activeCount={products.filter(product => product.status.toLowerCase() === "active").length}
              archivedCount={products.filter(product => product.status.toLowerCase() === "archived").length}
              selectedTab={selectedTab}
              onTabChange={(tab) => {
                setSelectedTab(tab);
                setStatutFilter('All'); // Reset statutFilter when changing tabs
              }}
            />
          </div>

          {/* Action Buttons - Order 1 on small screens, Order 2 on large screens */}
          <div className="order-1 lg:order-2 flex flex-row gap-2 w-full lg:w-auto justify-end">
            <Button
              color="default"
              onClick={addNewCollect}
              className="rounded-full flex items-center"
              style={{ backgroundColor: '#0258E8', color: 'white' }}
            >
              <PlusSignIcon size={18} className="flex-shrink-0 mr-0" /> New Collect
            </Button>
            
            {/* Actions Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  color="default"
                  className="rounded-full text-white bg-glb_red flex items-center"
                >
                  <PencilEdit01Icon size={18} className="flex-shrink-0 mr-1" /> Actions
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

            {/* Status Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  color="default"
                  className="rounded-full flex items-center border transition-colors duration-200 dark:border-white border-black flex-shrink-0"
                  style={{
                    backgroundColor: 'transparent',
                  }}
                >
                  <span className="text-black dark:text-white">Status</span>
                  <ArrowDown01Icon className="ml-0 text-black dark:text-white" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Status Filters">
                <DropdownItem key="All" onClick={() => setStatutFilter('All')}>
                  All
                </DropdownItem>
                <DropdownItem key="New" onClick={() => setStatutFilter('New')}>
                  New
                </DropdownItem>
                <DropdownItem key="Shipped" onClick={() => setStatutFilter('Shipped')}>
                  Shipped
                </DropdownItem>
                <DropdownItem key="Delivered" onClick={() => setStatutFilter('Delivered')}>
                  Delivered
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* Table Section */}
        <Table
          columns={columns}
          data={filteredProducts}
          renderCell={renderCell}
          handleCheckboxChange={handleCheckboxChange}
          selectedRows={selectedRows}
          rowsPerPage={rowsPerPage}
          className="dark:bg-gray-800 dark:text-white text-center"
        />

        {/* Modal Section */}
        {selectedCollect && (
          <CustomModal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={`Collect - N° ${selectedCollect.number}`}
            isDarkMode={isDarkMode}
            width="600px" // Optional: customize width if needed
          >
            {/* Information Button */}
            <div className="mb-8 mt-10 flex items-center justify-center">
              <Button
                size="15"
                className="flex items-center space-x-2 rounded-full bg-[#0258E8] text-white px-4 py-2"
              >
                <InformationCircleIcon size={20} />
                <span>Informations</span>
              </Button>
            </div>

            {/* Collect Details Table */}
            <div className="overflow-x-auto rounded-[20px]">
              <table className="w-full text-left text-center">
                <tbody>
                  {[
                    { title: 'Code', value: selectedCollect.number },
                    { title: 'Store', value: selectedCollect.warehouse },
                    { title: 'Statut', value: selectedCollect.statut },
                    { title: 'Shipping by', value: selectedCollect.shippingBy },
                    { title: 'Created At', value: selectedCollect.createdAt },
                    { title: 'Shipped At', value: selectedCollect.shippedAt },
                    { title: 'Sent At', value: selectedCollect.sentAt },
                    { title: 'Comments', value: selectedCollect.comments || 'N/A' },
                    { title: 'Orders', value: selectedCollect.orderNumber },
                  ].map((info, index) => (
                    <tr 
                      key={info.title}
                      className={`${
                        index % 2 === 0 ? 'bg-[#00000007] dark:bg-[#FFFFFF05]' : 'bg-[#00000015] dark:bg-[#FFFFFF02]'
                      } rounded-md`}
                      style={{ overflow: 'hidden' }}
                    >
                      <td className="px-4 py-2 font-semibold text-sm dark:text-white text-center">{info.title}</td>
                      <td className="px-4 py-2 text-sm dark:text-white text-center">
                        {info.title === 'Statut' ? (
                          <span className={`${getStatutStyle(info.value)} px-2 py-1 rounded-full inline-flex items-center justify-center`}>
                            {info.value !== "New" && <CheckmarkCircle01Icon size={16} className="mr-1" />}
                            {info.value}
                          </span>
                        ) : (
                          info.value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CustomModal>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Collects;
