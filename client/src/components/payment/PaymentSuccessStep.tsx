import React from 'react';
import { CustomButton } from '../index';
import { Campaign, PaymentState } from '../../types';

interface PaymentSuccessStepProps {
  campaign: Campaign;
  paymentState: PaymentState;
  onViewCampaign: () => void;
  onBackToHome: () => void;
}

const PaymentSuccessStep: React.FC<PaymentSuccessStepProps> = ({
  campaign,
  paymentState,
  onViewCampaign,
  onBackToHome,
}) => {
  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="bg-[#1c1c24] rounded-[15px] p-8">
        <div className="w-16 h-16 bg-[#4acd8d] rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
        </div>

        <h3 className="font-epilogue font-semibold text-[24px] text-white mb-4">
          Thank You!
        </h3>

        <p className="text-[#808191] mb-6">
          Your donation of <span className="text-white font-medium">{paymentState.amount} ETH</span> has been successfully sent to support <span className="text-white font-medium">{campaign.title}</span>.
        </p>

        {paymentState.transactionHash && (
          <div className="bg-[#2c2f32] p-4 rounded-[10px] mb-6">
            <p className="text-[#808191] text-[12px] mb-2">Transaction Hash</p>
            <p className="text-white text-[12px] font-mono break-all">
              {paymentState.transactionHash}
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <CustomButton
            btnType="button"
            title="View Campaign"
            styles="flex-1 bg-[#3a3a43]"
            handleClick={onViewCampaign}
          />
          <CustomButton
            btnType="button"
            title="Back to Home"
            styles="flex-1 bg-[#4acd8d]"
            handleClick={onBackToHome}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessStep;
