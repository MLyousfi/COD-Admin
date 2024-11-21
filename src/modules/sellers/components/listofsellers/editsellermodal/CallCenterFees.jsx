// CallCenterFees.jsx

import React, { useState } from 'react';
import { Button } from '@nextui-org/button';

const CallCenterFees = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    outboundCallCenter: false,
    outboundCallFollowUp: false,
    confirmation: false,
    delivered: false,
    upsell: false,
  });

  const toggleButton = (button) => {
    setFormData({ ...formData, [button]: !formData[button] });
  };

  // Utility function to generate button classes
  const buttonClass = (active) =>
    `w-full rounded-full text-[13px] font-bold px-4 py-2 ${
      active
        ? 'bg-info text-white'
        : 'bg-gray-200 text-black dark:bg-[#FFFFFF10] dark:text-white'
    }`;

  return (
    <div className="flex-1 p-4 overflow-x-hidden">
      <div className="max-w-full flex flex-col items-center">
        {/* Button List */}
        <div className="w-full max-w-md grid grid-cols-2 md:grid-cols-3 gap-8 mb-4">
          {/* Outbound Call (Call Center) */}
          <div className="flex flex-col col-span-1 whitespace-nowrap">
            <label className="mb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
              Outbound Call (Call Center)
            </label>
            <Button
              onClick={() => toggleButton('outboundCallCenter')}
              className={buttonClass(formData.outboundCallCenter)}
            >
              Outbound Call
            </Button>
          </div>

          {/* Outbound Call (Follow Up) */}
          <div className="flex flex-col col-span-1 whitespace-nowrap">
            <label className="mb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
              Outbound Call (Follow Up)
            </label>
            <Button
              onClick={() => toggleButton('outboundCallFollowUp')}
              className={buttonClass(formData.outboundCallFollowUp)}
            >
              Outbound Call
            </Button>
          </div>

          {/* Empty Space to Keep Two Buttons Per Row */}
          <div className="col-span-1 hidden md:block"></div>

          {/* Confirmation */}
          <div className="flex flex-col col-span-1">
            <label className="mb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
              Confirmation
            </label>
            <Button
              onClick={() => toggleButton('confirmation')}
              className={buttonClass(formData.confirmation)}
            >
              Confirmation
            </Button>
          </div>

          {/* Delivered */}
          <div className="flex flex-col col-span-1">
            <label className="mb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
              Delivered
            </label>
            <Button
              onClick={() => toggleButton('delivered')}
              className={buttonClass(formData.delivered)}
            >
              Delivered
            </Button>
          </div>

          {/* Empty Space to Keep Two Buttons Per Row */}
          <div className="col-span-1 hidden md:block"></div>

          {/* Upsell */}
          <div className="flex flex-col col-span-1">
            <label className="mb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
              Upsell
            </label>
            <Button
              onClick={() => toggleButton('upsell')}
              className={buttonClass(formData.upsell)}
            >
              Upsell
            </Button>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-center mt-8">
          <Button
            className="rounded-full font-bold px-16 py-2"
            style={{ backgroundColor: '#0258E8', color: 'white' }}
            onClick={() => {
              // Handle Add action here
              console.log('Call Center Fees Added:', formData);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallCenterFees;
