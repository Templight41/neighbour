'use client';

import React from 'react';


const RaiseBidButton = ({ currentBid }: { currentBid: string }) => {
  // const handleClick = () => {
  //   console.log("raised");
  //   if (onRaiseBid) {
  //     onRaiseBid();
  //   }
  // };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '2rem 0' 
    }}>
      <button 
        onClick={()=>console.log(`raised ${currentBid}`)}
        style={{
          backgroundColor: '#3E2723',color: 'white',border: 'none',padding: '12px 24px',borderRadius: '8px',fontSize: '16px',fontWeight: '600',cursor: 'pointer',transition: 'all 0.3s ease',boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
        Raise Bid
      </button>
    </div>
  );
};

export default RaiseBidButton;
