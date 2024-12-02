// Stock.jsx
import React, { useState,useEffect, useMemo, useCallback } from 'react';
import {
  DeliveryBox01Icon,
  PlusSignIcon,
  GarageIcon,
  ArrowDown01Icon,
  PencilEdit01Icon,
  EyeIcon,
  Delete01Icon,
  DropboxIcon,
  PackageIcon,      
  Layers01Icon,     
  SaleTag02Icon,   
  Dollar02Icon,
  PrinterIcon, 
  Download01Icon, 
  CustomerSupportIcon, 
  CallOutgoing01Icon, 
  ArrowRight01Icon, 
  Settings02Icon ,
  CheckmarkCircle01Icon
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown"; // Import Dropdown components
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import StatusTabs from '../../shared/components/StatusTabs';
import Table from '../../shared/components/Table';
import { rows } from '../../../core/utils/data'; 
import InformationsForm from '../../stockManagement/components/InformationsForm';
import CustomModal from '../../shared/components/modal';
import ViewModal from './ViewModal'; 

const selectedButtonColor = '#0258E8';
const headerBackgroundColorDark = 'rgba(255, 255, 255, 0.02)';
const headerBackgroundColorLight = 'rgba(0, 0, 0, 0.05)';

const columns = [
  { key: "checkbox", label: "#" }, 
  { key: "store", label: "Store" },
  { key: "product", label: "Product" },
  { key: "arabicName", label: "Arabic Name" },
  { key: "sku", label: "SKU" },
  { key: "type", label: "Type" },
  { key: "category", label: "Category" },
  { key: "options", label: "Options" },
];

const Stock = () => {
  const [activeView, setActiveView] = useState('active'); 
  const [statutFilter, setStatutFilter] = useState('All'); // New state for statut filter
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalView, setModalView] = useState('warehouses');
  const [modalType, setModalType] = useState(null); // 'view' or 'new'
  const [activeNewProductSection, setActiveNewProductSection] = useState('informations'); // 'informations', 'stocks', 'salesPrice', 'upsell'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const rowsPerPage = 10; 

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

  const addNewProduct = () => {
    const newProduct = {
      key: products.length + 1,
      store: "New Store",
      product: "New Product",
      arabicName: "عجين جديد",
      sku: "SKU-NEW",
      type: "New Type",
      category: "New Category",
      status: "active", 
      statut: "New", // Ensure new product has 'statut'
    };
    setProducts([...products, newProduct]);
  };

  const handleCheckboxChange = (keys, isRange) => {
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
    setProducts(products.map(product => 
      product.key === key ? { ...product, status: 'deleted' } : product
    ));
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setModalView('warehouses'); 
    setModalType('view');
    setIsModalOpen(true);
  };

  const handleOpenNewProductModal = () => {
    setModalType('new');
    setActiveNewProductSection('informations'); // Default to 'informations' when opening new product modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setModalType(null);
  };

  // Filtering logic with useMemo and case-insensitive comparison
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const productStatus = typeof product.status === 'string' ? product.status.toLowerCase() : '';
      const currentTab = activeView.toLowerCase();
      const currentStatut = statutFilter.toLowerCase();
      
      const statusMatch =
        currentTab === 'active' ? productStatus === 'active' : productStatus === 'archived';
      
      const statutMatch = statutFilter === 'All' ? true : (product.statut && product.statut.toLowerCase() === currentStatut);
      
      return statusMatch && statutMatch;
    });
  }, [activeView, statutFilter, products]);

  // Debugging: Log activeView and statutFilter
  useEffect(() => {
    console.log('Active View:', activeView);
  }, [activeView]);

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
      case "options":
        return (
          <div className="flex space-x-2 justify-center">
            {/* View Button */}
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center bg-[#00000020] dark:bg-[#FFFFFF20]"
              style={{ padding: 0, minWidth: '32px', height: '32px' }}
              onClick={() => handleOpenModal(item)}
            >
              <EyeIcon size={14} />
            </Button>

            {/* Edit Button */}
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
              onClick={() => {
                /* Implement Edit Functionality */
              }}
            >
              <PencilEdit01Icon size={14} style={{ color: 'white' }} />
            </Button>

            {/* Delete Button */}
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
      default:
        return <span className="text-sm dark:text-white">{item[columnKey]}</span>;
    }
  }, [handleDelete, handleOpenModal]);

  // Function to handle Actions Dropdown Clicks
  const handleActionClick = (actionKey) => {
    switch(actionKey) {
      case 'print':
        window.print();
        break;
      case 'export':
        exportToCSV(filteredProducts);
        break;
      case 'call-center':
        openCallCenter();
        break;
      case 'follow-up':
        followUp();
        break;
      case 'shipping':
        manageShipping();
        break;
      case 'general':
        openGeneralSettings();
        break;
      default:
        break;
    }
  };

  // Placeholder functions for actions
  const exportToCSV = (data) => {
    // Implement CSV export functionality
    console.log('Exporting to CSV:', data);
  };

  const openCallCenter = () => {
    // Implement Call Center functionality
    console.log('Opening Call Center...');
  };

  const followUp = () => {
    // Implement Follow Up functionality
    console.log('Following Up...');
  };

  const manageShipping = () => {
    // Implement Shipping management functionality
    console.log('Managing Shipping...');
  };

  const openGeneralSettings = () => {
    // Implement General Settings functionality
    console.log('Opening General Settings...');
  };

  return (
    <DashboardLayout title="First Mile - Stock" icon={<DeliveryBox01Icon className="text-info" />}>
      <div className="p-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-4">
          {/* StatusTabs - Order 2 on small screens, Order 1 on large screens */}
          <div className="order-2 lg:order-1 w-full lg:w-auto">
            <StatusTabs
              activeCount={products.filter(product => product.status.toLowerCase() === "active").length}
              archivedCount={products.filter(product => product.status.toLowerCase() === "archived").length}
              selectedTab={activeView}
              onTabChange={(tab) => {
                setActiveView(tab);
                setStatutFilter('All'); // Reset statutFilter when changing tabs
              }}
            />
          </div>

          {/* Action Buttons - Order 1 on small screens, Order 2 on large screens */}
          <div className="order-1 lg:order-2 flex flex-row gap-2 w-full lg:w-auto justify-end">
            <Button 
              color="default" 
              onClick={handleOpenNewProductModal}
              className="rounded-full" 
              style={{ backgroundColor: '#0258E8', color: 'white' }}  
            >
              <PlusSignIcon size={18} className="mr-1"/> New Product 
            </Button>
            
            {/* Actions Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  color="default" 
                  className="rounded-full flex items-center text-white bg-glb_red"
                >
                  <PencilEdit01Icon size={18} className="mr-1"/> Actions
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Actions Menu">
                <DropdownItem key="print" onClick={() => handleActionClick('print')}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <PrinterIcon size={15} /> Print
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="export" onClick={() => handleActionClick('export')}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Download01Icon size={15} /> Export
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="call-center" onClick={() => handleActionClick('call-center')}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <CustomerSupportIcon size={15} /> Call center
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="follow-up" onClick={() => handleActionClick('follow-up')}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <CallOutgoing01Icon size={15} /> Follow up
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="shipping" onClick={() => handleActionClick('shipping')}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <DropboxIcon size={15} /> Shipping
                    </div>
                    <ArrowRight01Icon size={18} />
                  </div>
                </DropdownItem>
                <DropdownItem key="general" onClick={() => handleActionClick('general')}>
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

        {/* Table Section */}
        <Table 
          columns={columns}
          data={filteredProducts}
          renderCell={renderCell}
          handleCheckboxChange={handleCheckboxChange}
          selectedRows={selectedRows}
          rowsPerPage={rowsPerPage}
          className="dark:bg-gray-800 dark:text-white"
        />

        {/* Custom Modal Section */}
        <CustomModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          width='1000px'
          title={
            modalType === 'new'
              ? "New Product"
              : selectedProduct
              ? "Product Details"
              : "Stock Details"
          }
          isDarkMode={isDarkMode}
        >
          {modalType === 'view' && selectedProduct && (
            <ViewModal product={selectedProduct} isDarkMode={isDarkMode} />
          )}

          {modalType === 'new' && (
            <>
              <div className="flex flex-col lg:flex-row space-x-4 mb-10">
                <div className="flex flex-col lg:flex-row lg:space-x-4">
                  <Button
                    color="default"
                    className={`flex items-center space-x-2 rounded-full border transition-colors duration-300 mb-4 lg:mb-0 ${
                      activeNewProductSection === 'informations' ? 'bg-[#0258E8] text-white' : 'bg-transparent text-black dark:text-white'
                    }`}
                    onClick={() => setActiveNewProductSection('informations')}
                    style={{
                      borderColor: activeNewProductSection === 'informations' ? selectedButtonColor : isDarkMode ? '#A0AEC0' : 'black',
                    }}
                  >
                    <PackageIcon size={20} />
                    <span>Informations</span>
                  </Button>

                  <Button
                    color="default"
                    className={`flex items-center space-x-2 rounded-full border transition-colors duration-300 mb-4 lg:mb-0 ${
                      activeNewProductSection === 'stocks' ? 'bg-[#0258E8] text-white' : 'bg-transparent text-black dark:text-white'
                    }`}
                    onClick={() => setActiveNewProductSection('stocks')}
                    style={{
                      borderColor: activeNewProductSection === 'stocks' ? selectedButtonColor : isDarkMode ? '#A0AEC0' : 'black',
                    }}
                  >
                    <Layers01Icon size={20} />
                    <span>Stocks</span>
                  </Button>

                  <Button
                    color="default"
                    className={`flex items-center space-x-2 rounded-full border transition-colors duration-300 mb-4 lg:mb-0 ${
                      activeNewProductSection === 'salesPrice' ? 'bg-[#0258E8] text-white' : 'bg-transparent text-black dark:text-white'
                    }`}
                    onClick={() => setActiveNewProductSection('salesPrice')}
                    style={{
                      borderColor: activeNewProductSection === 'salesPrice' ? selectedButtonColor : isDarkMode ? '#A0AEC0' : 'black',
                    }}
                  >
                    <SaleTag02Icon size={20} />
                    <span>Sales Price</span>
                  </Button>

                  <Button
                    color="default"
                    className={`flex items-center space-x-2 rounded-full border transition-colors duration-300 ${
                      activeNewProductSection === 'upsell' ? 'bg-[#0258E8] text-white' : 'bg-transparent text-black dark:text-white'
                    }`}
                    onClick={() => setActiveNewProductSection('upsell')}
                    style={{
                      borderColor: activeNewProductSection === 'upsell' ? selectedButtonColor : isDarkMode ? '#A0AEC0' : 'black',
                    }}
                  >
                    <Dollar02Icon size={20} />
                    <span>Upsell</span>
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-auto">
                {activeNewProductSection === 'informations' && (
                  <InformationsForm isDarkMode={isDarkMode} />
                )}
                {/* Similarly, you can create and render other sections like Stocks, Sales Price, Upsell */}
              </div>
            </>
          )}
        </CustomModal>
      </div>
    </DashboardLayout>
  );
};

export default Stock;
