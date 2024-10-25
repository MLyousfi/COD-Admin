// StatusTabs.jsx
import React from 'react';
import { Chip } from "@nextui-org/chip";
import { Tabs, Tab } from "@nextui-org/tabs";

const StatusTabs = ({ activeCount, archivedCount, selectedTab, onTabChange }) => {
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
      <Tab
        key="active"
        title={
          <div className="flex items-center space-x-2">
            <strong>Active</strong>
            <Chip
              color={selectedTab === 'active' ? "danger" : "default"}
              size="sm"
              style={{
                backgroundColor: selectedTab === 'active' ? '#ED0006' : '#C0C0C0',
                color: 'white',
              }}
            >
              {activeCount}
            </Chip>
          </div>
        }
      />

      <Tab
        key="archived"
        title={
          <div className="flex items-center space-x-2">
            <strong>Archived</strong>
            <Chip
              color={selectedTab === 'archived' ? "danger" : "default"}
              size="sm"
              style={{
                backgroundColor: selectedTab === 'archived' ? '#ED0006' : '#C0C0C0',
                color: 'white',
              }}
            >
              {archivedCount}
            </Chip>
          </div>
        }
      />
    </Tabs>
  );
};

export default StatusTabs;
