import React, { useState, useRef } from 'react';
import { DeliveryTruck01Icon, ShoppingCart01Icon, Airplane01Icon, PackageDeliveredIcon, ReturnRequestIcon, DeliveryBox01Icon } from "hugeicons-react";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import { Button } from "@nextui-org/button";
import { MoreVerticalCircle01Icon } from "hugeicons-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import useOnClickOutside from 'use-onclickoutside';

// CallsCard component
const CallsCard = ({
  icon,
  cardBg,
  percentage,
  amount,
  title,
}) => {
  return (
    <div className="p-6 w-full">
      <div className="bg-transparent rounded-2xl p-8 shadow-lg border border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${cardBg}`}>
              {icon}
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm dark:text-gray-300">Session 01</p>
              <p className="text-black text-lg font-semibold dark:text-white">{title}</p>
            </div>
          </div>
          <Button isIconOnly variant="light">
            <MoreVerticalCircle01Icon size={20} />
          </Button>
        </div>

        <div className="relative w-full h-3 bg-gray-300 rounded-full mt-4 mb-6">
          <div
            className={`absolute h-3 rounded-full ${cardBg}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="flex justify-start items-center space-x-2">
          <p className="text-black text-3xl font-bold dark:text-white">{amount}</p>
          <p className="text-black text-lg dark:text-gray-300">/ {percentage}%</p> 
        </div>
      </div>
    </div>
  );
};


const FirstMileDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Daily');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null); 

  useOnClickOutside(datePickerRef, () => setShowDatePicker(false));

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const formatDateRange = (start, end) => {
    return `${format(start, 'MMM dd')} - ${end ? format(end, 'MMM dd') : ''}`;
  };

  const cardData = [
    {
      icon: <ShoppingCart01Icon className="text-blue-400" />,
      cardBg: "bg-blue-800",
      percentage: 100,
      amount: 1298,
      title: "Total Leads",
    },
    {
      icon: <DeliveryTruck01Icon className="text-green-400" />,
      cardBg: "bg-green-800",
      percentage: 80,
      amount: 854,
      title: "Total Orders",
    },
    {
      icon: <Airplane01Icon className="text-red-400" />,
      cardBg: "bg-red-800",
      percentage: 65,
      amount: 532,
      title: "In Transit",
    },
    {
      icon: <PackageDeliveredIcon className="text-yellow-400" />,
      cardBg: "bg-yellow-800",
      percentage: 40,
      amount: 221,
      title: "Delivered",
    },
    {
      icon: <ReturnRequestIcon className="text-purple-400" />,
      cardBg: "bg-purple-800",
      percentage: 90,
      amount: 1112,
      title: "Return",
    }
  ];

  return (
    <DashboardLayout
      title="First Mile - Dashboard"
      icon={<DeliveryBox01Icon className="text-info" />}
    >
      <div className="flex justify-between items-center px-6 mb-4"> 
  
  <div className="text-xl font-semibold text-black dark:text-white">
    Orders
  </div>
  
  <div className="flex items-center space-x-2">
    {/* Date Range Button */}
    <Button
      auto
      flat
      className="bg-transparent border border-gray-700 text-black dark:text-white rounded-full px-4 py-2"
      onClick={() => setShowDatePicker(!showDatePicker)} // Toggle date picker visibility
    >
      {formatDateRange(startDate, endDate)}
    </Button>

    {/* Date Picker Popover */}
    {showDatePicker && (
      <div ref={datePickerRef} className="absolute z-10 mt-2">
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </div>
    )}

    {/* Dropdown for selecting period */}
    <div className="relative">
      <select
        className="p-2 border border-gray-700 bg-transparent text-black dark:text-white rounded-full px-4 appearance-none focus:outline-none"
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
      >
        <option value="Daily">Daily</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
      <div className="absolute right-4 top-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-black dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  </div>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-0">
        {cardData.map((card, index) => (
          <CallsCard
            key={index}
            icon={card.icon}
            cardBg={card.cardBg}
            percentage={card.percentage}
            amount={card.amount}
            title={card.title}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default FirstMileDashboard;
