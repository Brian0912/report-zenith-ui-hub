
import React from 'react';
import { Link } from 'react-router-dom';
import { mockGovernanceGroups, mockEntities, mockRisks } from './mockRiskData';

interface GovernanceHistoryPanelProps {
  entityRisk: {entityId: string, riskId: string} | null;
  showAllGovernance: boolean;
  onClose: () => void;
}

export const GovernanceHistoryPanel: React.FC<GovernanceHistoryPanelProps> = ({
  entityRisk,
  showAllGovernance,
  onClose
}) => {
  const getFilteredGovernance = () => {
    if (showAllGovernance) {
      return mockGovernanceGroups;
    }
    if (entityRisk) {
      return mockGovernanceGroups.filter(gov => 
        gov.riskId === entityRisk.riskId && 
        gov.entityIds.includes(entityRisk.entityId)
      );
    }
    return [];
  };

  const getEntityInfo = (entityId: string) => {
    return mockEntities.find(e => e.id === entityId);
  };

  const getRiskInfo = (riskId: string) => {
    return mockRisks.find(r => r.id === riskId);
  };

  const filteredGovernance = getFilteredGovernance().sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      backgroundColor: 'white',
      borderLeft: '1px solid #d1d5db',
      zIndex: 1000,
      overflowY: 'auto',
      boxShadow: '-4px 0 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #d1d5db', backgroundColor: '#f9fafb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
            {showAllGovernance ? 'All Governance Groups' : 'Governance History'}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>
        {entityRisk && !showAllGovernance && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
            Entity: {getEntityInfo(entityRisk.entityId)?.apiPath} {getEntityInfo(entityRisk.entityId)?.httpMethod}
            <br />
            Risk: {getRiskInfo(entityRisk.riskId)?.name}
          </div>
        )}
      </div>

      <div style={{ padding: '1rem' }}>
        {filteredGovernance.length === 0 ? (
          <p style={{ color: '#6b7280', textAlign: 'center', marginTop: '2rem' }}>
            No governance groups found
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredGovernance.map(governance => {
              const risk = getRiskInfo(governance.riskId);
              return (
                <Link
                  key={governance.id}
                  to={`/governance/${governance.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                >
                  <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                    {governance.name}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                    Risk: {risk?.name} ({risk?.severity})
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                    Entities: {governance.entityIds.length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>
                    Created: {new Date(governance.createdAt).toLocaleDateString()}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: governance.status === 'active' ? '#16a34a' : 
                          governance.status === 'completed' ? '#3b82f6' : '#6b7280',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}>
                    {governance.status}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
