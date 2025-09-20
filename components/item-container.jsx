import React from 'react';
import RaiseBidButton from '@/components/raise-bid-button';
import { useState } from 'react';


const ItemContainer = ({name, manufacturer, imageUrl, price, currentBid, timeForEnd, description, auctionId}) => {

  const [Vis, setVis] = useState(false);

  const handleVisibilityChange = (visible) => {
    setVis(visible);
  };

  const handleBidSubmit = (amount) => {
    console.log(`Bid submitted successfully: ${amount} for ${name}`);

  };

  return (
    <div className="OuterContainer">
      <div className="Image">
        <img src={imageUrl} alt={name} />
      </div>

      <article className="Details">
        <div className="ItemDetails">
          <h1>{name}</h1>
          <h3>{manufacturer}</h3>
          <h4>Starting Price: {price}</h4>
        </div>

        <div className="Divider" />
        <div className="Description">
          <h4>Description : {description}</h4>
        </div>
        <div className="BidSection">
          <div className="BidItem">
            <p className="BidLabel">Current Bid</p>
            <strong className="BidValue">₹{currentBid}</strong>
          </div>
          <div className="BidItem">
            <p className="BidLabel">Time Remaining</p>
            <strong className="BidValue">{timeForEnd}</strong>
            <p className="TimeRemaining">Until auction ends</p>
          </div>
            <div className = "RaiseBidButton">
              <RaiseBidButton 
                currentBid={currentBid} 
                vis={Vis} 
                onVisibilityChange={handleVisibilityChange}
                onBidSubmit={handleBidSubmit}
                auctionId={auctionId}
              />
            </div>
        </div>
      </article>
    </div>
  );
};

export default ItemContainer;