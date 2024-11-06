import React, { useState, useRef } from 'react';
import { DeliveryTruck01Icon, ShoppingCart01Icon, Airplane01Icon, PackageDeliveredIcon, DeliveryBox01Icon, Calendar03Icon, ArrowTurnBackwardIcon } from "hugeicons-react"; // Import CalendarIcon
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
  iconColor,
  cardBg,
  progressColor,
  percentage,
  amount,
  title,
  progressWidth,
}) => {
  return (
    <div className="p-6 w-full">
      <div className="bg-transparent rounded-2xl p-8 shadow-lg border border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-xl"
              style={{ backgroundColor: cardBg }}
            >
              <span style={{ color: iconColor }}>{icon}</span>
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

        <div className="relative w-full h-3 rounded-full mt-4 mb-6 dark:bg-[#2B292C] bg-[#E7E7E7]">
          <div
            className="absolute h-3 rounded-full"
            style={{ width: progressWidth, backgroundColor: progressColor }}
          ></div>
        </div>

        <div className="flex justify-start items-center space-x-2">
          <p className="text-black text-2xl font-bold dark:text-white">{amount}</p>
          <p className="text-black text-lg dark:text-gray-300">/ 100%</p>
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
      icon: <ShoppingCart01Icon />,
      iconColor: "#FFFFFF",
      cardBg: "#2B292C",
      progressColor: "#0452D4",
      percentage: 100,
      amount: "1,298",
      title: "Total Leads",
      progressWidth: "60%",
    },
    {
      icon: <DeliveryTruck01Icon />,
      iconColor: "#6DA544",
      cardBg: "#6DA54420",
      progressColor: "#6DA544",
      percentage: 100,
      amount: "1,298",
      title: "Shipped",
      progressWidth: "60%",
    },
    {
      icon: <Airplane01Icon />,
      iconColor: "#FFB800",
      cardBg: "#FFB80020",
      progressColor: "#FFB800",
      percentage: 100,
      amount: "1,298",
      title: "In Transit",
      progressWidth: "60%",
    },
    {
      icon: <PackageDeliveredIcon />,
      iconColor: "#0E5CD2",
      cardBg: "#0E5CD220",
      progressColor: "#FFB800",
      percentage: 100,
      amount: "1,298",
      title: "Delivered",
      progressWidth: "60%",
    },
    {
      icon: <ArrowTurnBackwardIcon />,
      iconColor: "#D20E0E",
      cardBg: "#D20E0E20",
      progressColor: "#D20E0E",
      percentage: 100,
      amount: "1,298",
      title: "Return",
      progressWidth: "60%",
    }
  ];

  return (
    <DashboardLayout
      title="First Mile - Dashboard"
      icon={<DeliveryBox01Icon className="text-info" />}
    >
     <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-2 gap-2 md:px-6 mb-1">

{/* Title */}
<div className="text-xl font-semibold ml-3 mt-9 text-black dark:text-white order-2 md:order-1 mt-2 md:mt-0">
  Orders
</div>

{/* Buttons */}
<div className="flex items-center space-x-2 order-1 md:order-2 ml-auto">
  <Button
    auto
    flat
    className="bg-transparent border border-gray-700 text-black dark:text-white rounded-full px-4 py-2 flex items-center space-x-2"
    onClick={() => setShowDatePicker(!showDatePicker)}
  >
    <Calendar03Icon className="text-gray-500 dark:text-gray-300" size={18} /> {/* Calendar Icon */}
    <span>{formatDateRange(startDate, endDate)}</span>
  </Button>

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

  <div className="relative">
    <select
      className="p-2 border border-gray-700 bg-transparent text-black dark:text-white rounded-full px-4 pr-8 appearance-none focus:outline-none"
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
            iconColor={card.iconColor}
            cardBg={card.cardBg}
            progressColor={card.progressColor}
            percentage={card.percentage}
            amount={card.amount}
            title={card.title}
            progressWidth={card.progressWidth}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default FirstMileDashboard;
