import React, { createContext, useContext, useState } from "react";

export const ContextApi = createContext(null);

export const UserProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    user: null,
    token: null,
    isLoading: false,
    companies: [],
  });

  return (
    <ContextApi.Provider value={{ globalState, setGlobalState }}>
      {children}
    </ContextApi.Provider>
  );
};

// Custom hook to use context
const useUserContext = () => {
  const context = useContext(ContextApi);
  if (!context) throw new Error("useUserContext must be used within UserProvider");
  return context;
};

export default useUserContext;

