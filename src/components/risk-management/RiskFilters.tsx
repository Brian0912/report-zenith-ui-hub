
import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import { Entity, Risk } from './mockRiskData';

interface RiskFiltersProps {
  entities: Entity[];
  risks: Risk[];
  selectedServiceTrees: string[];
  onServiceTreeChange: (serviceTrees: string[]) => void;
  onFilterChange: (filteredEntities: Entity[]) => void;
  onRiskVisibilityChange: (visibleRiskIds: string[]) => void;
}

export const RiskFilters: React.FC<RiskFiltersProps> = ({
  entities,
  risks,
  selectedServiceTrees,
  onServiceTreeChange,
  onFilterChange,
  onRiskVisibilityChange
}) => {
  const { theme } = useTheme();
  const [serviceTreeQuery, setServiceTreeQuery] = useState('');
  const [selectedRisks, setSelectedRisks] = useState<Set<string>>(new Set(risks.map(r => r.id)));

  useEffect(() => {
    onFilterChange(entities);
  }, [entities, onFilterChange]);

  useEffect(() => {
    onRiskVisibilityChange(Array.from(selectedRisks));
  }, [selectedRisks, onRiskVisibilityChange]);

  const FILTER_HEIGHT = '220px';

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    alignItems: 'start'
  };

  const sectionStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    border: '1px solid rgba(226, 232, 240, 0.5)',
    backdropFilter: 'blur(8px)',
    height: FILTER_HEIGHT,
    display: 'flex',
    flexDirection: 'column'
  };

  const sectionHeaderStyle: React.CSSProperties = {
    padding: '12px 16px 10px 16px',  
    borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
    flexShrink: 0
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
    margin: 0
  };

  const sectionContentStyle: React.CSSProperties = {
    padding: '12px 16px 16px 16px',
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  const scrollableContentStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    background: '#ffffff',
    color: '#334155',
    fontSize: '13px',
    outline: 'none',
    transition: 'all 0.3s ease',
    marginBottom: '8px'
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

  const riskChipStyle = (risk: Risk, isSelected: boolean): React.CSSProperties => {
    // Muted severity colors
    const severityColors = {
      low: '#059669',      // More muted green
      medium: '#d97706',   // More muted amber  
      high: '#dc2626',     // More muted red
      critical: '#991b1b'  // More muted dark red
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

  const addServiceTree = (serviceTree: string) => {
    if (serviceTree.trim() && !selectedServiceTrees.includes(serviceTree.trim())) {
      onServiceTreeChange([...selectedServiceTrees, serviceTree.trim()]);
    }
    setServiceTreeQuery('');
  };

  const removeServiceTree = (serviceTree: string) => {
    onServiceTreeChange(selectedServiceTrees.filter(st => st !== serviceTree));
  };

  const handleServiceTreeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addServiceTree(serviceTreeQuery);
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
    <>
      {/* Service Tree Search */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div style={sectionTitleStyle}>🌳 Service Tree</div>
        </div>
        <div style={sectionContentStyle}>
          <input
            type="text"
            placeholder="Enter service tree filter and press Enter..."
            value={serviceTreeQuery}
            onChange={(e) => setServiceTreeQuery(e.target.value)}
            onKeyPress={handleServiceTreeKeyPress}
            style={inputStyle}
          />

          {selectedServiceTrees.length > 0 && (
            <div style={tagContainerStyle}>
              {selectedServiceTrees.map((serviceTree) => (
                <div key={`service-tree-${serviceTree}`} style={tagStyle}>
                  Service: {serviceTree}
                  <div 
                    style={removeTagStyle}
                    onClick={() => removeServiceTree(serviceTree)}
                  >
                    ×
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Risk Categories */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div style={sectionTitleStyle}>⚠️ Risk Categories</div>
        </div>
        <div style={sectionContentStyle}>
          <div style={scrollableContentStyle}>
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
    </>
  );
};
