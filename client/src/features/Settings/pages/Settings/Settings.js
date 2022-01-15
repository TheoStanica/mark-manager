import { Container, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import AppDrawer from '../../../../core/components/AppDrawer/AppDrawer';
import Security from '../../components/Security/Security';
import TabPanel from '../../components/TabPanel/TabPanel';

const tabs = [
  { label: 'Account', index: 0, component: null },
  {
    label: 'Security',
    index: 1,
    component: <Security />,
  },
];

const Settings = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleChange = (_, value) => {
    setActiveTabIndex(value);
  };

  const renderTabs = () => {
    return tabs.map((tab) => <Tab key={tab.index} label={tab.label} />);
  };

  const renderTabPanels = () => {
    return tabs.map((tab) => (
      <TabPanel
        key={tab.index}
        tabIndex={tab.index}
        activeIndex={activeTabIndex}
      >
        {tab.component}
      </TabPanel>
    ));
  };

  return (
    <AppDrawer title="Settings">
      <Container sx={{ mb: 2 }} maxWidth="md">
        <Tabs value={activeTabIndex} onChange={handleChange}>
          {renderTabs()}
        </Tabs>
      </Container>
      {renderTabPanels()}
    </AppDrawer>
  );
};

export default Settings;
