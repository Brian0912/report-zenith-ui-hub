
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, CheckSquare, Square } from 'lucide-react';
import { mockGovernanceGroups, mockEntities, mockRisks, Entity } from '../components/risk-management/mockRiskData';
import { Switch } from '@/components/ui/switch';

const GovernancePage = () => {
  const { governanceId } = useParams<{ governanceId: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPSMs, setSelectedPSMs] = useState<string[]>([]);

  const governance = mockGovernanceGroups.find(g => g.id === governanceId);
  const risk = governance ? mockRisks.find(r => r.id === governance.riskId) : null;
  const entities = governance ? mockEntities.filter(e => governance.entities.includes(e.id)) : [];

  if (!governance || !risk) {
    return (
      <div style={{ padding: '24px', color: isDark ? '#FFFFFF' : '#000000' }}>
        <h1>Governance group not found</h1>
        <button onClick={() => navigate('/aplus-risk-management')}>
          Back to Risk Management
        </button>
      </div>
    );
  }

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

  const batchButtonStyle: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: '12px',
    background: isDark 
      ? 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)'
      : 'linear-gradient(135deg, #059669 0%, #0891B2 100%)',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginLeft: 'auto',
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
      padding: '4px 12px',
      borderRadius: '8px',
      background: color.bg,
      color: color.text,
      fontSize: '12px',
      fontWeight: '600',
      marginLeft: '12px',
    };
  };

  const filteredEntities = entities.filter(entity => {
    const matchesSearch = !searchQuery || 
      entity.psm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.apiPath.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.httpMethod.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPSM = selectedPSMs.length === 0 || selectedPSMs.includes(entity.psm);
    
    return matchesSearch && matchesPSM;
  });

  const toggleEntitySelection = (entityId: string) => {
    if (selectedEntities.includes(entityId)) {
      setSelectedEntities(selectedEntities.filter(id => id !== entityId));
    } else {
      setSelectedEntities([...selectedEntities, entityId]);
    }
  };

  const toggleAllEntities = () => {
    if (selectedEntities.length === filteredEntities.length) {
      setSelectedEntities([]);
    } else {
      setSelectedEntities(filteredEntities.map(e => e.id));
    }
  };

  const handleBatchToggle = () => {
    console.log('Batch toggle fixes for entities:', selectedEntities);
    // Implement batch toggle logic here
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
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
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
              {governance.name}
            </h1>
            <span style={statusBadgeStyle(governance.status)}>{governance.status}</span>
          </div>
          
          <div style={{ 
            fontSize: '14px', 
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
            marginBottom: '8px'
          }}>
            {governance.description}
          </div>
          
          <div style={{ 
            fontSize: '13px', 
            color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
          }}>
            Risk Category: {risk.name} | {entities.length} entities | Created: {new Date(governance.createdAt).toLocaleDateString()}
          </div>
        </div>

        {selectedEntities.length > 0 && (
          <button
            style={batchButtonStyle}
            onClick={handleBatchToggle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = isDark 
                ? '0 6px 25px rgba(16, 185, 129, 0.4)'
                : '0 6px 25px rgba(5, 150, 105, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Batch Toggle ({selectedEntities.length})
          </button>
        )}
      </header>

      <div style={{ padding: '24px' }}>
        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
          padding: '20px',
          borderRadius: '12px',
          background: isDark 
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.03)',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        }}>
          <input
            type="text"
            placeholder="Search entities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '8px',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
              background: isDark 
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(255, 255, 255, 0.8)',
              color: isDark ? '#FFFFFF' : '#000000',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        {/* Entity Matrix */}
        <div style={{
          background: isDark 
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.03)',
          borderRadius: '16px',
          overflow: 'hidden',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{
                  padding: '16px 12px',
                  textAlign: 'left',
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.15) 100%)'
                    : 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%)',
                  color: isDark ? '#10B981' : '#059669',
                  fontWeight: '600',
                  fontSize: '14px',
                  borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                }}>
                  <button
                    onClick={toggleAllEntities}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'inherit',
                    }}
                  >
                    {selectedEntities.length === filteredEntities.length ? (
                      <CheckSquare size={16} />
                    ) : (
                      <Square size={16} />
                    )}
                  </button>
                </th>
                <th style={{
                  padding: '16px 12px',
                  textAlign: 'left',
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.15) 100%)'
                    : 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%)',
                  color: isDark ? '#10B981' : '#059669',
                  fontWeight: '600',
                  fontSize: '14px',
                  borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                }}>
                  P.S.M
                </th>
                <th style={{
                  padding: '16px 12px',
                  textAlign: 'left',
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.15) 100%)'
                    : 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%)',
                  color: isDark ? '#10B981' : '#059669',
                  fontWeight: '600',
                  fontSize: '14px',
                  borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                }}>
                  Entity
                </th>
                <th style={{
                  padding: '16px 12px',
                  textAlign: 'center',
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.15) 100%)'
                    : 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%)',
                  color: isDark ? '#10B981' : '#059669',
                  fontWeight: '600',
                  fontSize: '14px',
                  borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                }}>
                  Status
                </th>
                <th style={{
                  padding: '16px 12px',
                  textAlign: 'center',
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.15) 100%)'
                    : 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%)',
                  color: isDark ? '#10B981' : '#059669',
                  fontWeight: '600',
                  fontSize: '14px',
                  borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                }}>
                  Fix Status
                </th>
                <th style={{
                  padding: '16px 12px',
                  textAlign: 'center',
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.15) 100%)'
                    : 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%)',
                  color: isDark ? '#10B981' : '#059669',
                  fontWeight: '600',
                  fontSize: '14px',
                  borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEntities.map(entity => (
                <tr key={entity.id}>
                  <td style={{
                    padding: '12px',
                    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                  }}>
                    <button
                      onClick={() => toggleEntitySelection(entity.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: isDark ? '#FFFFFF' : '#000000',
                      }}
                    >
                      {selectedEntities.includes(entity.id) ? (
                        <CheckSquare size={16} />
                      ) : (
                        <Square size={16} />
                      )}
                    </button>
                  </td>
                  <td style={{
                    padding: '12px',
                    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                    fontWeight: '600',
                    color: isDark ? '#14B8A6' : '#0891B2',
                  }}>
                    {entity.psm}
                  </td>
                  <td style={{
                    padding: '12px',
                    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                    fontFamily: 'monospace',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>{entity.apiPath}</span>
                      <span style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: '#3B82F6',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: '600',
                        marginLeft: '8px',
                      }}>
                        {entity.httpMethod}
                      </span>
                    </div>
                  </td>
                  <td style={{
                    padding: '12px',
                    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                    textAlign: 'center',
                  }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      background: '#10B981',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}>
                      {entity.status}
                    </span>
                  </td>
                  <td style={{
                    padding: '12px',
                    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                    textAlign: 'center',
                  }}>
                    <Switch
                      checked={Math.random() > 0.5} // Random for demo
                      onCheckedChange={(checked) => {
                        console.log(`Toggle fix for entity ${entity.id}: ${checked}`);
                      }}
                    />
                  </td>
                  <td style={{
                    padding: '12px',
                    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                    textAlign: 'center',
                  }}>
                    <button
                      onClick={() => navigate(`/entity/${entity.id}`)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                        color: '#3B82F6',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GovernancePage;
