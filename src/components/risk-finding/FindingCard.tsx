
import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Finding } from './mockFindingData';

interface FindingCardProps {
  finding: Finding;
  onClick: () => void;
  isLast: boolean;
}

export const FindingCard: React.FC<FindingCardProps> = ({ finding, onClick, isLast }) => {
  const { theme } = useTheme();

  const getStatusDisplay = (status: string) => {
    const statusMap = {
      waiting_assignment: { label: 'Waiting for Assignment', color: '#6b7280' },
      waiting_review: { label: 'Waiting for Review', color: '#d97706' },
      waiting_retest: { label: 'Waiting for Retest', color: '#0ea5e9' },
      retesting: { label: 'Retesting', color: '#8b5cf6' },
      closed: { label: 'Closed', color: '#059669' },
      invalid_waiting: { label: 'Invalid - Waiting', color: '#dc2626' },
      no_action_closed: { label: 'No Action - Closed', color: '#6b7280' }
    };
    return statusMap[status as keyof typeof statusMap] || { label: status, color: '#6b7280' };
  };

  const getMethodColor = (method: string) => {
    const colors = {
      GET: '#10b981',
      POST: '#3b82f6',
      PUT: '#f59e0b',
      DELETE: '#ef4444',
      PATCH: '#8b5cf6'
    };
    return colors[method as keyof typeof colors] || '#6b7280';
  };

  const cardStyle: React.CSSProperties = {
    padding: '20px 24px',
    borderBottom: isLast ? 'none' : `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: 'transparent'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
    margin: 0,
    lineHeight: '1.4'
  };

  const metaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginTop: '8px',
    flexWrap: 'wrap'
  };

  const statusStyle: React.CSSProperties = {
    background: getStatusDisplay(finding.status).color,
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    whiteSpace: 'nowrap'
  };

  const methodBadgeStyle: React.CSSProperties = {
    background: `${getMethodColor(finding.httpMethod)}20`,
    color: getMethodColor(finding.httpMethod),
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '700',
    border: `1px solid ${getMethodColor(finding.httpMethod)}40`
  };

  const infoStyle: React.CSSProperties = {
    fontSize: '13px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b'
  };

  const domainStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme === 'dark' ? '#60a5fa' : '#3b82f6',
    fontFamily: 'monospace',
    background: theme === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)',
    padding: '2px 8px',
    borderRadius: '4px'
  };

  return (
    <div 
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = theme === 'dark' 
          ? 'rgba(30, 41, 59, 0.4)' 
          : 'rgba(241, 245, 249, 0.8)';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      <div style={headerStyle}>
        <div style={{ flex: 1 }}>
          <h4 style={titleStyle}>{finding.description}</h4>
          <div style={metaStyle}>
            <span style={methodBadgeStyle}>{finding.httpMethod}</span>
            <span style={domainStyle}>{finding.domain}{finding.path}</span>
            <span style={infoStyle}>by {finding.reporter}</span>
            <span style={infoStyle}>{finding.submissionDate}</span>
            {finding.currentPoc && (
              <span style={infoStyle}>POC: {finding.currentPoc}</span>
            )}
          </div>
        </div>
        <div style={statusStyle}>
          {getStatusDisplay(finding.status).label}
        </div>
      </div>
    </div>
  );
};
