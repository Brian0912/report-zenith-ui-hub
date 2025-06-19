
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeProvider';
import { Entity } from './mockRiskData';

interface SmartSearchProps {
  entities: Entity[];
  onFilterChange: (filteredEntities: Entity[]) => void;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({
  entities,
  onFilterChange
}) => {
  const { theme } = useTheme();
  const [psmQuery, setPsmQuery] = useState('');
  const [apiQuery, setApiQuery] = useState('');
  const [selectedPsms, setSelectedPsms] = useState<string[]>([]);
  const [selectedApis, setSelectedApis] = useState<string[]>([]);
  const [psmResults, setPsmResults] = useState<string[]>([]);
  const [showPsmResults, setShowPsmResults] = useState(false);
  const [fuzzySearchEnabled, setFuzzySearchEnabled] = useState(false);
  const psmTimeoutRef = useRef<number | null>(null);
  const psmInputRef = useRef<HTMLInputElement>(null);
  const apiInputRef = useRef<HTMLInputElement>(null);

  // Get unique PSMs from entities
  const uniquePsms = Array.from(new Set(entities.map(e => e.psm)));

  // Fuzzy search for PSMs with 1000ms delay
  useEffect(() => {
    if (psmTimeoutRef.current) {
      clearTimeout(psmTimeoutRef.current);
    }

    psmTimeoutRef.current = window.setTimeout(() => {
      if (psmQuery.trim()) {
        const filtered = uniquePsms.filter(psm => 
          psm.toLowerCase().includes(psmQuery.toLowerCase())
        );
        setPsmResults(filtered.slice(0, 10));
        setShowPsmResults(true);
      } else {
        setPsmResults([]);
        setShowPsmResults(false);
      }
    }, 1000);

    return () => {
      if (psmTimeoutRef.current) {
        clearTimeout(psmTimeoutRef.current);
      }
    };
  }, [psmQuery, uniquePsms]);

  // Filter entities based on selected PSMs and APIs
  useEffect(() => {
    if (selectedPsms.length === 0 && selectedApis.length === 0) {
      onFilterChange(entities);
      return;
    }

    const filtered = entities.filter(entity => {
      const matchesPsm = selectedPsms.length === 0 || selectedPsms.includes(entity.psm);
      const matchesApi = selectedApis.length === 0 || selectedApis.includes(entity.apiPath);
      return matchesPsm && matchesApi;
    });

    onFilterChange(filtered);
  }, [selectedPsms, selectedApis, entities, onFilterChange]);

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

  const inputContainerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: '8px'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
    background: theme === 'dark' ? '#1e293b' : '#ffffff',
    color: theme === 'dark' ? '#f1f5f9' : '#334155',
    fontSize: '13px',
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
    maxHeight: '150px',
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
    gap: '6px',
    marginTop: '8px',
    maxHeight: '60px',
    overflowY: 'auto'
  };

  const tagStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
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

  const toggleContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px'
  };

  const toggleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b'
  };

  const checkboxStyle: React.CSSProperties = {
    width: '14px',
    height: '14px',
    accentColor: '#6366f1'
  };

  const addPsm = (psm: string) => {
    if (!selectedPsms.includes(psm)) {
      setSelectedPsms([...selectedPsms, psm]);
    }
    setPsmQuery('');
    setShowPsmResults(false);
  };

  const removePsm = (psm: string) => {
    setSelectedPsms(selectedPsms.filter(p => p !== psm));
  };

  const addApi = (api: string) => {
    if (api.trim() && !selectedApis.includes(api.trim())) {
      setSelectedApis([...selectedApis, api.trim()]);
    }
    setApiQuery('');
  };

  const removeApi = (api: string) => {
    setSelectedApis(selectedApis.filter(a => a !== api));
  };

  const handleApiKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addApi(apiQuery);
    }
  };

  return (
    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>
        <div style={sectionTitleStyle}>🔍 Smart Search</div>
      </div>
      <div style={sectionContentStyle}>
        {/* PSM Search */}
        <div style={inputContainerStyle}>
          <input
            ref={psmInputRef}
            type="text"
            placeholder="Search PSM..."
            value={psmQuery}
            onChange={(e) => setPsmQuery(e.target.value)}
            onFocus={() => setShowPsmResults(psmResults.length > 0)}
            style={inputStyle}
          />
          
          {showPsmResults && psmResults.length > 0 && (
            <div style={searchResultsStyle}>
              {psmResults.map((psm, index) => (
                <div
                  key={index}
                  style={resultItemStyle}
                  onClick={() => addPsm(psm)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme === 'dark' ?'#334155' : '#f1f5f9';
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

        {/* API Search with Toggle */}
        <div style={toggleContainerStyle}>
          <input
            ref={apiInputRef}
            type="text"
            placeholder="Enter API path and press Enter..."
            value={apiQuery}
            onChange={(e) => setApiQuery(e.target.value)}
            onKeyPress={handleApiKeyPress}
            style={{...inputStyle, flex: 1}}
          />
          <label style={toggleStyle}>
            <input
              type="checkbox"
              checked={fuzzySearchEnabled}
              onChange={(e) => setFuzzySearchEnabled(e.target.checked)}
              style={checkboxStyle}
            />
            Fuzzy Search
          </label>
        </div>

        {/* Selected Tags */}
        {(selectedPsms.length > 0 || selectedApis.length > 0) && (
          <div style={tagContainerStyle}>
            {selectedPsms.map((psm) => (
              <div key={`psm-${psm}`} style={tagStyle}>
                PSM: {psm}
                <div 
                  style={removeTagStyle}
                  onClick={() => removePsm(psm)}
                >
                  ×
                </div>
              </div>
            ))}
            {selectedApis.map((api) => (
              <div key={`api-${api}`} style={tagStyle}>
                API: {api}
                <div 
                  style={removeTagStyle}
                  onClick={() => removeApi(api)}
                >
                  ×
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
