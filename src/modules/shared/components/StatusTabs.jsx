// StatusTabs.jsx
import React from 'react';
import { Chip } from "@nextui-org/chip";
import { Tabs, Tab } from "@nextui-org/tabs";

const StatusTabs = ({ tabs = ['Active', 'Archived'], activeCount, archivedCount, selectedTab, onTabChange }) => {


  return (
    <Tabs
      aria-label="Status Options"
      color="primary"
      variant="underlined"
      classNames={{
        tabList: "gap-6 w-full relative rounded-none p-0 border-b bg-transparent border-b-transparent",
        cursor: "w-full bg-info",
        tab: "max-w-fit px-0 h-12 text-red-500",
        tabContent: "group-data-[selected=true]:text-info text-gray-600"
      }}
      selectedKey={selectedTab}
      onSelectionChange={onTabChange}
    >
      {tabs.map((i, index) => (
        <Tab
          className='px-2'
          key={i}
          title={
            <div className="flex items-center space-x-2">
              <strong className={`text-black dark:text-white ${selectedTab === i ? 'text-opacity-100' : 'text-opacity-50'}`}>
                {i}
              </strong>

              <Chip
                size="sm"
                className={`${selectedTab === i ? 'bg-red-600 text-white' : 'bg-black dark:bg-white bg-opacity-25 dark:bg-opacity-25 dark:text-white text-black text-opacity-50 dark:text-opacity-50'
                  }`}
              >
                {index === 0 ? activeCount : archivedCount}
              </Chip>

            </div>
          }
        />


      ))
      }
    </Tabs>
  );
};

export default StatusTabs;
