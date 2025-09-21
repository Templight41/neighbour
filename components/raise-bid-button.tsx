'use client';

import React, { useState } from 'react';

interface RaiseBidButtonProps {
  currentBid: string;
  vis: boolean;
  onVisibilityChange: (visible: boolean) => void;
  onBidSubmit?: (amount: string) => void;
  auctionId: string;
}

const RaiseBidButton = ({ currentBid, vis, onVisibilityChange, onBidSubmit, auctionId }: RaiseBidButtonProps) => {
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateBid = (amount: string) => {
    const numAmount = parseFloat(amount);
    const numCurrentBid = parseFloat(currentBid);
    
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      return 'Please enter a valid bid amount';
    }
    
    if (numAmount <= numCurrentBid) {
      return `Bid must be higher than current bid (₹${currentBid})`;
    }
    
    return null; 
  };

  const submitBid = async (amount: string) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`/api/auction/${auctionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentBid: currentBid,
          newBid: amount
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Bid submitted successfully:', result);
      
      if (onBidSubmit) {
        onBidSubmit(amount);
      }
      
      setBidAmount('');
      setError('');
      onVisibilityChange(false);
      
    } catch (err) {
      console.error('Error submitting bid:', err);
      setError('Failed to submit bid. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClick = () => {
    setError('');
    
    if (!vis) {
      onVisibilityChange(true);
    } else {
      const validationError = validateBid(bidAmount);
      if (validationError) {
        setError(validationError);
      } else {
        submitBid(bidAmount);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidAmount(e.target.value);
    setError('');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '2rem 0' 
    }}>
      <button 
        onClick={handleClick}
        disabled={isSubmitting}
        style={{
          backgroundColor: isSubmitting ? '#666' : '#3E2723',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          opacity: isSubmitting ? 0.6 : 1
        }}
      >
        {isSubmitting ? 'Submitting...' : (!vis ? 'Raise Bid' : 'Submit Bid')}
      </button>
      
      {vis && (
        <div style={{ marginTop: '1rem', width: '100%', maxWidth: '300px' }}>
          <input 
            type="number" 
            placeholder={`Enter bid higher than ₹${currentBid}`}
            value={bidAmount}
            onChange={handleInputChange}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              marginBottom: '8px'
            }}
          />
          {error && (
            <div style={{ 
              color: 'red', 
              fontSize: '12px', 
              textAlign: 'center',
              marginTop: '4px'
            }}>
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RaiseBidButton;
