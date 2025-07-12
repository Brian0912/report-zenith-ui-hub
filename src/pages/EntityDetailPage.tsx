
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { mockEntities, mockRisks, mockGovernanceGroups } from '../components/risk-management/mockRiskData';

export const EntityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const entity = mockEntities.find(e => e.id === id);

  if (!entity) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        color: '#64748b'
      }}>
        <h1>Entity not found</h1>
        <button onClick={() => navigate('/aplus')}>Back to Dashboard</button>
      </div>
    );
  }

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    color: '#1a202c',
    padding: '40px'
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '32px'
  };

  const breadcrumbStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '16px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    border: '1px solid rgba(226, 232, 240, 0.5)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#334155'
  };

  const methodBadgeStyle: React.CSSProperties = {
    background: entity.method === 'GET' ? '#3b82f6' : 
               entity.method === 'POST' ? '#10b981' :
               entity.method === 'PUT' ? '#f59e0b' :
               entity.method === 'DELETE' ? '#ef4444' : '#8b5cf6',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'inline-block',
    marginLeft: '16px'
  };

  const riskItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    marginBottom: '12px',
    background: 'rgba(248, 250, 252, 0.8)',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={breadcrumbStyle}>
          <span 
            onClick={() => navigate('/aplus')}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Aplus Risk Management
          </span>
          {' → '}
          <span>Entity Details</span>
        </div>

        <h1 style={titleStyle}>
          {entity.apiPath}
          <span style={methodBadgeStyle}>{entity.method}</span>
        </h1>
      </div>

      {/* Entity Information */}
      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>📋 Entity Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '14px', color: '#64748b' }}>
              Service (P.S.M)
            </div>
            <div style={{ fontSize: '16px', fontWeight: '500' }}>
              {entity.psm}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#64748b' }}>
              API Path
            </div>
            <div style={{ fontSize: '16px', fontFamily: 'monospace' }}>
              {entity.apiPath}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Status */}
      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>⚠️ Risk Status Overview</h2>
        {mockRisks.map(risk => {
          const status = entity.riskStatus[risk.id];
          const isResolved = status?.isResolved || false;
          
          return (
            <div key={risk.id} style={riskItemStyle}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '500' }}>
                  {risk.name}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#64748b',
                  marginTop: '4px'
                }}>
                  {risk.description}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{
                  background: isResolved ? '#10b981' : '#ef4444',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {isResolved ? 'Resolved' : 'Pending'}
                </span>
                {status?.latestGovernanceId && (
                  <button
                    onClick={() => navigate(`/governance/${status.latestGovernanceId}`)}
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    View Governance
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Related Governance Groups */}
      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>📊 Related Governance Groups</h2>
        {mockGovernanceGroups
          .filter(group => group.entityIds.includes(entity.id))
          .map(group => (
            <div key={group.id} style={riskItemStyle}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '500' }}>
                  {group.name}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#64748b',
                  marginTop: '4px'
                }}>
                  Created: {new Date(group.createdDate).toLocaleDateString()} • 
                  Risk: {mockRisks.find(r => r.id === group.riskId)?.name}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{
                  background: group.status === 'completed' ? '#10b981' : 
                            group.status === 'active' ? '#f59e0b' : '#ef4444',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {group.status}
                </span>
                <button
                  onClick={() => navigate(`/governance/${group.id}`)}
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
