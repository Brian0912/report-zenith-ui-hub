
import React from 'react';
import { Finding } from './mockFindingData';

interface FindingsListProps {
  findings: Finding[];
  onFindingClick: (finding: Finding) => void;
}

export const FindingsList: React.FC<FindingsListProps> = ({ findings, onFindingClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting_review': return '#f59e0b';
      case 'retesting': return '#10b981';
      case 'closed': return '#6b7280';
      case 'waiting_assignment': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'waiting_review': return 'Waiting Review';
      case 'retesting': return 'In Testing';
      case 'closed': return 'Closed';
      case 'waiting_assignment': return 'Waiting Assignment';
      default: return status;
    }
  };

  // Group findings by category
  const groupedFindings = findings.reduce((acc, finding) => {
    const category = finding.riskCategory || 'Data Security';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(finding);
    return acc;
  }, {} as Record<string, Finding[]>);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  };

  const categoryHeaderStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const categoryCountStyle: React.CSSProperties = {
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    fontSize: '14px',
    padding: '4px 8px',
    borderRadius: '12px',
    fontWeight: '500'
  };

  const findingCardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e5e7eb',
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const findingHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  };

  const findingIdStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: '4px'
  };

  const findingTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '8px',
    lineHeight: '1.4'
  };

  const findingMetaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '14px',
    color: '#6b7280'
  };

  const statusBadgeStyle = (color: string): React.CSSProperties => ({
    backgroundColor: color,
    color: 'white',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  });

  const methodBadgeStyle: React.CSSProperties = {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    fontFamily: 'monospace'
  };

  return (
    <div style={containerStyle}>
      {Object.entries(groupedFindings).map(([category, categoryFindings]) => (
        <div key={category}>
          <h2 style={categoryHeaderStyle}>
            {category}
            <span style={categoryCountStyle}>{categoryFindings.length}</span>
          </h2>
          
          {categoryFindings.map((finding) => (
            <div
              key={finding.id}
              style={findingCardStyle}
              onClick={() => onFindingClick(finding)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={findingHeaderStyle}>
                <div style={{ flex: 1 }}>
                  <div style={findingIdStyle}>Finding #{finding.findingId}</div>
                  <div style={findingTitleStyle}>{finding.description}</div>
                  <div style={findingMetaStyle}>
                    <span style={methodBadgeStyle}>{finding.httpMethod}</span>
                    <span>{finding.domain}{finding.path}</span>
                    <span>•</span>
                    <span>Reported by {finding.reporter}</span>
                    <span>•</span>
                    <span>{finding.submissionDate}</span>
                  </div>
                </div>
                <div style={statusBadgeStyle(getStatusColor(finding.status))}>
                  {getStatusLabel(finding.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
