import { Container } from '@mui/material';
import React, { useState } from 'react';
import AppDrawer from '../../../core/components/AppDrawer';
import NavTabs from '../components/Navigation/NavTabs';
import Security from '../components/Security';
import TabPanels from '../components/Navigation/TabPanels';
import Account from '../components/Account';

const tabs = [
  { label: 'Account', index: 0, component: <Account /> },
  { label: 'Security', index: 1, component: <Security /> },
];

const Settings = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleChange = (_, value) => {
    setActiveTabIndex(value);
  };

  return (
    <AppDrawer title="Settings">
      <Container sx={{ mb: 2 }} maxWidth="md">
        <NavTabs
          tabs={tabs}
          activeTabIndex={activeTabIndex}
          onHandleChange={handleChange}
        />
      </Container>
      <TabPanels tabs={tabs} activeTabIndex={activeTabIndex} />
    </AppDrawer>
  );
};

export default Settings;
