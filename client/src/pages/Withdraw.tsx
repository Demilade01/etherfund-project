import React, { useState, useEffect } from 'react';
import { useStateContext, useTheme } from '../context';
import { CustomButton, Loader } from '../components';
import { Campaign } from '../types';

const Withdraw: React.FC = () => {
  const { address } = useStateContext();
  const { isDarkMode } = useTheme();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  useEffect(() => {
    loadMockCampaigns();
  }, []);

  const loadMockCampaigns = async () => {
    setIsLoading(true);
    try {
      // Mock data for demonstration
      const mockCampaigns: Campaign[] = [
        {
          owner: address || '0x123...',
          title: 'Help Build a School in Kenya',
          description: 'Supporting education infrastructure in rural Kenya to provide quality learning opportunities for children.',
          target: '5.0',
          deadline: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
          amountCollected: '3.2',
          image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop',
          pId: 0
        },
        {
          owner: address || '0x123...',
          title: 'Clean Water for All',
          description: 'Installing water purification systems in communities without access to clean drinking water.',
          target: '8.0',
          deadline: Date.now() + 45 * 24 * 60 * 60 * 1000, // 45 days from now
          amountCollected: '6.7',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
          pId: 1
        },
        {
          owner: address || '0x123...',
          title: 'Wildlife Conservation Fund',
          description: 'Protecting endangered species and their habitats through conservation efforts.',
          target: '12.0',
          deadline: Date.now() + 60 * 24 * 60 * 60 * 1000, // 60 days from now
          amountCollected: '9.1',
          image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
          pId: 2
        }
      ];

      // Filter campaigns that have funds to withdraw
      const campaignsWithFunds = mockCampaigns.filter(
        campaign => parseFloat(campaign.amountCollected) > 0
      );
      setCampaigns(campaignsWithFunds);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!selectedCampaign || !withdrawAmount) return;

    setIsWithdrawing(true);
    try {
      // Mock withdrawal simulation
      console.log('Mock withdrawal:', withdrawAmount, 'ETH from campaign:', selectedCampaign.title);

      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update mock data - subtract withdrawn amount
      const updatedCampaigns = campaigns.map(campaign => {
        if (campaign.pId === selectedCampaign.pId) {
          const newAmount = (parseFloat(campaign.amountCollected) - parseFloat(withdrawAmount)).toFixed(1);
          return {
            ...campaign,
            amountCollected: newAmount
          };
        }
        return campaign;
      });

      // Filter out campaigns with no funds left
      const campaignsWithFunds = updatedCampaigns.filter(
        campaign => parseFloat(campaign.amountCollected) > 0
      );

      setCampaigns(campaignsWithFunds);
      setWithdrawAmount('');
      setSelectedCampaign(null);

      alert(`Withdrawal successful! ${withdrawAmount} ETH has been withdrawn.`);
    } catch (error) {
      console.error('Withdrawal failed:', error);
      alert('Withdrawal failed. Please try again.');
    } finally {
      setIsWithdrawing(false);
    }
  };

  const handleAmountChange = (amount: string) => {
    if (!selectedCampaign) return;

    const maxAmount = parseFloat(selectedCampaign.amountCollected);
    const inputAmount = parseFloat(amount);

    if (inputAmount <= maxAmount && inputAmount >= 0) {
      setWithdrawAmount(amount);
    }
  };

  const handleMaxAmount = () => {
    if (selectedCampaign) {
      setWithdrawAmount(selectedCampaign.amountCollected);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-8 theme-bg-primary">
      <div className="max-w-6xl mx-auto px-4">
        {/* Demo Mode Banner */}
        <div className="bg-gradient-to-r from-[#1dc071] via-[#00ff88] to-[#1dc071] text-black px-8 py-4 rounded-2xl mb-8 flex items-center gap-3 shadow-lg shadow-[#1dc071]/20">
          <div className="bg-black/10 rounded-full p-2">
            <span className="text-xl">⚡</span>
          </div>
          <div>
            <p className="font-bold text-lg">DEMO MODE</p>
            <p className="text-sm font-medium">Using mock data to showcase withdrawal functionality. Campaign balances update in real-time.</p>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-[#1dc071] to-white bg-clip-text text-transparent mb-4">
            Withdraw Funds
          </h1>
          <p className="text-lg theme-text-secondary">
            Withdraw funds from your successful campaigns
          </p>
        </div>

        {campaigns.length === 0 ? (
          <div className="text-center py-12">
            <div className="theme-card rounded-2xl p-8 max-w-md mx-auto">
              <div className="bg-[#1dc071]/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-[#1dc071] text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold theme-text-primary mb-4">No Funds Available</h3>
              <p className="theme-text-secondary mb-6">
                You don't have any campaigns with funds available for withdrawal.
              </p>
              <CustomButton
                btnType="button"
                title="Create Campaign"
                styles="bg-[#1dc071] hover:bg-[#1dc071]/80"
                handleClick={() => window.location.href = '/create-campaign'}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Campaign Selection */}
            <div className="theme-card rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold theme-text-primary mb-6">Select Campaign</h3>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.pId}
                    onClick={() => setSelectedCampaign(campaign)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedCampaign?.pId === campaign.pId
                        ? 'border-[#1dc071] bg-[#1dc071]/10'
                        : 'border-[#3a3a43] hover:border-[#1dc071]/50'
                    }`}
                  >
                    <div className="flex gap-4">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="theme-text-primary font-semibold text-lg mb-1">
                          {campaign.title}
                        </h4>
                        <p className="theme-text-secondary text-sm mb-2 line-clamp-2">
                          {campaign.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-[#1dc071] font-bold text-lg">
                            {campaign.amountCollected} ETH
                          </span>
                          <span className="theme-text-secondary text-sm">
                            Available
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Withdrawal Form */}
            <div className="theme-card rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold theme-text-primary mb-6">Withdrawal Details</h3>

              {selectedCampaign ? (
                <div className="space-y-6">
                  {/* Campaign Info */}
                  <div className="theme-bg-tertiary rounded-xl p-4">
                    <h4 className="theme-text-primary font-semibold mb-2">{selectedCampaign.title}</h4>
                    <div className="flex justify-between items-center">
                      <span className="theme-text-secondary">Available Balance</span>
                      <span className="text-[#1dc071] font-bold text-lg">
                        {selectedCampaign.amountCollected} ETH
                      </span>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div>
                    <label className="block theme-text-primary font-semibold mb-2">
                      Withdrawal Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.001"
                        min="0"
                        max={selectedCampaign.amountCollected}
                        placeholder="0.00"
                        value={withdrawAmount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        className="w-full py-4 px-6 bg-gradient-to-r from-[#2c2c34] to-[#1c1c24] border-2 border-[#3a3a43] rounded-2xl text-white placeholder:text-[#4b5264] focus:outline-none focus:border-[#1dc071] transition-all duration-300 text-lg font-medium"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 theme-text-secondary font-medium">
                        ETH
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <button
                        onClick={handleMaxAmount}
                        className="text-[#1dc071] hover:text-[#1dc071]/80 text-sm font-medium"
                      >
                        Max Amount
                      </button>
                      <span className="theme-text-secondary text-sm">
                        Max: {selectedCampaign.amountCollected} ETH
                      </span>
                    </div>
                  </div>

                  {/* Transaction Summary */}
                  {withdrawAmount && (
                    <div className="theme-bg-tertiary rounded-xl p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="theme-text-secondary">Withdrawal Amount</span>
                        <span className="theme-text-primary font-medium">{withdrawAmount} ETH</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="theme-text-secondary">Estimated Gas</span>
                        <span className="theme-text-primary">~0.002 ETH</span>
                      </div>
                      <div className="border-t border-[#3a3a43] pt-2">
                        <div className="flex justify-between items-center">
                          <span className="theme-text-secondary font-semibold">Total Cost</span>
                          <span className="theme-text-primary font-bold">
                            {(parseFloat(withdrawAmount) + 0.002).toFixed(3)} ETH
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Withdraw Button */}
                  <CustomButton
                    btnType="button"
                    title={isWithdrawing ? "Processing..." : "Withdraw Funds"}
                    styles={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 ${
                      withdrawAmount && parseFloat(withdrawAmount) > 0
                        ? 'bg-gradient-to-r from-[#1dc071] to-[#00ff88] hover:shadow-[#1dc071]/30 transform hover:scale-105'
                        : 'bg-[#3a3a43] cursor-not-allowed'
                    }`}
                    handleClick={withdrawAmount && parseFloat(withdrawAmount) > 0 && !isWithdrawing ? handleWithdraw : undefined}
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-[#1dc071]/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-[#1dc071] text-2xl">📋</span>
                  </div>
                  <h4 className="theme-text-primary font-semibold text-lg mb-2">Select a Campaign</h4>
                  <p className="theme-text-secondary">
                    Choose a campaign from the left to start withdrawing funds.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdraw;
