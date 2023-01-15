import { Tab, Tabs } from '@mui/material';
import React from 'react';

export interface TabProps {
  label: string;
  index: number;
  component: JSX.Element;
}

interface Props {
  tabs: Array<TabProps>;
  activeTabIndex: number;
  onHandleChange: (e: any, index: number) => any;
}

const NavTabs = ({ tabs, onHandleChange, activeTabIndex }: Props) => {
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
