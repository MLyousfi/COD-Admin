import React from 'react';
import { DeliveryTruck01Icon } from "hugeicons-react";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import { Progress } from "@nextui-org/progress";
import { Button } from "@nextui-org/button";
import { MoreVerticalCircle01Icon } from "hugeicons-react";

// CallsCard component
const CallsCard = ({
  icon,
  cardBg,
  percentage,
  amount,
  title,
}) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg" style={{ minHeight: '250px' }}>
        {/* Icon and more button */}
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center justify-center w-14 h-14 rounded-full ${cardBg}`}>
            {icon}
          </div>
          <Button isIconOnly variant="light">
            <MoreVerticalCircle01Icon size={20} />
          </Button>
        </div>

        {/* Title */}
        <div className="text-white text-2xl font-semibold mb-2">{title}</div>

        {/* Progress Bar */}
        <Progress
          value={percentage}
          color="primary"
          size="sm"
          className="mt-2 mb-4"
        />

        {/* Amount & Percentage */}
        <div className="flex justify-between items-center">
          <p className="text-white text-4xl font-bold">{amount}</p>
          <p className="text-gray-400 text-lg">/ {percentage}%</p>
        </div>

        {/* Session Info */}
        <div className="text-gray-500 text-lg mt-4">Session 01</div>
      </div>
    </div>
  );
};

const FirstMileDashboard = () => {
  // Data for the cards
  const cardData = [
    {
      icon: <DeliveryTruck01Icon className="text-white" />,
      cardBg: "bg-blue-500", // Background color for progress indicator
      percentage: 100,
      amount: 1298,
      title: "Total Leads",
    },
    {
      icon: <DeliveryTruck01Icon className="text-white" />,
      cardBg: "bg-green-500",
      percentage: 80,
      amount: 854,
      title: "Total Orders",
    },
    {
      icon: <DeliveryTruck01Icon className="text-white" />,
      cardBg: "bg-red-500",
      percentage: 65,
      amount: 532,
      title: "Pending Shipments",
    },
    {
      icon: <DeliveryTruck01Icon className="text-white" />,
      cardBg: "bg-yellow-500",
      percentage: 40,
      amount: 221,
      title: "Delayed Shipments",
    },
    {
      icon: <DeliveryTruck01Icon className="text-white" />,
      cardBg: "bg-purple-500",
      percentage: 90,
      amount: 1112,
      title: "Successful Deliveries",
    }
  ];

  return (
    <DashboardLayout
      title="Collects - List of Shipments"
      icon={<DeliveryTruck01Icon className="text-info" />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
