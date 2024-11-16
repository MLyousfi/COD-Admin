// Configuration.jsx
import React, { useState } from 'react';
import { Settings02Icon, Delete01Icon } from "hugeicons-react"; // Ensure TrashIcon exists in hugeicons-react
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import NewBankModal from '../components/NewBankModal'; // Ensure this component is relevant
import FloatingLabelInput from '../components/FloatingLabelInput'; // Import the reusable input component

const Configuration = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editedBank, setEditedBank] = useState(null);
  
  // State to manage active section
  const [activeSection, setActiveSection] = useState('callCenter'); 
  // States for Call Center Rules inputs
  const [callEvery, setCallEvery] = useState('');
  const [oneCallPerDay, setOneCallPerDay] = useState('');
  const [expiredAfterCalls, setExpiredAfterCalls] = useState('');
  const [expiredAfterDays, setExpiredAfterDays] = useState('');

  // Handler for Clear Cache (dummy function)
  const handleClearCache = () => {
    // Implement your cache clearing logic here
    alert('Cache cleared!');
  };

  return (
    <DashboardLayout title="General - Configuration" icon={<Settings02Icon className="text-info" />}>
      {/* Buttons on Top */}
      <div className="flex space-x-4 mt-8 p-8 justify-center md:justify-start">        <button
          onClick={() => setActiveSection('callCenter')}
          className={`py-2 px-7 rounded-full font-bold text-[15px]  ${
            activeSection === 'callCenter' ? 'bg-info text-white' : 'bg-[#00000015] dark:bg-[#ffffff10] text-black dark:text-white'
          } transition-colors duration-300`}
        >
          Call Center Rules
        </button>
        <button
          onClick={() => setActiveSection('system')}
          className={`py-2 px-7 rounded-full font-bold text-[15px] ${
            activeSection === 'system' ? 'bg-info text-white' : 'bg-[#00000015] dark:bg-[#ffffff10] text-black dark:text-white'
          } transition-colors duration-300`}
        >
          System
        </button>
      </div>

      {/* Sections */}
      <div className="mb-8 px-8">
        {/* Call Center Rules Section */}
        {activeSection === 'callCenter' && (
  <div className="bg-white dark:bg-transparent border dark:border-[#ffffff18] border-[#00000022] p-8 rounded-lg">
    <div className="space-y-6">
      {/* Row 1: Call every & One call per day after */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 sm:space-y-0 space-y-6 md:mb-10 w-full">
        <FloatingLabelInput
          id="callEvery"
          label="Call every ( Example : 3 hours )"
          value={callEvery}
          onChange={(e) => setCallEvery(e.target.value)}
        />
        <FloatingLabelInput
          id="oneCallPerDay"
          label="One call per day after ( Example : 9 calls )"
          value={oneCallPerDay}
          onChange={(e) => setOneCallPerDay(e.target.value)}
        />
      </div>

      {/* Row 2: Expired after calls & Expired after days */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 sm:space-y-0 space-y-6 w-full">
        <FloatingLabelInput
          id="expiredAfterCalls"
          label="Expired after ( Example : 19 calls )"
          value={expiredAfterCalls}
          onChange={(e) => setExpiredAfterCalls(e.target.value)}
        />
        <FloatingLabelInput
          id="expiredAfterDays"
          label="Expired after ( Example : 15 days )"
          value={expiredAfterDays}
          onChange={(e) => setExpiredAfterDays(e.target.value)}
        />
      </div>
    </div>

    {/* Save Button */}
    <div className="mt-6 flex justify-end">
      <button
        onClick={() => handleSave()}
        className="bg-info hover:bg-blue-600 mt-6 text-white font-semibold py-2 px-6 rounded-full focus:outline-none transition-all duration-300"
      >
        Save
      </button>
    </div>
  </div>
)}


{/* System Section */}
{activeSection === 'system' && (
  <div className="bg-white dark:bg-transparent rounded-lg shadow-md">
    <div className="flex flex-col md:flex-row items-center justify-between md:border dark:border-[#ffffff18] border-[#00000022] rounded-lg p-8 space-y-10 md:space-y-0 md:space-x-4">
      {/* Click to clear cache text */}
      <div className="flex items-center">
        <button
          onClick={handleClearCache}
          className="text-black dark:text-white font-bold focus:outline-none"
        >
          Click to clear cache
        </button>
      </div>

      {/* Cache Status */}
      <div className="text-gray-500 font-bold">
        Cache : 165.85 MB
      </div>

      {/* Clear Cache Button */}
      <button
        onClick={handleClearCache}
        className="flex items-center justify-center bg-red-600 text-white rounded-full h-10 px-4 hover:bg-red-700 focus:outline-none transition-colors duration-300 space-x-2"
      >
        {/* Icon */}
        <Delete01Icon size={16} />

        {/* Text */}
        <span className="text-sm font-medium">Clear Cache</span>
      </button>
    </div>
  </div>
)}

      </div>

    

      {/* Modal for Adding/Editing Templates */}
      <NewBankModal modalOpen={openModal} setModalOpen={setOpenModal} editedBank={editedBank} id={1} />
    </DashboardLayout>
  );
};

export default Configuration;
