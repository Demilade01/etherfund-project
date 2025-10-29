import React from 'react';
import { CustomButton } from '../index';
import { Campaign, PaymentState } from '../../types';
import { useTheme } from '../../context';

interface PaymentPreviewStepProps {
  campaign: Campaign;
  paymentState: PaymentState;
  onBack: () => void;
  onConfirm: () => void;
}

const PaymentPreviewStep: React.FC<PaymentPreviewStepProps> = ({
  campaign,
  paymentState,
  onBack,
  onConfirm,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6">
      <div className="theme-card rounded-[15px] p-4 sm:p-6">
        <h3 className="font-epilogue font-semibold text-[18px] sm:text-[20px] theme-text-primary mb-4 sm:mb-6 text-center">
          Confirm Your Donation
        </h3>

        {/* Transaction Summary */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div className="flex justify-between items-center py-2">
            <span className="theme-text-secondary text-sm sm:text-base">Campaign</span>
            <span className="theme-text-primary font-medium text-sm sm:text-base">{campaign.title}</span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="theme-text-secondary text-sm sm:text-base">Donation Amount</span>
            <span className="theme-text-primary font-medium text-base sm:text-[18px]">{paymentState.amount} ETH</span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="theme-text-secondary text-sm sm:text-base">Network</span>
            <span className="theme-text-primary text-sm sm:text-base">Ethereum Sepolia</span>
          </div>

          <div className="flex justify-between items-center py-2 border-t border-[#3a3a43] pt-2">
            <span className="theme-text-secondary text-sm sm:text-base">Estimated Gas</span>
            <span className="theme-text-primary text-sm sm:text-base">~0.002 ETH</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-[#3a3a43] pb-2">
            <span className="theme-text-secondary font-semibold text-sm sm:text-base">Total Cost</span>
            <span className="theme-text-primary font-semibold text-base sm:text-lg">
              {(parseFloat(paymentState.amount) + 0.002).toFixed(3)} ETH
            </span>
          </div>

          {paymentState.message && (
            <div className="py-2">
              <span className="theme-text-secondary block mb-1 text-sm sm:text-base">Your Message</span>
              <p className="theme-text-primary text-xs sm:text-[14px] theme-bg-tertiary p-3 rounded-[8px]">
                {paymentState.message}
              </p>
            </div>
          )}

          {paymentState.isAnonymous && (
            <div className="flex items-center gap-2 py-2">
              <span className="text-[#4acd8d] text-[10px] sm:text-[12px] bg-[#4acd8d]/20 px-2 py-1 rounded">
                Anonymous Donation
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <CustomButton
            btnType="button"
            title="Back"
            styles="flex-1 bg-[#3a3a43] hover:bg-[#4a4a53] py-3 sm:py-4 text-sm sm:text-base"
            handleClick={onBack}
          />
          <CustomButton
            btnType="button"
            title="Confirm Donation"
            styles="flex-1 bg-[#4acd8d] py-3 sm:py-4 text-sm sm:text-base"
            handleClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPreviewStep;
