
import React from 'react';
import { Activity } from 'lucide-react';
import { sharedStyles } from '../shared/styles';

export const TrafficHighlighterHeader: React.FC = () => {
  const headerStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '20px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const titleSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const iconStyle: React.CSSProperties = {
    color: '#3b82f6',
    fontSize: '24px'
  };

  const titleStyle: React.CSSProperties = {
    ...sharedStyles.heading,
    fontSize: '24px',
    margin: 0
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  };

  const breadcrumbStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <header style={headerStyle}>
      <div style={contentStyle}>
        <div style={titleSectionStyle}>
          <Activity size={24} style={iconStyle} />
          <div>
            <h1 style={titleStyle}>Traffic Highlighter</h1>
            <p style={subtitleStyle}>Analyze cURL commands for field compliance and data governance</p>
          </div>
        </div>
        
        <div style={breadcrumbStyle}>
          <span>APLUS</span>
          <span>•</span>
          <span style={{ color: '#1a202c', fontWeight: '500' }}>Traffic Highlighter</span>
        </div>
      </div>
    </header>
  );
};
