
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { Entity, Risk } from './mockRiskData';

interface RiskMatrixProps {
  entities: Entity[];
  risks: Risk[];
  onEntityRiskHistory: (entityId: string, riskId: string) => void;
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({
  entities,
  risks,
  onEntityRiskHistory
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const containerStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'rgba(30, 41, 59, 0.6)'
      : 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    overflow: 'hidden',
    border: `1px solid ${theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(226, 232, 240, 0.5)'}`,
    backdropFilter: 'blur(10px)',
    boxShadow: theme === 'dark' 
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)'
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const headerStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    borderBottom: `2px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`
  };

  const headerCellStyle: React.CSSProperties = {
    padding: '16px 12px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '14px',
    color: theme === 'dark' ? '#f1f5f9' : '#334155',
    whiteSpace: 'nowrap'
  };

  const rowStyle = (index: number): React.CSSProperties => ({
    background: index % 2 === 0 
      ? (theme === 'dark' ? 'rgba(30, 41, 59, 0.3)' : 'rgba(248, 250, 252, 0.8)')
      : 'transparent',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    transition: 'all 0.2s ease'
  });

  const cellStyle: React.CSSProperties = {
    padding: '12px',
    verticalAlign: 'middle',
    borderRight: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`
  };

  const checkboxStyle: React.CSSProperties = {
    width: '18px',
    height: '18px',
    accentColor: '#6366f1'
  };

  const psmStyle: React.CSSProperties = {
    fontWeight: '500',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    fontSize: '14px'
  };

  const entityStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const apiPathStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    fontSize: '13px',
    color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
  };

  const methodBadgeStyle = (method: string): React.CSSProperties => {
    const colors = {
      'GET': '#3b82f6',
      'POST': '#10b981',
      'PUT': '#f59e0b',
      'DELETE': '#ef4444',
      'PATCH': '#8b5cf6'
    };

    return {
      background: colors[method as keyof typeof colors] || '#6b7280',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: '600'
    };
  };

  const riskCellStyle: React.CSSProperties = {
    textAlign: 'center',
    minWidth: '120px'
  };

  const riskCellContentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  };

  const toggleSwitchStyle = (isOn: boolean): React.CSSProperties => ({
    position: 'relative',
    display: 'inline-block',
    width: '44px',
    height: '24px',
    background: isOn ? '#10b981' : (theme === 'dark' ? '#475569' : '#cbd5e1'),
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    outline: 'none'
  });

  const toggleKnobStyle = (isOn: boolean): React.CSSProperties => ({
    position: 'absolute',
    top: '2px',
    left: isOn ? '22px' : '2px',
    width: '20px',
    height: '20px',
    background: 'white',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  });

  const actionButtonStyle: React.CSSProperties = {
    background: 'none',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
    borderRadius: '6px',
    padding: '6px 8px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.2s ease',
    color: theme === 'dark' ? '#94a3b8' : '#64748b'
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
      critical: '#dc2626'
    };
    return colors[severity as keyof typeof colors] || '#6b7280';
  };

  const handleToggleRisk = (entityId: string, riskId: string) => {
    // This would typically update the backend
    console.log(`Toggling risk ${riskId} for entity ${entityId}`);
  };

  const handleGovernanceClick = (entityId: string, riskId: string) => {
    const entity = entities.find(e => e.id === entityId);
    const governanceId = entity?.riskStatus[riskId]?.latestGovernanceId;
    if (governanceId) {
      navigate(`/governance/${governanceId}`);
    }
  };

  return (
    <div style={containerStyle}>
      <table style={tableStyle}>
        <thead style={headerStyle}>
          <tr>
            <th style={{...headerCellStyle, width: '40px'}}>
              <input type="checkbox" style={checkboxStyle} />
            </th>
            <th style={{...headerCellStyle, width: '120px'}}>P.S.M</th>
            <th style={{...headerCellStyle, width: '200px'}}>Entity</th>
            {risks.map((risk) => (
              <th 
                key={risk.id} 
                style={{
                  ...headerCellStyle, 
                  ...riskCellStyle,
                  borderBottom: `3px solid ${getSeverityColor(risk.severity)}`
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div>{risk.name}</div>
                  <div style={{
                    fontSize: '10px',
                    color: getSeverityColor(risk.severity),
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    marginTop: '4px'
                  }}>
                    {risk.severity}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entities.map((entity, index) => (
            <tr 
              key={entity.id} 
              style={rowStyle(index)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(226, 232, 240, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = index % 2 === 0 
                  ? (theme === 'dark' ? 'rgba(30, 41, 59, 0.3)' : 'rgba(248, 250, 252, 0.8)')
                  : 'transparent';
              }}
            >
              <td style={cellStyle}>
                <input type="checkbox" style={checkboxStyle} />
              </td>
              <td style={cellStyle}>
                <div style={psmStyle}>{entity.psm}</div>
              </td>
              <td style={cellStyle}>
                <div style={entityStyle}>
                  <span style={apiPathStyle}>{entity.apiPath}</span>
                  <span style={methodBadgeStyle(entity.method)}>
                    {entity.method}
                  </span>
                </div>
              </td>
              {risks.map((risk) => {
                const riskStatus = entity.riskStatus[risk.id];
                const isResolved = riskStatus?.isResolved || false;
                
                return (
                  <td key={risk.id} style={{...cellStyle, ...riskCellStyle}}>
                    <div style={riskCellContentStyle}>
                      <button
                        style={toggleSwitchStyle(isResolved)}
                        onClick={() => handleToggleRisk(entity.id, risk.id)}
                        title={`${isResolved ? 'Mark as unresolved' : 'Mark as resolved'}`}
                      >
                        <div style={toggleKnobStyle(isResolved)} />
                      </button>
                      
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          style={actionButtonStyle}
                          onClick={() => handleGovernanceClick(entity.id, risk.id)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = theme === 'dark' ? '#374151' : '#f1f5f9';
                            e.currentTarget.style.borderColor = '#6366f1';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none';
                            e.currentTarget.style.borderColor = theme === 'dark' ? '#475569' : '#cbd5e1';
                          }}
                          title="View latest governance"
                        >
                          📋
                        </button>
                        
                        <button
                          style={actionButtonStyle}
                          onClick={() => onEntityRiskHistory(entity.id, risk.id)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = theme === 'dark' ? '#374151' : '#f1f5f9';
                            e.currentTarget.style.borderColor = '#6366f1';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none';
                            e.currentTarget.style.borderColor = theme === 'dark' ? '#475569' : '#cbd5e1';
                          }}
                          title="View history"
                        >
                          📖
                        </button>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
