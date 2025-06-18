
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeProvider';
import { Entity, Risk } from './mockRiskData';

interface SmartSearchProps {
  entities: Entity[];
  risks: Risk[];
  onFilterChange: (filteredEntities: Entity[]) => void;
  onRiskVisibilityChange: (visibleRisks: string[]) => void;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({
  entities,
  risks,
  onFilterChange,
  onRiskVisibilityChange
}) => {
  const { theme } = useTheme();
  const [psmSearch, setPsmSearch] = useState('');
  const [apiSearch, setApiSearch] = useState('');
  const [selectedPsms, setSelectedPsms] = useState<string[]>([]);
  const [selectedApis, setSelectedApis] = useState<string[]>([]);
  const [showPsmDropdown, setShowPsmDropdown] = useState(false);
  const [fuzzySearch, setFuzzySearch] = useState(false);
  const [filteredPsms, setFilteredPsms] = useState<string[]>([]);
  
  const psmDropdownRef = useRef<HTMLDivElement>(null);
  const psmSearchRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // Get unique PSMs from entities
  const allPsms = [...new Set(entities.map(entity => entity.psm))].sort();

  // Handle PSM search with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (psmSearch.trim()) {
        const filtered = allPsms.filter(psm => 
          psm.toLowerCase().includes(psmSearch.toLowerCase())
        );
        setFilteredPsms(filtered);
        setShowPsmDropdown(true);
      } else {
        setFilteredPsms([]);
        setShowPsmDropdown(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [psmSearch, allPsms]);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (psmDropdownRef.current && !psmDropdownRef.current.contains(event.target as Node)) {
        setShowPsmDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = entities;

    // Filter by selected PSMs
    if (selectedPsms.length > 0) {
      filtered = filtered.filter(entity => selectedPsms.includes(entity.psm));
    }

    // Filter by selected APIs
    if (selectedApis.length > 0) {
      filtered = filtered.filter(entity => 
        selectedApis.some(api => entity.apiPath.includes(api))
      );
    }

    onFilterChange(filtered);
  }, [selectedPsms, selectedApis, entities, onFilterChange]);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    width: '100%'
  };

  const searchGroupStyle: React.CSSProperties = {
    flex: 1,
    position: 'relative'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    marginBottom: '4px'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
    background: theme === 'dark' ? '#334155' : '#ffffff',
    color: theme === 'dark' ? '#f1f5f9' : '#334155',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: theme === 'dark' ? '#334155' : '#ffffff',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
    borderRadius: '6px',
    maxHeight: '200px',
    overflowY: 'auto',
    zIndex: 1000,
    marginTop: '2px',
    boxShadow: theme === 'dark' 
      ? '0 4px 12px rgba(0, 0, 0, 0.3)'
      : '0 4px 12px rgba(0, 0, 0, 0.1)'
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '13px',
    color: theme === 'dark' ? '#f1f5f9' : '#334155',
    borderBottom: `1px solid ${theme === 'dark' ? '#475569' : '#e2e8f0'}`
  };

  const selectedItemsStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    marginTop: '4px'
  };

  const tagStyle: React.CSSProperties = {
    background: theme === 'dark' ? '#475569' : '#e2e8f0',
    color: theme === 'dark' ? '#f1f5f9' : '#334155',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const removeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    fontSize: '14px',
    lineHeight: 1
  };

  const toggleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '8px',
    fontSize: '12px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b'
  };

  const toggleSwitchStyle: React.CSSProperties = {
    position: 'relative',
    width: '32px',
    height: '18px',
    background: fuzzySearch ? '#6366f1' : (theme === 'dark' ? '#475569' : '#cbd5e1'),
    borderRadius: '9px',
    cursor: 'pointer',
    transition: 'background 0.2s ease'
  };

  const toggleKnobStyle: React.CSSProperties = {
    position: 'absolute',
    top: '2px',
    left: fuzzySearch ? '16px' : '2px',
    width: '14px',
    height: '14px',
    background: 'white',
    borderRadius: '50%',
    transition: 'left 0.2s ease'
  };

  const handlePsmSelect = (psm: string) => {
    if (!selectedPsms.includes(psm)) {
      setSelectedPsms([...selectedPsms, psm]);
    }
    setPsmSearch('');
    setShowPsmDropdown(false);
  };

  const handlePsmRemove = (psm: string) => {
    setSelectedPsms(selectedPsms.filter(p => p !== psm));
  };

  const handleApiAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && apiSearch.trim()) {
      if (!selectedApis.includes(apiSearch.trim())) {
        setSelectedApis([...selectedApis, apiSearch.trim()]);
      }
      setApiSearch('');
    }
  };

  const handleApiRemove = (api: string) => {
    setSelectedApis(selectedApis.filter(a => a !== api));
  };

  return (
    <div style={containerStyle}>
      {/* PSM Search */}
      <div style={searchGroupStyle} ref={psmDropdownRef}>
        <label style={labelStyle}>PSM Search</label>
        <input
          ref={psmSearchRef}
          type="text"
          value={psmSearch}
          onChange={(e) => setPsmSearch(e.target.value)}
          placeholder="Search PSMs..."
          style={inputStyle}
          onFocus={() => {
            if (filteredPsms.length > 0) {
              setShowPsmDropdown(true);
            }
          }}
        />
        
        {showPsmDropdown && filteredPsms.length > 0 && (
          <div style={dropdownStyle}>
            {filteredPsms.map((psm) => (
              <div
                key={psm}
                style={dropdownItemStyle}
                onClick={() => handlePsmSelect(psm)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme === 'dark' ? '#475569' : '#f1f5f9';
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
        
        {selectedPsms.length > 0 && (
          <div style={selectedItemsStyle}>
            {selectedPsms.map((psm) => (
              <div key={psm} style={tagStyle}>
                {psm}
                <button
                  style={removeButtonStyle}
                  onClick={() => handlePsmRemove(psm)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API Search */}
      <div style={searchGroupStyle}>
        <label style={labelStyle}>API Search</label>
        <input
          type="text"
          value={apiSearch}
          onChange={(e) => setApiSearch(e.target.value)}
          onKeyDown={handleApiAdd}
          placeholder="Type API path and press Enter..."
          style={inputStyle}
        />
        
        {selectedApis.length > 0 && (
          <div style={selectedItemsStyle}>
            {selectedApis.map((api) => (
              <div key={api} style={tagStyle}>
                {api}
                <button
                  style={removeButtonStyle}
                  onClick={() => handleApiRemove(api)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div style={toggleStyle}>
          <div
            style={toggleSwitchStyle}
            onClick={() => setFuzzySearch(!fuzzySearch)}
          >
            <div style={toggleKnobStyle} />
          </div>
          <span>Fuzzy Search</span>
        </div>
      </div>
    </div>
  );
};
