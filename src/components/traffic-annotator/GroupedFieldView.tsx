
import React, { useState } from 'react';
import { ChevronRight, Eye } from 'lucide-react';
import { FieldData } from './FieldAnalysisSection';
import { CompactFieldView } from './CompactFieldView';

interface GroupedFieldViewProps {
  fieldAnalysisData: Record<string, FieldData[]>;
  columnVisibility: any;
  selectedFields: FieldData[];
  onFieldToggle: (field: FieldData) => void;
  onEditField: (field: FieldData) => void;
}

export const GroupedFieldView: React.FC<GroupedFieldViewProps> = ({
  fieldAnalysisData,
  columnVisibility,
  selectedFields,
  onFieldToggle,
  onEditField
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const getSectionInfo = (sectionKey: string) => {
    const sections: Record<string, { title: string; icon: string; color: string }> = {
      requestHeaders: { title: 'Request Headers', icon: '📤', color: '#4F46E5' },
      requestQuery: { title: 'Request Query Parameters', icon: '🔍', color: '#F59E0B' },
      requestBody: { title: 'Request Body', icon: '📝', color: '#10B981' },
      responseHeaders: { title: 'Response Headers', icon: '📥', color: '#8B5CF6' },
      responseCookies: { title: 'Response Cookies', icon: '🍪', color: '#F97316' },
      responseBody: { title: 'Response Body', icon: '📋', color: '#06B6D4' }
    };
    return sections[sectionKey] || { title: sectionKey, icon: '📄', color: '#6B7280' };
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
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    marginBottom: '16px'
  };

  const headerStyle = (sectionInfo: any): React.CSSProperties => ({
    padding: '16px 20px',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer',
    backgroundColor: `${sectionInfo.color}10`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.2s'
  });

  const contentStyle: React.CSSProperties = {
    backgroundColor: '#ffffff'
  };

  const viewDetailsButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: '#4F46E5',
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
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                    {sectionInfo.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    {sectionData.length} fields detected
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  style={viewDetailsButtonStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleGroup(sectionKey);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#4338CA';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#4F46E5';
                  }}
                >
                  <Eye size={14} />
                  View Details
                </button>
                
                <ChevronRight 
                  size={20} 
                  style={{ 
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    color: sectionInfo.color
                  }} 
                />
              </div>
            </div>
            
            {isExpanded && (
              <div style={contentStyle}>
                <CompactFieldView
                  fields={sectionData}
                  columnVisibility={columnVisibility}
                  selectedFields={selectedFields}
                  onFieldToggle={onFieldToggle}
                  onEditField={onEditField}
                  showSectionHeaders={false}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
