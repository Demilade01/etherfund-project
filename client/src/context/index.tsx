import React, { useContext, createContext, ReactNode } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { StateContextType, CampaignForm, Campaign, Donation } from '../types';

const StateContext = createContext<StateContextType | undefined>(undefined);

interface StateContextProviderProps {
  children: ReactNode;
}

export const StateContextProvider: React.FC<StateContextProviderProps> = ({ children }) => {
  const contractAddress = process.env.VITE_CONTRACT_ADDRESS || '0xA2F8e646Cd243805C5007b9A19f7978109F0106A';
  const { contract } = useContract(contractAddress);
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form: CampaignForm): Promise<void> => {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async (): Promise<Campaign[]> => {
    if (!contract) {
      throw new Error('Contract not initialized');
    }

    const campaigns = await contract.call('getCampaigns');

    const parsedCampaigns = campaigns.map((campaign: any, i: number): Campaign => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

    return parsedCampaigns;
  };

  const getUserCampaigns = async (): Promise<Campaign[]> => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  };

  const donate = async (pId: number, amount: string): Promise<any> => {
    if (!contract) {
      throw new Error('Contract not initialized');
    }

    const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount) });

    return data;
  };

  const withdrawFunds = async (pId: number, amount?: string): Promise<any> => {
    if (!contract) {
      throw new Error('Contract not initialized');
    }

    let data;
    if (amount) {
      // Partial withdrawal
      data = await contract.call('withdrawPartialFunds', [pId, ethers.utils.parseEther(amount)]);
    } else {
      // Full withdrawal
      data = await contract.call('withdrawCampaignFunds', [pId]);
    }

    return data;
  };

  const getDonations = async (pId: number): Promise<Donation[]> => {
    if (!contract) {
      throw new Error('Contract not initialized');
    }

    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations: Donation[] = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      });
    }

    return parsedDonations;
  };

  const handleConnect = async (): Promise<void> => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect: handleConnect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        withdrawFunds
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateContextProvider');
  }
  return context;
};

// Export theme context
export { ThemeProvider, useTheme } from './ThemeContext';