import React from 'react';
import TabPanel from './TabPanel';

const TabPanels = ({ tabs, activeTabIndex }) => {
  return tabs.map((tab) => (
    <TabPanel key={tab.index} tabIndex={tab.index} activeIndex={activeTabIndex}>
      {tab.component}
    </TabPanel>
  ));
};

export default TabPanels;
