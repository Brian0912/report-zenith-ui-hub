
import React from 'react';
import { useTheme } from '../ThemeProvider';

interface RiskFindingHeaderProps {
  onSubmitFinding: () => void;
}

export const RiskFindingHeader: React.FC<RiskFindingHeaderProps> = ({ onSubmitFinding }) => {
  const { theme } = useTheme();

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 'bold',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)'
      : 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    marginTop: '8px',
    fontWeight: '400'
  };

  const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <div style={headerStyle}>
      <div>
        <h1 style={titleStyle}>Risk & Finding Management</h1>
        <p style={subtitleStyle}>
          Professional dashboard for tracking security findings and risk management
        </p>
      </div>
      
      <button 
        style={buttonStyle}
        onClick={onSubmitFinding}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
        }}
      >
        <span style={{ fontSize: '18px' }}>📝</span>
        Submit Finding
      </button>
    </div>
  );
};
