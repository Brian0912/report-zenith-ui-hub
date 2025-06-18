
import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';

interface ApiSearchProps {
  selectedApis: string[];
  onApiChange: (apis: string[]) => void;
}

export const ApiSearch: React.FC<ApiSearchProps> = ({
  selectedApis,
  onApiChange
}) => {
  const { theme } = useTheme();
  const [apiQuery, setApiQuery] = useState('');
  const [fuzzySearchEnabled, setFuzzySearchEnabled] = useState(false);

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

  const tagContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '8px',
    maxHeight: '120px',
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

  const addApi = (api: string) => {
    if (api.trim() && !selectedApis.includes(api.trim())) {
      onApiChange([...selectedApis, api.trim()]);
    }
    setApiQuery('');
  };

  const removeApi = (api: string) => {
    onApiChange(selectedApis.filter(a => a !== api));
  };

  const handleApiKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addApi(apiQuery);
    }
  };

  return (
    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>
        <div style={sectionTitleStyle}>🔍 API Search</div>
      </div>
      <div style={sectionContentStyle}>
        <div style={toggleContainerStyle}>
          <input
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

        {selectedApis.length > 0 && (
          <div style={tagContainerStyle}>
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
