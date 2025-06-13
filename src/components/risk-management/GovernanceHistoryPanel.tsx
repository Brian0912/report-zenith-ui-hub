
import React from 'react';
import { X, Calendar, Users, ExternalLink } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { mockGovernanceGroups, mockEntities, mockRisks } from './mockRiskData';

interface GovernanceHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  context: { entityId?: string; riskId?: string } | null;
}

export const GovernanceHistoryPanel: React.FC<GovernanceHistoryPanelProps> = ({
  isOpen,
  onClose,
  context,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  };

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '500px',
    height: '100vh',
    background: isDark 
      ? 'linear-gradient(135deg, rgba(10, 10, 11, 0.95) 0%, rgba(24, 24, 27, 0.95) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    borderLeft: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    boxShadow: isDark 
      ? '-10px 0 40px rgba(0, 0, 0, 0.5)'
      : '-10px 0 40px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideInFromRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const headerStyle: React.CSSProperties = {
    padding: '24px',
    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '700',
    color: isDark ? '#FFFFFF' : '#000000',
    margin: 0,
  };

  const closeButtonStyle: React.CSSProperties = {
    padding: '8px',
    borderRadius: '8px',
    border: 'none',
    background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    color: isDark ? '#FFFFFF' : '#000000',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
  };

  const contextInfoStyle: React.CSSProperties = {
    padding: '16px',
    borderRadius: '12px',
    background: isDark 
      ? 'rgba(16, 185, 129, 0.1)'
      : 'rgba(5, 150, 105, 0.05)',
    border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(5, 150, 105, 0.2)'}`,
    marginBottom: '24px',
  };

  const governanceItemStyle: React.CSSProperties = {
    padding: '16px',
    borderRadius: '12px',
    background: isDark 
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.03)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const statusBadgeStyle = (status: string): React.CSSProperties => {
    const colors = {
      active: { bg: '#10B981', text: '#FFFFFF' },
      completed: { bg: '#3B82F6', text: '#FFFFFF' },
      draft: { bg: '#F59E0B', text: '#FFFFFF' },
    };
    
    const color = colors[status as keyof typeof colors] || colors.draft;
    
    return {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '6px',
      background: color.bg,
      color: color.text,
      fontSize: '12px',
      fontWeight: '600',
    };
  };

  // Filter governance groups based on context
  const filteredGovernanceGroups = context?.entityId || context?.riskId
    ? mockGovernanceGroups.filter(group => {
        if (context.entityId && context.riskId) {
          return group.entities.includes(context.entityId) && group.riskId === context.riskId;
        }
        if (context.entityId) {
          return group.entities.includes(context.entityId);
        }
        if (context.riskId) {
          return group.riskId === context.riskId;
        }
        return true;
      })
    : mockGovernanceGroups;

  const getContextInfo = () => {
    if (context?.entityId && context?.riskId) {
      const entity = mockEntities.find(e => e.id === context.entityId);
      const risk = mockRisks.find(r => r.id === context.riskId);
      return `${entity?.psm} - ${entity?.apiPath} ${entity?.httpMethod} under ${risk?.name}`;
    }
    if (context?.entityId) {
      const entity = mockEntities.find(e => e.id === context.entityId);
      return `${entity?.psm} - ${entity?.apiPath} ${entity?.httpMethod}`;
    }
    if (context?.riskId) {
      const risk = mockRisks.find(r => r.id === context.riskId);
      return `All entities under ${risk?.name}`;
    }
    return 'All governance groups';
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={panelStyle}>
        <header style={headerStyle}>
          <h2 style={titleStyle}>Governance History</h2>
          <button
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark 
                ? 'rgba(255, 255, 255, 0.2)' 
                : 'rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isDark 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.1)';
            }}
          >
            <X size={20} />
          </button>
        </header>

        <div style={contentStyle}>
          {(context?.entityId || context?.riskId) && (
            <div style={contextInfoStyle}>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                color: isDark ? '#10B981' : '#059669',
                marginBottom: '4px'
              }}>
                Showing history for:
              </div>
              <div style={{ fontSize: '14px', color: isDark ? '#FFFFFF' : '#000000' }}>
                {getContextInfo()}
              </div>
            </div>
          )}

          <div style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            marginBottom: '16px',
            color: isDark ? '#FFFFFF' : '#000000'
          }}>
            {filteredGovernanceGroups.length} Governance Groups Found
          </div>

          {filteredGovernanceGroups.map(group => (
            <div
              key={group.id}
              style={governanceItemStyle}
              onClick={() => {
                console.log(`Navigate to governance ${group.id}`);
                // Navigate to governance page
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDark 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.03)';
                e.currentTarget.style.transform = 'translateY(0px)';
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: '600',
                  color: isDark ? '#FFFFFF' : '#000000'
                }}>
                  {group.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={statusBadgeStyle(group.status)}>{group.status}</span>
                  <ExternalLink size={16} color={isDark ? '#FFFFFF' : '#000000'} />
                </div>
              </div>
              
              <div style={{ 
                fontSize: '14px', 
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                marginBottom: '12px'
              }}>
                {group.description}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} color={isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'} />
                  <span style={{ 
                    fontSize: '12px', 
                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
                  }}>
                    {new Date(group.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={14} color={isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'} />
                  <span style={{ 
                    fontSize: '12px', 
                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
                  }}>
                    {group.entities.length} entities
                  </span>
                </div>
                
                <div style={{ 
                  fontSize: '12px', 
                  color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
                }}>
                  Risk: {mockRisks.find(r => r.id === group.riskId)?.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes slideInFromRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};
