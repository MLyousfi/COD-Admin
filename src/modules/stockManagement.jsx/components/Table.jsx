import React, { useState } from 'react';
import { ArrowLeft01Icon, ArrowRight01Icon } from 'hugeicons-react';

const ICON_SIZE = 12;

const Table = ({
  coloredHeader = null,
  columns,                  // Array of column definitions { key: 'name', label: 'Name' }
  data,                     // Array of data rows [{ key: 1, name: 'John', age: 24 }, ...]
  renderCell,               // Function to render custom cell content
  handleCheckboxChange,     // Function to handle checkbox toggle
  selectedRows,   
  setSelectedRows,
  rowsPerPage = 10,         // Number of rows to display per page
  enablePagination = true,  // Boolean to enable or disable pagination
  loading = false,          // Boolean for loading state
  rowClassNames = {         // Custom row styles passed via props
    even: 'bg-white dark:bg-transparent h-12 rounded-3xl',
    odd: 'bg-gray-100 dark:bg-[#1a1a1a50] h-12 rounded-3xl'
  },
  emptyMessage = "No records available."
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

  const currentData = () => enablePagination
    ? data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : data;

  const handleRowClick = (key, index, event) => {
    let newSelectedRows = [...selectedRows];

    if (event.shiftKey && lastSelectedIndex !== null) {
      const start = Math.min(lastSelectedIndex, index);
      const end = Math.max(lastSelectedIndex, index);
      const keysInRange = currentData().slice(start, end + 1).map((item) => item.key);

      newSelectedRows = [
        ...new Set([...newSelectedRows, ...keysInRange])
      ];
    } else {
      if (newSelectedRows.includes(key)) {
        newSelectedRows = newSelectedRows.filter((selectedKey) => selectedKey !== key);
      } else {
        newSelectedRows.push(key);
      }
      setLastSelectedIndex(index);
    }

    setSelectedRows(newSelectedRows);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>{emptyMessage}</div>;
  }

return (
  <div className="overflow-x-auto w-full">
    {/* Wrapper div for table and pagination to control the fixed height */}
    <div className="table-container min-h-[calc(3rem_*_12)] flex flex-col justify-between">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b border-gray-300 h-11 dark:border-gray-600">
            {columns.map((column, index) => (
              <th
                key={column.key}
                style={{ fontWeight: coloredHeader ? "800" : "100", backgroundColor: coloredHeader ? coloredHeader[index % 2] : "transparent" }}
                className="text-center px-4 py-2 text-gray-500 dark:text-gray-300 text-sm"
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
      className={`${index % 2 === 0 ? rowClassNames.even : rowClassNames.odd} ${
        selectedRows.includes(item.key) ? 'bg-[#0587FF15] dark:bg-[#0587FF15]' : ''
      }`} 
      onClick={(event) => handleRowClick(item.key, index, event)}
    >
      {columns.map((column) => (
        <td key={column.key} className="px-1 py-2 text-center dark:text-gray-300 text-sm">
          {column.key === "checkbox" ? (
            <input
              type="checkbox"
              checked={selectedRows.includes(item.key)}
              onChange={() => handleCheckboxChange(item.key)}
              onClick={(event) => event.stopPropagation()} 
              className="appearance-none w-4 h-4 relative rounded-sm focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
              style={{
                boxShadow: '0 0 0 0px currentColor', 
                borderRadius: '4px',
                border: '0.5px solid', 
                borderColor: 'gray', 
                color: 'white', 
              }}
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
        <div className="pagination-container flex justify-center items-center my-4 space-x-2">
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

    <style jsx>{`
      .table-container {
        min-height: calc(3rem * 12); /* Adjusts to fit approximately 12 rows */
      }

      input[type="checkbox"]::before {
        content: '';
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 9px;
        background-color: #005FFF;
        border-radius: 2px;
        transition: background-color 0.2s;
        display: none;
      }

      input[type="checkbox"]:checked::before {
        display: block;
      }

      @media (prefers-color-scheme: dark) {
        input[type="checkbox"] {
          border-color: white;
        }
      }
    `}</style>
  </div>
);
};
export default Table;
