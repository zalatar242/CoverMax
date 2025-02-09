import localContracts from '../contracts.json';
import sepoliaContracts from '../sepolia-contracts.json';

export const loadContracts = () => {
  if (process.env.REACT_APP_NETWORK === 'sepolia') {
    return sepoliaContracts;
  }

  return localContracts;
};
