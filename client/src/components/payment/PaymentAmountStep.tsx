import React from 'react';
import { CustomButton } from '../index';
import { calculateBarPercentage, daysLeft } from '../../utils';
import { Campaign, PaymentState, DonationPreset } from '../../types';

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
  const remainingDays = daysLeft(campaign.deadline);
  const progressPercentage = calculateBarPercentage(campaign.target, campaign.amountCollected);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Campaign Summary */}
      <div className="bg-[#1c1c24] rounded-[15px] p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full md:w-48 h-32 object-cover rounded-[10px]"
          />
          <div className="flex-1">
            <h2 className="font-epilogue font-semibold text-[18px] text-white mb-2">
              {campaign.title}
            </h2>
            <p className="font-epilogue text-[14px] text-[#808191] mb-4">
              {campaign.description?.substring(0, 120)}...
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-[#3a3a43] rounded-full h-[6px] mb-2">
              <div
                className="bg-[#4acd8d] h-[6px] rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex justify-between text-[12px] text-[#808191]">
              <span>{campaign.amountCollected} ETH raised</span>
              <span>{remainingDays} days left</span>
            </div>
          </div>
        </div>
      </div>

      {/* Amount Selection */}
      <div className="bg-[#1c1c24] rounded-[15px] p-6">
        <h3 className="font-epilogue font-semibold text-[20px] text-white mb-6 text-center">
          Choose Donation Amount
        </h3>

        {/* Preset Amounts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {donationPresets.map((preset) => (
            <button
              key={preset.amount}
              onClick={() => onAmountSelect(preset.amount)}
              className={`relative p-4 rounded-[10px] border-2 transition-all duration-200 ${
                preset.popular
                  ? 'border-[#4acd8d] bg-[#4acd8d]/10'
                  : 'border-[#3a3a43] bg-[#2c2f32] hover:border-[#4acd8d]/50'
              }`}
            >
              {preset.popular && (
                <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#4acd8d] text-[10px] px-2 py-1 rounded-full text-white font-medium">
                  Popular
                </span>
              )}
              <div className="text-white font-epilogue font-medium text-[16px]">
                {preset.label}
              </div>
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mb-6">
          <label className="block text-white font-epilogue font-medium mb-2">
            Custom Amount (ETH)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              step="0.001"
              min="0"
              placeholder="Enter amount..."
              className="flex-1 py-3 px-4 bg-[#2c2f32] border border-[#3a3a43] rounded-[10px] text-white placeholder:text-[#4b5264] focus:outline-none focus:border-[#4acd8d] transition-colors"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  onCustomAmount(input.value);
                }
              }}
            />
            <CustomButton
              btnType="button"
              title="Continue"
              styles="bg-[#4acd8d] px-8"
              handleClick={() => {
                const input = document.querySelector('input[type="number"]') as HTMLInputElement;
                onCustomAmount(input.value);
              }}
            />
          </div>
        </div>

        {/* Additional Options */}
        <div className="border-t border-[#3a3a43] pt-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-white font-epilogue font-medium">
              Donate anonymously
            </label>
            <input
              type="checkbox"
              checked={paymentState.isAnonymous}
              onChange={(e) => setPaymentState(prev => ({
                ...prev,
                isAnonymous: e.target.checked
              }))}
              className="w-4 h-4 text-[#4acd8d] bg-[#2c2f32] border-[#3a3a43] rounded focus:ring-[#4acd8d]"
            />
          </div>

          <div>
            <label className="block text-white font-epilogue font-medium mb-2">
              Message of support (optional)
            </label>
            <textarea
              rows={3}
              placeholder="Leave a message for the campaign creator..."
              value={paymentState.message}
              onChange={(e) => setPaymentState(prev => ({
                ...prev,
                message: e.target.value
              }))}
              className="w-full py-3 px-4 bg-[#2c2f32] border border-[#3a3a43] rounded-[10px] text-white placeholder:text-[#4b5264] focus:outline-none focus:border-[#4acd8d] transition-colors resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAmountStep;
