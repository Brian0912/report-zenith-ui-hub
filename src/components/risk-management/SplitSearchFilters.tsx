
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeProvider';
import { Entity, Risk } from './mockRiskData';

interface SplitSearchFiltersProps {
  entities: Entity[];
  risks: Risk[];
  onFilterChange: (filteredEntities: Entity[]) => void;
  onRiskVisibilityChange: (visibleRiskIds: string[]) => void;
}

export const SplitSearchFilters: React.FC<SplitSearchFiltersProps> = ({
  entities,
  risks,
  onFilterChange,
  onRiskVisibilityChange
}) => {
  const { theme } = useTheme();
  const [psmSearchQuery, setPsmSearchQuery] = useState('');
  const [apiSearchQuery, setApiSearchQuery] = useState('');
  const [selectedPsms, setSelectedPsms] = useState<string[]>([]);
  const [selectedApis, setSelectedApis] = useState<string[]>([]);
  const [psmResults, setPsmResults] = useState<string[]>([]);
  const [showPsmResults, setShowPsmResults] = useState(false);
  const [selectedRisks, setSelectedRisks] = useState<Set<string>>(new Set(risks.map(r => r.id)));
  const [fuzzySearchEnabled, setFuzzySearchEnabled] = useState(false);
  const psmSearchRef = useRef<HTMLInputElement>(null);
  const psmTimeoutRef = useRef<NodeJS.Timeout>();

  // Get unique PSMs from entities
  const uniquePsms = Array.from(new Set(entities.map(e => e.psm)));

  // Fuzzy search for PSMs with 300ms delay
  useEffect(() => {
    if (psmTimeoutRef.current) {
      clearTimeout(psmTimeoutRef.current);
    }

    psmTimeoutRef.current = setTimeout(() => {
      if (psmSearchQuery.trim()) {
        const filtered = uniquePsms.filter(psm => 
          psm.toLowerCase().includes(psmSearchQuery.toLowerCase())
        );
        setPsmResults(filtered.slice(0, 10));
        setShowPsmResults(true);
      } else {
        setPsmResults([]);
        setShowPsmResults(false);
      }
    }, 300);

    return () => {
      if (psmTimeoutRef.current) {
        clearTimeout(psmTimeoutRef.current);
      }
    };
  }, [psmSearchQuery, uniquePsms]);

  // Filter entities based on selected PSMs and APIs
  useEffect(() => {
    let filtered = entities;

    if (selectedPsms.length > 0) {
      filtered = filtered.filter(entity => selectedPsms.includes(entity.psm));
    }

    if (selectedApis.length > 0) {
      filtered = filtered.filter(entity => 
        selectedApis.includes(entity.apiPath)
      );
    }

    onFilterChange(filtered);
  }, [selectedPsms, selectedApis, entities, onFilterChange]);

  // Update risk visibility
  useEffect(() => {
    onRiskVisibilityChange(Array.from(selectedRisks));
  }, [selectedRisks, onRiskVisibilityChange]);

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '16px',
    alignItems: 'start'
  };

  const sectionStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'rgba(30, 41, 59, 0.6)'
      : 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    border: `1px solid ${theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(226, 232, 240, 0.5)'}`,
    backdropFilter: 'blur(8px)',
    height: '220px',
    display: 'flex',
    flexDirection: 'column'
  };

  const sectionHeaderStyle: React.CSSProperties = {
    padding: '12px 16px 10px 16px',
    borderBottom: `1px solid ${theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(226, 232, 240, 0.5)'}`,
    flexShrink: 0
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: theme === 'dark' ? '#f1f5f9' : '#334155',
    margin: 0
  };

  const sectionContentStyle: React.CSSProperties = {
    padding: '12px 16px 16px 16px',
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
    background: theme === 'dark' ? '#1e293b' : '#ffffff',
    color: theme === 'dark' ? '#f1f5f9' : '#334155',
    fontSize: '13px',
    outline: 'none',
    marginBottom: '8px'
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: theme === 'dark' ? '#1e293b' : '#ffffff',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
    borderRadius: '8px',
    maxHeight: '120px',
    overflowY: 'auto',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: '8px 12px',
    cursor: 'pointer',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    fontSize: '12px'
  };

  const tagStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    margin: '2px'
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

  const toggleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    marginTop: '8px'
  };

  const riskChipStyle = (risk: Risk, isSelected: boolean): React.CSSProperties => {
    const severityColors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
      critical: '#dc2626'
    };

    return {
      padding: '6px 12px',
      borderRadius: '16px',
      border: `2px solid ${severityColors[risk.severity]}`,
      background: isSelected 
        ? severityColors[risk.severity]
        : 'transparent',
      color: isSelected ? 'white' : severityColors[risk.severity],
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '12px',
      fontWeight: '500',
      marginBottom: '6px'
    };
  };

  const addPsm = (psm: string) => {
    if (!selectedPsms.includes(psm)) {
      setSelectedPsms([...selectedPsms, psm]);
    }
    setPsmSearchQuery('');
    setShowPsmResults(false);
  };

  const removePsm = (psm: string) => {
    setSelectedPsms(selectedPsms.filter(p => p !== psm));
  };

  const addApi = () => {
    if (apiSearchQuery.trim() && !selectedApis.includes(apiSearchQuery.trim())) {
      setSelectedApis([...selectedApis, apiSearchQuery.trim()]);
      setApiSearchQuery('');
    }
  };

  const removeApi = (api: string) => {
    setSelectedApis(selectedApis.filter(a => a !== api));
  };

  const handleApiKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addApi();
    }
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
      {/* PSM Search */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div style={sectionTitleStyle}>🔍 PSM Search</div>
        </div>
        <div style={sectionContentStyle}>
          <div style={{ position: 'relative', marginBottom: '8px' }}>
            <input
              ref={psmSearchRef}
              type="text"
              placeholder="Search PSMs..."
              value={psmSearchQuery}
              onChange={(e) => setPsmSearchQuery(e.target.value)}
              onFocus={() => setShowPsmResults(psmResults.length > 0)}
              style={searchInputStyle}
            />
            
            {showPsmResults && psmResults.length > 0 && (
              <div style={dropdownStyle}>
                {psmResults.map((psm) => (
                  <div
                    key={psm}
                    style={dropdownItemStyle}
                    onClick={() => addPsm(psm)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = theme === 'dark' ? '#334155' : '#f1f5f9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {psm}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {selectedPsms.map((psm) => (
              <span key={psm} style={tagStyle}>
                {psm}
                <span style={removeTagStyle} onClick={() => removePsm(psm)}>
                  ×
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* API Search */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div style={sectionTitleStyle}>🌐 API Search</div>
        </div>
        <div style={sectionContentStyle}>
          <input
            type="text"
            placeholder="Enter API path and press Enter..."
            value={apiSearchQuery}
            onChange={(e) => setApiSearchQuery(e.target.value)}
            onKeyPress={handleApiKeyPress}
            style={searchInputStyle}
          />

          <div style={toggleStyle}>
            <input
              type="checkbox"
              id="fuzzyToggle"
              checked={fuzzySearchEnabled}
              onChange={(e) => setFuzzySearchEnabled(e.target.checked)}
              style={{ accentColor: '#6366f1' }}
            />
            <label htmlFor="fuzzyToggle">Fuzzy Search</label>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', marginTop: '8px' }}>
            {selectedApis.map((api) => (
              <span key={api} style={tagStyle}>
                {api}
                <span style={removeTagStyle} onClick={() => removeApi(api)}>
                  ×
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Filter */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div style={sectionTitleStyle}>⚠️ Risk Categories</div>
        </div>
        <div style={sectionContentStyle}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
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
    </div>
  );
};
