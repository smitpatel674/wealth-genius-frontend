import React from 'react';

const PHONE_NUMBER = '+919876543210'; // replace with your phone number in international format
const WHATSAPP_NUMBER = '918976543210'; // number without + for whatsapp URL (use country code)

const FloatingContactButtons: React.FC = () => {
  return (
    <>
      {/* Left: Call button (fixed bottom-left) */}
      <a
        href={`tel:${PHONE_NUMBER}`}
        aria-label="Call us"
        style={leftStyle}
      >
        <div style={buttonStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92V21a1 1 0 0 1-1.11 1A19 19 0 0 1 3 5.11 1 1 0 0 1 4 4h4.09a1 1 0 0 1 1 .75c.12.67.33 1.32.61 1.94a1 1 0 0 1-.24 1.05L8.91 9.91a15 15 0 0 0 6.18 6.18l1.16-1.55a1 1 0 0 1 1.05-.24c.62.28 1.27.49 1.94.61a1 1 0 0 1 .75 1V22z" />
          </svg>
        </div>
      </a>

      {/* Right: WhatsApp button (fixed bottom-right) */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={rightStyle}
      >
        <div style={buttonStyleWhats}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M20.52 3.48A11.63 11.63 0 0 0 12 0C5.37 0 0 5.37 0 12a11.63 11.63 0 0 0 3.48 8.52L0 24l3.6-1A11.63 11.63 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.24-6.2-3.48-8.52zM12 21.5c-1.9 0-3.74-.5-5.33-1.45l-.38-.23-2.14.6.57-2.08-.24-.39A8.2 8.2 0 0 1 3.5 12C3.5 7.3 7.3 3.5 12 3.5S20.5 7.3 20.5 12 16.7 21.5 12 21.5z"/>
            <path d="M17.1 14.2c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15s-.8 1-.9 1.2c-.15.3-.3.35-.6.12-.3-.25-1.25-.46-2.37-1.46-.88-.78-1.47-1.74-1.64-2.05-.15-.3 0-.45.12-.6.12-.12.3-.3.45-.45.15-.15.2-.25.3-.4.1-.15.05-.3-.02-.45-.08-.15-.7-1.7-.96-2.3-.25-.6-.5-.5-.7-.5h-.6c-.2 0-.45.07-.7.35-.25.3-.96.94-.96 2.3s.98 2.68 1.12 2.87c.15.2 1.93 3.04 4.7 4.26 3.27 1.4 3.81 1.01 4.5.93.7-.08 2.24-.9 2.56-1.77.32-.85.32-1.57.22-1.77-.1-.2-.35-.3-.65-.45z"/>
          </svg>
        </div>
      </a>
    </>
  );
};

const commonBtnBase: React.CSSProperties = {
  position: 'fixed',
  bottom: 24,
  width: 52,
  height: 52,
  borderRadius: 26,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
  zIndex: 9999,
  textDecoration: 'none',
};

const leftStyle: React.CSSProperties = {
  ...commonBtnBase,
  left: 24,
};

const rightStyle: React.CSSProperties = {
  ...commonBtnBase,
  right: 24,
};

const buttonStyle: React.CSSProperties = {
  background: '#0b8f00',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
};

const buttonStyleWhats: React.CSSProperties = {
  ...buttonStyle,
  background: '#25D366',
};

export default FloatingContactButtons;
