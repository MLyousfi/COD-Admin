// Templates.jsx
import React, { useState } from 'react';
import { Settings02Icon } from "hugeicons-react";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import NewBankModal from '../components/NewBankModal'; // Ensure this component is relevant

const columns = [
  { key: "template", label: "Template" },
  { key: "link", label: "Link" },
];

const templateRows = [
  { key: 1, template: "API Documentations", link: "https://example.com/api-documentations" },
  { key: 2, template: "Import Orders Tracking", link: "https://example.com/import-orders-tracking" },
  { key: 3, template: "Firstmile Orders", link: "https://example.com/firstmile-orders" },
  { key: 4, template: "Import Orders via Excel", link: "https://example.com/import-orders-excel" },
  { key: 5, template: "Import Orders via Google Sheet", link: "https://example.com/import-orders-google-sheet" },
  { key: 6, template: "Import Followup Orders via Excel", link: "https://example.com/import-followup-orders-excel" },
  { key: 7, template: "Import Products", link: "https://example.com/import-products" },
];

const Templates = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editedBank, setEditedBank] = useState(null);

  return (
    <DashboardLayout title="General - Templates" icon={<Settings02Icon className="text-info" />}>
      {/* Clickable Menu Title for Templates */}
      <div className="flex items-center cursor-pointer pl-8 mt-5">
        <h2 className="text-lg ml-3 font-semibold border-b-3 border-blue-600 pb-1">List of Templates</h2>
        <span className="bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center ml-2">
          {templateRows.length}
        </span>
      </div>
      <div className="p-10">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            {/* Table Header */}
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={column.key}
                    className={`px-6 py-3 ${
                      index === 0 ? 'rounded-tl-[18px]' : ''
                    } bg-[#00000010] dark:bg-[#ffffff05] text-left text-sm font-bold text-black dark:text-white uppercase tracking-wider ${
                      index < columns.length - 1 ? 'border-r border-gray-300 dark:border-[#ffffff15]' : ''
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="rounded-lg">
              {templateRows.map((row, index) => (
                <tr
                  key={row.key}
                  className={`${
                    index % 2 === 0 ? 'bg-white dark:bg-transparent h-12' : 'bg-[#00000010] dark:bg-[#ffffff05] h-12'
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white border-r border-gray-300 dark:border-[#ffffff15]">
                    {row.template}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                    <a href={row.link} target="_blank" rel="noopener noreferrer">
                      {row.link}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <NewBankModal modalOpen={openModal} setModalOpen={setOpenModal} editedBank={editedBank} id={1} />
    </DashboardLayout>
  );
};

export default Templates;
