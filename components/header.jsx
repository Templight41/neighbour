import React from 'react';

const headerBar = ({ title }) => (
  <div
    style={{
      padding: '32px 0',
      background: '#FAF7F0',
      borderBottom: '2px solid #E8DCC6',
      borderRadius: '0 0 20px 20px',
      boxShadow: '0 4px 16px rgba(139, 115, 85, 0.08)',
      height: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}
  >
    <h1
      style={{
        textAlign: 'center',
        fontFamily: "serif",
        fontSize: '3.0rem',
        fontWeight: 600,
        color: '#3E2723',
        letterSpacing: '2px',
        margin: 0,
        textShadow: '1px 2px 8px rgba(139, 115, 85, 0.15)',
      }}
    >
      {title}
    </h1>
  </div>
);

export default headerBar;