import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStateContext, useTheme } from '../context';
import {
  Loader,
  PaymentAmountStep,
  PaymentPreviewStep,
  PaymentProcessingStep,
  PaymentSuccessStep,
  PaymentErrorStep
} from '../components';
import { PaymentState, DonationPreset, Campaign } from '../types';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { donate, address, contract } = useStateContext();
  const { isDarkMode } = useTheme();

  const [paymentState, setPaymentState] = useState<PaymentState>({
    step: 'amount',
    amount: '',
    message: '',
    isAnonymous: false,
  });

  // Mock campaign data for demonstration
  const mockCampaign: Campaign = {
    owner: '0x1234567890123456789012345678901234567890',
    title: 'Revolutionary Solar-Powered Water Purifier for Rural Communities',
    description: 'Help us bring clean, safe drinking water to remote villages using innovative solar technology. Our portable water purification system can serve up to 500 people daily and requires zero electricity from the grid. Every donation directly funds manufacturing and distribution to communities in need.',
    target: '50.0',
    deadline: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days from now
    amountCollected: '23.7',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=400&fit=crop',
    pId: 1
  };

  const [campaign] = useState<Campaign>(state || mockCampaign);
  const [isLoading, setIsLoading] = useState(false);

  const donationPresets: DonationPreset[] = [
    { label: '0.01 ETH', amount: '0.01' },
    { label: '0.05 ETH', amount: '0.05', popular: true },
    { label: '0.1 ETH', amount: '0.1' },
    { label: '0.5 ETH', amount: '0.5' },
  ];

  // Removed redirect logic to allow direct access with mock data

  const handleAmountSelect = (amount: string) => {
    setPaymentState(prev => ({
      ...prev,
      amount,
      step: 'preview'
    }));
  };

  const handleCustomAmount = (customAmount: string) => {
    if (customAmount && parseFloat(customAmount) > 0) {
      setPaymentState(prev => ({
        ...prev,
        amount: customAmount,
        step: 'preview'
      }));
    }
  };

  const handleBackToAmount = () => {
    setPaymentState(prev => ({
      ...prev,
      step: 'amount',
      error: undefined
    }));
  };

  const handleConfirmDonation = async () => {
    // Mock wallet address for demo
    const mockAddress = address || '0xabcd1234567890abcd1234567890abcd12345678';

    if (!mockAddress) {
      setPaymentState(prev => ({
        ...prev,
        error: 'Please connect your wallet first',
        step: 'error'
      }));
      return;
    }

    setPaymentState(prev => ({ ...prev, step: 'processing' }));
    setIsLoading(true);

    // Simulate transaction processing for demo
    setTimeout(() => {
      try {
        // Mock transaction hash for demo
        const mockTxHash = '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab';

        setPaymentState(prev => ({
          ...prev,
          step: 'success',
          transactionHash: mockTxHash
        }));
      } catch (error: any) {
        console.error('Donation failed:', error);
        setPaymentState(prev => ({
          ...prev,
          step: 'error',
          error: error.message || 'Transaction failed. Please try again.'
        }));
      } finally {
        setIsLoading(false);
      }
    }, 3000); // 3 second delay to show processing state
  };

  // Component handlers

  // Campaign is always available (real data or mock data)

  return (
    <div className="min-h-screen py-8 px-4 theme-bg-primary">
      {isLoading && <Loader />}


      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="font-epilogue font-semibold text-[28px] theme-text-primary text-center mb-4">
          Make a Donation
        </h1>

        {/* Mock Wallet Status */}
        <div className="theme-card rounded-[10px] p-4 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="theme-text-secondary text-[12px]">Connected Wallet</p>
              <p className="theme-text-primary font-medium">
                {(address || '0xabcd...5678').substring(0, 6)}...{(address || '0xabcd...5678').substring(38)}
              </p>
            </div>
            <div className="text-right">
              <p className="theme-text-secondary text-[12px]">Balance</p>
              <p className="theme-text-primary font-medium">2.547 ETH</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto">
        {paymentState.step === 'amount' && (
          <PaymentAmountStep
            campaign={campaign}
            paymentState={paymentState}
            setPaymentState={setPaymentState}
            donationPresets={donationPresets}
            onAmountSelect={handleAmountSelect}
            onCustomAmount={handleCustomAmount}
          />
        )}

        {paymentState.step === 'preview' && (
          <PaymentPreviewStep
            campaign={campaign}
            paymentState={paymentState}
            onBack={handleBackToAmount}
            onConfirm={handleConfirmDonation}
          />
        )}

        {paymentState.step === 'processing' && <PaymentProcessingStep />}

        {paymentState.step === 'success' && (
          <PaymentSuccessStep
            campaign={campaign}
            paymentState={paymentState}
            onViewCampaign={() => navigate(-1)}
            onBackToHome={() => navigate('/')}
          />
        )}

        {paymentState.step === 'error' && (
          <PaymentErrorStep
            paymentState={paymentState}
            onTryAgain={handleBackToAmount}
            onCancel={() => navigate(-1)}
          />
        )}
      </div>
    </div>
  );
};

export default Payment;
