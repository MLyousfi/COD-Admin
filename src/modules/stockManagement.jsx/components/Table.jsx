import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft01Icon, ArrowRight01Icon } from 'hugeicons-react';
import { motion } from 'framer-motion';

const ICON_SIZE = 12;

const Table = ({
  coloredHeader = null,
  columns,
  data,
  renderCell,
  handleCheckboxChange,
  selectedRows,
  rowsPerPage = 10,
  enablePagination = true,
  loading = false,
  rowClassNames = {
    even: 'bg-white dark:bg-transparent h-12',
    odd: 'bg-[#00000010] dark:bg-[#ffffff05] h-12'
  },
  emptyMessage = "No records available.",
  rowDetails = null, //shipping cost page
  expandedRow = null, //shipping cost page


}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const tableRef = useRef(null);
  const lastSelectedIndex = useRef(null); // Ref to track the last selected row index

  const currentData = () => data.length > 0 && enablePagination
    ? data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : data;

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

  useEffect(() => {
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      if (touch) {
        touchStartX.current = touch.clientX;
        touchStartY.current = touch.clientY; // Initialize touchStartY
      }
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) {
        const deltaX = touch.clientX - touchStartX.current;
        const deltaY = touch.clientY - touchStartY.current;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          e.preventDefault();
        }
      }
    };

    const tableElement = tableRef.current;
    tableElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    tableElement.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      tableElement.removeEventListener('touchstart', handleTouchStart);
      tableElement.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Function to handle selection with Shift key support
  const handleSelection = (itemKey, index, event) => {
    if (event.shiftKey && lastSelectedIndex.current !== null) {
      // Determine the range between the last selected index and the current index
      const start = Math.min(lastSelectedIndex.current, index);
      const end = Math.max(lastSelectedIndex.current, index);
      const rangeKeys = currentData()
        .slice(start, end + 1)
        .map(row => row.key);

      // Pass the range of keys to the handler with isRange=true
      handleCheckboxChange(rangeKeys, true);
    } else {
      // Toggle the selection of the single clicked row
      handleCheckboxChange(itemKey);
      // Update the last selected index
      lastSelectedIndex.current = index;
    }
  };



  return (
    <div className="w-full mx-4  lg:mx-0">
      {/* Wrapper div for table and pagination to control the fixed height */}
      <div className="min-h-[calc(3rem_*_12)] flex flex-col justify-between">
        {/* Add overflow-x-auto to enable horizontal scrolling */}
        <div ref={tableRef} className="overflow-x-auto flex-grow">
          <table className="box-border border-collapse overflow-auto min-w-full">
            <thead>
              <tr className="border-b border-gray-300 h-11 dark:border-gray-600">
                {columns.map((column, index) => (
                  <th
                    key={column.key}
                    style={{
                      fontWeight: coloredHeader ? "800" : "100",
                      backgroundColor: coloredHeader ? coloredHeader[index % coloredHeader.length] : "transparent"
                    }}
                    className={`${column.w ? column.w : ""} whitespace-nowrap text-center px-10 mx-6 py-2 text-gray-900 dark:text-gray-300 text-sm`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData().map((item, index) => {
                const isSelected = selectedRows.includes(item.key);
                const rowClass = expandedRow && expandedRow === item.id ? 'bg-glb_blue_opacity' : isSelected
                  ? 'bg-[#0587FF25] dark:bg-[#0587FF20]'
                  : index % 2 === 0
                    ? rowClassNames.even
                    : rowClassNames.odd;

                return (
                  <>
                    <tr
                      key={item.key}
                    >
                      {columns.map((column, indx) => {
                        // Determine additional class names based on the column index
                        const borderRadiusClass = indx === 0 ? 'rounded-l-lg' : indx === columns.length - 1 ? 'rounded-r-lg' : '';


                        return (
                          <td key={indx} className={`${rowClass} ${borderRadiusClass}  px-1 py-2 text-center dark:text-gray-300 text-sm whitespace-nowrap`}>
                            {column.key === "checkbox" ? (
                              <motion.div
                                initial={{ scale: 1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.1 }}
                                className='h-full w-full cursor-pointer py-2'
                                onClick={(e) => handleSelection(item.key, index, e)} // Pass event to handleSelection
                              >
                                <div className='w-5 h-5 mx-auto rounded-md border border-[#00000050] dark:border-[#ffffff50] flex justify-center items-center'>
                                  {isSelected && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      transition={{ type: "spring", stiffness: 100 }}
                                      animate={{ scale: 1 }}
                                      className='w-3 h-3 rounded-sm bg-glb_blue'
                                    />
                                  )}
                                </div>
                              </motion.div>
                            ) : (
                              renderCell(item, column.key)
                            )}
                          </td>
                        )
                      })}
                    </tr>
                    {rowDetails && expandedRow && expandedRow === item.id && rowDetails(item)}</>
                )
              })}
            </tbody>
          </table>
        </div>

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
    </div>
  );
};

export default Table;
