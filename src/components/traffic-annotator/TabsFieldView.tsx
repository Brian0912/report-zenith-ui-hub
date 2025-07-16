import React, { useState } from 'react';
import { FieldData, ColumnVisibilityState } from './FieldAnalysisSection';
import { CompactFieldView } from './CompactFieldView';

interface TabsFieldViewProps {
  fieldAnalysisData: Record<string, FieldData[]>;
  columnVisibility: ColumnVisibilityState;
  selectedFields: FieldData[];
  onFieldToggle: (field: FieldData) => void;
  onEditField: (field: FieldData) => void;
}

export const TabsFieldView: React.FC<TabsFieldViewProps> = ({
  fieldAnalysisData,
  columnVisibility,
  selectedFields,
  onFieldToggle,
  onEditField
}) => {
  const [activeTab, setActiveTab] = useState<string>('requestHeaders');

  const getSectionInfo = (sectionKey: string) => {
    const sections: Record<string, { title: string; icon: string }> = {
      requestHeaders: { title: 'Request Headers', icon: '📤' },
      requestQuery: { title: 'Request Query', icon: '🔍' },
      requestBody: { title: 'Request Body', icon: '📝' },
      responseHeaders: { title: 'Response Headers', icon: '📥' },
      responseCookies: { title: 'Response Cookies', icon: '🍪' },
      responseBody: { title: 'Response Body', icon: '📋' }
    };
    return sections[sectionKey] || { title: sectionKey, icon: '📄' };
  };

  const availableTabs = Object.entries(fieldAnalysisData).filter(([_, data]) => data.length > 0);

  const tabsContainerStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid hsl(var(--border))',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const tabsHeaderStyle: React.CSSProperties = {
    display: 'flex',
    backgroundColor: 'hsl(var(--muted) / 0.5)',
    borderBottom: '1px solid hsl(var(--border))',
    overflow: 'auto'
  };

  const getTabStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: isActive ? '#ffffff' : 'transparent',
    border: 'none',
    borderBottom: isActive ? '2px solid hsl(var(--primary))' : '2px solid transparent',
    fontSize: '14px',
    fontWeight: isActive ? '600' : '500',
    cursor: 'pointer',
    color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap'
  });

  const tabContentStyle: React.CSSProperties = {
    padding: '0'
  };

  return (
    <div style={tabsContainerStyle}>
      <div style={tabsHeaderStyle}>
        {availableTabs.map(([sectionKey, sectionData]) => {
          const sectionInfo = getSectionInfo(sectionKey);
          const isActive = activeTab === sectionKey;
          
          return (
            <button
              key={sectionKey}
              style={getTabStyle(isActive)}
              onClick={() => setActiveTab(sectionKey)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{sectionInfo.icon}</span>
              {sectionInfo.title}
              <span style={{
                backgroundColor: isActive ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--muted))',
                color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                padding: '2px 6px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {sectionData.length}
              </span>
            </button>
          );
        })}
      </div>

      <div style={tabContentStyle}>
        {availableTabs.map(([sectionKey, sectionData]) => {
          if (activeTab !== sectionKey) return null;

          return (
            <CompactFieldView
              key={sectionKey}
              fields={sectionData}
              columnVisibility={{ ...columnVisibility, group: false }}
              selectedFields={selectedFields}
              onFieldToggle={onFieldToggle}
              onEditField={onEditField}
              showSectionHeaders={false}
            />
          );
        })}
      </div>
    </div>
  );
};
