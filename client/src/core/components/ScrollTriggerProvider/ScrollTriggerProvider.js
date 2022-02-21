import React, { createContext, useState } from 'react';

export const ScrollTriggerContext = createContext();

const ScrollTriggerProvider = ({ children }) => {
  const [contextTrigger, setContextTrigger] = useState(false);

  return (
    <ScrollTriggerContext.Provider
      value={{ contextTrigger, setContextTrigger }}
    >
      {children}
    </ScrollTriggerContext.Provider>
  );
};

export default ScrollTriggerProvider;
