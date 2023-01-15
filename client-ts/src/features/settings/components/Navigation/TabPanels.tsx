import React from 'react';
import { TabProps } from './NavTabs';
import TabPanel from './TabPanel';

interface Props {
  tabs: Array<TabProps>;
  activeTabIndex: number;
}

const TabPanels = ({ tabs, activeTabIndex }: Props) => {
  return (
    <>
      {tabs.map((tab) => (
        <TabPanel
          key={tab.index}
          tabIndex={tab.index}
          activeIndex={activeTabIndex}
        >
          {tab.component}
        </TabPanel>
      ))}
    </>
  );
};

export default TabPanels;
