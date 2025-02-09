import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadContracts } from '../utils/contractLoader';

const ContractsContext = createContext();

export const ContractsProvider = ({ children }) => {
  const [contracts, setContracts] = useState(null);

  useEffect(() => {
    setContracts(loadContracts());
  }, []);

  return (
    <ContractsContext.Provider value={contracts}>
      {children}
    </ContractsContext.Provider>
  );
};

export const useContracts = () => {
  const contracts = useContext(ContractsContext);
  if (contracts === undefined) {
    throw new Error('useContracts must be used within a ContractsProvider');
  }
  return contracts;
};
