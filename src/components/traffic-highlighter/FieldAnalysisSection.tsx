
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { sharedStyles } from '../shared/styles';
import { FieldAnalysisData, FieldData } from './CurlAnalysisPanel';
import { FieldTable } from './FieldTable';

interface FieldAnalysisSectionProps {
  fieldAnalysisData: FieldAnalysisData;
  selectedFields: FieldData[];
  setSelectedFields: (fields: FieldData[]) => void;
}

export const FieldAnalysisSection: React.FC<FieldAnalysisSectionProps> = ({
  fieldAnalysisData,
  selectedFields,
  setSelectedFields
}) => {
  const [viewMode, setViewMode] = useState<'grouped' | 'compact' | 'tabs'>('grouped');
  const [activeTab, setActiveTab] = useState('requestHeaders');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    requestHeaders: true,
    requestQuery: true,
    requestBody: true,
    responseHeaders: true,
    responseCookies: true,
    responseBody: true
  });

  const containerStyle: React.CSSProperties = {
    ...sharedStyles.card,
    padding: '16px'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  };

  const titleStyle: React.CSSProperties = {
    ...sharedStyles.subheading,
    margin: 0
  };

  const viewModeStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const viewButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '6px 12px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? '#3b82f6' : '#f3f4f6',
    color: isActive ? '#ffffff' : '#374151'
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getSectionInfo = (sectionKey: string) => {
    const sections: Record<string, { title: string; icon: string; color: string }> = {
      requestHeaders: { title: 'Request Headers', icon: '📤', color: '#eff6ff' },
      requestQuery: { title: 'Request Query Parameters', icon: '🔍', color: '#fff7ed' },
      requestBody: { title: 'Request Body', icon: '📝', color: '#f0fdf4' },
      responseHeaders: { title: 'Response Headers', icon: '📥', color: '#faf5ff' },
      responseCookies: { title: 'Response Cookies', icon: '🍪', color: '#fdf2f8' },
      responseBody: { title: 'Response Body', icon: '📋', color: '#f0f9ff' }
    };
    return sections[sectionKey] || { title: sectionKey, icon: '📄', color: '#f9fafb' };
  };

  const toggleFieldSelection = (field: FieldData) => {
    const isSelected = selectedFields.some(f => f.id === field.id);
    if (isSelected) {
      setSelectedFields(selectedFields.filter(f => f.id !== field.id));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>Field Analysis</h3>
        
        <div style={viewModeStyle}>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>View:</span>
          <button
            onClick={() => setViewMode('grouped')}
            style={viewButtonStyle(viewMode === 'grouped')}
          >
            Grouped
          </button>
          <button
            onClick={() => setViewMode('compact')}
            style={viewButtonStyle(viewMode === 'compact')}
          >
            Compact
          </button>
          <button
            onClick={() => setViewMode('tabs')}
            style={viewButtonStyle(viewMode === 'tabs')}
          >
            Tabs
          </button>
        </div>
      </div>

      {viewMode === 'grouped' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {Object.keys(fieldAnalysisData).map((sectionKey) => {
            const sectionData = fieldAnalysisData[sectionKey as keyof FieldAnalysisData];
            const sectionInfo = getSectionInfo(sectionKey);
            const isExpanded = expandedSections[sectionKey];
            const hasFields = sectionData.length > 0;
            
            if (!hasFields) return null;

            return (
              <div key={sectionKey} style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                <div 
                  style={{
                    padding: '12px 16px',
                    backgroundColor: sectionInfo.color,
                    borderBottom: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => toggleSection(sectionKey)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = sectionInfo.color}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px' }}>{sectionInfo.icon}</span>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                      {sectionInfo.title}
                    </h4>
                    <span style={{
                      backgroundColor: '#e5e7eb',
                      color: '#374151',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {sectionData.length} fields
                    </span>
                  </div>
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                
                {isExpanded && (
                  <FieldTable
                    data={sectionData}
                    selectedFields={selectedFields}
                    onToggleField={toggleFieldSelection}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'compact' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Object.keys(fieldAnalysisData).map((sectionKey) => {
            const sectionData = fieldAnalysisData[sectionKey as keyof FieldAnalysisData];
            const sectionInfo = getSectionInfo(sectionKey);
            const hasFields = sectionData.length > 0;
            
            if (!hasFields) return null;

            return (
              <div 
                key={sectionKey} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '18px' }}>{sectionInfo.icon}</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c' }}>
                    {sectionInfo.title}
                  </span>
                  <span style={{
                    backgroundColor: '#e5e7eb',
                    color: '#374151',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {sectionData.length} fields
                  </span>
                </div>
                <button
                  onClick={() => {
                    setViewMode('tabs');
                    setActiveTab(sectionKey);
                  }}
                  style={{
                    color: '#3b82f6',
                    fontSize: '14px',
                    fontWeight: '600',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#3b82f6'}
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'tabs' && (
        <div>
          <div style={{ borderBottom: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <nav style={{ display: 'flex', gap: '24px' }}>
              {Object.keys(fieldAnalysisData).map((sectionKey) => {
                const sectionData = fieldAnalysisData[sectionKey as keyof FieldAnalysisData];
                const sectionInfo = getSectionInfo(sectionKey);
                const hasFields = sectionData.length > 0;
                const isActive = activeTab === sectionKey;
                
                if (!hasFields) return null;

                return (
                  <button
                    key={sectionKey}
                    onClick={() => setActiveTab(sectionKey)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 4px',
                      borderBottom: `2px solid ${isActive ? '#3b82f6' : 'transparent'}`,
                      fontSize: '14px',
                      fontWeight: '600',
                      color: isActive ? '#3b82f6' : '#6b7280',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#374151';
                        e.currentTarget.style.borderBottomColor = '#d1d5db';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#6b7280';
                        e.currentTarget.style.borderBottomColor = 'transparent';
                      }
                    }}
                  >
                    <span>{sectionInfo.icon}</span>
                    <span>{sectionInfo.title}</span>
                    <span style={{
                      backgroundColor: '#e5e7eb',
                      color: '#374151',
                      padding: '2px 6px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {sectionData.length}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          {Object.keys(fieldAnalysisData).map((sectionKey) => {
            const sectionData = fieldAnalysisData[sectionKey as keyof FieldAnalysisData];
            const hasFields = sectionData.length > 0;
            const isActive = activeTab === sectionKey;
            
            if (!hasFields || !isActive) return null;

            return (
              <div key={sectionKey} style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                <FieldTable
                  data={sectionData}
                  selectedFields={selectedFields}
                  onToggleField={toggleFieldSelection}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
