import React, { useState } from 'react';
import { ArrowLeft01Icon, ArrowRight01Icon } from 'hugeicons-react';
import { motion } from 'framer-motion';
const ICON_SIZE = 12;

const Table = ({
  coloredHeader = null,
  columns,                  // Array of column definitions { key: 'name', label: 'Name' }
  data,                     // Array of data rows [{ key: 1, name: 'John', age: 24 }, ...]
  renderCell,               // Function to render custom cell content
  handleCheckboxChange,     // Function to handle checkbox toggle
  selectedRows,             // Array of selected row keys for checkboxes
  rowsPerPage = 10,         // Number of rows to display per page
  enablePagination = true,  // Boolean to enable or disable pagination
  loading = false,          // Boolean for loading state
  rowClassNames = {         // Custom row styles passed via props
    even: 'bg-white dark:bg-transparent h-12 rounded-3xl',
    odd: 'bg-gray-200 dark:bg-[#ffffff05] h-12 rounded-3xl'
  },
  emptyMessage = "No records available."  // Default message if no data is available
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);




  const currentData = () => enablePagination
    ? data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : data;  // If pagination is disabled, return all data

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (data.length === 0) {
    return <div>{emptyMessage}</div>; // Display empty state if no data
  }

  return (
    <div className="overflow-x-auto mt-8 w-full">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b border-gray-300 h-11 dark:border-gray-600">
            {columns.map((column, index) => (
              <th
                key={column.key}

                style={{ fontWeight: coloredHeader ? "800" : "100", backgroundColor: coloredHeader ? coloredHeader[index % 2] : "transparent" }}

                className={"text-center px-4 py-2 text-gray-500 dark:text-gray-300 text-sm "}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData().map((item, index) => (
            <tr
              key={item.key}
              className={index % 2 === 0 ? rowClassNames.even : rowClassNames.odd}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-2 text-center dark:text-gray-300 text-sm">
                  {column.key === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.key)}
                      onChange={() => handleCheckboxChange(item.key)}
                    />
                  ) : (
                    renderCell(item, column.key)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {enablePagination && (
        <div className="flex justify-center items-center my-4 space-x-2">
          <button
            className="px-3 py-1 bg-gray-200 dark:bg-[#1a1a1a] dark:text-white rounded flex items-center space-x-1 text-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeft01Icon size={ICON_SIZE} /> <span>Previous</span>
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 text-sm ${currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-600 dark:text-white'
                } rounded`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 bg-gray-200 dark:bg-[#1a1a1a] dark:text-white rounded flex items-center space-x-1 text-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span>Next</span> <ArrowRight01Icon size={ICON_SIZE} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
