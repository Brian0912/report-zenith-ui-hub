
import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';

interface RiskFindingPageHeaderProps {
  onSubmitFinding: () => void;
}

export const RiskFindingPageHeader: React.FC<RiskFindingPageHeaderProps> = ({ onSubmitFinding }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const headerStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    padding: '16px 24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const leftSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const logoCircleStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    backgroundColor: '#3b82f6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold'
  };

  const logoTextStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const centerSectionStyle: React.CSSProperties = {
    flex: 1,
    maxWidth: '400px',
    margin: '0 48px'
  };

  const searchContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%'
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 16px 10px 40px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#f9fafb'
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6b7280',
    fontSize: '16px'
  };

  const rightSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const dashboardButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s ease'
  };

  const submitButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const userMenuStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px'
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={leftSectionStyle}>
          <div style={logoStyle}>
            <div style={logoCircleStyle}>R</div>
            <h1 style={logoTextStyle}>Risk & Finding Management</h1>
          </div>
        </div>

        <div style={centerSectionStyle}>
          <div style={searchContainerStyle}>
            <span style={searchIconStyle}>🔍</span>
            <input
              type="text"
              placeholder="Search findings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={searchInputStyle}
            />
          </div>
        </div>

        <div style={rightSectionStyle}>
          <button style={dashboardButtonStyle}>Dashboard</button>
          <button 
            style={submitButtonStyle}
            onClick={onSubmitFinding}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6';
            }}
          >
            Submit Finding
          </button>
          <div style={userMenuStyle}>👤</div>
        </div>
      </div>
    </header>
  );
};
