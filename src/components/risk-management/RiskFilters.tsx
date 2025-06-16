import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import { Entity, Risk } from './mockRiskData';
import { fetchEntities } from '../services/psmService';
import { fetchRisks } from '../services/riskService';

interface RiskFiltersProps {
  entities: Entity[];
  risks: Risk[];
  onFilterChange: (filteredEntities: Entity[]) => void;
  onRiskVisibilityChange: (visibleRiskIds: string[]) => void;
}

export const RiskFilters: React.FC<RiskFiltersProps> = ({
  entities,
  risks,
  onFilterChange,
  onRiskVisibilityChange
}) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPsms, setSelectedPsms] = useState<Set<string>>(new Set());
  const [selectedMethods, setSelectedMethods] = useState<Set<string>>(new Set());
  const [visibleRisks, setVisibleRisks] = useState<Set<string>>(new Set(risks.map(r => r.id)));

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '8px',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#e2e8f0'}`,
    background: theme === 'dark' ? '#1e293b' : '#f8fafc',
    color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  const filterGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  };

  const filterTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: theme === 'dark' ? '#f1f5f9' : '#334155',
    marginBottom: '4px'
  };

  const filterOptionsStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  };

  const filterOptionStyle = (isSelected: boolean): React.CSSProperties => ({
    background: isSelected ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : (theme === 'dark' ? '#334155' : '#f1f5f9'),
    color: isSelected ? 'white' : (theme === 'dark' ? '#f1f5f9' : '#334155'),
    border: `1px solid ${theme === 'dark' ? '#475569' : '#e2e8f0'}`,
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '500'
  });

  const riskListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  };

  const riskItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '6px',
    background: theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(241, 245, 249, 0.8)',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#e2e8f0'}`,
    transition: 'all 0.3s ease'
  };

  const riskCheckboxStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    accentColor: '#6366f1'
  };

  useEffect(() => {
    const filtered = entities.filter(entity => {
      const matchesSearch = entity.apiPath.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entity.psm.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPsm = selectedPsms.size === 0 || selectedPsms.has(entity.psm);
      const matchesMethod = selectedMethods.size === 0 || selectedMethods.has(entity.method);
      
      return matchesSearch && matchesPsm && matchesMethod;
    });
    
    onFilterChange(filtered);
  }, [searchTerm, selectedPsms, selectedMethods, entities, onFilterChange]);

  useEffect(() => {
    onRiskVisibilityChange(Array.from(visibleRisks));
  }, [visibleRisks, onRiskVisibilityChange]);

  return (
    <div style={containerStyle}>
      <input
        type="search"
        placeholder="Search API Path or P.S.M..."
        style={searchInputStyle}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={filterGroupStyle}>
        <h3 style={filterTitleStyle}>Filter by P.S.M</h3>
        <div style={filterOptionsStyle}>
          {[...new Set(entities.map(entity => entity.psm))].map(psm => (
            <button
              key={psm}
              style={filterOptionStyle(selectedPsms.has(psm))}
              onClick={() => {
                const newPsms = new Set(selectedPsms);
                if (selectedPsms.has(psm)) {
                  newPsms.delete(psm);
                } else {
                  newPsms.add(psm);
                }
                setSelectedPsms(newPsms);
              }}
            >
              {psm}
            </button>
          ))}
        </div>
      </div>

      <div style={filterGroupStyle}>
        <h3 style={filterTitleStyle}>Filter by Method</h3>
        <div style={filterOptionsStyle}>
          {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(method => (
            <button
              key={method}
              style={filterOptionStyle(selectedMethods.has(method))}
              onClick={() => {
                const newMethods = new Set(selectedMethods);
                if (selectedMethods.has(method)) {
                  newMethods.delete(method);
                } else {
                  newMethods.add(method);
                }
                setSelectedMethods(newMethods);
              }}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      <div style={filterGroupStyle}>
        <h3 style={filterTitleStyle}>Toggle Risk Visibility</h3>
        <div style={riskListStyle}>
          {risks.map(risk => (
            <div key={risk.id} style={riskItemStyle}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', width: '100%' }}>
                <input
                  type="checkbox"
                  style={riskCheckboxStyle}
                  checked={visibleRisks.has(risk.id)}
                  onChange={() => {
                    const newVisibleRisks = new Set(visibleRisks);
                    if (visibleRisks.has(risk.id)) {
                      newVisibleRisks.delete(risk.id);
                    } else {
                      newVisibleRisks.add(risk.id);
                    }
                    setVisibleRisks(newVisibleRisks);
                  }}
                />
                <span style={{ fontSize: '14px', fontWeight: '500', color: theme === 'dark' ? '#f1f5f9' : '#334155', width: '100%' }}>
                  {risk.name}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
