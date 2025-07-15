
import React, { useState } from 'react';

export const TrafficAnnotatorHeader: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const headerStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--card))',
    borderBottom: '1px solid hsl(var(--border))',
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
    backgroundColor: 'hsl(var(--primary))',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'hsl(var(--primary-foreground))',
    fontSize: '20px',
    fontWeight: 'bold'
  };

  const logoTextStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    color: 'hsl(var(--foreground))',
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
    border: '1px solid hsl(var(--border))',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'hsl(var(--muted))',
    color: 'hsl(var(--foreground))'
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'hsl(var(--muted-foreground))',
    fontSize: '16px'
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={leftSectionStyle}>
          <div style={logoStyle}>
            <div style={logoCircleStyle}>T</div>
            <h1 style={logoTextStyle}>Traffic Annotator</h1>
          </div>
        </div>

        <div style={centerSectionStyle}>
          <div style={searchContainerStyle}>
            <span style={searchIconStyle}>🔍</span>
            <input
              type="text"
              placeholder="Search annotations and fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={searchInputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Right section content can be added here if needed */}
        </div>
      </div>
    </header>
  );
};
