import { Tab, Tabs } from '@mui/material';
import React from 'react';

const NavTabs = ({ tabs, onHandleChange, activeTabIndex }) => {
  return (
    <Tabs
      value={activeTabIndex}
      onChange={onHandleChange}
      variant="scrollable"
      scrollButtons="auto"
    >
      {tabs.map((tab) => (
        <Tab key={tab.index} label={tab.label} />
      ))}
    </Tabs>
  );
};

export default NavTabs;
