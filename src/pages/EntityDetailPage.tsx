
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, Shield, AlertTriangle, Clock, User } from 'lucide-react';
import { mockEntities, mockRisks, mockGovernanceGroups } from '../components/risk-management/mockRiskData';

const EntityDetailPage = () => {
  const { entityId } = useParams<{ entityId: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const entity = mockEntities.find(e => e.id === entityId);
  
  if (!entity) {
    return (
      <div style={{ padding: '24px', color: isDark ? '#FFFFFF' : '#000000' }}>
        <h1>Entity not found</h1>
        <button onClick={() => navigate('/aplus-risk-management')}>
          Back to Risk Management
        </button>
      </div>
    );
  }

  const relatedGovernance = mockGovernanceGroups.filter(g => g.entities.includes(entityId!));

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: isDark 
      ? 'linear-gradient(135deg, #0A0A0B 0%, #1A1A1B 100%)'
      : 'linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 100%)',
    color: isDark ? '#FFFFFF' : '#000000',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '24px',
    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    background: isDark 
      ? 'rgba(10, 10, 11, 0.8)'
      : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  };

  const backButtonStyle: React.CSSProperties = {
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

  const methodBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '8px',
    background: '#3B82F6',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '600',
    marginLeft: '12px',
  };

  const statusBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '8px',
    background: '#10B981',
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: '600',
    marginLeft: '12px',
  };

  const cardStyle: React.CSSProperties = {
    background: isDark 
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.03)',
    borderRadius: '16px',
    padding: '24px',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    marginBottom: '24px',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '16px',
    color: isDark ? '#10B981' : '#059669',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <SidebarTrigger />
        <button
          style={backButtonStyle}
          onClick={() => navigate('/aplus-risk-management')}
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
          <ArrowLeft size={20} />
        </button>
        
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              margin: 0,
              background: isDark 
                ? 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)'
                : 'linear-gradient(135deg, #059669 0%, #0891B2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Entity Details
            </h1>
          </div>
          
          <div style={{ 
            fontSize: '16px', 
            color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
          }}>
            {entity.apiPath}
            <span style={methodBadgeStyle}>{entity.httpMethod}</span>
            <span style={statusBadgeStyle}>{entity.status}</span>
          </div>
        </div>
      </header>

      <div style={{ padding: '24px' }}>
        {/* Basic Information */}
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>
            <User size={20} />
            Basic Information
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: '600', 
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                marginBottom: '4px'
              }}>
                P.S.M (Service)
              </div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: isDark ? '#14B8A6' : '#0891B2'
              }}>
                {entity.psm}
              </div>
            </div>
            
            <div>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: '600', 
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                marginBottom: '4px'
              }}>
                API Path
              </div>
              <div style={{ 
                fontSize: '16px', 
                fontFamily: 'monospace',
                color: isDark ? '#FFFFFF' : '#000000'
              }}>
                {entity.apiPath}
              </div>
            </div>
            
            <div>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: '600', 
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                marginBottom: '4px'
              }}>
                HTTP Method
              </div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: '#3B82F6'
              }}>
                {entity.httpMethod}
              </div>
            </div>
            
            <div>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: '600', 
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                marginBottom: '4px'
              }}>
                Status
              </div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: '#10B981'
              }}>
                {entity.status}
              </div>
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>
            <Shield size={20} />
            Risk Assessment
          </h2>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            {mockRisks.map(risk => (
              <div key={risk.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: '12px',
                background: isDark 
                  ? 'rgba(255, 255, 255, 0.03)'
                  : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    {risk.name}
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
                  }}>
                    {risk.description}
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: risk.severity === 'critical' ? '#EF4444' :
                               risk.severity === 'high' ? '#F59E0B' :
                               risk.severity === 'medium' ? '#3B82F6' : '#10B981',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}>
                    {risk.severity}
                  </span>
                  
                  <div style={{ 
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: Math.random() > 0.5 ? '#10B981' : '#EF4444'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Governance History */}
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>
            <Clock size={20} />
            Governance History
          </h2>
          
          {relatedGovernance.length > 0 ? (
            <div style={{ display: 'grid', gap: '12px' }}>
              {relatedGovernance.map(governance => {
                const risk = mockRisks.find(r => r.id === governance.riskId);
                return (
                  <div 
                    key={governance.id}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      background: isDark 
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(0, 0, 0, 0.02)',
                      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onClick={() => navigate(`/governance/${governance.id}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = isDark 
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isDark 
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(0, 0, 0, 0.02)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ 
                        fontSize: '16px', 
                        fontWeight: '600'
                      }}>
                        {governance.name}
                      </div>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: governance.status === 'active' ? '#10B981' :
                                   governance.status === 'completed' ? '#3B82F6' : '#F59E0B',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}>
                        {governance.status}
                      </span>
                    </div>
                    
                    <div style={{ 
                      fontSize: '14px', 
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                      marginBottom: '8px'
                    }}>
                      {governance.description}
                    </div>
                    
                    <div style={{ 
                      fontSize: '12px', 
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                      display: 'flex',
                      gap: '16px'
                    }}>
                      <span>Risk: {risk?.name}</span>
                      <span>Created: {new Date(governance.createdAt).toLocaleDateString()}</span>
                      <span>{governance.entities.length} entities</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '32px',
              color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
            }}>
              <AlertTriangle size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <div style={{ fontSize: '16px', fontWeight: '500' }}>
                No governance history found
              </div>
              <div style={{ fontSize: '14px', marginTop: '4px' }}>
                This entity has not been included in any governance groups yet.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityDetailPage;
