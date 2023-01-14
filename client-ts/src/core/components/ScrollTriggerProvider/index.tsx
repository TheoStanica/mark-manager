import React, { createContext, useState } from 'react';

interface ScrolLTriggerContextProps {
  contextTrigger: boolean;
  setContextTrigger?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ScrollTriggerContext = createContext<ScrolLTriggerContextProps>({
  contextTrigger: false,
});

const ScrollTriggerProvider = ({ children }: { children: JSX.Element }) => {
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
