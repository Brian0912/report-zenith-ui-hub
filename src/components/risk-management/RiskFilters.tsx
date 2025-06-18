
import React, { useState, useEffect } from 'react';
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
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedRisks, setSelectedRisks] = useState<Set<string>>(new Set(risks.map(r => r.id)));

  // Create multi-level tree structure: PSM -> API Path -> Method
  const createTreeStructure = () => {
    const tree: Record<string, Record<string, Entity[]>> = {};
    
    entities.forEach(entity => {
      if (!tree[entity.psm]) {
        tree[entity.psm] = {};
      }
      if (!tree[entity.psm][entity.apiPath]) {
        tree[entity.psm][entity.apiPath] = [];
      }
      tree[entity.psm][entity.apiPath].push(entity);
    });
    
    return tree;
  };

  const treeStructure = createTreeStructure();

  useEffect(() => {
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

  const FILTER_HEIGHT = '220px';

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
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
    height: FILTER_HEIGHT,
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

  const scrollableContentStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden'
  };

  const treeNodeStyle: React.CSSProperties = {
    padding: '4px 8px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginBottom: '1px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '13px'
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

  const addSelectedItem = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
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
      {/* Service Tree */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div style={sectionTitleStyle}>🌳 Service Tree</div>
        </div>
        <div style={sectionContentStyle}>
          <div style={scrollableContentStyle}>
            {Object.entries(treeStructure).map(([psm, apiPaths]) => (
              <div key={psm}>
                <div
                  style={treeNodeStyle}
                  onClick={() => toggleNode(psm)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme === 'dark' ? '#334155' : '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span>
                    {expandedNodes.has(psm) ? '📂' : '📁'} {psm}
                  </span>
                  <span style={{ fontSize: '11px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                    {Object.values(apiPaths).reduce((acc, methods) => acc + methods.length, 0)}
                  </span>
                </div>
                
                {expandedNodes.has(psm) && Object.entries(apiPaths).map(([apiPath, methods]) => (
                  <div key={`${psm}-${apiPath}`} style={{ marginLeft: '12px' }}>
                    <div
                      style={{...treeNodeStyle, fontSize: '12px'}}
                      onClick={() => toggleNode(`${psm}-${apiPath}`)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = theme === 'dark' ? '#334155' : '#f1f5f9';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <span>
                        {expandedNodes.has(`${psm}-${apiPath}`) ? '📂' : '📁'} {apiPath}
                      </span>
                      <span style={{ fontSize: '10px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                        {methods.length}
                      </span>
                    </div>
                    
                    {expandedNodes.has(`${psm}-${apiPath}`) && methods.map((entity) => (
                      <div
                        key={entity.id}
                        style={{...treeNodeStyle, marginLeft: '12px', fontSize: '11px'}}
                        onClick={() => addSelectedItem(`${entity.apiPath} ${entity.method}`)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = theme === 'dark' ? '#334155' : '#f1f5f9';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <span>📄 {entity.method}</span>
                        <span style={methodBadgeStyle(entity.method)}>
                          {entity.method}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
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
