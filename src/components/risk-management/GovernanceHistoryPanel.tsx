
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { GovernanceGroup, mockEntities, mockRisks } from './mockRiskData';

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
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setSlideIn(true), 10);
    } else {
      setSlideIn(false);
    }
  }, [isOpen]);

  const filteredGroups = showAll 
    ? governanceGroups 
    : governanceGroups.filter(group => {
        if (!entityRisk) return false;
        return group.riskId === entityRisk.riskId && 
               group.entityIds.includes(entityRisk.entityId);
      });

  const entity = entityRisk ? mockEntities.find(e => e.id === entityRisk.entityId) : null;
  const risk = entityRisk ? mockRisks.find(r => r.id === entityRisk.riskId) : null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(4px)'
  };

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '480px',
    maxWidth: '90vw',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.3)',
    transform: slideIn ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1001
  };

  const headerStyle: React.CSSProperties = {
    padding: '24px',
    borderBottom: `1px solid ${theme === 'dark' ? '#475569' : '#e2e8f0'}`,
    background: theme === 'dark' 
      ? 'rgba(15, 23, 42, 0.8)'
      : 'rgba(248, 250, 252, 0.9)',
    backdropFilter: 'blur(8px)',
    position: 'sticky',
    top: 0,
    zIndex: 10
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b'
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    padding: '4px',
    borderRadius: '6px',
    transition: 'all 0.2s ease'
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    padding: '24px',
    overflowY: 'auto'
  };

  const timelineStyle: React.CSSProperties = {
    position: 'relative'
  };

  const timelineLineStyle: React.CSSProperties = {
    position: 'absolute',
    left: '16px',
    top: '0',
    bottom: '0',
    width: '2px',
    background: theme === 'dark' ? '#475569' : '#cbd5e1'
  };

  const governanceCardStyle = (status: string): React.CSSProperties => {
    const statusColors = {
      completed: '#10b981',
      active: '#f59e0b',
      pending: '#ef4444'
    };

    return {
      position: 'relative',
      marginBottom: '20px',
      padding: '20px',
      background: theme === 'dark' 
        ? 'rgba(30, 41, 59, 0.6)'
        : 'rgba(255, 255, 255, 0.9)',
      borderRadius: '12px',
      border: `1px solid ${theme === 'dark' ? '#475569' : '#e2e8f0'}`,
      marginLeft: '40px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      borderLeft: `4px solid ${statusColors[status as keyof typeof statusColors] || '#6b7280'}`
    };
  };

  const governanceTimelineMarkerStyle = (status: string): React.CSSProperties => {
    const statusColors = {
      completed: '#10b981',
      active: '#f59e0b',
      pending: '#ef4444'
    };

    return {
      position: 'absolute',
      left: '8px',
      top: '24px',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      background: statusColors[status as keyof typeof statusColors] || '#6b7280',
      border: `3px solid ${theme === 'dark' ? '#1e293b' : '#ffffff'}`,
      zIndex: 2
    };
  };

  const governanceTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
    marginBottom: '8px'
  };

  const governanceMetaStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  };

  const governanceDateStyle: React.CSSProperties = {
    fontSize: '12px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b'
  };

  const statusBadgeStyle = (status: string): React.CSSProperties => {
    const statusColors = {
      completed: { bg: '#10b981', text: 'white' },
      active: { bg: '#f59e0b', text: 'white' },
      pending: { bg: '#ef4444', text: 'white' }
    };

    const colors = statusColors[status as keyof typeof statusColors] || { bg: '#6b7280', text: 'white' };

    return {
      background: colors.bg,
      color: colors.text,
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase' as const
    };
  };

  const progressBarStyle: React.CSSProperties = {
    width: '100%',
    height: '6px',
    background: theme === 'dark' ? '#475569' : '#e2e8f0',
    borderRadius: '3px',
    overflow: 'hidden'
  };

  const progressFillStyle = (rate: number): React.CSSProperties => ({
    height: '100%',
    width: `${rate}%`,
    background: rate >= 70 ? '#10b981' : rate >= 40 ? '#f59e0b' : '#ef4444',
    transition: 'width 0.3s ease'
  });

  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={panelStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <div style={titleStyle}>
            <span>
              {showAll ? '📋 All Governance Groups' : '📖 Governance History'}
            </span>
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
          {!showAll && entity && risk && (
            <div style={subtitleStyle}>
              {entity.apiPath} {entity.method} • {risk.name}
            </div>
          )}
        </div>

        <div style={contentStyle}>
          <div style={timelineStyle}>
            <div style={timelineLineStyle} />
            
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                style={governanceCardStyle(group.status)}
                onClick={() => navigate(`/governance/${group.id}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.boxShadow = theme === 'dark' 
                    ? '0 8px 24px rgba(0, 0, 0, 0.4)'
                    : '0 8px 24px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={governanceTimelineMarkerStyle(group.status)} />
                
                <div style={governanceTitleStyle}>{group.name}</div>
                
                <div style={governanceMetaStyle}>
                  <span style={governanceDateStyle}>
                    {new Date(group.createdDate).toLocaleDateString()}
                  </span>
                  <span style={statusBadgeStyle(group.status)}>
                    {group.status}
                  </span>
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <div style={{ 
                    fontSize: '12px', 
                    color: theme === 'dark' ? '#94a3b8' : '#64748b',
                    marginBottom: '4px' 
                  }}>
                    Compliance: {group.complianceRate}%
                  </div>
                  <div style={progressBarStyle}>
                    <div style={progressFillStyle(group.complianceRate)} />
                  </div>
                </div>

                <div style={{
                  fontSize: '12px',
                  color: theme === 'dark' ? '#94a3b8' : '#64748b'
                }}>
                  {group.entityIds.length} entities • {mockRisks.find(r => r.id === group.riskId)?.name}
                </div>
              </div>
            ))}

            {filteredGroups.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: theme === 'dark' ? '#94a3b8' : '#64748b'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                <div style={{ fontSize: '16px', fontWeight: '500' }}>
                  No governance history found
                </div>
                <div style={{ fontSize: '14px', marginTop: '8px' }}>
                  {showAll 
                    ? 'No governance groups have been created yet.'
                    : 'This entity-risk combination has no governance history.'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
