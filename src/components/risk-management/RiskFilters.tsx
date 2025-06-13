
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeProvider';
import { Entity, Risk } from './mockRiskData';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Array<{type: 'psm' | 'entity', value: string, entity?: Entity}>>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [expandedPsms, setExpandedPsms] = useState<Set<string>>(new Set());
  const [selectedRisks, setSelectedRisks] = useState<Set<string>>(new Set(risks.map(r => r.id)));
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Group entities by PSM
  const psmGroups = entities.reduce((acc, entity) => {
    if (!acc[entity.psm]) {
      acc[entity.psm] = [];
    }
    acc[entity.psm].push(entity);
    return acc;
  }, {} as Record<string, Entity[]>);

  // Fuzzy search function
  const fuzzySearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: Array<{type: 'psm' | 'entity', value: string, entity?: Entity}> = [];
    const queryLower = query.toLowerCase();

    // Search PSMs
    Object.keys(psmGroups).forEach(psm => {
      if (psm.toLowerCase().includes(queryLower)) {
        results.push({ type: 'psm', value: psm });
      }
    });

    // Search entities
    entities.forEach(entity => {
      const searchableText = `${entity.psm} ${entity.apiPath} ${entity.method}`.toLowerCase();
      if (searchableText.includes(queryLower)) {
        results.push({ 
          type: 'entity', 
          value: `${entity.apiPath} ${entity.method}`, 
          entity 
        });
      }
    });

    setSearchResults(results.slice(0, 10)); // Limit results
  };

  useEffect(() => {
    fuzzySearch(searchQuery);
  }, [searchQuery, entities]);

  useEffect(() => {
    // Filter entities based on selected items
    if (selectedItems.length === 0) {
      onFilterChange(entities);
      return;
    }

    const filtered = entities.filter(entity => {
      const entityString = `${entity.apiPath} ${entity.method}`;
      return selectedItems.includes(entity.psm) || selectedItems.includes(entityString);
    });

    onFilterChange(filtered);
  }, [selectedItems, entities, onFilterChange]);

  useEffect(() => {
    onRiskVisibilityChange(Array.from(selectedRisks));
  }, [selectedRisks, onRiskVisibilityChange]);

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '24px',
    alignItems: 'start'
  };

  const sectionStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'rgba(30, 41, 59, 0.6)'
      : 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    padding: '20px',
    border: `1px solid ${theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(226, 232, 240, 0.5)'}`,
    backdropFilter: 'blur(8px)'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px',
    color: theme === 'dark' ? '#f1f5f9' : '#334155'
  };

  const searchContainerStyle: React.CSSProperties = {
    position: 'relative'
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
    background: theme === 'dark' ? '#1e293b' : '#ffffff',
    color: theme === 'dark' ? '#f1f5f9' : '#334155',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  const searchResultsStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: theme === 'dark' ? '#1e293b' : '#ffffff',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
    borderRadius: '8px',
    maxHeight: '200px',
    overflowY: 'auto',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  };

  const resultItemStyle: React.CSSProperties = {
    padding: '8px 12px',
    cursor: 'pointer',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    transition: 'background 0.2s ease'
  };

  const tagContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '12px'
  };

  const tagStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const removeTagStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '10px'
  };

  const treeStyle: React.CSSProperties = {
    maxHeight: '300px',
    overflowY: 'auto'
  };

  const psmNodeStyle: React.CSSProperties = {
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '6px',
    marginBottom: '4px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const entityNodeStyle: React.CSSProperties = {
    padding: '6px 12px 6px 32px',
    cursor: 'pointer',
    borderRadius: '6px',
    marginBottom: '2px',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  };

  const methodBadgeStyle = (method: string): React.CSSProperties => {
    const colors = {
      'GET': '#3b82f6',
      'POST': '#10b981',
      'PUT': '#f59e0b',
      'DELETE': '#ef4444',
      'PATCH': '#8b5cf6'
    };

    return {
      background: colors[method as keyof typeof colors] || '#6b7280',
      color: 'white',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: '600',
      marginLeft: '8px'
    };
  };

  const riskChipStyle = (risk: Risk, isSelected: boolean): React.CSSProperties => {
    const severityColors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
      critical: '#dc2626'
    };

    return {
      padding: '8px 16px',
      borderRadius: '20px',
      border: `2px solid ${severityColors[risk.severity]}`,
      background: isSelected 
        ? severityColors[risk.severity]
        : 'transparent',
      color: isSelected ? 'white' : severityColors[risk.severity],
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontWeight: '500'
    };
  };

  const riskGridStyle: React.CSSProperties = {
    display: 'grid',
    gap: '8px'
  };

  const addSelectedItem = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const removeSelectedItem = (item: string) => {
    setSelectedItems(selectedItems.filter(i => i !== item));
  };

  const togglePsm = (psm: string) => {
    const newExpanded = new Set(expandedPsms);
    if (newExpanded.has(psm)) {
      newExpanded.delete(psm);
    } else {
      newExpanded.add(psm);
    }
    setExpandedPsms(newExpanded);
  };

  const toggleRisk = (riskId: string) => {
    const newSelected = new Set(selectedRisks);
    if (newSelected.has(riskId)) {
      newSelected.delete(riskId);
    } else {
      newSelected.add(riskId);
    }
    setSelectedRisks(newSelected);
  };

  return (
    <div style={containerStyle}>
      {/* Multi-select Search */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>🔍 Smart Search</div>
        <div style={searchContainerStyle}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search PSM, API path, or method..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearchResults(true)}
            style={searchInputStyle}
          />
          
          {showSearchResults && searchResults.length > 0 && (
            <div style={searchResultsStyle}>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  style={resultItemStyle}
                  onClick={() => addSelectedItem(result.value)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme === 'dark' ? '#334155' : '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '12px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                    {result.type === 'psm' ? 'PSM' : 'API'}:
                  </span>
                  <span style={{ marginLeft: '8px' }}>{result.value}</span>
                  {result.entity && (
                    <span style={methodBadgeStyle(result.entity.method)}>
                      {result.entity.method}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedItems.length > 0 && (
          <div style={tagContainerStyle}>
            {selectedItems.map((item) => (
              <div key={item} style={tagStyle}>
                {item}
                <div 
                  style={removeTagStyle}
                  onClick={() => removeSelectedItem(item)}
                >
                  ×
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tree Navigation */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>🌳 Service Tree</div>
        <div style={treeStyle}>
          {Object.entries(psmGroups).map(([psm, psmEntities]) => (
            <div key={psm}>
              <div
                style={psmNodeStyle}
                onClick={() => togglePsm(psm)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme === 'dark' ? '#334155' : '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>
                  {expandedPsms.has(psm) ? '📂' : '📁'} {psm}
                </span>
                <span style={{ fontSize: '12px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                  {psmEntities.length}
                </span>
              </div>
              
              {expandedPsms.has(psm) && psmEntities.map((entity) => (
                <div
                  key={entity.id}
                  style={entityNodeStyle}
                  onClick={() => addSelectedItem(`${entity.apiPath} ${entity.method}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme === 'dark' ? '#334155' : '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  📄 {entity.apiPath}
                  <span style={methodBadgeStyle(entity.method)}>
                    {entity.method}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Risk Filter */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>⚠️ Risk Categories</div>
        <div style={riskGridStyle}>
          {risks.map((risk) => (
            <div
              key={risk.id}
              style={riskChipStyle(risk, selectedRisks.has(risk.id))}
              onClick={() => toggleRisk(risk.id)}
              title={risk.description}
            >
              {risk.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
