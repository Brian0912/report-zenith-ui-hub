
import React, { useState, useMemo } from 'react';
import { Entity, Risk } from './mockRiskData';

interface RiskFiltersProps {
  entities: Entity[];
  risks: Risk[];
  onEntitiesFilter: (filtered: Entity[]) => void;
  selectedRisks: string[];
  onRisksChange: (riskIds: string[]) => void;
}

export const RiskFilters: React.FC<RiskFiltersProps> = ({
  entities,
  risks,
  onEntitiesFilter,
  selectedRisks,
  onRisksChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [selectedPSMs, setSelectedPSMs] = useState<string[]>([]);

  // PSM tree structure
  const psmTree = useMemo(() => {
    const tree: Record<string, Entity[]> = {};
    entities.forEach(entity => {
      if (!tree[entity.psm]) {
        tree[entity.psm] = [];
      }
      tree[entity.psm].push(entity);
    });
    return tree;
  }, [entities]);

  // Fuzzy search results
  const searchResults = useMemo(() => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return entities.filter(entity =>
      entity.psm.toLowerCase().includes(term) ||
      entity.apiPath.toLowerCase().includes(term) ||
      entity.httpMethod.toLowerCase().includes(term)
    );
  }, [entities, searchTerm]);

  // Apply filters
  React.useEffect(() => {
    let filtered = entities;
    
    if (selectedEntities.length > 0) {
      filtered = filtered.filter(entity => selectedEntities.includes(entity.id));
    }
    
    if (selectedPSMs.length > 0) {
      filtered = filtered.filter(entity => selectedPSMs.includes(entity.psm));
    }
    
    onEntitiesFilter(filtered);
  }, [entities, selectedEntities, selectedPSMs, onEntitiesFilter]);

  const toggleEntitySelection = (entityId: string) => {
    setSelectedEntities(prev =>
      prev.includes(entityId)
        ? prev.filter(id => id !== entityId)
        : [...prev, entityId]
    );
  };

  const togglePSMSelection = (psm: string) => {
    setSelectedPSMs(prev =>
      prev.includes(psm)
        ? prev.filter(p => p !== psm)
        : [...prev, psm]
    );
  };

  const toggleRiskSelection = (riskId: string) => {
    onRisksChange(
      selectedRisks.includes(riskId)
        ? selectedRisks.filter(id => id !== riskId)
        : [...selectedRisks, riskId]
    );
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        {/* Multi-select Search */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Search Entities
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSearchDropdown(true)}
              onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
              placeholder="Search PSM, API path, or method..."
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />
            {showSearchDropdown && searchResults.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 10
              }}>
                {searchResults.map(entity => (
                  <div
                    key={entity.id}
                    onClick={() => toggleEntitySelection(entity.id)}
                    style={{
                      padding: '0.5rem',
                      cursor: 'pointer',
                      backgroundColor: selectedEntities.includes(entity.id) ? '#eff6ff' : 'white',
                      borderBottom: '1px solid #f3f4f6'
                    }}
                  >
                    <strong>{entity.psm}</strong> - {entity.apiPath} {entity.httpMethod}
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedEntities.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
              <small>Selected: {selectedEntities.length} entities</small>
            </div>
          )}
        </div>

        {/* PSM Tree Navigation */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            P.S.M Services
          </label>
          <div style={{ 
            border: '1px solid #d1d5db', 
            borderRadius: '0.375rem', 
            padding: '0.5rem',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {Object.entries(psmTree).map(([psm, psmEntities]) => (
              <div key={psm} style={{ marginBottom: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedPSMs.includes(psm)}
                    onChange={() => togglePSMSelection(psm)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <strong>{psm} ({psmEntities.length})</strong>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Filter */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Risk Columns
          </label>
          <div style={{ 
            border: '1px solid #d1d5db', 
            borderRadius: '0.375rem', 
            padding: '0.5rem',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {risks.map(risk => (
              <label key={risk.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedRisks.includes(risk.id)}
                  onChange={() => toggleRiskSelection(risk.id)}
                  style={{ marginRight: '0.5rem' }}
                />
                <span>{risk.name}</span>
                <span style={{ 
                  marginLeft: '0.5rem', 
                  fontSize: '0.75rem',
                  color: risk.severity === 'critical' ? '#dc2626' : 
                        risk.severity === 'high' ? '#ea580c' :
                        risk.severity === 'medium' ? '#ca8a04' : '#16a34a'
                }}>
                  ({risk.severity})
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
