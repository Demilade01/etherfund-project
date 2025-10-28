import React from 'react';
import { CustomButton } from '../index';
import { PaymentState } from '../../types';

interface PaymentErrorStepProps {
  paymentState: PaymentState;
  onTryAgain: () => void;
  onCancel: () => void;
}

const PaymentErrorStep: React.FC<PaymentErrorStepProps> = ({
  paymentState,
  onTryAgain,
  onCancel,
}) => {
  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="bg-[#1c1c24] rounded-[15px] p-8">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-[24px] font-bold">!</span>
        </div>

        <h3 className="font-epilogue font-semibold text-[20px] text-white mb-4">
          Transaction Failed
        </h3>

        <p className="text-[#808191] mb-6">
          {paymentState.error || 'Something went wrong with your transaction. Please try again.'}
        </p>

        <div className="flex gap-4">
          <CustomButton
            btnType="button"
            title="Try Again"
            styles="flex-1 bg-[#4acd8d]"
            handleClick={onTryAgain}
          />
          <CustomButton
            btnType="button"
            title="Cancel"
            styles="flex-1 bg-[#3a3a43]"
            handleClick={onCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentErrorStep;
