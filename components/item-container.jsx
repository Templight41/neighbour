import React from 'react';
import RaiseBidButton from '@/components/raise-bid-button';
import { useState } from 'react';


const ItemContainer = ({name, manufacturer, imageUrl, price, currentBid, timeForEnd, description, auctionId}) => {

  const [Vis, setVis] = useState(false);


  const [imgIndex, setImgIndex] = useState(0);

  const setImage = (index) => {
    setImgIndex(index);
  };

  const handleVisibilityChange = (visible) => {
    setVis(visible);
  };

  const nextImage = () => {
    if (Array.isArray(imageUrl)) {
      setImgIndex((prevIndex) => 
        prevIndex === imageUrl.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const prevImage = () => {
    if (Array.isArray(imageUrl)) {
      setImgIndex((prevIndex) => 
        prevIndex === 0 ? imageUrl.length - 1 : prevIndex - 1
      );
    }
  };
  const handleBidSubmit = (amount) => {
    console.log(`Bid submitted successfully: ${amount} for ${name}`);

  };
  const parsedDate = new Date(timeForEnd);

  return (
    <div className="OuterContainer">


      <div className="Image" style={{ position: 'relative' }}>
        <img 
          src={Array.isArray(imageUrl) ? imageUrl[imgIndex] : imageUrl} 
          alt={name} 
        />

    {Array.isArray(imageUrl) && imageUrl.length > 1 && (
      <>
        <button 
          onClick={prevImage}
          style={{
            position: 'absolute',
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          ‹
        </button>
        
        <button 
          onClick={nextImage}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          ›
        </button>
        
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          {imgIndex + 1} / {imageUrl.length}
        </div>
      </>
    )}
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
            <strong className="BidValue">{parsedDate.toLocaleString()}</strong>
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