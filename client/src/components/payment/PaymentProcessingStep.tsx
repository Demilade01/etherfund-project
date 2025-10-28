import React from 'react';
import { Loader } from '../index';

const PaymentProcessingStep: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="bg-[#1c1c24] rounded-[15px] p-8">
        <Loader />
        <h3 className="font-epilogue font-semibold text-[20px] text-white mb-4 mt-6">
          Processing Your Donation
        </h3>
        <p className="text-[#808191] mb-4">
          Please confirm the transaction in your wallet and wait for it to be processed on the blockchain.
        </p>
        <div className="text-[14px] text-[#4acd8d]">
          This may take a few moments...
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessingStep;
