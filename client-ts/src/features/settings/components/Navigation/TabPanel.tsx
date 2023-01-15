interface Props {
  children: JSX.Element;
  activeIndex: number;
  tabIndex: number;
}

const TabPanel = ({ children, activeIndex, tabIndex }: Props) => {
  if (tabIndex !== activeIndex) {
    return null;
  }

  return children;
  // return tabIndex === activeIndex && children;
};

export default TabPanel;
