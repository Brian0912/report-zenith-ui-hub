
import React from 'react';
import { ExternalLink, History } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { Entity, Risk, mockEntityRiskStatuses } from './mockRiskData';
import { Switch } from '@/components/ui/switch';

interface RiskMatrixProps {
  entities: Entity[];
  risks: Risk[];
  onGovernanceHistoryClick: (entityId: string, riskId: string) => void;
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({
  entities,
  risks,
  onGovernanceHistoryClick,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerStyle: React.CSSProperties = {
    background: isDark 
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.03)',
    borderRadius: '16px',
    overflow: 'hidden',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const headerStyle: React.CSSProperties = {
    background: isDark 
      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.15) 100%)'
      : 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%)',
    color: isDark ? '#10B981' : '#059669',
    fontWeight: '600',
    fontSize: '14px',
    padding: '16px 12px',
    textAlign: 'left' as const,
    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
  };

  const cellStyle: React.CSSProperties = {
    padding: '12px',
    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
    fontSize: '14px',
    verticalAlign: 'middle',
  };

  const entityCellStyle: React.CSSProperties = {
    ...cellStyle,
    fontFamily: 'monospace',
    background: isDark 
      ? 'rgba(255, 255, 255, 0.02)'
      : 'rgba(0, 0, 0, 0.01)',
  };

  const methodBadgeStyle = (method: string): React.CSSProperties => {
    const colors = {
      GET: { bg: '#10B981', text: '#FFFFFF' },
      POST: { bg: '#3B82F6', text: '#FFFFFF' },
      PUT: { bg: '#F59E0B', text: '#FFFFFF' },
      DELETE: { bg: '#EF4444', text: '#FFFFFF' },
      PATCH: { bg: '#8B5CF6', text: '#FFFFFF' },
    };
    
    const color = colors[method as keyof typeof colors] || colors.GET;
    
    return {
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '6px',
      background: color.bg,
      color: color.text,
      fontSize: '12px',
      fontWeight: '600',
      marginLeft: '8px',
    };
  };

  const riskCellStyle: React.CSSProperties = {
    ...cellStyle,
    textAlign: 'center' as const,
    minWidth: '120px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '6px 8px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    marginLeft: '4px',
  };

  const governanceButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
    color: '#3B82F6',
  };

  const historyButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
    color: '#8B5CF6',
  };

  const getEntityRiskStatus = (entityId: string, riskId: string) => {
    return mockEntityRiskStatuses.find(
      status => status.entityId === entityId && status.riskId === riskId
    )?.isAddressed || false;
  };

  return (
    <div style={containerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>P.S.M</th>
            <th style={headerStyle}>Entity</th>
            {risks.map(risk => (
              <th key={risk.id} style={headerStyle}>
                {risk.name}
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: '400',
                  color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                  marginTop: '4px'
                }}>
                  {risk.severity}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entities.map(entity => (
            <tr key={entity.id} style={{
              background: isDark ? 'transparent' : 'transparent',
              transition: 'background 0.2s ease',
            }}>
              <td style={cellStyle}>
                <div style={{ fontWeight: '600', color: isDark ? '#14B8A6' : '#0891B2' }}>
                  {entity.psm}
                </div>
              </td>
              <td style={entityCellStyle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>{entity.apiPath}</span>
                  <span style={methodBadgeStyle(entity.httpMethod)}>
                    {entity.httpMethod}
                  </span>
                </div>
              </td>
              {risks.map(risk => (
                <td key={risk.id} style={riskCellStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Switch
                      checked={getEntityRiskStatus(entity.id, risk.id)}
                      onCheckedChange={(checked) => {
                        console.log(`Entity ${entity.id} - Risk ${risk.id}: ${checked}`);
                      }}
                    />
                    <button
                      style={governanceButtonStyle}
                      onClick={() => {
                        // Navigate to latest governance page
                        console.log(`Navigate to governance for entity ${entity.id} and risk ${risk.id}`);
                      }}
                      title="Go to latest governance"
                    >
                      <ExternalLink size={14} />
                    </button>
                    <button
                      style={historyButtonStyle}
                      onClick={() => onGovernanceHistoryClick(entity.id, risk.id)}
                      title="View governance history"
                    >
                      <History size={14} />
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
