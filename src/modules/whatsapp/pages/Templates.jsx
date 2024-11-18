
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
import { rows } from '../../../core/utils/data4';
import CustomModal from '../../stockManagement.jsx/components/modal'; // Adjust the path if necessary

const columns = [
  { key: "checkbox", label: "#" },
  { key: "title", label: "Title" },
  { key: "alias", label: "Alias" },
  { key: "type", label: "Type" },
  { key: "statut", label: "Statut" },
  { key: "account", label: "Account" },
  { key: "options", label: "Actions" },
];

const Templates = () => {
  const [products, setProducts] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedMenu, setSelectedMenu] = useState('Information'); // State for selected menu
  const [newTemplateData, setNewTemplateData] = useState({
    title: '',
    alias: '',
    content: '',
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
    setSelectedMenu('Information'); // Default to Information
    setNewTemplateData({ title: '', alias: '', content: '' }); // Reset form
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewTemplateData({ title: '', alias: '', content: '' }); // Reset form
  };

  // Handler to add a new template
  const handleCreateTemplate = () => {
    const { title, alias, content } = newTemplateData;

    // Simple validation
    if (!title.trim() || !alias.trim() || !content.trim()) {
      alert("Please fill in all the fields.");
      return;
    }

    const newKey = (parseInt(products[products.length - 1]?.key) || 0) + 1;
    const newTemplate = {
      key: newKey.toString(),
      title: title.trim(),
      alias: alias.trim(),
      type: "Type 1", // You can make this dynamic based on your requirements
      statut: "Enabled",
      account: "Account 1", // Similarly, make this dynamic if needed
    };

    setProducts([...products, newTemplate]);
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

  // Handler to delete a template
  const handleDelete = (key) => {
    setProducts(products.filter(product => product.key !== key));
  };

  // Handler to change selected menu in modal
  const handleMenuSelection = (menu) => {
    setSelectedMenu(menu);
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTemplateData(prevData => ({
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
    <DashboardLayout title="Whatsapp - Templates" icon={<WhatsappIcon className="text-info" />}>
      <div className="p-2 md:p-4">
        {/* Action Buttons */}
        <div className="flex flex-row gap-4 justify-end items-center mb-4">
          <Button
            color="default"
            onClick={openModal}
            className="rounded-full flex items-center gap-2"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
          >
            <PlusSignIcon size={18} /> New Template
          </Button>
          <Button
            color="default"
            className="rounded-full flex items-center gap-2"
            style={{ backgroundColor: '#ED0006', color: 'white' }}
          >
            <PencilEdit01Icon size={18} style={{ color: 'white' }} /> Actions
          </Button>
        </div>

        {/* Templates Table */}
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

      {/* Custom Modal for New Template */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="New Template"
        isDarkMode={isDarkMode} // Adjust based on your theme context
        width='700px'
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Section: Menu */}
          <div className="md:w-1/3 mb-4 md:mb-0">
            <ul className="flex md:flex-col ">
              <li>
                <button
                  onClick={() => handleMenuSelection('Information')}
                  className={`px-2 py-1 text-sm rounded-lg focus:outline-none hover:text-black hover:dark:text-[#005FFF] ${
                    selectedMenu === 'Information' 
                      ? 'bg-transparent text-black dark:text-white' 
                      : 'bg-transparent dark:bg-transparent text-gray-500 dark:text-gray-600'
                  }`}
                >
                  Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuSelection('ShortCodes')}
                  className={`px-2 py-1 text-sm whitespace-nowrap rounded-lg focus:outline-none hover:text-black hover:dark:text-[#005FFF] ${
                    selectedMenu === 'ShortCodes' 
                      ? 'bg-transparent text-black dark:text-white' 
                      : 'bg-transparent dark:bg-transparent text-gray-500 dark:text-gray-600'
                  }`}
                >
                  List of Short-Codes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuSelection('Options')}
                  className={`px-2 py-1 text-sm rounded-lg focus:outline-none hover:text-black hover:dark:text-[#005FFF] ${
                    selectedMenu === 'Options' 
                      ? 'bg-transparent text-black dark:text-white' 
                      : 'bg-transparent dark:bg-transparent text-gray-500 dark:text-gray-600'
                  }`}
                >
                  Options
                </button>
              </li>
            </ul>
          </div>

          {/* Right Section: Content Based on Menu */}
          <div className="md:w-2/3 md:pl-3 md:pr-5">
            {selectedMenu === 'Information' && (
              <div className="flex flex-col gap-6">
                {/* Title and Alias Inputs */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Title Input */}
                  <div className="relative flex-1">
                    <label
                      htmlFor="title"
                      className={`absolute  top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                        isFilled(newTemplateData.title) ? 'transform -translate-y-4 scale-90' : ''
                      }`}
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newTemplateData.title}
                      onChange={handleInputChange}
                      onFocus={() => {}}
                      onBlur={() => {}}
                      className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none  transition-colors duration-300`}
                      placeholder=""
                    />
                    <div
                      className={`absolute  bottom-1 h-0.5 w-full transition-colors duration-300 ${
                        isFilled(newTemplateData.title)
                          ? 'bg-[#0258E8]'
                          : 'dark:bg-gray-500 bg-gray-300'
                      }`}
                    ></div>
                  </div>

                  {/* Alias Input */}
                  <div className="relative flex-1">
                    <label
                      htmlFor="alias"
                      className={`absolute top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                        isFilled(newTemplateData.alias) ? 'transform -translate-y-4 scale-90' : ''
                      }`}
                    >
                      Alias at (at unifonic)
                    </label>
                    <input
                      type="text"
                      id="alias"
                      name="alias"
                      value={newTemplateData.alias}
                      onChange={handleInputChange}
                      onFocus={() => {}}
                      onBlur={() => {}}
                      className={`block w-full pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300`}
                      placeholder=""
                    />
                    <div
                      className={`absolute bottom-1 h-[1.8px] w-full transition-colors duration-300 ${
                        isFilled(newTemplateData.alias)
                          ? 'bg-[#0258E8]'
                          : 'dark:bg-gray-500 bg-gray-300'
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Content Input */}
                <div className="relative flex-1">
                  <label
                    htmlFor="content"
                    className={`absolute  top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none ${
                      isFilled(newTemplateData.content) ? 'transform -translate-y-4 scale-90' : ''
                    }`}
                  >
                    Content
                  </label>
                  <input
                    type="text"
                    id="content"
                    name="content"
                    value={newTemplateData.content}
                    onChange={handleInputChange}
                    onFocus={() => {}}
                    onBlur={() => {}}
                    className={`block w-full  pt-6 pb-2 text-sm bg-transparent focus:outline-none transition-colors duration-300`}
                    placeholder=""
                  />
 <div
                      className={`absolute  bottom-1 h-[2px] w-full transition-colors duration-300 ${
                        isFilled(newTemplateData.content)
                          ? 'bg-[#0258E8]'
                          : 'dark:bg-gray-500 bg-gray-300'
                      }`}
                    ></div>
                </div>
              </div>
            )}

            {selectedMenu === 'ShortCodes' && (
              <div>
                <p className="text-sm dark:text-white">List of Short-Codes will be here.</p>
              </div>
            )}

            {selectedMenu === 'Options' && (
              <div>
                <p className="text-sm dark:text-white">Options settings will be here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={handleCreateTemplate}
            className="bg-info text-white rounded-full px-4 py-2"
          >
            Create Template
          </Button>
          <Button
            onClick={closeModal}
            variant="light"
            className="border border-[#00000050] dark:border-gray-300 rounded-full px-4 py-2"
          >
            Cancel
          </Button>
        </div>
      </CustomModal>
    </DashboardLayout>
  );
};

export default Templates;
