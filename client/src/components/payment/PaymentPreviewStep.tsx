import React from 'react';
import { CustomButton } from '../index';
import { Campaign, PaymentState } from '../../types';

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
  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-[#1c1c24] rounded-[15px] p-6">
        <h3 className="font-epilogue font-semibold text-[20px] text-white mb-6 text-center">
          Confirm Your Donation
        </h3>

        {/* Transaction Summary */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center py-2">
            <span className="text-[#808191]">Campaign</span>
            <span className="text-white font-medium">{campaign.title}</span>
          </div>
    
          <div className="flex justify-between items-center py-2">
            <span className="text-[#808191]">Donation Amount</span>
            <span className="text-white font-medium text-[18px]">{paymentState.amount} ETH</span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-[#808191]">Network</span>
            <span className="text-white">Ethereum Sepolia</span>
          </div>

          <div className="flex justify-between items-center py-2 border-t border-[#3a3a43] pt-2">
            <span className="text-[#808191]">Estimated Gas</span>
            <span className="text-white">~0.002 ETH</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-[#3a3a43] pb-2">
            <span className="text-[#808191]">Total Cost</span>
            <span className="text-white font-semibold">
              {(parseFloat(paymentState.amount) + 0.002).toFixed(3)} ETH
            </span>
          </div>

          {paymentState.message && (
            <div className="py-2">
              <span className="text-[#808191] block mb-1">Your Message</span>
              <p className="text-white text-[14px] bg-[#2c2f32] p-3 rounded-[8px]">
                {paymentState.message}
              </p>
            </div>
          )}

          {paymentState.isAnonymous && (
            <div className="flex items-center gap-2 py-2">
              <span className="text-[#4acd8d] text-[12px] bg-[#4acd8d]/20 px-2 py-1 rounded">
                Anonymous Donation
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <CustomButton
            btnType="button"
            title="Back"
            styles="flex-1 bg-[#3a3a43] hover:bg-[#4a4a53]"
            handleClick={onBack}
          />
          <CustomButton
            btnType="button"
            title="Confirm Donation"
            styles="flex-1 bg-[#4acd8d]"
            handleClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPreviewStep;
