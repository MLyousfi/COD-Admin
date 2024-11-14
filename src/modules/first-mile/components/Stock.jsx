// Stock.jsx
import React, { useState, useEffect } from 'react';
import {
  DeliveryBox01Icon,
  PlusSignIcon,
  GarageIcon,
  PencilEdit01Icon,
  EyeIcon,
  Delete01Icon,
  EarthIcon, 
  DropboxIcon,
  PackageIcon,      
  Layers01Icon,     
  SaleTag02Icon,   
  Dollar02Icon      
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import StatusTabs from '../../shared/components/StatusTabs';
import Table from '../../stockManagement.jsx/components/Table';
import { rows } from '../../../core/utils/data'; 
import InformationsForm from '../../stockManagement.jsx/components/InformationsForm';
import CustomModal from '../../stockManagement.jsx/components/modal';
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

  const filteredProducts = activeView === 'active' 
    ? products.filter(product => product.status === "active")
    : products.filter(product => product.status === "archived");

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "options":
        return (
          <div className="flex space-x-2 justify-center">
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center
                         bg-[#00000020] dark:bg-[#FFFFFF20]"
              style={{ padding: 0, minWidth: '32px', height: '32px' }}
              onClick={() => handleOpenModal(item)}
            >
              <EyeIcon size={14} />
            </Button>

            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#0258E8', padding: 0, minWidth: '32px', height: '32px' }}
              onClick={() => {

              }}
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
  };

  
  const countriesData = selectedProduct
    ? [
        {
          key: 1,
          productName: selectedProduct.product,
          status: selectedProduct.status,
          France: 0,
          Spain: 0,
          Belgique: 0,
          Kuwait: 0,
          China: 0,
          UAE: 0,
          KSA: 0,
          Germany: 0,   
          Italy: 0,     
          Canada: 0,    
          Brazil: 0,    
          Australia: 0, 
        },
      ]
    : [];

  const modalTableColumns = modalView === 'warehouses' ? 
    [
      { key: "warehouse", label: "Warehouse" },
      { key: "location", label: "Location" },
      { key: "capacity", label: "Capacity" },
    ] : 
    [
      { key: "productName", label: "Product Name" },
      { key: "France", label: "France" },
      { key: "Spain", label: "Spain" },
      { key: "Belgique", label: "Belgique" },
      { key: "Kuwait", label: "Kuwait" },
      { key: "China", label: "China" },
      { key: "UAE", label: "UAE" },
      { key: "KSA", label: "KSA" },
      { key: "Germany", label: "Germany" },
      { key: "Italy", label: "Italy" },
      { key: "Canada", label: "Canada" },
      { key: "Brazil", label: "Brazil" },
      { key: "Australia", label: "Australia" },
    ];


  return (
    <DashboardLayout title="First Mile - Stock" icon={<DeliveryBox01Icon className="text-info" />}>
      <div className="p-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-4">
          <div className="order-2 lg:order-1 w-full lg:w-auto mt-4">
            <StatusTabs 
              activeCount={products.filter(product => product.status === "active").length}
              archivedCount={products.filter(product => product.status === "archived").length}
              selectedTab={activeView}
              onTabChange={setActiveView}
            />
          </div>
          <div className="order-1 lg:order-2 flex space-x-4 items-center w-full lg:w-auto justify-end">
            <Button 
              color="default" 
              onClick={handleOpenNewProductModal}
              className="rounded-full" 
              style={{ backgroundColor: '#0258E8', color: 'white' }}  
            >
              <PlusSignIcon size={18} className="mr-1"/> New Product 
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
              ? "Dealyno"
              : "Product Details"
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
