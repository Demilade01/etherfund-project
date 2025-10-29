import React from 'react';
import { CustomButton } from '../index';
import { calculateBarPercentage, daysLeft } from '../../utils';
import { Campaign, PaymentState, DonationPreset } from '../../types';
import { useTheme } from '../../context';

interface PaymentAmountStepProps {
  campaign: Campaign;
  paymentState: PaymentState;
  setPaymentState: React.Dispatch<React.SetStateAction<PaymentState>>;
  donationPresets: DonationPreset[];
  onAmountSelect: (amount: string) => void;
  onCustomAmount: (amount: string) => void;
}

const PaymentAmountStep: React.FC<PaymentAmountStepProps> = ({
  campaign,
  paymentState,
  setPaymentState,
  donationPresets,
  onAmountSelect,
  onCustomAmount,
}) => {
  const { isDarkMode } = useTheme();
  const remainingDays = daysLeft(campaign.deadline);
  const progressPercentage = calculateBarPercentage(campaign.target, campaign.amountCollected);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Back Button */}
      <div className="mb-6 sm:mb-8">
        <button className="group flex items-center gap-3 theme-text-secondary hover:theme-text-primary transition-all duration-200 hover:translate-x-[-4px]">
          <div className="theme-bg-secondary group-hover:theme-bg-tertiary rounded-full p-2 transition-colors">
            <span className="text-lg">←</span>
          </div>
          <span className="font-medium">Back to Campaign</span>
        </button>
      </div>

      {/* Page Title */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-[#1dc071] to-white bg-clip-text text-transparent mb-2">
          Make a Donation
        </h1>
        <p className="theme-text-secondary text-base sm:text-lg">Support this amazing cause</p>
      </div>

      {/* Wallet Info */}
      <div className="theme-card rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-[#1dc071]/20 rounded-full p-2 sm:p-3">
              <span className="text-[#1dc071] text-lg sm:text-xl">💳</span>
            </div>
            <div>
              <p className="theme-text-secondary text-xs sm:text-sm font-medium">Connected Wallet</p>
              <p className="theme-text-primary font-semibold text-sm sm:text-lg">0xabcd...5678</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="theme-text-secondary text-xs sm:text-sm font-medium">Balance</p>
            <p className="theme-text-primary font-bold text-lg sm:text-xl">2.547 ETH</p>
          </div>
        </div>
      </div>

      {/* Campaign Summary */}
      <div className="theme-card rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="relative flex-shrink-0">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full sm:w-32 h-32 sm:h-32 lg:w-32 lg:h-32 rounded-2xl object-cover shadow-lg"
            />
            <div className="absolute -top-2 -right-2 bg-[#1dc071] text-black rounded-full px-2 sm:px-3 py-1 text-xs font-bold">
              LIVE
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold theme-text-primary mb-3 leading-tight">{campaign.title}</h3>
            <p className="theme-text-secondary mb-4 sm:mb-6 line-clamp-2 text-sm sm:text-lg leading-relaxed">{campaign.description}</p>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className="theme-text-secondary font-medium text-sm sm:text-base">Progress</span>
                <span className="theme-text-primary font-bold text-base sm:text-lg">{campaign.amountCollected} ETH raised</span>
              </div>
              <div className="relative">
                <div className="w-full bg-[#3a3a43] rounded-full h-2 sm:h-3 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-[#1dc071] to-[#00ff88] h-2 sm:h-3 rounded-full shadow-lg transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs sm:text-sm mt-2">
                  <span className="theme-text-secondary font-medium">Target: {campaign.target} ETH</span>
                  <span className="theme-text-secondary font-medium">{remainingDays} days left</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amount Selection */}
      <div className="theme-card rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold theme-text-primary mb-2">Choose Donation Amount</h3>
          <p className="theme-text-secondary text-sm sm:text-base">Select a preset amount or enter your own</p>
        </div>

        {/* Preset Amounts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {donationPresets.map((preset) => (
            <button
              key={preset.amount}
              onClick={() => onAmountSelect(preset.amount)}
              className={`group relative p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                preset.popular
                  ? 'border-[#1dc071] bg-gradient-to-br from-[#1dc071]/20 to-[#00ff88]/20 shadow-lg shadow-[#1dc071]/20'
                  : 'border-[#3a3a43] bg-gradient-to-br from-[#2c2c34] to-[#1c1c24] hover:border-[#1dc071]/50 hover:shadow-lg hover:shadow-[#1dc071]/10'
              }`}
            >
              {preset.popular && (
                <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#1dc071] to-[#00ff88] text-black px-2 sm:px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    ⭐ Popular
                  </div>
                </div>
              )}
              <div className="text-center">
                <div className={`text-lg sm:text-2xl font-bold mb-1 ${
                  preset.popular ? 'text-[#1dc071]' : 'theme-text-primary group-hover:text-[#1dc071]'
                }`}>
                  {preset.label}
                </div>
                <div className="theme-text-secondary text-xs sm:text-sm">
                  {preset.amount === '0.01' ? 'Starter' :
                   preset.amount === '0.05' ? 'Supporter' :
                   preset.amount === '0.1' ? 'Champion' : 'Hero'}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mb-6 sm:mb-8">
          <div className="text-center mb-4 sm:mb-6">
            <h4 className="text-base sm:text-lg font-semibold theme-text-primary mb-2">Or Enter Custom Amount</h4>
            <p className="theme-text-secondary text-xs sm:text-sm">Any amount helps make a difference</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="number"
                step="0.001"
                min="0"
                placeholder="0.00"
                className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-[#2c2c34] to-[#1c1c24] border-2 border-[#3a3a43] rounded-2xl theme-text-primary placeholder:text-[#4b5264] focus:outline-none focus:border-[#1dc071] transition-all duration-300 text-base sm:text-lg font-medium"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.target as HTMLInputElement;
                    onCustomAmount(input.value);
                  }
                }}
              />
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 theme-text-secondary font-medium text-sm sm:text-base">
                ETH
              </div>
            </div>
            <CustomButton
              btnType="button"
              title="Continue"
              styles="bg-gradient-to-r from-[#1dc071] to-[#00ff88] px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-lg shadow-[#1dc071]/20 hover:shadow-[#1dc071]/30 transform hover:scale-105 transition-all duration-300"
              handleClick={() => {
                const input = document.querySelector('input[type="number"]') as HTMLInputElement;
                onCustomAmount(input.value);
              }}
            />
          </div>
        </div>

        {/* Additional Options */}
        <div className="border-t border-[#3a3a43]/50 pt-6 sm:pt-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Anonymous Donation */}
            <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-[#2c2c34]/50 to-[#1c1c24]/50 rounded-xl border border-[#3a3a43]/30">
              <div className="flex items-center gap-3">
                <div className="bg-[#1dc071]/20 rounded-full p-2">
                  <span className="text-[#1dc071] text-base sm:text-lg">🔒</span>
                </div>
                <div>
                  <label className="theme-text-primary font-semibold text-base sm:text-lg">Donate anonymously</label>
                  <p className="theme-text-secondary text-xs sm:text-sm">Your identity will be hidden from public view</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={paymentState.isAnonymous}
                onChange={(e) => setPaymentState(prev => ({
                  ...prev,
                  isAnonymous: e.target.checked
                }))}
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#1dc071] bg-[#2c2c34] border-2 border-[#3a3a43] rounded-lg focus:ring-[#1dc071] focus:ring-2"
              />
            </div>

            {/* Support Message */}
            <div>
              <div className="mb-3 sm:mb-4">
                <h4 className="text-base sm:text-lg font-semibold theme-text-primary mb-2">Message of Support</h4>
                <p className="theme-text-secondary text-xs sm:text-sm">Leave an encouraging message for the campaign creator (optional)</p>
              </div>
              <textarea
                rows={3}
                placeholder="Your message will be visible to the campaign creator and other supporters..."
                value={paymentState.message}
                onChange={(e) => setPaymentState(prev => ({
                  ...prev,
                  message: e.target.value
                }))}
                className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-[#2c2c34] to-[#1c1c24] border-2 border-[#3a3a43] rounded-2xl theme-text-primary placeholder:text-[#4b5264] focus:outline-none focus:border-[#1dc071] transition-all duration-300 resize-none text-sm sm:text-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAmountStep;
