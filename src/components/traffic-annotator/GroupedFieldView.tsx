
import React, { useState } from 'react';
import { ChevronRight, Eye } from 'lucide-react';
import { FieldData } from './FieldAnalysisSection';

interface GroupedFieldViewProps {
  fieldAnalysisData: Record<string, FieldData[]>;
  onSelectFields: (fields: FieldData[]) => void;
}

export const GroupedFieldView: React.FC<GroupedFieldViewProps> = ({
  fieldAnalysisData,
  onSelectFields
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const getSectionInfo = (sectionKey: string) => {
    const sections: Record<string, { title: string; icon: string; color: string }> = {
      requestHeaders: { title: 'Request Headers', icon: '📤', color: 'hsl(var(--primary) / 0.1)' },
      requestQuery: { title: 'Request Query Parameters', icon: '🔍', color: 'hsl(var(--warning) / 0.1)' },
      requestBody: { title: 'Request Body', icon: '📝', color: 'hsl(var(--success) / 0.1)' },
      responseHeaders: { title: 'Response Headers', icon: '📥', color: 'hsl(var(--secondary) / 0.1)' },
      responseCookies: { title: 'Response Cookies', icon: '🍪', color: 'hsl(var(--muted) / 0.2)' },
      responseBody: { title: 'Response Body', icon: '📋', color: 'hsl(var(--accent) / 0.1)' }
    };
    return sections[sectionKey] || { title: sectionKey, icon: '📄', color: 'hsl(var(--muted) / 0.1)' };
  };

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid hsl(var(--border))',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    marginBottom: '16px'
  };

  const headerStyle = (sectionInfo: any): React.CSSProperties => ({
    padding: '16px 20px',
    borderBottom: '1px solid hsl(var(--border))',
    cursor: 'pointer',
    backgroundColor: sectionInfo.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.2s'
  });

  const contentStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: '#ffffff'
  };

  const viewDetailsButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: 'hsl(var(--primary))',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  };

  return (
    <div>
      {Object.entries(fieldAnalysisData).map(([sectionKey, sectionData]) => {
        const sectionInfo = getSectionInfo(sectionKey);
        const isExpanded = expandedGroups[sectionKey];
        const hasFields = sectionData.length > 0;
        
        if (!hasFields) return null;

        return (
          <div key={sectionKey} style={cardStyle}>
            <div 
              style={headerStyle(sectionInfo)}
              onClick={() => toggleGroup(sectionKey)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>{sectionInfo.icon}</span>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'hsl(var(--foreground))', margin: 0 }}>
                    {sectionInfo.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'hsl(var(--muted-foreground))', margin: 0 }}>
                    {sectionData.length} fields detected
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  style={viewDetailsButtonStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFields(sectionData);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--primary))';
                  }}
                >
                  <Eye size={14} />
                  View Details
                </button>
                
                <ChevronRight 
                  size={20} 
                  style={{ 
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }} 
                />
              </div>
            </div>
            
            {isExpanded && (
              <div style={contentStyle}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {sectionData.slice(0, 6).map((field, index) => (
                    <div
                      key={field.id}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: 'hsl(var(--muted) / 0.5)',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontFamily: 'monospace',
                        color: 'hsl(var(--foreground))'
                      }}
                    >
                      {field.fieldPath}
                    </div>
                  ))}
                  {sectionData.length > 6 && (
                    <div
                      style={{
                        padding: '8px 12px',
                        backgroundColor: 'hsl(var(--muted) / 0.3)',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: 'hsl(var(--muted-foreground))',
                        fontStyle: 'italic',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      +{sectionData.length - 6} more...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
