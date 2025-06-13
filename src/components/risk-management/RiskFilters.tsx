
import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { Entity, Risk } from './mockRiskData';

interface RiskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedPSMs: string[];
  onPSMsChange: (psms: string[]) => void;
  selectedRisks: string[];
  onRisksChange: (risks: string[]) => void;
  entities: Entity[];
  risks: Risk[];
}

export const RiskFilters: React.FC<RiskFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedPSMs,
  onPSMsChange,
  selectedRisks,
  onRisksChange,
  entities,
  risks,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [isTreeExpanded, setIsTreeExpanded] = useState<Record<string, boolean>>({});
  const [isRiskFilterOpen, setIsRiskFilterOpen] = useState(false);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '32px',
    padding: '24px',
    borderRadius: '16px',
    background: isDark 
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.03)',
    backdropFilter: 'blur(20px)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
  };

  const searchContainerStyle: React.CSSProperties = {
    position: 'relative',
    maxWidth: '400px',
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px 12px 48px',
    borderRadius: '12px',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
    background: isDark 
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(255, 255, 255, 0.8)',
    color: isDark ? '#FFFFFF' : '#000000',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
  };

  const filtersRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
  };

  const treeContainerStyle: React.CSSProperties = {
    flex: 1,
    maxWidth: '300px',
  };

  const treeTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
    marginBottom: '12px',
  };

  const riskFilterContainerStyle: React.CSSProperties = {
    position: 'relative',
    minWidth: '200px',
  };

  const riskFilterButtonStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
    background: isDark 
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(255, 255, 255, 0.8)',
    color: isDark ? '#FFFFFF' : '#000000',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  // Group entities by PSM
  const psmGroups = entities.reduce((acc, entity) => {
    if (!acc[entity.psm]) {
      acc[entity.psm] = [];
    }
    acc[entity.psm].push(entity);
    return acc;
  }, {} as Record<string, Entity[]>);

  const togglePSMExpansion = (psm: string) => {
    setIsTreeExpanded(prev => ({
      ...prev,
      [psm]: !prev[psm]
    }));
  };

  const togglePSMSelection = (psm: string) => {
    if (selectedPSMs.includes(psm)) {
      onPSMsChange(selectedPSMs.filter(p => p !== psm));
    } else {
      onPSMsChange([...selectedPSMs, psm]);
    }
  };

  const toggleRiskSelection = (riskId: string) => {
    if (selectedRisks.includes(riskId)) {
      onRisksChange(selectedRisks.filter(r => r !== riskId));
    } else {
      onRisksChange([...selectedRisks, riskId]);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={searchContainerStyle}>
        <Search style={searchIconStyle} />
        <input
          type="text"
          placeholder="Search PSM, API path, or HTTP method..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      <div style={filtersRowStyle}>
        <div style={treeContainerStyle}>
          <div style={treeTitleStyle}>P.S.M Tree Navigation</div>
          {Object.entries(psmGroups).map(([psm, entities]) => (
            <div key={psm} style={{ marginBottom: '8px' }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: selectedPSMs.includes(psm) 
                    ? (isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(5, 150, 105, 0.1)')
                    : 'transparent',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => togglePSMExpansion(psm)}
              >
                {isTreeExpanded[psm] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{psm}</span>
                <span 
                  style={{
                    fontSize: '12px',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  }}
                >
                  {entities.length}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePSMSelection(psm);
                  }}
                  style={{
                    marginLeft: 'auto',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: 'none',
                    background: selectedPSMs.includes(psm) 
                      ? (isDark ? '#10B981' : '#059669')
                      : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'),
                    color: selectedPSMs.includes(psm) ? '#FFFFFF' : 'inherit',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  {selectedPSMs.includes(psm) ? 'Selected' : 'Select'}
                </button>
              </div>
              {isTreeExpanded[psm] && (
                <div style={{ marginLeft: '24px', marginTop: '4px' }}>
                  {entities.map(entity => (
                    <div 
                      key={entity.id}
                      style={{
                        padding: '4px 8px',
                        fontSize: '12px',
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      {entity.apiPath} {entity.httpMethod}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={riskFilterContainerStyle}>
          <div style={treeTitleStyle}>Risk Filters</div>
          <button
            style={riskFilterButtonStyle}
            onClick={() => setIsRiskFilterOpen(!isRiskFilterOpen)}
          >
            <span>
              {selectedRisks.length === risks.length 
                ? 'All Risks Selected' 
                : `${selectedRisks.length} of ${risks.length} Selected`}
            </span>
            <Filter size={16} />
          </button>
          {isRiskFilterOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '4px',
              padding: '12px',
              borderRadius: '12px',
              background: isDark 
                ? 'rgba(24, 24, 27, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              boxShadow: isDark 
                ? '0 4px 20px rgba(0, 0, 0, 0.5)'
                : '0 4px 20px rgba(0, 0, 0, 0.1)',
              zIndex: 10,
            }}>
              {risks.map(risk => (
                <div 
                  key={risk.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: selectedRisks.includes(risk.id) 
                      ? (isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(5, 150, 105, 0.1)')
                      : 'transparent',
                  }}
                  onClick={() => toggleRiskSelection(risk.id)}
                >
                  <input 
                    type="checkbox" 
                    checked={selectedRisks.includes(risk.id)}
                    onChange={() => {}}
                    style={{ margin: 0 }}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500' }}>{risk.name}</div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)' 
                    }}>
                      {risk.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
