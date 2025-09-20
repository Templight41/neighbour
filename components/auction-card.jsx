import React from 'react';

const Price = ({ value }) => (
  <div
    className="price"
    style={{
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,fontSize: '1.8rem',color: '#B8860B',marginBottom: '8px',textAlign: 'center',letterSpacing: '1px',}}>{value}</div>
);

const Name = ({ text }) => (
  <div
    className="name"
    style={{      
      fontFamily: "'Playfair Display', serif",fontWeight: 600,fontSize: '1.4rem',
      color: '#3E2723',
      marginBottom: '12px',
      lineHeight: '1.2',
      textAlign: 'center',
      letterSpacing: '0.5px',
    }}
  >
    {text}
  </div>
);



const Manufacturer = ({ text }) => (
  <div
    className="manufacturer"
    style={{      
      fontFamily: "'Playfair Display', serif",fontWeight: 600,fontSize: '1.0rem',
      color: '#8B7355',
      marginBottom: '12px',
      lineHeight: '1.2',
      textAlign: 'center',
      letterSpacing: '0.5px',
    }}
  >
    {text}
  </div>
);


const Description = ({ text }) => (
  <div
    className="description"
    style={{
      fontFamily: "'Crimson Text', serif",
      fontSize: '0.95rem',
      color: '#8B7355',
      marginBottom: '0',
      minHeight: '40px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineHeight: '1.5',
      textAlign: 'center',
      fontStyle: 'italic',
    }}
  >
    {text}
  </div>
);

const AuctionCard = ({ imageUrl, price, name, description,manufacturer }) => (
  <div
    className="auction-card-container"
    style={{
      width: '350px',
      height: '480px',
      background: '#FAF7F0',
      borderRadius: '20px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '0 8px 32px rgba(139, 115, 85, 0.12)',
      border: '1px solid #E8DCC6',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 20px 48px rgba(139, 115, 85, 0.2)';
      e.currentTarget.style.borderColor = '#B8860B';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 115, 85, 0.12)';
      e.currentTarget.style.borderColor = '#E8DCC6';
    }}
  >
    <div
      style={{
        width: '280px',
        height: '280px',
        background: '#F7F3E9',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: '24px',
        boxShadow: '0 4px 16px rgba(139, 115, 85, 0.1)',
        border: '2px solid #E8DCC6',
      }}
    >
      <img
        src={imageUrl}
        alt={name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '14px',
        }}
      />
    </div>

    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <div style={{ textAlign: 'center', width: '100%' }}>
        <Name text={name} />
        <Description text={description} />
      </div>
      
      <div
        style={{
          width: '100%',
          padding: '16px 0',
          borderTop: '1px solid #E8DCC6',
          marginTop: '16px',
        }}
      >
        <Price value={price} />
        <Manufacturer text = {manufacturer} />
      </div>
    </div>
  </div>
);

export default AuctionCard;