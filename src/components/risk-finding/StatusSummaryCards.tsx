
import React from 'react';
import { Finding } from './mockFindingData';

interface StatusSummaryCardsProps {
  findings: Finding[];
}

export const StatusSummaryCards: React.FC<StatusSummaryCardsProps> = ({ findings }) => {
  const totalFindings = findings.length;
  const pendingReview = findings.filter(f => f.status === 'waiting_review').length;
  const inTesting = findings.filter(f => f.status === 'retesting').length;
  const closed = findings.filter(f => f.status === 'closed').length;

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    marginBottom: '32px'
  };

  const cardStyle = (accentColor: string): React.CSSProperties => ({
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden'
  });

  const accentBarStyle = (color: string): React.CSSProperties => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    backgroundColor: color
  });

  const iconStyle = (bgColor: string): React.CSSProperties => ({
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    marginBottom: '16px'
  });

  const valueStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
    lineHeight: '1'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
    marginTop: '4px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle('#3b82f6')}>
        <div style={accentBarStyle('#3b82f6')} />
        <div style={iconStyle('#eff6ff')}>📊</div>
        <div style={valueStyle}>{totalFindings}</div>
        <div style={labelStyle}>Total Findings</div>
      </div>

      <div style={cardStyle('#f59e0b')}>
        <div style={accentBarStyle('#f59e0b')} />
        <div style={iconStyle('#fffbeb')}>⏳</div>
        <div style={valueStyle}>{pendingReview}</div>
        <div style={labelStyle}>Pending Review</div>
      </div>

      <div style={cardStyle('#10b981')}>
        <div style={accentBarStyle('#10b981')} />
        <div style={iconStyle('#ecfdf5')}>🧪</div>
        <div style={valueStyle}>{inTesting}</div>
        <div style={labelStyle}>In Testing</div>
      </div>

      <div style={cardStyle('#6b7280')}>
        <div style={accentBarStyle('#6b7280')} />
        <div style={iconStyle('#f3f4f6')}>✅</div>
        <div style={valueStyle}>{closed}</div>
        <div style={labelStyle}>Closed</div>
      </div>
    </div>
  );
};
