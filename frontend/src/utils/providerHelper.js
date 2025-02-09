import { ethers } from 'ethers';

export const getProvider = async () => {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask to use this feature");
  }

  // Local network: use MetaMask provider
  if (process.env.REACT_APP_NETWORK === 'local') {
    return new ethers.BrowserProvider(window.ethereum);
  }

  // Sepolia: use Alchemy RPC URL for read operations, but MetaMask for transactions
  if (process.env.REACT_APP_NETWORK === 'sepolia') {
    const alchemyProvider = new ethers.JsonRpcProvider(process.env.REACT_APP_SEPOLIA_URL);
    const metamaskProvider = new ethers.BrowserProvider(window.ethereum);

    // Return a proxy provider that uses Alchemy for reads and MetaMask for writes
    return {
      ...metamaskProvider,
      async getSigner() {
        return metamaskProvider.getSigner();
      },
      // Override provider methods to use Alchemy for reads
      async getNetwork() {
        return alchemyProvider.getNetwork();
      },
      async getBlock(...args) {
        return alchemyProvider.getBlock(...args);
      },
      async getTransaction(...args) {
        return alchemyProvider.getTransaction(...args);
      },
      async call(...args) {
        return alchemyProvider.call(...args);
      }
    };
  }

  // Default to MetaMask provider
  return new ethers.BrowserProvider(window.ethereum);
};
