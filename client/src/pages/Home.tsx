import React, { useState, useEffect } from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext, useTheme } from '../context';
import { Campaign } from '../types';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const { address, contract, getCampaigns } = useStateContext();
  const { isDarkMode } = useTheme();

  const fetchCampaigns = async () => {
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract])

  return (
   <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
   />
  )
}

export default Home