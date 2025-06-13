
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { GovernanceGroup, mockRisks } from './mockRiskData';

interface GovernanceHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  entityRisk?: { entityId: string; riskId: string } | null;
  showAll?: boolean;
  governanceGroups: GovernanceGroup[];
}

export const GovernanceHistoryPanel: React.FC<GovernanceHistoryPanelProps> = ({
  isOpen,
  onClose,
  entityRisk,
  showAll = false,
  governanceGroups
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filteredGovernances = showAll 
    ? governanceGroups 
    : governanceGroups.filter(gov => 
        entityRisk && 
        gov.entityIds.includes(entityRisk.entityId) && 
        gov.riskId === entityRisk.riskId
      );

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'flex-end'
  };

  const panelStyle: React.CSSProperties = {
    width: '500px',
    height: '100vh',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const headerStyle: React.CSSProperties = {
    padding: '24px',
    borderBottom: `1px solid ${theme === 'dark' ? '#475569' : '#e2e8f0'}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme === 'dark' 
      ? 'rgba(30, 41, 59, 0.8)'
      : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: theme === 'dark' ? '#f1f5f9' : '#334155'
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    padding: '4px',
    borderRadius: '4px',
    transition: 'all 0.2s ease'
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    padding: '24px',
    overflowY: 'auto'
  };

  const governanceCardStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'rgba(55, 65, 81, 0.6)'
      : 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
    border: `1px solid ${theme === 'dark' ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 0.5)'}`,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(8px)'
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
    color: theme === 'dark' ? '#f1f5f9' : '#334155'
  };

  const cardMetaStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  };

  const dateStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b'
  };

  const riskBadgeStyle = (riskId: string): React.CSSProperties => {
    const risk = mockRisks.find(r => r.id === riskId);
    const severityColors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
      critical: '#dc2626'
    };

    return {
      background: risk ? severityColors[risk.severity] || '#6b7280' : '#6b7280',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600'
    };
  };

  const statusBadgeStyle: React.CSSProperties = {
    background: '#10b981',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  };

  const getRiskName = (riskId: string) => {
    const risk = mockRisks.find(r => r.id === riskId);
    return risk ? risk.name : 'Unknown Risk';
  };

  const handleGovernanceClick = (governanceId: string) => {
    navigate(`/governance/${governanceId}`);
    onClose();
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={panelStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            {showAll ? 'All Governance Groups' : 'Governance History'}
          </h2>
          <button 
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme === 'dark' ? '#374151' : '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            ×
          </button>
        </div>

        <div style={contentStyle}>
          {filteredGovernances.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: theme === 'dark' ? '#94a3b8' : '#64748b',
              fontSize: '16px',
              marginTop: '40px'
            }}>
              {showAll ? 'No governance groups found' : 'No governance history available'}
            </div>
          ) : (
            filteredGovernances.map((governance) => (
              <div
                key={governance.id}
                style={governanceCardStyle}
                onClick={() => handleGovernanceClick(governance.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = theme === 'dark' 
                    ? '0 8px 24px rgba(0, 0, 0, 0.4)'
                    : '0 8px 24px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={cardTitleStyle}>{governance.name}</div>
                
                <div style={cardMetaStyle}>
                  <span style={dateStyle}>
                    {new Date(governance.createdDate).toLocaleDateString()}
                  </span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={riskBadgeStyle(governance.riskId)}>
                      {getRiskName(governance.riskId)}
                    </span>
                    <span style={statusBadgeStyle}>
                      {governance.complianceRate}% Complete
                    </span>
                  </div>
                </div>

                <div style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#94a3b8' : '#64748b',
                  marginBottom: '8px'
                }}>
                  {governance.entityIds.length} entities affected
                </div>

                {governance.description && (
                  <div style={{
                    fontSize: '13px',
                    color: theme === 'dark' ? '#cbd5e1' : '#475569',
                    lineHeight: '1.4'
                  }}>
                    {governance.description}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
