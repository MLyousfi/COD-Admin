import React, { useState, useEffect } from 'react';
import { 
  PencilEdit01Icon, 
  PlusSignIcon, 
  EyeIcon, 
  Delete01Icon, 
  WhatsappIcon, 
  Logout02Icon 
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../stockManagement.jsx/components/Table';
import CustomModal from '../../stockManagement.jsx/components/modal'; // Adjust the path if necessary

const rows = [
  {
    key: "1",
    title: "amine@codpowergroup.com",
    phone: "+32 728-298727",
    type: "Type 1",
    statut: "Enabled",
    account: "Affiliate 0001",
  },
  // ... (other rows)
  {
    key: "12",
    title: "amine@codpowergroup.com",
    phone: "+32 728-298727",
    type: "Type 12",
    statut: "Disabled",
    account: "Affiliate 0001",
  },
];

const columns = [
  { key: "checkbox", label: "#" },
  { key: "title", label: "Title" },
  { key: "phone", label: "Phone" },
  { key: "type", label: "Type" },
  { key: "statut", label: "Statut" },
  { key: "account", label: "Account" },
  { key: "options", label: "Actions" },
];

const Accounts = () => {
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [newAccountData, setNewAccountData] = useState({
    title: '',
    phone: '',
    publicKey: '',
    secretKey: '',
  });

  const rowsPerPage = 10;

  // State for Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  // Handlers to open and close modal
  const openModal = () => {
    setIsModalOpen(true);
    setNewAccountData({ title: '', phone: '', publicKey: '', secretKey: '' }); // Reset form
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewAccountData({ title: '', phone: '', publicKey: '', secretKey: '' }); // Reset form
  };

  // Handler to add a new account
  const handleCreateAccount = () => {
    const { title, phone, publicKey, secretKey } = newAccountData;

    // Simple validation
    if (!title.trim() || !phone.trim() || !publicKey.trim() || !secretKey.trim()) {
      alert("Please fill in all the fields.");
      return;
    }

    const newKey = (parseInt(products[products.length - 1]?.key) || 0) + 1;
    const newAccount = {
      key: newKey.toString(),
      title: title.trim(),
      phone: phone.trim(),
      type: "Type 1", // You can make this dynamic based on your requirements
      statut: "Enabled",
      account: "Account 1", // Similarly, make this dynamic if needed
      publicKey: publicKey.trim(),
      secretKey: secretKey.trim(),
    };

    setProducts([...products, newAccount]);
    closeModal();
  };

  // Handlers for checkbox selection
  const handleCheckboxChange = (keys, isRange = false) => {
    if (isRange && Array.isArray(keys)) {
      setSelectedRows(prevSelected => {
        const newSelected = new Set(prevSelected);
        keys.forEach(key => newSelected.add(key));
        return Array.from(newSelected);
      });
    } else {
      setSelectedRows(prevSelected => {
        const newSelected = new Set(prevSelected);
        if (newSelected.has(keys)) {
          newSelected.delete(keys);
        } else {
          newSelected.add(keys);
        }
        return Array.from(newSelected);
      });
    }
  };

  // Handler to delete an account
  const handleDelete = (key) => {
    setProducts(products.filter(product => product.key !== key));
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccountData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to determine if a field is filled
  const isFilled = (value) => value.trim() !== '';

  // Render cell content based on column key
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
      case "statut":
        return (
          <span className={`rounded-full text-black dark:text-white px-2 py-1 ${item.statut === "Enabled" ? 'bg-[#EB00FF40]' : 'bg-[#5200FF40]'}`}>
            {item.statut}
          </span>
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
              <EyeIcon size={14} />
            </Button>
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#0258E8', minWidth: '32px', height: '32px' }}
            >
              <Logout02Icon size={14} style={{ color: 'white' }} />
            </Button>
            <Button
              variant="flat"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              style={{ backgroundColor: '#ED0006', minWidth: '32px', height: '32px' }}
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

  return (
    <DashboardLayout title="Whatsapp - Accounts" icon={<WhatsappIcon className="text-info" />}>
      <div className="p-2 md:p-4">
        {/* Action Buttons */}
        <div className="flex flex-row gap-4 justify-end items-center mb-4">
          <Button
            color="default"
            onClick={openModal}
            className="rounded-full flex items-center gap-2"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
          >
            <PlusSignIcon size={18} /> New Account
          </Button>
          <Button
            color="default"
            className="rounded-full flex items-center gap-2"
            style={{ backgroundColor: '#ED0006', color: 'white' }}
          >
            <PencilEdit01Icon size={18} style={{ color: 'white' }} /> Actions
          </Button>
        </div>

        {/* Accounts Table */}
        <Table
          columns={columns}
          data={products}
          renderCell={renderCell}
          handleCheckboxChange={handleCheckboxChange}
          selectedRows={selectedRows}
          rowsPerPage={rowsPerPage}
          className="dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Custom Modal for New Account */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="New Account"
        isDarkMode={isDarkMode} // Adjust based on your theme context
      >
        <div className="flex flex-col">
          {/* Form Inputs */}
          <div className="flex flex-col gap-6">
            {/* Information Section */}
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-400 dark:text-gray-500">Information</h3>
              <div className="flex flex-col gap-4">
                {/* Title Input */}
                <div>
                  {/* Conditionally render label */}
                 
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newAccountData.title}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-2 text-[13px] bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
                    placeholder={!isFilled(newAccountData.title) ? "Title" : ""}
                  />
                </div>

                {/* Phone Number Input */}
                <div>
                  {/* Conditionally render label */}
                  
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={newAccountData.phone}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-2 text-[13px] bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
                    placeholder={!isFilled(newAccountData.phone) ? "Phone Number" : ""}
                  />
                </div>
              </div>
            </div>

            {/* Keys Section */}
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-400 dark:text-gray-500">Keys</h3>
              <div className="flex flex-col gap-4">
                {/* Public Key Input */}
                <div>
                  {/* Conditionally render label */}
                
                  <input
                    type="text"
                    id="publicKey"
                    name="publicKey"
                    value={newAccountData.publicKey}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-2 text-[13px] bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
                    placeholder={!isFilled(newAccountData.publicKey) ? "Public key" : ""}
                  />
                </div>

                {/* Secret Key Input */}
                <div>
                  {/* Conditionally render label */}
                
                  <input
                    type="text"
                    id="secretKey"
                    name="secretKey"
                    value={newAccountData.secretKey}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-2 text-[13px] bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
                    placeholder={!isFilled(newAccountData.secretKey) ? "Secret key" : ""}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <hr className="my-6 border-gray-300 dark:border-gray-600" />

          {/* Modal Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleCreateAccount}
              className="bg-info text-white rounded-full px-4 py-2"
            >
              Create Account
            </Button>
            <Button
              onClick={closeModal}
              variant="light"
              className="border border-[#00000050] dark:border-gray-300 rounded-full px-4 py-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      </CustomModal>
    </DashboardLayout>
  );
};

export default Accounts;
