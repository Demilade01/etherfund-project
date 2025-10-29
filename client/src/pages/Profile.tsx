import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DisplayCampaigns, CustomButton } from '../components';
import { useStateContext } from '../context';
import { Campaign, Donation } from '../types';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { address, getUserCampaigns, getDonations } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [userStats, setUserStats] = useState({
    totalRaised: '0',
    campaignsCreated: 0,
    totalDonations: 0,
    activeCampaigns: 0
  });
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'donations'>('overview');

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      // Mock data for demonstration
      const mockCampaigns: Campaign[] = [
        {
          owner: address || '0x123...',
          title: 'Help Build a School in Kenya',
          description: 'Supporting education infrastructure in rural Kenya to provide quality learning opportunities for children.',
          target: '5.0',
          deadline: Date.now() + 30 * 24 * 60 * 60 * 1000,
          amountCollected: '3.2',
          image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop',
          pId: 0
        },
        {
          owner: address || '0x123...',
          title: 'Clean Water for All',
          description: 'Installing water purification systems in communities without access to clean drinking water.',
          target: '8.0',
          deadline: Date.now() + 45 * 24 * 60 * 60 * 1000,
          amountCollected: '6.7',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
          pId: 1
        },
        {
          owner: address || '0x123...',
          title: 'Wildlife Conservation Fund',
          description: 'Protecting endangered species and their habitats through conservation efforts.',
          target: '12.0',
          deadline: Date.now() + 60 * 24 * 60 * 60 * 1000,
          amountCollected: '9.1',
          image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
          pId: 2
        }
      ];

      const mockDonations: Donation[] = [
        { donator: '0xabc...123', donation: '0.5' },
        { donator: '0xdef...456', donation: '1.2' },
        { donator: '0xghi...789', donation: '0.8' },
        { donator: '0xjkl...012', donation: '2.1' }
      ];

      setCampaigns(mockCampaigns);
      setRecentDonations(mockDonations);

      // Calculate stats
      const totalRaised = mockCampaigns.reduce((sum, campaign) =>
        sum + parseFloat(campaign.amountCollected), 0
      ).toFixed(1);

      const activeCampaigns = mockCampaigns.filter(campaign =>
        campaign.deadline > Date.now()
      ).length;

      setUserStats({
        totalRaised: totalRaised,
        campaignsCreated: mockCampaigns.length,
        totalDonations: mockDonations.length,
        activeCampaigns: activeCampaigns
      });

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
    setIsLoading(false);
  }
  };

  useEffect(() => {
    fetchUserData();
  }, [address]);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const getDaysLeft = (deadline: number) => {
    const days = Math.ceil((deadline - Date.now()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  return (
    <div className="min-h-screen bg-[#13131a] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Demo Mode Banner */}
        <div className="bg-gradient-to-r from-[#1dc071] via-[#00ff88] to-[#1dc071] text-black px-8 py-4 rounded-2xl mb-8 flex items-center gap-3 shadow-lg shadow-[#1dc071]/20">
          <div className="bg-black/10 rounded-full p-2">
            <span className="text-xl">⚡</span>
          </div>
          <div>
            <p className="font-bold text-lg">DEMO MODE</p>
            <p className="text-sm font-medium">Using mock data to showcase profile functionality and user statistics.</p>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-2xl p-8 mb-8 border border-[#3a3a43]/50 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-[#1dc071] to-[#00ff88] rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-black">
                  {address ? address.slice(2, 4).toUpperCase() : 'U'}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#1dc071] text-black rounded-full px-2 py-1 text-xs font-bold">
                ✓
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {address ? formatAddress(address) : 'Anonymous User'}
              </h1>
              <p className="text-[#808191] text-lg mb-4">
                Campaign Creator & Supporter
              </p>
              <div className="flex flex-wrap gap-4">
                <CustomButton
                  btnType="button"
                  title="Create Campaign"
                  styles="bg-gradient-to-r from-[#1dc071] to-[#00ff88] hover:shadow-[#1dc071]/30"
                  handleClick={() => navigate('/create-campaign')}
                />
                <CustomButton
                  btnType="button"
                  title="Withdraw Funds"
                  styles="bg-[#3a3a43] hover:bg-[#4a4a53]"
                  handleClick={() => navigate('/withdraw')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-xl p-6 border border-[#3a3a43]/50 shadow-lg">
            <div className="text-center">
              <h4 className="text-3xl font-bold text-[#1dc071] mb-2">{userStats.totalRaised} ETH</h4>
              <p className="text-[#808191] font-medium">Total Raised</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-xl p-6 border border-[#3a3a43]/50 shadow-lg">
            <div className="text-center">
              <h4 className="text-3xl font-bold text-white mb-2">{userStats.campaignsCreated}</h4>
              <p className="text-[#808191] font-medium">Campaigns Created</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-xl p-6 border border-[#3a3a43]/50 shadow-lg">
            <div className="text-center">
              <h4 className="text-3xl font-bold text-white mb-2">{userStats.totalDonations}</h4>
              <p className="text-[#808191] font-medium">Total Donations</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-xl p-6 border border-[#3a3a43]/50 shadow-lg">
            <div className="text-center">
              <h4 className="text-3xl font-bold text-white mb-2">{userStats.activeCampaigns}</h4>
              <p className="text-[#808191] font-medium">Active Campaigns</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'campaigns', label: 'My Campaigns' },
            { id: 'donations', label: 'Donation History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#1dc071] to-[#00ff88] text-black'
                  : 'bg-[#2c2c34] text-[#808191] hover:text-white hover:bg-[#3a3a43]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-2xl p-6 border border-[#3a3a43]/50 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentDonations.slice(0, 3).map((donation, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-[#2c2c34]/50 rounded-xl">
                    <div className="bg-[#1dc071]/20 rounded-full p-2">
                      <span className="text-[#1dc071] text-lg">💰</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">
                        Received {donation.donation} ETH
                      </p>
                      <p className="text-[#808191] text-sm">
                        From {formatAddress(donation.donator)}
                      </p>
                    </div>
                    <span className="text-[#1dc071] font-bold">
                      {donation.donation} ETH
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-2xl p-6 border border-[#3a3a43]/50 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/create-campaign')}
                  className="w-full p-4 bg-gradient-to-r from-[#1dc071]/20 to-[#00ff88]/20 border border-[#1dc071]/30 rounded-xl hover:bg-gradient-to-r hover:from-[#1dc071]/30 hover:to-[#00ff88]/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚀</span>
                    <div className="text-left">
                      <p className="text-white font-semibold">Create New Campaign</p>
                      <p className="text-[#808191] text-sm">Start fundraising for your cause</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/withdraw')}
                  className="w-full p-4 bg-gradient-to-r from-[#1dc071]/20 to-[#00ff88]/20 border border-[#1dc071]/30 rounded-xl hover:bg-gradient-to-r hover:from-[#1dc071]/30 hover:to-[#00ff88]/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💸</span>
                    <div className="text-left">
                      <p className="text-white font-semibold">Withdraw Funds</p>
                      <p className="text-[#808191] text-sm">Access your campaign earnings</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-2xl p-6 border border-[#3a3a43]/50 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">My Campaigns ({campaigns.length})</h3>
              <CustomButton
                btnType="button"
                title="Create New"
                styles="bg-gradient-to-r from-[#1dc071] to-[#00ff88] hover:shadow-[#1dc071]/30"
                handleClick={() => navigate('/create-campaign')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <div key={campaign.pId} className="bg-[#2c2c34]/50 rounded-xl p-4 hover:bg-[#2c2c34]/70 transition-all duration-300">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-white font-semibold mb-2 line-clamp-2">{campaign.title}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#808191]">Raised</span>
                      <span className="text-[#1dc071] font-semibold">{campaign.amountCollected} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#808191]">Target</span>
                      <span className="text-white">{campaign.target} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#808191]">Days Left</span>
                      <span className="text-white">{getDaysLeft(campaign.deadline)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => navigate(`/campaign-details/${campaign.pId}`)}
                      className="flex-1 py-2 bg-[#1dc071]/20 text-[#1dc071] rounded-lg hover:bg-[#1dc071]/30 transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate('/withdraw')}
                      className="flex-1 py-2 bg-[#3a3a43] text-white rounded-lg hover:bg-[#4a4a53] transition-colors"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-2xl p-6 border border-[#3a3a43]/50 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">Donation History</h3>
            <div className="space-y-4">
              {recentDonations.map((donation, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#2c2c34]/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#1dc071]/20 rounded-full p-3">
                      <span className="text-[#1dc071] text-xl">💰</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Donation Received</p>
                      <p className="text-[#808191] text-sm">From {formatAddress(donation.donator)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#1dc071] font-bold text-lg">{donation.donation} ETH</p>
                    <p className="text-[#808191] text-sm">2 days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;