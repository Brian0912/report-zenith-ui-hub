
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
    gap: '16px',
    marginBottom: '24px'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--card))',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid hsl(var(--border))',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden'
  };

  const accentBarStyle = (color: string): React.CSSProperties => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    backgroundColor: color
  });

  const iconStyle = (color: string): React.CSSProperties => ({
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: `${color}15`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    marginBottom: '12px'
  });

  const valueStyle = (color: string): React.CSSProperties => ({
    fontSize: '24px',
    fontWeight: '700',
    color: color,
    margin: 0,
    lineHeight: '1'
  });

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'hsl(var(--muted-foreground))',
    fontWeight: '500',
    marginTop: '4px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={accentBarStyle('hsl(var(--primary))')} />
        <div style={iconStyle('hsl(var(--primary))')}>📊</div>
        <div style={valueStyle('hsl(var(--primary))')}>{totalFindings}</div>
        <div style={labelStyle}>Total Findings</div>
      </div>

      <div style={cardStyle}>
        <div style={accentBarStyle('hsl(var(--warning))')} />
        <div style={iconStyle('hsl(var(--warning))')}>⏳</div>
        <div style={valueStyle('hsl(var(--warning))')}>{pendingReview}</div>
        <div style={labelStyle}>Pending Review</div>
      </div>

      <div style={cardStyle}>
        <div style={accentBarStyle('hsl(var(--success))')} />
        <div style={iconStyle('hsl(var(--success))')}>🧪</div>
        <div style={valueStyle('hsl(var(--success))')}>{inTesting}</div>
        <div style={labelStyle}>In Testing</div>
      </div>

      <div style={cardStyle}>
        <div style={accentBarStyle('hsl(var(--muted-foreground))')} />
        <div style={iconStyle('hsl(var(--muted-foreground))')}>✅</div>
        <div style={valueStyle('hsl(var(--muted-foreground))')}>{closed}</div>
        <div style={labelStyle}>Closed</div>
      </div>
    </div>
  );
};
