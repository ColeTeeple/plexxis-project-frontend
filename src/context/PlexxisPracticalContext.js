import React, { useState, useContext, createContext } from "react";

const PlexxisPracticalContext = createContext();

export function usePlexxisPracticalContext() {
  return useContext(PlexxisPracticalContext);
}

export const PlexxisPracticalContextProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  return (
    <PlexxisPracticalContext.Provider value={{ employees, setEmployees }}>
      {children}
    </PlexxisPracticalContext.Provider>
  );
};
