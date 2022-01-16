const TabPanel = ({ children, activeIndex, tabIndex }) => {
  return tabIndex === activeIndex && children;
};

export default TabPanel;
