// EditMessageModal.jsx

import React, { useState } from 'react';
import { Button } from "@nextui-org/button";
import CustomModal from '../../shared/components/modal'; // Adjust the path if necessary
import { InformationCircleIcon, UserSquareIcon, CubeIcon } from "hugeicons-react";

const EditMessageModal = ({ isOpen, onClose, item, isDarkMode }) => {
  const [selectedMenu, setSelectedMenu] = useState('Informations');

  // State for form data
  const [editData, setEditData] = useState({
    title: item?.title || '',
    alias: item?.alias || '',
    content: item?.content || '',
    shortcodesUsed: '', 
    language: '',
    timeOfSending: '',
    type: '',
    statut: '',
    account: '',
  });

  // Handlers for menu selection
  const handleMenuSelection = (menu) => {
    setSelectedMenu(menu);
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for Edit button
  const handleEdit = () => {
    // Implement your edit logic here
    // For example, update the item in the parent component
  };

  // Data for the table with light and dark mode background colors
  const shortcodesData = [
    {
      name: 'Customer name',
      shortcode: '[name]',
      bgColorDark: '#FFFFFF04',
      bgColorLight: '#00000010',
    },
    {
      name: 'Customer address',
      shortcode: '[address]',
      bgColorDark: 'transparent',
      bgColorLight: 'transparent',
    },
    {
      name: 'Product name',
      shortcode: '[product]',
      bgColorDark: '#FFFFFF04',
      bgColorLight: '#00000010',
    },
    {
      name: 'Current offer',
      shortcode: '[current_offer]',
      bgColorDark: '#FFFFFF04',
      bgColorLight: '#00000010',
    },
    {
      name: 'Store name',
      shortcode: '[store]',
      bgColorDark: '#FFFFFF04',
      bgColorLight: '#00000010',
    },
    {
      name: 'Product link',
      shortcode: '[product_link]',
      bgColorDark: '#FFFFFF04',
      bgColorLight: '#00000010',
    },
    {
      name: 'Position URL',
      shortcode: '[position_url]',
      bgColorDark: '#FFFFFF04',
      bgColorLight: '#00000010',
    },
  ];

  // Determine border color based on mode
  const borderColor = isDarkMode ? '#ffffff15' : '#00000010';

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Message"
      isDarkMode={isDarkMode}
      width='700px'
    >
     {/* Header with Menu Buttons and Edit Button */}
     <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-11">
        {/* Menu Buttons */}
        <div className="flex flex-wrap">
          {/* Informations Button */}
          <button
            onClick={() => handleMenuSelection('Informations')}
            className={`flex items-center font-bold gap-1 px-3 py-2 text-[13px] rounded-full focus:outline-none flex-shrink-0 mr-2 mb-2 ${
              selectedMenu === 'Informations'
                ? 'bg-info text-white dark:text-white'
                : 'text-black dark:text-white dark:bg-[#ffffff10] bg-[#00000015]'
            }`}
          >
            <InformationCircleIcon size={14} />
            Informations
          </button>
          {/* List of Shortcodes Button */}
          <button
            onClick={() => handleMenuSelection('List of Shortcodes')}
            className={`flex items-center font-bold gap-1 px-3 py-2 text-[13px] rounded-full focus:outline-none flex-shrink-0 mr-2 mb-2 ${
              selectedMenu === 'List of Shortcodes'
                ? 'bg-info text-white dark:text-white'
                : 'text-black dark:text-white dark:bg-[#ffffff10] bg-[#00000015]'
            }`}
          >
            <UserSquareIcon size={14} />
            List of Shortcodes
          </button>
          {/* Options Button */}
          <button
            onClick={() => handleMenuSelection('Options')}
            className={`flex items-center font-bold gap-1 px-3 py-2 text-[13px] rounded-full focus:outline-none flex-shrink-0 mr-2 mb-2 ${
              selectedMenu === 'Options'
                ? 'bg-info text-white dark:text-white'
                : 'text-black dark:text-white dark:bg-[#ffffff10] bg-[#00000015]'
            }`}
          >
            <CubeIcon size={14} />
            Options
          </button>
        </div>

        {/* Edit Button */}
        <div className="mt-4 md:mt-0 w-full md:w-auto flex justify-end">
          {selectedMenu !== 'List of Shortcodes' && (
            <Button
              onClick={handleEdit}
              className="bg-[#ED0006] font-bold text-white text-[13px] rounded-full px-4 py-2"
            >
              Edit
            </Button>
          )}
        </div>
      </div>


      {/* Content Based on Selected Menu */}
      <div className="mt-4">
        {selectedMenu === 'Informations' && (
          <div className="flex flex-col gap-6">
            {/* First Row: Title and Alias */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Title Select Input */}
              <div className="flex-1">
                <label
                  htmlFor="edit-title"
                  className="block text-sm text-gray-500 mb-1"
                >
                  Title
                </label>
                <select
                  id="edit-title"
                  name="title"
                  value={editData.title}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-[#ffffff15] rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                >
                  {/* Populate options dynamically if needed */}
                  <option value="">Title</option>
                  <option value="Title1">Title1</option>
                  <option value="Title2">Title2</option>
                </select>
              </div>

              {/* Alias Select Input */}
              <div className="flex-1">
                <label
                  htmlFor="edit-alias"
                  className="block text-sm text-gray-500 mb-1"
                >
                  Alias (at unifonic)
                </label>
                <select
                  id="edit-alias"
                  name="alias"
                  value={editData.alias}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-[#ffffff15] rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                >
                  {/* Populate options dynamically if needed */}
                  <option value="">Your Welcome</option>
                  <option value="Alias1">Alias1</option>
                  <option value="Alias2">Alias2</option>
                </select>
              </div>
            </div>

            {/* Second Row: Content */}
            <div className="mt-4 mb-16">
              <label
                htmlFor="edit-content"
                className="block text-sm text-gray-500 mb-1"
              >
                Content
              </label>
              <input
                type="text"
                id="edit-content"
                name="content"
                value={editData.content}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-[#ffffff15] rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                placeholder='Content'
              />
            </div>
          </div>
        )}

        {selectedMenu === 'List of Shortcodes' && (
          <div className='px-8'>
            {/* Table */}
            <table className="w-full rounded-full text-sm mt-4">
              <thead>
                <tr
                  style={{
                    backgroundColor: isDarkMode ? '#FFFFFF08' : '#00000025',
                  }}
                >
                  <th
                    className="py-2 px-2 text-center border-r"
                    style={{ borderColor: borderColor }}
                  >
                    Name
                  </th>
                  <th className="py-2 px-2 text-center">
                    Shortcode
                  </th>
                </tr>
              </thead>
              <tbody>
                {shortcodesData.map((row, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: isDarkMode ? row.bgColorDark : row.bgColorLight,
                    }}
                  >
                    <td
                      className="py-2 px-2 font-bold text-[13px] text-center border-r"
                      style={{ borderColor: borderColor }}
                    >
                      {row.name}
                    </td>
                    <td className="py-2 px-2 font-bold text-[13px] text-center">
                      {row.shortcode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Shortcodes Used Input */}
            <div className="mt-8">
              <label
                htmlFor="shortcodes-used"
                className="block text-sm font-bold text-black dark:text-white mb-1"
              >
                Shortcodes Used
              </label>
              <textarea
                id="shortcodes-used"
                name="shortcodesUsed"
                value={editData.shortcodesUsed}
                onChange={handleInputChange}
                rows={4}
                placeholder='Shortcodes Used'
                className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-[#ffffff20] rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
              />
            </div>
          </div>
        )}

        {selectedMenu === 'Options' && (
          <div className="flex flex-col gap-6">
            {/* First Row: Language and Time of Sending */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Language Select Input */}
              <div className="flex-1">
                <label
                  htmlFor="edit-language"
                  className="block text-sm text-gray-500 dark:text-[#ffffff40] mb-1"
                >
                  Language
                </label>
                <select
                  id="edit-language"
                  name="language"
                  value={editData.language}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-[#ffffff15] rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                >
                  {/* Populate options dynamically if needed */}
                  <option value="ar">ar</option>
                  <option value="en">en</option>
                  {/* Add more languages as needed */}
                </select>
              </div>

              {/* Time of Sending Select Input */}
              <div className="flex-1">
                <label
                  htmlFor="edit-timeOfSending"
                  className="block text-sm text-gray-500 dark:text-[#ffffff40] mb-1"
                >
                  Time of Sending
                </label>
                <select
                  id="edit-timeOfSending"
                  name="timeOfSending"
                  value={editData.timeOfSending}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-[#ffffff15] rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                >
                  {/* Populate options dynamically if needed */}
                  <option value="">ar</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                  {/* Add more time options as needed */}
                </select>
              </div>
            </div>

            {/* Second Row: Type and Statut */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Type Select Input */}
              <div className="flex-1">
                <label
                  htmlFor="edit-type"
                  className="block text-sm text-gray-500 dark:text-[#ffffff40] mb-1"
                >
                  Type
                </label>
                <select
                  id="edit-type"
                  name="type"
                  value={editData.type}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-[#ffffff15] rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                >
                  {/* Populate options dynamically if needed */}
                  <option value="call_center">Call Center</option>
                  {/* Add more types as needed */}
                </select>
              </div>

              {/* Statut Select Input */}
              <div className="flex-1">
                <label
                  htmlFor="edit-statut"
                  className="block text-sm text-gray-500 dark:text-[#ffffff40] mb-1"
                >
                  Statut
                </label>
                <select
                  id="edit-statut"
                  name="statut"
                  value={editData.statut}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 text-sm bg-transparent border border-gray-300 dark:border-[#ffffff15] rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
            </div>

            {/* Third Row: Account */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Account Select Input */}
              <div className="w-full md:w-1/2 md:pr-3 mb-10">
                <label
                  htmlFor="edit-account"
                  className="block text-sm text-gray-500 dark:text-[#ffffff40] mb-1"
                >
                  Account
                </label>
                <select
                  id="edit-account"
                  name="account"
                  value={editData.account}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2  text-sm bg-transparent border border-gray-300 dark:border-[#ffffff15] rounded-lg focus:outline-none focus:border-[#0258E8] transition-colors duration-300"
                >
                  <option value="unknown">Unknown</option>
                  {/* Add more account options as needed */}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default EditMessageModal;
