
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockEntities, mockRisks, mockGovernanceGroups } from '../components/risk-management/mockRiskData';

const EntityDetailPage = () => {
  const { entityId } = useParams<{ entityId: string }>();
  const entity = mockEntities.find(e => e.id === entityId);

  if (!entity) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Entity not found</h1>
        <Link to="/aplus-risk-management" style={{ color: '#3b82f6' }}>
          Back to Risk Management
        </Link>
      </div>
    );
  }

  // Get governance groups that include this entity
  const relatedGovernance = mockGovernanceGroups.filter(gov => 
    gov.entityIds.includes(entity.id)
  );

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/aplus-risk-management" style={{ color: '#3b82f6', textDecoration: 'none' }}>
          ← Back to Risk Management
        </Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0 0.5rem 0' }}>
          Entity Details
        </h1>
      </div>

      {/* Entity Information */}
      <div style={{ 
        backgroundColor: '#f9fafb', 
        padding: '1.5rem', 
        borderRadius: '0.5rem', 
        marginBottom: '2rem',
        border: '1px solid #d1d5db'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
          Basic Information
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <strong>P.S.M Service:</strong>
            <div style={{ marginTop: '0.25rem' }}>{entity.psm}</div>
          </div>
          <div>
            <strong>API Endpoint:</strong>
            <div style={{ marginTop: '0.25rem' }}>
              <code style={{ 
                backgroundColor: '#e5e7eb', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '0.25rem',
                fontFamily: 'monospace'
              }}>
                {entity.httpMethod} {entity.apiPath}
              </code>
            </div>
          </div>
          <div>
            <strong>Status:</strong>
            <div style={{ 
              marginTop: '0.25rem',
              color: entity.status === 'active' ? '#16a34a' : 
                    entity.status === 'maintenance' ? '#ca8a04' : '#dc2626',
              textTransform: 'capitalize',
              fontWeight: '500'
            }}>
              {entity.status}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem', 
        marginBottom: '2rem',
        border: '1px solid #d1d5db'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
          Risk Assessment
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {mockRisks.map(risk => (
            <div key={risk.id} style={{ 
              border: '1px solid #e5e7eb', 
              borderRadius: '0.375rem', 
              padding: '1rem' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontWeight: '600' }}>{risk.name}</h3>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  backgroundColor: risk.severity === 'critical' ? '#fef2f2' : 
                                 risk.severity === 'high' ? '#fff7ed' :
                                 risk.severity === 'medium' ? '#fefce8' : '#f0fdf4',
                  color: risk.severity === 'critical' ? '#dc2626' : 
                        risk.severity === 'high' ? '#ea580c' :
                        risk.severity === 'medium' ? '#ca8a04' : '#16a34a'
                }}>
                  {risk.severity}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                {risk.description}
              </p>
              <div style={{ fontSize: '0.875rem' }}>
                <strong>Status:</strong> {entity.fixedRisks[risk.id] ? (
                  <span style={{ color: '#16a34a', marginLeft: '0.5rem' }}>✓ Fixed</span>
                ) : (
                  <span style={{ color: '#dc2626', marginLeft: '0.5rem' }}>⚠ Not Fixed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Governance Groups */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '1px solid #d1d5db'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
          Related Governance Groups
        </h2>
        {relatedGovernance.length === 0 ? (
          <p style={{ color: '#666' }}>No governance groups found for this entity.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {relatedGovernance.map(governance => {
              const risk = mockRisks.find(r => r.id === governance.riskId);
              return (
                <Link
                  key={governance.id}
                  to={`/governance/${governance.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    transition: 'background-color 0.2s',
                    display: 'block'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                        {governance.name}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                        Risk: {risk?.name} ({risk?.severity})
                      </p>
                      <p style={{ fontSize: '0.875rem', color: '#666' }}>
                        Created: {new Date(governance.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      backgroundColor: governance.status === 'active' ? '#dcfce7' : 
                                     governance.status === 'completed' ? '#dbeafe' : '#f3f4f6',
                      color: governance.status === 'active' ? '#16a34a' : 
                            governance.status === 'completed' ? '#3b82f6' : '#6b7280',
                      textTransform: 'capitalize'
                    }}>
                      {governance.status}
                    </span>
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

export default EntityDetailPage;
