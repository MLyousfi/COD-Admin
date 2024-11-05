import React, { useState ,useEffect} from 'react';
import { 
  DeliveryBox01Icon, 
  PencilEdit01Icon, 
  PlusSignIcon, 
  Delete01Icon, 
  EyeIcon, 
  CheckmarkCircle01Icon, 
  Recycle03Icon, 
  ArrowDown01Icon,
  InformationCircleIcon 
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table';
import StatusTabs from '../../shared/components/StatusTabs'; 
import CustomModal from '../../stockManagement.jsx/components/modal'; 

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
        status: "active",
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
        status: "active",
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
        status: "active",
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
        status: "active",
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
        status: "active",
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
  const [selectedTab, setSelectedTab] = useState('active');
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollect, setSelectedCollect] = useState(null);
  const rowsPerPage = 10;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addNewProduct = () => {
    // ... your existing addNewProduct function
  };

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


  const handleCheckboxChange = (key) => {
    // ... your existing handleCheckboxChange function
  };

  const handleDelete = (key) => {
    setProducts(products.filter(product => product.key !== key));
  };

  const openModal = (collect) => {
    setSelectedCollect(collect);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCollect(null);
  };


  const filteredProducts = selectedTab === 'active'
    ? products.filter(product => product.status === "active")
    : products.filter(product => product.status === "archived");

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

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "statut":
        let bgColor;
        let textColor = "text-black dark:text-white";

        if (item.statut === "Shipped") {
          bgColor = "bg-[#00E0FF30]";
        } else if (item.statut === "Delivered") {
          bgColor = "bg-[#00FF2930]";
        } else if (item.statut === "New") {
          bgColor = "bg-[#0242E830]";
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
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center bg-[#00000020] dark:bg-[#FFFFFF20]"
              style={{ padding: 0, minWidth: '32px', height: '32px' }}
              onClick={() => openModal(item)}
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
        return <span className="text-sm dark:text-white text-center">{item[columnKey]}</span>;
    }
  };

  return (
    <DashboardLayout title="First Mile - Collects" icon={<DeliveryBox01Icon className="text-info" />}>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <StatusTabs
            activeCount={products.filter(product => product.status === "active").length}
            archivedCount={products.filter(product => product.status === "archived").length}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />

          <div className="flex space-x-4 items-center">
            <Button
              color="default"
              onClick={addNewProduct}
              className="rounded-full"
              style={{ backgroundColor: '#0258E8', color: 'white' }}
            >
              <PlusSignIcon size={18} /> New Collect
            </Button>
            <Button
              color="default"
              className="rounded-full"
              style={{ backgroundColor: '#ED0006', color: 'white' }}
            >
              <PencilEdit01Icon size={18} style={{ color: 'white' }} /> Actions
            </Button>

            <Button
              color="default"
              className="rounded-full flex items-center border transition-colors duration-200 dark:border-white border-black"
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <span className="text-black dark:text-white">Status</span>
              <ArrowDown01Icon className="ml-1 text-black dark:text-white" />
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredProducts}
          renderCell={renderCell}
          handleCheckboxChange={handleCheckboxChange}
          selectedRows={selectedRows}
          rowsPerPage={rowsPerPage}
          className="dark:bg-gray-800 dark:text-white text-center"
        />

        {/* Custom Modal */}
        {selectedCollect && (
          <CustomModal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={`Collect - N° ${selectedCollect.number}`}
            isDarkMode={isDarkMode}

          >
{/* Informations Button */}
<div className="mb-8 mt-10 flex items-center justify-center">
  <Button
    size="15"
    className="flex items-center space-x-2 rounded-full bg-[#0258E8] text-white px-4 py-2"
  >
    <InformationCircleIcon size={20} />
    <span>Informations</span>
  </Button>
</div>



            {/* Modal Content */}
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
