import React, { useState, useEffect } from 'react';
import { 
  PencilEdit01Icon, 
  PlusSignIcon, 
  EyeIcon, 
  Delete01Icon, 
  WhatsappIcon, 
  PrinterIcon, 
  Download01Icon,
  CustomerSupportIcon,
  ArrowRight01Icon,
  CallOutgoing01Icon,
  DropboxIcon,
  Settings02Icon
} from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import Table from '../../shared/components/Table';
import CustomModal from '../../shared/components/modal'; // Adjust the path if necessary
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

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
  const [editingAccount, setEditingAccount] = useState(null); // State to hold the account being edited

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
  const openModal = (account = null) => {
    setEditingAccount(account);
    setIsModalOpen(true);

    // Pre-fill the form if editing, otherwise reset it
    setNewAccountData(account ? { 
      title: account.title, 
      phone: account.phone, 
      publicKey: account.publicKey || '', 
      secretKey: account.secretKey || '' 
    } : { 
      title: '', 
      phone: '', 
      publicKey: '', 
      secretKey: '' 
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAccount(null); // Reset editingAccount
    setNewAccountData({ title: '', phone: '', publicKey: '', secretKey: '' }); // Reset form
  };

  // Handler to add or update an account
  const handleCreateAccount = () => {
    const { title, phone, publicKey, secretKey } = newAccountData;

    // Simple validation
    if (!title.trim() || !phone.trim() || !publicKey.trim() || !secretKey.trim()) {
      alert("Please fill in all the fields.");
      return;
    }

    if (editingAccount) {
      // Update the existing account
      setProducts(products.map(product =>
        product.key === editingAccount.key
          ? { ...product, title, phone, publicKey, secretKey }
          : product
      ));
    } else {
      // Add a new account
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
    }

    closeModal();
  };

  // Handlers for checkbox selection
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
              onClick={() => openModal(item)} // Pass the account data to openModal
            >
              <PencilEdit01Icon size={14} style={{ color: 'white' }} />
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
            onClick={() => openModal()} // Open modal without account to create new
            className="rounded-full flex items-center gap-2"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
          >
            <PlusSignIcon size={18} /> New Account
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

      {/* Custom Modal for New/Edit Account */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingAccount ? "Edit Account" : "New Account"}
        isDarkMode={isDarkMode}
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
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newAccountData.title}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-2 text-[13px] bg-transparent border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
                    placeholder={!isFilled(newAccountData.title) ? "Title" : ""}
                  />
                </div>

                {/* Phone Number Input */}
                <div>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={newAccountData.phone}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-2 text-[13px] bg-transparent border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
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
                  <input
                    type="text"
                    id="publicKey"
                    name="publicKey"
                    value={newAccountData.publicKey}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-2 text-[13px] bg-transparent border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
                    placeholder={!isFilled(newAccountData.publicKey) ? "Public key" : ""}
                  />
                </div>

                {/* Secret Key Input */}
                <div>
                  <input
                    type="text"
                    id="secretKey"
                    name="secretKey"
                    value={newAccountData.secretKey}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-2 text-[13px] bg-transparent border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300`}
                    placeholder={!isFilled(newAccountData.secretKey) ? "Secret key" : ""}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <hr className="my-6 border-gray-300 dark:border-gray-800" />

          {/* Modal Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleCreateAccount}
              className="bg-info text-white rounded-full px-4 py-2"
            >
              {editingAccount ? "Update Pixel" : "Create Account"}
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
