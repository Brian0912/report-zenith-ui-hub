import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { mockGovernanceGroups, mockEntities, mockRisks } from '../components/risk-management/mockRiskData';
import { RiskFilters } from '../components/risk-management/RiskFilters';

export const GovernancePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedEntities, setSelectedEntities] = useState<Set<string>>(new Set());
  const [filteredEntities, setFilteredEntities] = useState(mockEntities);
  const [entityStates, setEntityStates] = useState<Record<string, boolean>>({});

  const governance = mockGovernanceGroups.find(g => g.id === id);
  const governanceEntities = governance 
    ? mockEntities.filter(entity => governance.entityIds.includes(entity.id))
    : [];

  useEffect(() => {
    setFilteredEntities(governanceEntities);
    // Initialize entity states
    const initialStates: Record<string, boolean> = {};
    governanceEntities.forEach(entity => {
      const riskStatus = entity.riskStatus[governance?.riskId || ''];
      initialStates[entity.id] = riskStatus?.isResolved || false;
    });
    setEntityStates(initialStates);
  }, [governance]);

  if (!governance) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        color: theme === 'dark' ? '#94a3b8' : '#64748b'
      }}>
        <h1>Governance not found</h1>
        <button onClick={() => navigate('/aplus')}>Back to Dashboard</button>
      </div>
    );
  }

  const risk = mockRisks.find(r => r.id === governance.riskId);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    color: theme === 'dark' ? '#ffffff' : '#1a202c'
  };

  const headerStyle: React.CSSProperties = {
    padding: '40px',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`
  };

  const breadcrumbStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    marginBottom: '16px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const metaStyle: React.CSSProperties = {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
    marginBottom: '24px'
  };

  const progressContainerStyle: React.CSSProperties = {
    flex: 1,
    maxWidth: '300px'
  };

  const progressLabelStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    marginBottom: '8px'
  };

  const progressBarStyle: React.CSSProperties = {
    width: '100%',
    height: '12px',
    background: theme === 'dark' ? '#475569' : '#e2e8f0',
    borderRadius: '6px',
    overflow: 'hidden'
  };

  const progressFillStyle: React.CSSProperties = {
    height: '100%',
    width: `${governance.complianceRate}%`,
    background: governance.complianceRate >= 70 ? '#10b981' : governance.complianceRate >= 40 ? '#f59e0b' : '#ef4444',
    transition: 'width 0.3s ease'
  };

  const batchActionStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
    marginBottom: '24px'
  };

  const contentStyle: React.CSSProperties = {
    padding: '0 40px 40px'
  };

  const toggleAllSelected = () => {
    const selectedEntityIds = Array.from(selectedEntities);
    if (selectedEntityIds.length === 0) return;

    setEntityStates(prev => {
      const newStates = { ...prev };
      selectedEntityIds.forEach(entityId => {
        newStates[entityId] = !newStates[entityId];
      });
      return newStates;
    });
  };

  const handleEntitySelect = (entityId: string, selected: boolean) => {
    const newSelected = new Set(selectedEntities);
    if (selected) {
      newSelected.add(entityId);
    } else {
      newSelected.delete(entityId);
    }
    setSelectedEntities(newSelected);
  };

  const handleSelectAll = () => {
    const allSelected = selectedEntities.size === filteredEntities.length;
    if (allSelected) {
      setSelectedEntities(new Set());
    } else {
      setSelectedEntities(new Set(filteredEntities.map(e => e.id)));
    }
  };

  const handleToggleEntity = (entityId: string) => {
    setEntityStates(prev => ({
      ...prev,
      [entityId]: !prev[entityId]
    }));
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
          <span>Governance Details</span>
        </div>

        <h1 style={titleStyle}>{governance.name}</h1>
        
        <div style={metaStyle}>
          <div>
            <div style={{ fontSize: '14px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
              Created: {new Date(governance.createdDate).toLocaleDateString()}
            </div>
            <div style={{ fontSize: '14px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
              Risk: {risk?.name} ({risk?.severity})
            </div>
          </div>
          
          <div style={progressContainerStyle}>
            <div style={progressLabelStyle}>
              Compliance Rate: {governance.complianceRate}%
            </div>
            <div style={progressBarStyle}>
              <div style={progressFillStyle} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500' }}>
            <input
              type="checkbox"
              checked={selectedEntities.size === filteredEntities.length && filteredEntities.length > 0}
              onChange={handleSelectAll}
              style={{ width: '18px', height: '18px', accentColor: '#6366f1' }}
            />
            Check All
          </label>

          <button
            style={batchActionStyle}
            onClick={toggleAllSelected}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.3)';
            }}
          >
            🔄 Batch Toggle Fixes ({selectedEntities.size} selected)
          </button>
        </div>

        <RiskFilters
          entities={governanceEntities}
          risks={risk ? [risk] : []}
          onFilterChange={setFilteredEntities}
          onRiskVisibilityChange={() => {}} // Not used in governance page
        />
      </div>

      <div style={contentStyle}>
        <GovernanceMatrix 
          entities={filteredEntities}
          risk={risk}
          selectedEntities={selectedEntities}
          onEntitySelect={handleEntitySelect}
          entityStates={entityStates}
          onToggleEntity={handleToggleEntity}
        />
      </div>
    </div>
  );
};

interface GovernanceMatrixProps {
  entities: any[];
  risk: any;
  selectedEntities: Set<string>;
  onEntitySelect: (entityId: string, selected: boolean) => void;
  entityStates: Record<string, boolean>;
  onToggleEntity: (entityId: string) => void;
}

const GovernanceMatrix: React.FC<GovernanceMatrixProps> = ({
  entities,
  risk,
  selectedEntities,
  onEntitySelect,
  entityStates,
  onToggleEntity
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

  return (
    <div style={containerStyle}>
      <table style={tableStyle}>
        <thead style={headerStyle}>
          <tr>
            <th style={{...headerCellStyle, width: '40px'}}>Select</th>
            <th style={{...headerCellStyle, width: '120px'}}>P.S.M</th>
            <th style={{...headerCellStyle, width: '200px'}}>Entity</th>
            <th style={headerCellStyle}>Status</th>
            <th style={headerCellStyle}>Fix Switch</th>
            <th style={headerCellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity, index) => {
            const isSelected = selectedEntities.has(entity.id);
            const isResolved = entityStates[entity.id] || false;

            return (
              <tr 
                key={entity.id}
                style={{
                  background: index % 2 === 0 
                    ? (theme === 'dark' ? 'rgba(30, 41, 59, 0.3)' : 'rgba(248, 250, 252, 0.8)')
                    : 'transparent',
                  borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`
                }}
              >
                <td style={{ padding: '12px' }}>
                  <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={(e) => onEntitySelect(entity.id, e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#6366f1' }}
                  />
                </td>
                <td style={{ padding: '12px', fontWeight: '500', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                  {entity.psm}
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                      {entity.apiPath}
                    </span>
                    <span style={{
                      background: entity.method === 'GET' ? '#3b82f6' : 
                                 entity.method === 'POST' ? '#10b981' :
                                 entity.method === 'PUT' ? '#f59e0b' :
                                 entity.method === 'DELETE' ? '#ef4444' : '#8b5cf6',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}>
                      {entity.method}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    background: isResolved ? '#10b981' : '#ef4444',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}>
                    {isResolved ? 'Resolved' : 'Pending'}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => onToggleEntity(entity.id)}
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '44px',
                      height: '24px',
                      background: isResolved ? '#10b981' : (theme === 'dark' ? '#475569' : '#cbd5e1'),
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: 'none',
                      outline: 'none'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      left: isResolved ? '22px' : '2px',
                      width: '20px',
                      height: '20px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                    }} />
                  </button>
                </td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => navigate(`/entity/${entity.id}`)}
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
