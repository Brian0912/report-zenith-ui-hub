
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
    marginBottom: '2rem'
  };

  const titleContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const iconStyle: React.CSSProperties = {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: 'hsl(var(--primary) / 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'hsl(var(--foreground))',
    margin: 0,
    lineHeight: '1.2'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: 'hsl(var(--muted-foreground))',
    marginTop: '0.5rem',
    fontWeight: '400'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  return (
    <div style={headerStyle}>
      <div style={titleContainerStyle}>
        <div style={iconStyle}>
          🔍
        </div>
        <div>
          <h1 style={titleStyle}>Risk & Finding Management</h1>
          <p style={subtitleStyle}>
            Professional dashboard for tracking security findings and risk management
          </p>
        </div>
      </div>
      
      <button 
        style={buttonStyle}
        onClick={onSubmitFinding}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        <span style={{ fontSize: '1rem' }}>📝</span>
        Submit Finding
      </button>
    </div>
  );
};
