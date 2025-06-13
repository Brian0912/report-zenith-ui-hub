
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Entity, Risk, mockGovernanceGroups } from './mockRiskData';

interface RiskMatrixProps {
  entities: Entity[];
  risks: Risk[];
  onEntityHistoryClick: (entityId: string, riskId: string) => void;
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({
  entities,
  risks,
  onEntityHistoryClick
}) => {
  const [entityRiskStates, setEntityRiskStates] = useState<Record<string, Record<string, boolean>>>({});

  const toggleRiskFixed = (entityId: string, riskId: string) => {
    setEntityRiskStates(prev => ({
      ...prev,
      [entityId]: {
        ...prev[entityId],
        [riskId]: !prev[entityId]?.[riskId]
      }
    }));
  };

  const isRiskFixed = (entityId: string, riskId: string) => {
    return entityRiskStates[entityId]?.[riskId] || false;
  };

  const getLatestGovernance = (entityId: string, riskId: string) => {
    const governance = mockGovernanceGroups
      .filter(gov => gov.riskId === riskId && gov.entityIds.includes(entityId))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
    return governance;
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #d1d5db' }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #d1d5db', fontWeight: '600' }}>
              P.S.M
            </th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #d1d5db', fontWeight: '600' }}>
              Entity
            </th>
            {risks.map(risk => (
              <th key={risk.id} style={{ 
                padding: '0.75rem', 
                textAlign: 'center', 
                border: '1px solid #d1d5db', 
                fontWeight: '600',
                minWidth: '150px'
              }}>
                {risk.name}
                <div style={{ fontSize: '0.75rem', fontWeight: 'normal', color: '#666' }}>
                  ({risk.severity})
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entities.map(entity => (
            <tr key={entity.id} style={{ borderBottom: '1px solid #d1d5db' }}>
              <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>
                {entity.psm}
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>
                <div style={{ fontWeight: '500' }}>
                  {entity.apiPath} {entity.httpMethod}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#666' }}>
                  Status: <span style={{ 
                    color: entity.status === 'active' ? '#16a34a' : 
                          entity.status === 'maintenance' ? '#ca8a04' : '#dc2626'
                  }}>
                    {entity.status}
                  </span>
                </div>
              </td>
              {risks.map(risk => {
                const latestGovernance = getLatestGovernance(entity.id, risk.id);
                return (
                  <td key={risk.id} style={{ 
                    padding: '0.5rem', 
                    border: '1px solid #d1d5db',
                    textAlign: 'center'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                      {/* Toggle Switch */}
                      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={isRiskFixed(entity.id, risk.id)}
                          onChange={() => toggleRiskFixed(entity.id, risk.id)}
                          style={{ marginRight: '0.5rem' }}
                        />
                        <span style={{ fontSize: '0.75rem' }}>Fixed</span>
                      </label>

                      {/* Latest Governance Link */}
                      {latestGovernance && (
                        <Link
                          to={`/governance/${latestGovernance.id}`}
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem'
                          }}
                        >
                          Latest Gov
                        </Link>
                      )}

                      {/* History Button */}
                      <button
                        onClick={() => onEntityHistoryClick(entity.id, risk.id)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: '#6b7280',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem',
                          cursor: 'pointer'
                        }}
                      >
                        History
                      </button>
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
