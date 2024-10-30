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
  emptyMessage = "No records available."
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);

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



  const tableRef = useRef(null);

  useEffect(() => {
    const handleTouchStart = (e) => {
      // Prevent default behavior if the touch is for scrolling
      const touch = e.touches[0];
      if (touch) {
        // Store the starting position
        touchStartX.current = touch.clientX;
      }
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) {
        const deltaX = touch.clientX - touchStartX.current;
        if (Math.abs(deltaX) > Math.abs(touch.clientY - touchStartY.current)) {
          // Prevent default if scrolling horizontally
          e.preventDefault();
        }
      }
    };

    const tableElement = tableRef.current;
    tableElement.addEventListener('touchstart', handleTouchStart);
    tableElement.addEventListener('touchmove', handleTouchMove);

    return () => {
      tableElement.removeEventListener('touchstart', handleTouchStart);
      tableElement.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="w-full mx-4">
      {/* Wrapper div for table and pagination to control the fixed height */}
      <div className="min-h-[calc(3rem_*_12)] flex flex-col justify-between">
        {/* Add overflow-x-auto to enable horizontal scrolling */}
        <div ref={tableRef} className="overflow-x-auto">
          <table className="box-border border-collapse overflow-auto min-w-full">
            <thead>
              <tr className="border-b border-gray-300 h-11 dark:border-gray-600">
                {columns.map((column, index) => (
                  <th
                    key={column.key}
                    style={{ fontWeight: coloredHeader ? "800" : "100", backgroundColor: coloredHeader ? coloredHeader[index % 2] : "transparent" }}
                    className={`${column.w ? column.w : ""}  whitespace-nowrap  text-center px-10 mx-6 py-2 text-gray-900 dark:text-gray-300 text-sm`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData().map((item, index) => {
                const isSelected = selectedRows.includes(item.key);
                const rowClass = isSelected
                  ? 'bg-[#0587FF25] dark:bg-[#0587FF20]'
                  : index % 2 === 0
                    ? rowClassNames.even
                    : rowClassNames.odd;

                return (
                  <tr
                    key={item.key}
                  >
                    {columns.map((column, indx) => {
                      // Determine additional class names based on the column index
                      const borderRadiusClass = indx === 0 ? 'rounded-l-lg' : indx === columns.length - 1 ? 'rounded-r-lg' : '';

                      return (
                        <td key={indx} className={`${rowClass} ${borderRadiusClass} px-1 py-2  text-center dark:text-gray-300 text-sm whitespace-nowrap`}>
                          {column.key === "checkbox" ? (
                            <motion.div
                              initial={{ scale: 1 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.1 }} className='h-full w-full py-2' onClick={() => handleCheckboxChange(item.key)}>
                              {/* animate this div and it's child ontap when the parent div above clicked using framer motion */}
                              <div
                                className='w-5 h-5 mx-auto rounded-md border border-[#00000050] dark:border-[#ffffff50] flex justify-center items-center'>
                                {selectedRows.includes(item.key) && <motion.div initial={{ scale: 0 }} transition={{ type: "spring", stiffness: 100 }} animate={{ scale: 1 }} className='w-3 h-3 rounded-sm bg-glb_blue'></motion.div>}
                              </div> </motion.div>


                          ) : (
                            renderCell(item, column.key)
                          )}
                        </td>
                      )
                    })}
                  </tr>
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
